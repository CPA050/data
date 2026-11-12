import fs from 'node:fs';

const p = 'dev/verify.mjs';
let s = fs.readFileSync(p, 'utf8');

if (!s.includes('乐观锁')) {
  const block = `
// ---------- 5b. 解析字段与多端冲突（乐观锁） ----------
await test('保存解析后，题库与错题都能读回 explain', async () => {
  const bank = (await call('/api/questions?user_id=alice', { token: aliceToken })).json;
  const target = bank.find(q => typeof q.a === 'number');
  assert.ok(target, '应存在一道单选题');
  const upd = await call('/api/questions-update', {
    method: 'POST', token: aliceToken,
    body: {
      user_id: 'alice', id: target.id, q: target.q, opts: target.opts, a: target.a,
      chapter: target.chapter, subject: target.subject,
      explain: '先判断初凝时间，再排除干扰项。',
      base_updated_at: target.updated_at,
    },
  });
  assert.equal(upd.status, 200, upd.text);
  const after = (await call('/api/questions?user_id=alice', { token: aliceToken })).json;
  const hit = after.find(q => q.id === target.id);
  assert.equal(hit.explain, '先判断初凝时间，再排除干扰项。', 'explain 应持久化');
  assert.ok(hit.updated_at && hit.updated_at !== target.updated_at, 'updated_at 应刷新');
});

await test('拿着旧版本号保存会返回 409 冲突（不静默覆盖）', async () => {
  const bank = (await call('/api/questions?user_id=alice', { token: aliceToken })).json;
  const target = bank.find(q => typeof q.a === 'number');
  const stale = '2020-01-01T00:00:00.000Z';
  const r = await call('/api/questions-update', {
    method: 'POST', token: aliceToken,
    body: {
      user_id: 'alice', id: target.id, q: target.q, opts: target.opts, a: target.a,
      chapter: target.chapter, subject: target.subject,
      base_updated_at: stale,
    },
  });
  assert.equal(r.status, 409, r.text);
  assert.equal(r.json.conflict, true);
  assert.ok(r.json.current, '409 应回传当前版本，供前端对比');

  const forced = await call('/api/questions-update', {
    method: 'POST', token: aliceToken,
    body: {
      user_id: 'alice', id: target.id, q: target.q, opts: target.opts, a: target.a,
      chapter: target.chapter, subject: target.subject,
      base_updated_at: stale, force: true,
    },
  });
  assert.equal(forced.status, 200, 'force 应允许覆盖');
});
`;
  s = s.replace('// ---------- 6. 简答题更新不再打挂整个题库（原 P0） ----------', block + '\n// ---------- 6. 简答题更新不再打挂整个题库（原 P0） ----------');
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('verify tests added');
