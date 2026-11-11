// functions/_lib/ai-provider.js —— AI 上游选择（DeepSeek / 智谱），两者都是 OpenAI 兼容协议
//
// 选择规则：
//   1. env.AI_PROVIDER = 'deepseek' | 'zhipu' 时强制使用该家；
//   2. 否则配了 DEEPSEEK_API_KEY 就用 DeepSeek（文本），图片识别自动回落到智谱视觉模型；
//   3. 再否则用智谱。
//
// 注意：DeepSeek 目前没有视觉模型，extract(action=extract + 图片) 必须走智谱 glm-4v-flash。

const DEEPSEEK = {
  name: 'deepseek',
  label: 'DeepSeek',
  endpoint: 'https://api.deepseek.com/chat/completions',
  keyEnv: 'DEEPSEEK_API_KEY',
  textModel: 'deepseek-chat',
  visionModel: null,
};

const ZHIPU = {
  name: 'zhipu',
  label: '智谱 GLM',
  endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
  keyEnv: 'ZAI_API_KEY',
  textModel: 'glm-4-flash',
  visionModel: 'glm-4v-flash',
};

const ALL = [DEEPSEEK, ZHIPU];

function byName(name) {
  return ALL.find((p) => p.name === name) || null;
}

/**
 * 选一个能处理本次请求的上游。
 * @param {Record<string, string>} env
 * @param {{ needsVision?: boolean }} options
 * @returns {{ provider: object, apiKey: string, model: string }}
 */
export function resolveProvider(env, { needsVision = false } = {}) {
  const forced = String(env.AI_PROVIDER || '').trim().toLowerCase();
  const has = (p) => Boolean(p && env[p.keyEnv]);

  const candidates = forced ? [byName(forced)].filter(Boolean) : ALL;
  for (const provider of candidates) {
    if (!has(provider)) continue;
    if (needsVision && !provider.visionModel) continue;
    return { provider, apiKey: env[provider.keyEnv], model: needsVision ? provider.visionModel : provider.textModel };
  }

  if (forced && !byName(forced)) throw new Error(`AI_PROVIDER 配置无效：${forced}`);
  const missing = candidates.map((p) => p.keyEnv).join(' 或 ');
  const need = needsVision ? '图片识别' : 'AI';
  throw new Error(`服务端未配置 ${missing} 环境变量（${need}需要）`);
}

/** 给前端/日志看的当前配置摘要（不含密钥） */
export function describeProviders(env) {
  return ALL.map((p) => ({ name: p.name, configured: Boolean(env[p.keyEnv]), model: p.textModel }));
}
