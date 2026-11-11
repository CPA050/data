// dev/verify.mjs —— 一键回归测试：把修复版跑起来，逐条验证 bug 是否真的修好了
// 用法: npm run check   （无需任何依赖，Node >= 22.5 自带 node:sqlite）
import assert from 'node:assert/strict';
import { server, db, stats } from './server.mjs';

const results = [];
let passed = 0;

async function test(name, fn) {
  try { await fn(); passed++; results.push(`✅ ${name}`); console.log(`  ✅ ${name}`); }
  catch (e) { results.push(`❌ ${name}\n     ${e.message}`); console.log(`  ❌ ${name}\n     → ${e.message}`); }
}

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

async function call(path, { method = 'GET', body, token, raw } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(base + path, {
    method, headers,
    body: body === undefined ? undefined : (raw ? body : JSON.stringify(body))
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* 非 JSON 响应 */ }
  return { status: res.status, headers: res.headers, text, json };
}

const login = async (username, password = '123456') => {
  const r = await call('/api/auth', { method: 'POST', body: { action: 'login', username, password } });
  return r.json && r.json.token;
};

console.log('\n=== 原点 · Origin 回归测试 ===\n');

// ---------- 1. 静态资源 ----------
await test('静态资源可访问（首页 / 构建后资源 / favicon）', async () => {
  const index = await call('/');
  assert.equal(index.status, 200, `首页应返回 200，实际 ${index.status}`);
  const asset = index.text.match(/\/assets\/index-[\w-]+\.js/);
  assert.ok(asset, '首页应引用构建后的 /assets/index-*.js');
  for (const p of [asset[0], '/favicon.png', '/manifest.webmanifest']) {
    const r = await call(p);
    assert.equal(r.status, 200, `${p} 应返回 200，实际 ${r.status}`);
    assert.ok(r.text.length > 100 || p.endsWith('.png'), `${p} 内容为空`);
  }
});

// ---------- 2. 身份校验 ----------
await test('未登录访问题库被拒绝（401，且不泄露堆栈）', async () => {
  const r = await call('/api/questions?user_id=alice');
  assert.equal(r.status, 401);
  assert.equal(r.json.ok, false);
  assert.ok(!/stack/i.test(r.text), '响应里不应出现 stack');
});

await test('伪造令牌被拒绝', async () => {
  const r = await call('/api/questions?user_id=alice', { token: 'abc.def' });
  assert.equal(r.status, 401);
});

await test('注册新用户返回可用令牌', async () => {
  const r = await call('/api/auth', { method: 'POST', body: { action: 'set', username: 'newbie', password: '123456' } });
  assert.equal(r.status, 200, r.text);
  assert.ok(r.json.token, '应返回 token');
  const t = await call('/api/questions?user_id=newbie', { token: r.json.token });
  assert.equal(t.status, 200);
  assert.deepEqual(t.json, []);
});

await test('重复注册返回 409（不再是静默覆盖密码）', async () => {
  const r = await call('/api/auth', { method: 'POST', body: { action: 'set', username: 'newbie', password: '654321' } });
  assert.equal(r.status, 409);
});

await test('密码错误与用户不存在返回同一提示（防用户名枚举）', async () => {
  const a = await call('/api/auth', { method: 'POST', body: { action: 'login', username: 'alice', password: 'wrong-pass' } });
  const b = await call('/api/auth', { method: 'POST', body: { action: 'login', username: 'no-such-user-xyz', password: 'wrong-pass' } });
  assert.equal(a.status, 401);
  assert.equal(b.status, 401);
  assert.equal(a.json.error, b.json.error);
});

await test('短密码被拒绝（>=6 位）', async () => {
  const r = await call('/api/auth', { method: 'POST', body: { action: 'set', username: 'shortpwd', password: '123' } });
  assert.equal(r.status, 400);
});

await test('正确密码可登录', async () => {
  assert.ok(await login('alice'), 'alice 登录应返回 token');
});

// ---------- 3. 越权 ----------
await test('越权读取他人题库被拒绝（403）', async () => {
  const token = await login('bob');
  const r = await call('/api/questions?user_id=alice', { token });
  assert.equal(r.status, 403);
});

await test('越权修改他人题目返回 404', async () => {
  const token = await login('alice');
  const r = await call('/api/questions-update', {
    method: 'POST', token,
    body: { user_id: 'alice', id: 5, q: '被篡改', opts: ['A'], a: 0 }
  });
  assert.equal(r.status, 404);
});

// ---------- 4. 错题接口（原来 user_choice 永远为空） ----------
const aliceToken = await login('alice');

await test('错题接口返回 user_choice / 正确答案 / 章节 / 学科', async () => {
  const r = await call('/api/wrong?user_id=alice', { token: aliceToken });
  assert.equal(r.status, 200, r.text);
  assert.ok(Array.isArray(r.json) && r.json.length >= 2);
  const item = r.json.find(x => Array.isArray(x.a));
  assert.ok(item, '应有一条多选题错题');
  assert.ok(item.user_choice, 'user_choice 不应为空');
  assert.ok(item.user_choice_text, 'user_choice_text 不应为空');
  assert.ok(item.answer && item.answer.includes('、'), '多选题答案应格式化出多个选项');
  assert.ok(item.chapter && item.subject, '应返回章节和学科');
});

await test('删除不存在的错题返回 404 且 ok:false（不再假成功）', async () => {
  const r = await call('/api/wrong-delete', { method: 'POST', token: aliceToken, body: { user_id: 'alice', id: 999999 } });
  assert.equal(r.status, 404);
  assert.equal(r.json.ok, false);
  assert.equal(r.json.success, false);
});

await test('删除存在的错题成功并返回删除条数', async () => {
  const list = (await call('/api/wrong?user_id=alice', { token: aliceToken })).json;
  const r = await call('/api/wrong-delete', { method: 'POST', token: aliceToken, body: { user_id: 'alice', id: list[0].id } });
  assert.equal(r.status, 200);
  assert.equal(r.json.deleted, 1);
});

// ---------- 5. 收藏接口形状一致 ----------
await test('收藏接口的 a/opts 与题库接口同构（不是 JSON 字符串）', async () => {
  const bank = (await call('/api/questions?user_id=alice', { token: aliceToken })).json;
  const fav = (await call('/api/favorites?user_id=alice', { token: aliceToken })).json;
  assert.ok(fav.length > 0);
  for (const f of fav) {
    assert.ok(!Array.isArray(f.opts) || typeof f.opts[0] === 'string');
    assert.notEqual(typeof f.a, 'string', `收藏项 a 不应是字符串，实际 ${JSON.stringify(f.a)}`);
    const hit = bank.find(b => b.id === f.id);
    assert.deepEqual(f.a, hit.a, '收藏项与题库项的 a 应完全一致');
  }
});

await test('收藏他人的题目返回 404', async () => {
  const r = await call('/api/favorites-add', { method: 'POST', token: aliceToken, body: { user_id: 'alice', question_id: 5 } });
  assert.equal(r.status, 404);
});

// ---------- 6. 简答题更新不再打挂整个题库（原 P0） ----------
await test('更新简答题答案后题库仍可正常读取（原来这里 500）', async () => {
  const bank = (await call('/api/questions?user_id=alice', { token: aliceToken })).json;
  const essay = bank.find(q => Array.isArray(q.opts) && q.opts.length === 0);
  assert.ok(essay, '应存在一道简答题');
  const text = '1. 选用低水化热水泥；2. 控制入模温度；3. 分层浇筑';
  const upd = await call('/api/questions-update', {
    method: 'POST', token: aliceToken,
    body: { user_id: 'alice', id: essay.id, q: essay.q, opts: [], a: text, chapter: essay.chapter, subject: essay.subject }
  });
  assert.equal(upd.status, 200, upd.text);
  const after = await call('/api/questions?user_id=alice', { token: aliceToken });
  assert.equal(after.status, 200, `题库应仍为 200，实际 ${after.status} ${after.text}`);
  assert.equal(after.json.find(q => q.id === essay.id).a, text);
});

await test('导入缺少 q 的题目返回 400（原来是 500 D1_TYPE_ERROR）', async () => {
  const r = await call('/api/questions-add', { method: 'POST', token: aliceToken, body: { user_id: 'alice', questions: [{ opts: ['A', 'B'] }] } });
  assert.equal(r.status, 400);
  assert.ok(r.json.error.includes('第 1 条'));
});

await test('导入合法题目成功，且缺省字段自动补默认值', async () => {
  const before = (await call('/api/questions?user_id=alice', { token: aliceToken })).json.length;
  const r = await call('/api/questions-add', {
    method: 'POST', token: aliceToken,
    body: { user_id: 'alice', questions: [{ q: '没有 opts 也没有 a 的题' }, { q: '多选题', opts: ['A', 'B', 'C'], a: [0, 2] }] }
  });
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.added, 2);
  const after = (await call('/api/questions?user_id=alice', { token: aliceToken })).json;
  assert.equal(after.length, before + 2);
  const bare = after.find(q => q.q === '没有 opts 也没有 a 的题');
  assert.deepEqual(bare.opts, []);
  const multi = after.find(q => q.q === '多选题');
  assert.deepEqual(multi.a, [0, 2]);
});

await test('删除题目同时清掉收藏关联', async () => {
  const bank = (await call('/api/questions?user_id=alice', { token: aliceToken })).json;
  const target = bank.find(q => q.q === '多选题');
  await call('/api/favorites-add', { method: 'POST', token: aliceToken, body: { user_id: 'alice', question_id: target.id } });
  const del = await call('/api/questions-delete', { method: 'POST', token: aliceToken, body: { user_id: 'alice', ids: [target.id] } });
  assert.equal(del.status, 200);
  assert.equal(del.json.deleted, 1);
  const fav = (await call('/api/favorites?user_id=alice', { token: aliceToken })).json;
  assert.ok(!fav.some(f => f.id === target.id), '收藏里不应还残留已删除的题');
});

// ---------- 7. AI 接口（原来完全匿名、无限流） ----------
await test('未登录调用 AI 被拒绝（原来任何人可无限刷）', async () => {
  const r = await call('/api/ai', { method: 'POST', body: { prompt: '测试', action: 'explain' } });
  assert.equal(r.status, 401);
});

await test('登录后 AI 解析可用', async () => {
  const before = stats.aiCalls;
  const r = await call('/api/ai', { method: 'POST', token: aliceToken, body: { prompt: '题目：测试', action: 'explain' } });
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.ok, true);
  assert.ok(r.json.result.length > 0);
  assert.equal(stats.aiCalls, before + 1);
});

await test('AI 输入过长被拒绝（413）', async () => {
  const r = await call('/api/ai', { method: 'POST', token: aliceToken, body: { prompt: 'x'.repeat(9000), action: 'explain' } });
  assert.equal(r.status, 413);
});

// ---------- 7.1 AI 缓存 / 流式 / 归类（Phase 3） ----------
await test('同一道题第二次解析命中缓存，不再调用上游、不扣配额', async () => {
  const prompt = '题目：缓存命中测试 ' + Date.now();
  const first = await call('/api/ai', { method: 'POST', token: aliceToken, body: { prompt, action: 'explain' } });
  assert.equal(first.status, 200, first.text);
  assert.equal(first.json.cached, false);
  const calls = stats.aiCalls;

  const second = await call('/api/ai', { method: 'POST', token: aliceToken, body: { prompt, action: 'explain' } });
  assert.equal(second.status, 200, second.text);
  assert.equal(second.json.cached, true, '第二次应命中缓存');
  assert.equal(second.json.result, first.json.result, '缓存内容应与首次一致');
  assert.equal(stats.aiCalls, calls, '命中缓存不应再调用上游');
});

await test('缓存写入了 ai_cache 表并记录命中次数', async () => {
  const rows = await db.dump('ai_cache');
  assert.ok(rows.length > 0, 'ai_cache 应有记录');
  assert.ok(rows.some(r => Number(r.hits) >= 1), '命中后 hits 应自增');
});

await test('stream:true 返回 SSE，逐段增量并以 done 收尾', async () => {
  const prompt = '题目：流式测试 ' + Date.now();
  const res = await fetch(base + '/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + aliceToken },
    body: JSON.stringify({ action: 'explain', prompt, stream: true }),
  });
  assert.equal(res.status, 200);
  assert.ok((res.headers.get('content-type') || '').includes('text/event-stream'), '应为 SSE 响应');
  const text = await res.text();
  const frames = text.split('\n\n').filter(Boolean).map(f => f.replace(/^data:\s*/, ''));
  const events = frames.map(f => JSON.parse(f));
  const deltas = events.filter(e => typeof e.delta === 'string');
  assert.ok(deltas.length >= 2, '应产生多段增量，实际 ' + deltas.length);
  assert.ok(events.some(e => e.done === true), '应有 done 帧');
  const whole = deltas.map(e => e.delta).join('');
  assert.ok(whole.includes('考点'), '拼起来应是完整解析：' + whole.slice(0, 40));
});

await test('classify 返回学科与章节', async () => {
  const r = await call('/api/ai', { method: 'POST', token: aliceToken, body: { prompt: '题目：普通硅酸盐水泥初凝时间', action: 'classify' } });
  assert.equal(r.status, 200, r.text);
  const parsed = JSON.parse(/\{[\s\S]*\}/.exec(r.json.result)[0]);
  assert.ok(parsed.subject && parsed.chapter, '应返回 subject/chapter');
});

await test('流式接口同样需要登录', async () => {
  const res = await fetch(base + '/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'explain', prompt: 'x', stream: true }),
  });
  assert.equal(res.status, 401);
});

await test('AI 每日配额生效（第 61 次返回 429）', async () => {
  await call('/api/auth', { method: 'POST', body: { action: 'set', username: 'quota_user', password: '123456' } });
  const t = await login('quota_user');
  let last;
  for (let i = 0; i < 61; i++) {
    last = await call('/api/ai', { method: 'POST', token: t, body: { prompt: '配额测试 ' + i, action: 'explain' } });
    if (last.status === 429) break;
  }
  assert.equal(last.status, 429, '第 61 次应被配额拦截');
  assert.ok(/次数已用完/.test(last.json.error));
});

// ---------- 8. 限流 / 密码存储 ----------
await test('连续输错密码触发限流（429）', async () => {
  let last;
  for (let i = 0; i < 12; i++) {
    last = await call('/api/auth', { method: 'POST', body: { action: 'login', username: 'brute_target', password: 'nope' } });
    if (last.status === 429) break;
  }
  assert.equal(last.status, 429);
});

await test('数据库里不再存明文密码（PBKDF2）', async () => {
  const rows = await db.dump('users');
  for (const u of rows) {
    assert.ok(String(u.password_hash).startsWith('pbkdf2$'), `${u.username} 的密码不是 PBKDF2 哈希`);
  }
  assert.ok(!rows.some(u => u.password_hash === '123456' || u.password_hash === '1234'));
});

await test('老库明文密码可正常登录并自动升级为哈希', async () => {
  await db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').bind('legacy_user', '1234').run();
  const t = await login('legacy_user', '1234');
  assert.ok(t, '老用户应能用原明文密码登录');
  const row = await db.prepare('SELECT password_hash FROM users WHERE username = ?').bind('legacy_user').first();
  assert.ok(String(row.password_hash).startsWith('pbkdf2$'), '登录后应自动升级为哈希');
});

await test('未知接口返回 JSON 错误而不是崩掉进程', async () => {
  const r = await call('/api/not-exist');
  assert.equal(r.status, 404);
  assert.equal(r.json.ok, false);
});

// ---------- 汇总 ----------
console.log(`\n=== 结果：${passed}/${results.length} 通过 ===\n`);
if (passed !== results.length) {
  console.log(results.filter(r => r.startsWith('❌')).join('\n'));
}
server.close();
process.exit(passed === results.length ? 0 : 1);
