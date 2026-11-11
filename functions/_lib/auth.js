// functions/_lib/auth.js —— 密码哈希 + 无状态签名令牌（HMAC-SHA256）
// 只依赖 WebCrypto，Workers / Node 都能直接跑，不需要额外依赖。

const PBKDF2_ITER = 100000;
const enc = new TextEncoder();

export function b64urlFromBytes(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function bytesFromB64url(str) {
  const s = str.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(s + '==='.slice((s.length + 3) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function pbkdf2(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, key, 256);
  return new Uint8Array(bits);
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(String(password), salt, PBKDF2_ITER);
  return `pbkdf2$${PBKDF2_ITER}$${b64urlFromBytes(salt)}$${b64urlFromBytes(hash)}`;
}

export async function verifyPassword(password, stored) {
  if (!stored) return false;
  const parts = String(stored).split('$');
  // 兼容历史明文密码：校验通过后由调用方升级为哈希
  if (parts[0] !== 'pbkdf2') {
    const a = enc.encode(String(password)), b = enc.encode(String(stored));
    return timingSafeEqual(a, b);
  }
  const [, iter, saltS, hashS] = parts;
  const hash = await pbkdf2(String(password), bytesFromB64url(saltS), Number(iter) || PBKDF2_ITER);
  return timingSafeEqual(hash, bytesFromB64url(hashS));
}

export function isLegacyPlain(stored) { return !!stored && !String(stored).startsWith('pbkdf2$'); }

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return new Uint8Array(sig);
}

// token = base64url(payload).base64url(hmac)
export async function signToken(username, secret, ttlSeconds = 30 * 24 * 3600) {
  const payload = b64urlFromBytes(enc.encode(JSON.stringify({ u: username, exp: Math.floor(Date.now() / 1000) + ttlSeconds })));
  const sig = b64urlFromBytes(await hmac(secret, payload));
  return `${payload}.${sig}`;
}

export async function verifyToken(token, secret) {
  if (!token || typeof token !== 'string' || !secret) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expect = b64urlFromBytes(await hmac(secret, payload));
  if (!timingSafeEqual(bytesFromB64url(sig), bytesFromB64url(expect))) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(bytesFromB64url(payload)));
    if (!data.u || !data.exp || data.exp * 1000 < Date.now()) return null;
    return data;
  } catch { return null; }
}
