// functions/api/questions-add.js —— 批量导入题目
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';
import { toDbOpts, toDbAnswer } from '../_lib/db.js';

const BATCH_SIZE = 20;

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const list = Array.isArray(body.questions) ? body.questions : [];
  if (!list.length) throw new HttpError(400, '没有要导入的题目');
  if (list.length > 2000) throw new HttpError(413, '一次最多导入 2000 道题');

  const now = new Date().toISOString();
  const rows = list.map((item, i) => {
    const q = String(item && item.q || '').trim();
    if (!q) throw new HttpError(400, `第 ${i + 1} 条缺少题干 q`);
    const opts = Array.isArray(item.opts) ? item.opts.map(String) : [];
    const a = item.a === undefined || item.a === null ? '' : item.a;
    return {
      q,
      opts: toDbOpts(opts),
      a: toDbAnswer(a),
      chapter: String(item.chapter || ''),
      subject: String(item.subject || '默认题库'),
      type: String(item.type || ''),
      explain: String(item.explain || '')
    };
  });

  const stmt = 'INSERT INTO questions (user_id, q, opts, a, chapter, subject, explain, type, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE).map(r =>
      env.exam_db.prepare(stmt).bind(user, r.q, r.opts, r.a, r.chapter, r.subject, r.explain, r.type, now));
    await env.exam_db.batch(chunk);
  }

  return json({ ok: true, added: rows.length });
});
