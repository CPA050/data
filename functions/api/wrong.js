// functions/api/wrong.js —— 错题列表
// 修复：① 返回 user_choice（原来写死为空字符串，前端"你的选择"永远显示未记录）
//       ② 返回 chapter / subject / created_at（原来只查了 4 个字段）
//       ③ 多选题 a 是数组时 answer 能正确格式化，不再是空字符串
//       ④ 错误响应不再泄露 stack
import { route, json } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';
import { normalizeOpts, normalizeAnswer, formatChoice } from '../_lib/db.js';

export const onRequestGet = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const url = new URL(request.url);
  assertSameUser(url.searchParams.get('user_id'), user);

  const { results } = await env.exam_db.prepare(
    'SELECT id, q, opts, a, chapter, subject, user_choice, created_at FROM wrong_questions WHERE user_id = ? ORDER BY created_at DESC, id DESC'
  ).bind(user).all();

  const formatted = results.map(row => {
    const opts = normalizeOpts(row.opts);
    const a = normalizeAnswer(row.a);
    return {
      id: row.id,
      q: row.q,
      opts,
      a,
      answer: formatChoice(a, opts),
      user_choice: row.user_choice || '',
      user_choice_text: formatChoice(row.user_choice, opts),
      chapter: row.chapter || '',
      subject: row.subject || '默认题库',
      created_at: row.created_at
    };
  });

  return json(formatted);
});
