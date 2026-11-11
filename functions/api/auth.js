// functions/api/auth.js —— 注册/登录/改密：PBKDF2 哈希 + HMAC 签名令牌
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { hashPassword, verifyPassword, signToken, isLegacyPlain } from '../_lib/auth.js';
import { authSecret, clientIp } from '../_lib/session.js';
import { usersPasswordColumn } from '../_lib/schema.js';
import { consume } from '../_lib/rate.js';

async function findUser(env, username) {
  return env.exam_db.prepare('SELECT * FROM users WHERE username = ?').bind(username).first();
}

// 兼容老库（password 明文列）与新库（password_hash 列）
function storedHash(row) { return row ? (row.password_hash || row.password || '') : ''; }

export const onRequestPost = route(async ({ request, env }) => {
  const body = await readJson(request);
  const action = String(body.action || '');
  const username = String(body.username || '').trim();
  const password = String(body.password || '');
  const newPassword = String(body.newPassword || '');

  // 令牌是无状态的，登出只是前端清 localStorage；这里保留接口用于兼容/埋点
  if (action === 'logout') return json({ ok: true });

  if (!username) throw new HttpError(400, '缺少用户名');
  if (username.length > 32) throw new HttpError(400, '用户名不能超过 32 个字符');

  const ip = clientIp(request);
  const col = await usersPasswordColumn(env); // password_hash 或 password

  if (action === 'check') {
    // 防止被用来批量枚举用户名
    const rl = await consume(env, `check:${ip}`, 60, 30);
    if (!rl.allowed) throw new HttpError(429, '操作过于频繁，请稍后再试');
    const row = await findUser(env, username);
    return json({ ok: true, hasPassword: !!row });
  }

  if (action === 'set') {
    if (password.length < 6) throw new HttpError(400, '密码至少 6 位');
    if (password.length > 128) throw new HttpError(400, '密码过长');
    if (await findUser(env, username)) throw new HttpError(409, '该用户已设置过密码，请直接登录');
    await env.exam_db.prepare(`INSERT INTO users (username, ${col}) VALUES (?, ?)`)
      .bind(username, await hashPassword(password)).run();
    return json({ ok: true, token: await signToken(username, authSecret(env)), user: username });
  }

  if (action === 'login') {
    const rl = await consume(env, `login:${ip}:${username}`, 900, 10);
    if (!rl.allowed) throw new HttpError(429, '密码错误次数过多，请 15 分钟后再试');
    const row = await findUser(env, username);
    const stored = storedHash(row);
    // 用户不存在与密码错误返回同一句话，避免用户名枚举
    if (!row || !(await verifyPassword(password, stored))) throw new HttpError(401, '用户名或密码错误');
    if (isLegacyPlain(stored)) {
      try {
        await env.exam_db.prepare(`UPDATE users SET ${col} = ? WHERE username = ?`)
          .bind(await hashPassword(password), username).run();
      } catch (e) { console.warn('密码哈希升级失败（老库未迁移）', e.message); }
    }
    return json({ ok: true, token: await signToken(username, authSecret(env)), user: username });
  }

  if (action === 'change') {
    const rl = await consume(env, `change:${ip}:${username}`, 900, 10);
    if (!rl.allowed) throw new HttpError(429, '操作过于频繁，请稍后再试');
    if (newPassword.length < 6) throw new HttpError(400, '新密码至少 6 位');
    const row = await findUser(env, username);
    if (!row || !(await verifyPassword(password, storedHash(row)))) throw new HttpError(401, '原密码不正确');
    await env.exam_db.prepare(`UPDATE users SET ${col} = ? WHERE username = ?`)
      .bind(await hashPassword(newPassword), username).run();
    return json({ ok: true });
  }

  if (action === 'logout') return json({ ok: true });

  throw new HttpError(400, '未知操作');
});
