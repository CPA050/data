// functions/api/favorites-add.js —— 收藏题目
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const questionId = body.question_id;
  if (!questionId) throw new HttpError(400, '缺少 question_id');

  const exists = await env.exam_db.prepare('SELECT id FROM questions WHERE id = ? AND user_id = ?')
    .bind(questionId, user).first();
  if (!exists) throw new HttpError(404, '题目不存在或不属于您');

  await env.exam_db.prepare('INSERT OR IGNORE INTO favorites (user_id, question_id) VALUES (?, ?)')
    .bind(user, questionId).run();

  return json({ ok: true, success: true });
});
