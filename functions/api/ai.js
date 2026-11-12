// functions/api/ai.js —— AI 代理（识别 / 解析 / 批改 / 归类）
// 修复：① 原来完全匿名可用，任何人可无限刷、烧光密钥 → 必须登录 + 按用户每日配额
//       ② 请求体字段不再信任（长度/类型校验），避免把超大 base64 直接转给上游
//       ③ 上游非 2xx / 超时 / 返回形状异常都有明确错误，未配置密钥时给出可读提示
//       ④ 不再把上游原始报错和堆栈回传给客户端
// 增强：⑤ 同一道题的结果落 D1 缓存（ai_cache，7 天），命中不扣配额
//       ⑥ explain 支持 SSE 流式（stream:true），首字延迟从 2~5s 降到几百毫秒
//       ⑦ 新增 classify：给一道题猜学科/章节，配合题库导入自动归类
//       ⑧ 上游可切换：DeepSeek（默认，若配了 DEEPSEEK_API_KEY）/ 智谱 GLM（图片识别必须用智谱）
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser } from '../_lib/session.js';
import { consume, today } from '../_lib/rate.js';
import { resolveProvider } from '../_lib/ai-provider.js';

// 每个用户每天可用次数（解析/批改共用 60 次，图片识别单独 20 次）
const QUOTA = { text: 60, extract: 20, generate: 10 };
const GLOBAL_DAILY_CAP = 3000;
const CACHE_DAYS = 7;

const EXTRACT_PROMPT = `你是一个题目提取助手。请从用户提供的文本或图片中，提取所有题目并严格输出为 JSON 数组格式。
必须严格遵守以下 JSON 格式，不要输出任何其他的废话或 markdown 标记（如 \`\`\`json）：
[
  {
    "q": "题目内容",
    "opts": ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
    "a": 0,
    "chapter": "章节名(如果不知道就填'默认章节')",
    "subject": "学科名(如果不知道就填'默认题库')"
  }
]
注意：
1. 如果是简答题，opts 留空数组 []，a 填入标准答案文本。
2. 如果是多选题，a 填入数组，如 [0, 2]。
3. 直接输出以 [ 开头、以 ] 结尾的纯 JSON 字符串。`;

const SYSTEM_PROMPTS = {
  explain: '你是一个极简的答题助手。请直接输出：\n1. 核心考点：xxx\n2. 解析：xxx\n严禁输出任何多余的废话、开场白或结束语。字数控制在150字以内。',
  grade: "你是阅卷老师。请对比标准答案和学生回答。如果意思相近即算正确。只允许输出两个字：'得分' 或 '不得分'。",
  classify: '你是题库整理助手。根据题目内容判断它属于哪个学科、哪个章节。只输出 JSON：{"subject":"学科名","chapter":"章节名"}，不要任何解释。学科与章节都用简短中文（2~8 个字）。',
  generate: `你是建造师考试的命题老师。请根据用户给出的学科/章节/难度/数量，命制同等风格的选择题。
严格只输出 JSON 数组，不要任何解释或 markdown 围栏，格式：
[
  {
    "q": "题干（可以含 $LaTeX$ 公式，不要出现"图中"这类需要配图的描述）",
    "opts": ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
    "a": 0,
    "explain": "80 字以内的解析：为什么选它、其它选项错在哪",
    "chapter": "章节名",
    "subject": "学科名"
  }
]
可选配图：如果这道题必须看图才能答（受力图 / 截面图 / 进度横道图），在对象里加 figure 字段，我们会在本地把它画成示意图：
  "figure": {"kind": "beam", "caption": "简支梁受力图", "span": 6, "load": "uniform", "value": 20}
  kind 只能是：
  - "beam"（梁受力图）：span 跨度(m)，load 取 "uniform" 或 "point"，value 荷载大小
  - "section"（矩形截面图）：width 宽(mm)，height 高(mm)
  - "flow"（施工进度横道图）：steps 数组，每项 {"name":"工序名","start":起始天,"duration":天数}
注意：figure 里只放数值，不要把文字说明塞进 figure；题干里要写"如图所示"，但不要在题干里写具体图形。
如果题目不需要图，就不要加 figure 字段。

要求：
1. 单选题 a 为数字（从 0 开始），多选题 a 为数组如 [0, 2]，不要出简答题。
2. 四个选项必须互斥且只有一个/一组正确，干扰项要像真题。
3. 题目必须自洽、可直接作答；只有配了 figure 的题才允许出现"如图"字样。
4. 数量严格按用户要求，不要多也不要少；至少一半题目要配 figure（如果这个章节适合出图）。`
};

function cleanAiText(text) {
  return String(text || '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();
}

function buildMessages(action, prompt, imageBase64, model, providerName) {
  if (action === 'extract' && imageBase64) {
    // 智谱要裸 base64；DeepSeek(OpenAI 兼容) 要完整 data URL
    const raw = String(imageBase64).trim();
    const bare = raw.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    const url = providerName === 'zhipu' ? bare : raw.startsWith('data:') ? raw : 'data:image/jpeg;base64,' + bare;
    // 视觉模型不支持 system 角色，提示词必须放进 user
    return {
      model,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url } },
          { type: 'text', text: '请提取图片中的题目，并严格输出 JSON。\n' + EXTRACT_PROMPT }
        ]
      }]
    };
  }
  if (action === 'extract') {
    return {
      model,
      messages: [
        { role: 'system', content: EXTRACT_PROMPT },
        { role: 'user', content: prompt }
      ]
    };
  }
  return {
    model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPTS[action] },
      { role: 'user', content: prompt }
    ]
  };
}

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function cacheKey(action, model, prompt, imageBase64) {
  // 图片只取哈希，避免把几 MB 的 base64 塞进缓存键
  const img = imageBase64 ? await sha256(imageBase64) : '';
  return sha256(`${action}|${model}|${prompt}|${img}`);
}

async function readCache(env, key) {
  try {
    const row = await env.exam_db
      .prepare('SELECT payload, created_at FROM ai_cache WHERE cache_key = ?')
      .bind(key)
      .first();
    if (!row) return null;
    const age = Date.now() - new Date(String(row.created_at).replace(' ', 'T') + 'Z').getTime();
    if (!Number.isFinite(age) || age > CACHE_DAYS * 86400_000) return null;
    env.exam_db.prepare('UPDATE ai_cache SET hits = hits + 1 WHERE cache_key = ?').bind(key).run().catch(() => {});
    return String(row.payload);
  } catch (e) {
    // 表没建（没跑迁移）时静默跳过缓存，不影响主流程
    return null;
  }
}

async function writeCache(env, key, action, payload, model) {
  try {
    await env.exam_db
      .prepare("INSERT INTO ai_cache (cache_key, action, payload, model) VALUES (?, ?, ?, ?) ON CONFLICT(cache_key) DO UPDATE SET payload = excluded.payload, model = excluded.model, created_at = datetime('now')")
      .bind(key, action, payload, model)
      .run();
  } catch (e) {
    // 同上：缓存失败不影响回答
  }
}

function mapUpstreamError(status, provider) {
  if (status === 401 || status === 403) return new HttpError(502, `AI 服务鉴权失败，请检查服务端 ${provider.keyEnv}`);
  if (status === 429) return new HttpError(429, 'AI 服务繁忙，请稍后再试');
  return new HttpError(502, 'AI 服务暂时不可用，请稍后再试');
}

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  const action = String(body.action || '');
  if (!SYSTEM_PROMPTS[action] && action !== 'extract') throw new HttpError(400, '未知的 action');

  const prompt = String(body.prompt || '');
  const imageBase64 = typeof body.imageBase64 === 'string' ? body.imageBase64 : '';
  if (!prompt.trim() && !imageBase64) throw new HttpError(400, '缺少 prompt');
  if (prompt.length > 8000) throw new HttpError(413, '输入文本过长，请分批识别');
  if (imageBase64.length > 8 * 1024 * 1024) throw new HttpError(413, '图片过大，请压缩后重试');

  // 图片识别需要视觉模型；DeepSeek(deepseek-flash) 与智谱(glm-4v-flash) 都支持
  const needsVision = action === 'extract' && Boolean(imageBase64);
  let resolved;
  try {
    resolved = resolveProvider(env, { needsVision });
  } catch (err) {
    throw new HttpError(500, err.message);
  }
  const { provider, apiKey, model } = resolved;

  const { messages } = buildMessages(action, prompt, imageBase64, model, provider.name);
  const bucket = action === 'extract' ? 'extract' : action === 'generate' ? 'generate' : 'text';
  const key = await cacheKey(action, model, prompt, imageBase64);
  const wantStream = body.stream === true && action === 'explain';

  // ① 命中缓存：直接返回（不扣配额，秒回）
  const cached = await readCache(env, key);
  if (cached) {
    if (wantStream) return sseResponse((async function* () {
      yield { delta: cached };
      yield { done: true, cached: true, model, provider: provider.name };
    })());
    return json({ ok: true, result: cached, model, provider: provider.name, cached: true, remaining: null });
  }

  // ② 配额
  const day = today();
  const rl = await consume(env, `ai:${user}:${day}:${bucket}`, 24 * 3600, QUOTA[bucket]);
  if (!rl.allowed) throw new HttpError(429, `今日 AI ${bucket === 'extract' ? '识别' : '解析'}次数已用完（每天 ${QUOTA[bucket]} 次）`);
  const globalRl = await consume(env, `ai:global:${day}`, 24 * 3600, GLOBAL_DAILY_CAP);
  if (!globalRl.allowed) throw new HttpError(503, '服务今日 AI 调用总量已达上限，请明天再试');
  const remaining = Math.max(0, QUOTA[bucket] - rl.count);

  // ③ 流式
  if (wantStream) {
    let upstream;
    try {
      upstream = await fetch(provider.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages, temperature: 0.1, stream: true }),
        signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(60000) : undefined
      });
    } catch (e) {
      throw new HttpError(504, 'AI 服务响应超时，请稍后重试');
    }
    if (!upstream.ok || !upstream.body) throw mapUpstreamError(upstream.status, provider);

    return sseResponse((async function* () {
      const reader = upstream.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let full = '';
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === '[DONE]') continue;
            let parsed;
            try { parsed = JSON.parse(payload); } catch { continue; }
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (typeof delta === 'string' && delta) {
              full += delta;
              yield { delta };
            }
          }
        }
      } catch (e) {
        yield { error: 'AI 流式输出中断，请重试' };
        return;
      }
      const text = cleanAiText(full);
      if (!text) {
        yield { error: 'AI 返回内容为空' };
        return;
      }
      await writeCache(env, key, action, text, model);
      yield { done: true, cached: false, model, provider: provider.name, remaining };
    })());
  }

  // ④ 普通 JSON
  let upstream;
  try {
    upstream = await fetch(provider.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages, temperature: 0.1, stream: false }),
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(45000) : undefined
    });
  } catch (e) {
    throw new HttpError(504, 'AI 服务响应超时，请稍后重试');
  }

  let data;
  try { data = await upstream.json(); } catch (e) { throw new HttpError(502, 'AI 服务返回了无法解析的内容'); }

  if (!upstream.ok || data.error) {
    console.error(provider.label + ' API 报错:', upstream.status, JSON.stringify((data && data.error) || data));
    throw mapUpstreamError(upstream.status, provider);
  }

  const aiText = data?.choices?.[0]?.message?.content;
  if (!aiText) throw new HttpError(502, 'AI 返回内容为空');

  const text = cleanAiText(aiText);
  await writeCache(env, key, action, text, model);
  return json({ ok: true, result: text, model, provider: provider.name, cached: false, remaining });
});

/**
 * 把 (async generator) 变成 SSE 响应。
 * 每帧：data: {"delta":"..."}；结束：data: {"done":true,...}；出错：data: {"error":"..."}
 */
function sseResponse(generator) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of generator) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        }
      } catch (e) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'AI 服务异常中断' })}\n\n`));
      } finally {
        controller.close();
      }
    }
  });
  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=UTF-8',
      'Cache-Control': 'no-store',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    }
  });
}
