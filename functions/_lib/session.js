// functions/_lib/session.js —— 从请求里取当前用户（真正的身份校验）
import { HttpError } from './http.js';
import { verifyToken } from './auth.js';

// 优先用 AUTH_SECRET；没配时退化为"由 ZAI_API_KEY 派生的密钥"，
// 这样直接部署也不会把登录接口整挂（但强烈建议单独配置 AUTH_SECRET）。
let warnedSecret = false;
export function authSecret(env) {
  if (env.AUTH_SECRET) return env.AUTH_SECRET;
  if (env.ZAI_API_KEY) {
    if (!warnedSecret) {
      warnedSecret = true;
      console.warn('[auth] 未配置 AUTH_SECRET，暂用 ZAI_API_KEY 派生密钥；建议尽快 wrangler pages secret put AUTH_SECRET');
    }
    return 'derived:' + env.ZAI_API_KEY;
  }
  throw new HttpError(500, '服务端未配置 AUTH_SECRET 环境变量');
}

export async function currentUser(request, env) {
  const header = request.headers.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  const payload = await verifyToken(token, authSecret(env));
  if (!payload) throw new HttpError(401, '登录已过期，请重新登录');
  return payload.u;
}

// 请求里带的 user_id 只作为一致性校验，真正的身份以 token 为准
export function assertSameUser(requestedId, user) {
  if (requestedId && String(requestedId) !== String(user)) throw new HttpError(403, '无权访问他人数据');
  return user;
}

export function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
}
