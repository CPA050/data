// dev/legacy-check.mjs —— 老库兼容性检查
// 模拟线上历史库：users 只有 password 列（明文）、没有 rate_limits 表。
// 验证新版代码直接部署上去不会把登录整挂，并且老用户登录后密码会被自动升级成哈希。
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { D1Shim } from './d1.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const db = new D1Shim(':memory:');
db.exec(`
  CREATE TABLE users (username TEXT PRIMARY KEY, password TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')));
  CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, q TEXT NOT NULL,
    opts TEXT DEFAULT '[]', a TEXT DEFAULT '""', chapter TEXT, subject TEXT DEFAULT '默认题库',
    created_at TEXT DEFAULT (datetime('now')));
  CREATE TABLE wrong_questions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, q TEXT NOT NULL,
    opts TEXT DEFAULT '[]', a TEXT DEFAULT '""', chapter TEXT, subject TEXT DEFAULT '默认题库',
    user_choice TEXT DEFAULT '', created_at TEXT DEFAULT (datetime('now')));
  CREATE TABLE favorites (user_id TEXT NOT NULL, question_id INTEGER NOT NULL, created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, question_id));
  INSERT INTO users (username, password) VALUES ('olduser', '1234');
`);

const env = { exam_db: db, ZAI_API_KEY: 'x', AUTH_SECRET: 'legacy-test-secret' };
const auth = await import(pathToFileURL(path.join(ROOT, 'functions/api/auth.js')).href + '?t=' + Date.now());

let pass = 0, fail = 0;
const ok = (cond, msg, extra) => {
  if (cond) { pass++; console.log('  ✅ ' + msg + (extra !== undefined ? '  →  ' + JSON.stringify(extra) : '')); }
  else { fail++; console.log('  ❌ ' + msg + (extra !== undefined ? '  →  ' + JSON.stringify(extra) : '')); }
};
const post = async (body) => {
  const res = await auth.onRequestPost({
    request: new Request('http://x/api/auth', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '1.1.1.1' },
      body: JSON.stringify(body)
    }),
    env
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
};

console.log('\n=== 老库兼容性检查（users.password 明文列、无 rate_limits） ===\n');

const login = await post({ action: 'login', username: 'olduser', password: '1234' });
ok(login.status === 200 && !!login.body.token, '老用户用明文密码可以登录', login.status);

const bad = await post({ action: 'login', username: 'olduser', password: 'wrong' });
ok(bad.status === 401 && bad.body.error === '用户名或密码错误', '错误密码返回 401 而非 500', bad.status);

const row = await db.prepare('SELECT password FROM users WHERE username = ?').bind('olduser').first();
ok(String(row.password).startsWith('pbkdf2$'), '登录成功后明文密码已自动升级为哈希', String(row.password).slice(0, 14) + '…');

const again = await post({ action: 'login', username: 'olduser', password: '1234' });
ok(again.status === 200 && !!again.body.token, '升级后仍能用原密码登录');

const setExist = await post({ action: 'set', username: 'olduser', password: 'abcdef' });
ok(setExist.status === 409, '已有用户不能重复注册（409）', setExist.status);

const newUser = await post({ action: 'set', username: 'newuser', password: 'abcdef' });
ok(newUser.status === 200 && !!newUser.body.token, '新用户可注册并直接拿到 token', newUser.status);
const row2 = await db.prepare('SELECT password FROM users WHERE username = ?').bind('newuser').first();
ok(String(row2.password).startsWith('pbkdf2$'), '新用户写入的就已是哈希', String(row2.password).slice(0, 14) + '…');

const change = await post({ action: 'change', username: 'newuser', password: 'abcdef', newPassword: 'ghijkl' });
ok(change.status === 200, '改密成功（写入老库的 password 列）', change.status);
const relogin = await post({ action: 'login', username: 'newuser', password: 'ghijkl' });
ok(relogin.status === 200 && !!relogin.body.token, '新密码可登录');

console.log(`\n=== 老库兼容：${pass} 通过 / ${fail} 失败 ===\n`);
process.exit(fail === 0 ? 0 : 1);
