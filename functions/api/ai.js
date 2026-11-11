// functions/api/ai.js —— 智谱 AI 代理（识别 / 解析 / 批改）
// 修复：① 原来完全匿名可用，任何人可无限刷、烧光 ZAI_API_KEY → 现在必须登录 + 按用户每日配额
//       ② 请求体字段不再信任（长度/类型校验），避免把超大 base64 直接转给上游
//       ③ 上游非 2xx / 超时 / 返回形状异常都有明确错误，未配置密钥时给出可读提示
//       ④ 不再把上游原始报错和堆栈回传给客户端
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser } from '../_lib/session.js';
import { consume, today } from '../_lib/rate.js';

const ENDPOINT = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const TEXT_MODEL = 'glm-4-flash';
const VISION_MODEL = 'glm-4v-flash';

// 每个用户每天可用次数（解析/批改共用 60 次，图片识别单独 20 次）
const QUOTA = { text: 60, extract: 20 };
const GLOBAL_DAILY_CAP = 3000;

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
  grade: "你是阅卷老师。请对比标准答案和学生回答。如果意思相近即算正确。只允许输出两个字：'得分' 或 '不得分'。"
};

function cleanAiText(text) {
  return String(text || '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();
}

function buildMessages(action, prompt, imageBase64) {
  if (action === 'extract' && imageBase64) {
    const clean = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    // 视觉模型不支持 system 角色，提示词必须放进 user
    return {
      model: VISION_MODEL,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: clean } },
          { type: 'text', text: '请提取图片中的题目，并严格输出 JSON。\n' + EXTRACT_PROMPT }
        ]
      }]
    };
  }
  if (action === 'extract') {
    return {
      model: TEXT_MODEL,
      messages: [
        { role: 'system', content: EXTRACT_PROMPT },
        { role: 'user', content: prompt }
      ]
    };
  }
  return {
    model: TEXT_MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPTS[action] },
      { role: 'user', content: prompt }
    ]
  };
}

export const onRequestPost = route(async ({ request, env }) => {
  if (!env.ZAI_API_KEY) throw new HttpError(500, '服务端未配置 ZAI_API_KEY 环境变量');

  const user = await currentUser(request, env);
  const body = await readJson(request);
  const action = String(body.action || '');
  if (!SYSTEM_PROMPTS[action] && action !== 'extract') throw new HttpError(400, '未知的 action');

  const prompt = String(body.prompt || '');
  const imageBase64 = typeof body.imageBase64 === 'string' ? body.imageBase64 : '';
  if (!prompt.trim() && !imageBase64) throw new HttpError(400, '缺少 prompt');
  if (prompt.length > 8000) throw new HttpError(413, '输入文本过长，请分批识别');
  if (imageBase64.length > 8 * 1024 * 1024) throw new HttpError(413, '图片过大，请压缩后重试');

  const day = today();
  const bucket = action === 'extract' ? 'extract' : 'text';
  const rl = await consume(env, `ai:${user}:${day}:${bucket}`, 24 * 3600, QUOTA[bucket]);
  if (!rl.allowed) throw new HttpError(429, `今日 AI ${bucket === 'extract' ? '识别' : '解析'}次数已用完（每天 ${QUOTA[bucket]} 次）`);
  const globalRl = await consume(env, `ai:global:${day}`, 24 * 3600, GLOBAL_DAILY_CAP);
  if (!globalRl.allowed) throw new HttpError(503, '服务今日 AI 调用总量已达上限，请明天再试');

  const { model, messages } = buildMessages(action, prompt, imageBase64);

  let upstream;
  try {
    upstream = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.ZAI_API_KEY}` },
      body: JSON.stringify({ model, messages, temperature: 0.1, stream: false }),
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(45000) : undefined
    });
  } catch (e) {
    throw new HttpError(504, 'AI 服务响应超时，请稍后重试');
  }

  let data;
  try { data = await upstream.json(); } catch (e) { throw new HttpError(502, 'AI 服务返回了无法解析的内容'); }

  if (!upstream.ok || data.error) {
    console.error('智谱 API 报错:', upstream.status, JSON.stringify(data && data.error || data));
    if (upstream.status === 401 || upstream.status === 403) throw new HttpError(502, 'AI 服务鉴权失败，请检查服务端密钥');
    if (upstream.status === 429) throw new HttpError(429, 'AI 服务繁忙，请稍后再试');
    throw new HttpError(502, 'AI 服务暂时不可用，请稍后再试');
  }

  const aiText = data?.choices?.[0]?.message?.content;
  if (!aiText) throw new HttpError(502, 'AI 返回内容为空');

  return json({ ok: true, result: cleanAiText(aiText), model, remaining: Math.max(0, QUOTA[bucket] - rl.count) });
});
