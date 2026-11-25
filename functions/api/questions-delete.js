// functions/api/questions-delete.js —— 批量删除题目
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const ids = Array.isArray(body.ids) ? body.ids : (body.id ? [body.id] : []);
  if (ids.length === 0) throw new HttpError(400, '缺少 ids');
  if (ids.length > 5000) throw new HttpError(413, '一次最多删除 5000 道题');

  let deleted = 0;
  // 每 100 条一批，避免单次 batch 过大拖垮请求（"删除整个学科"就是走这里）
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const stmts = chunk.map(id =>
      env.exam_db.prepare('DELETE FROM questions WHERE id = ? AND user_id = ?').bind(id, user));
    // 顺带清掉指向这些题的收藏，避免留下脏关联
    const favStmts = chunk.map(id =>
      env.exam_db.prepare('DELETE FROM favorites WHERE question_id = ? AND user_id = ?').bind(id, user));

    const res = await env.exam_db.batch(stmts);
    await env.exam_db.batch(favStmts);
    deleted += res.reduce((n, r) => n + (r.meta && r.meta.changes ? r.meta.changes : 0), 0);
  }

  return json({ ok: true, deleted });
});
