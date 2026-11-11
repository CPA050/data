// functions/api/questions.js —— 读取题库（需登录，且只能读自己）
import { route, json } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';
import { normalizeRow } from '../_lib/db.js';

export const onRequestGet = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const url = new URL(request.url);
  assertSameUser(url.searchParams.get('user_id'), user);

  const subject = url.searchParams.get('subject');
  let sql = 'SELECT * FROM questions WHERE user_id = ?';
  const params = [user];
  if (subject) { sql += ' AND subject = ?'; params.push(subject); }
  sql += ' ORDER BY id ASC';

  const { results } = await env.exam_db.prepare(sql).bind(...params).all();
  return json(results.map(normalizeRow));
});
