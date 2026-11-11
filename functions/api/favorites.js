// functions/api/favorites.js —— 收藏列表
// 修复：a/opts 与 questions.js 用同一套解析（原来原样返回 JSON 字符串，前端形状不一致）
import { route, json } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';
import { normalizeOpts, normalizeAnswer } from '../_lib/db.js';

export const onRequestGet = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const url = new URL(request.url);
  assertSameUser(url.searchParams.get('user_id'), user);

  const { results } = await env.exam_db.prepare(
    `SELECT q.id, q.q, q.opts, q.a, q.chapter, q.subject, f.created_at AS fav_at
       FROM favorites f JOIN questions q ON f.question_id = q.id
      WHERE f.user_id = ? ORDER BY f.created_at DESC`
  ).bind(user).all();

  return json(results.map(r => ({
    id: r.id,
    q: r.q,
    opts: normalizeOpts(r.opts),
    a: normalizeAnswer(r.a),
    chapter: r.chapter || '',
    subject: r.subject || '默认题库',
    created_at: r.fav_at
  })));
});
