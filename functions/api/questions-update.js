// functions/api/questions-update.js —— 更新题目
// 修掉了最致命的一处：a 必须和 questions.js 的读取格式保持一致（JSON），否则整个题库接口 500
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';
import { toDbOpts, toDbAnswer } from '../_lib/db.js';

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const id = body.id;
  if (!id) throw new HttpError(400, '缺少 id');

  const q = String(body.q || '').trim();
  if (!q) throw new HttpError(400, '题干不能为空');

  const exists = await env.exam_db.prepare('SELECT id FROM questions WHERE id = ? AND user_id = ?')
    .bind(id, user).first();
  if (!exists) throw new HttpError(404, '题目不存在或不属于您');

  await env.exam_db.prepare(
    'UPDATE questions SET q = ?, opts = ?, a = ?, chapter = ?, subject = ? WHERE id = ? AND user_id = ?'
  ).bind(
    q,
    toDbOpts(body.opts),
    toDbAnswer(body.a),
    String(body.chapter || ''),
    String(body.subject || '默认题库'),
    id,
    user
  ).run();

  return json({ ok: true, message: '题目更新成功' });
});
