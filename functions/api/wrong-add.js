// functions/api/wrong-add.js —— 记录一道错题
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';
import { toDbOpts, toDbAnswer, toDbChoice } from '../_lib/db.js';

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const q = String(body.q || '').trim();
  if (!q) throw new HttpError(400, '缺少题干 q');

  await env.exam_db.prepare(
    'INSERT INTO wrong_questions (user_id, q, opts, a, chapter, subject, user_choice) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    user, q, toDbOpts(body.opts), toDbAnswer(body.a),
    String(body.chapter || ''), String(body.subject || '默认题库'), toDbChoice(body.user_choice)
  ).run();

  return json({ ok: true, success: true });
});
