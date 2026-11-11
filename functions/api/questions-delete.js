// functions/api/questions-delete.js —— 批量删除题目
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const ids = Array.isArray(body.ids) ? body.ids : (body.id ? [body.id] : []);
  if (ids.length === 0) throw new HttpError(400, '缺少 ids');
  if (ids.length > 500) throw new HttpError(413, '一次最多删除 500 道题');

  const stmts = ids.map(id =>
    env.exam_db.prepare('DELETE FROM questions WHERE id = ? AND user_id = ?').bind(id, user));
  // 顺带清掉指向这些题的收藏，避免留下脏关联
  const favStmts = ids.map(id =>
    env.exam_db.prepare('DELETE FROM favorites WHERE question_id = ? AND user_id = ?').bind(id, user));

  const res = await env.exam_db.batch(stmts);
  await env.exam_db.batch(favStmts);
  const deleted = res.reduce((n, r) => n + (r.meta && r.meta.changes ? r.meta.changes : 0), 0);

  return json({ ok: true, deleted });
});
