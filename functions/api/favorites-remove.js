// functions/api/favorites-remove.js —— 取消收藏
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const questionId = body.question_id;
  if (!questionId) throw new HttpError(400, '缺少 question_id');

  await env.exam_db.prepare('DELETE FROM favorites WHERE user_id = ? AND question_id = ?')
    .bind(user, questionId).run();

  return json({ ok: true, success: true });
});
