// functions/api/wrong-delete.js —— 删除错题
// 修复：统一返回 {ok, success}，前端两种判断都能用；删除 0 条返回 404 而不是假装成功
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const ids = Array.isArray(body.ids) ? body.ids : (body.id ? [body.id] : []);
  if (ids.length === 0) throw new HttpError(400, '缺少 id');
  if (ids.length > 500) throw new HttpError(413, '一次最多删除 500 条');

  const res = await env.exam_db.batch(ids.map(id =>
    env.exam_db.prepare('DELETE FROM wrong_questions WHERE id = ? AND user_id = ?').bind(id, user)));
  const deleted = res.reduce((n, r) => n + (r.meta && r.meta.changes ? r.meta.changes : 0), 0);

  if (deleted === 0) throw new HttpError(404, '未找到该错题，可能已被删除');
  return json({ ok: true, success: true, deleted, message: `已删除 ${deleted} 条错题` });
});
