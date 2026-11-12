// functions/api/questions-update.js —— 更新题目
// 1) a 必须和 questions.js 的读取格式保持一致（JSON），否则整个题库接口 500
// 2) 解析字段 explain 一起保存
// 3) 乐观锁：客户端带上它看到这题时的 updated_at，若已被别的设备改过就返回 409，
//    由前端决定「覆盖」还是「放弃」，避免两台设备各改一半互相覆盖。
import { route, json, readJson, HttpError } from '../_lib/http.js';
import { currentUser, assertSameUser } from '../_lib/session.js';
import { toDbOpts, toDbAnswer, normalizeRow } from '../_lib/db.js';

export const onRequestPost = route(async ({ request, env }) => {
  const user = await currentUser(request, env);
  const body = await readJson(request);
  assertSameUser(body.user_id, user);

  const id = body.id;
  if (!id) throw new HttpError(400, '缺少 id');

  const q = String(body.q || '').trim();
  if (!q) throw new HttpError(400, '题干不能为空');

  const exists = await env.exam_db
    .prepare('SELECT * FROM questions WHERE id = ? AND user_id = ?')
    .bind(id, user)
    .first();
  if (!exists) throw new HttpError(404, '题目不存在或不属于您');

  // 只在客户端显式带了 base_updated_at 时才校验（老客户端/脚本调用不带就不拦）
  const base = typeof body.base_updated_at === 'string' ? body.base_updated_at : '';
  const mine = String(exists.updated_at || '');
  if (base && mine && base !== mine && body.force !== true) {
    return json(
      {
        ok: false,
        success: false,
        conflict: true,
        message: '这道题在另一台设备上被改过',
        current: normalizeRow(exists),
      },
      409,
    );
  }

  await env.exam_db
    .prepare(
      'UPDATE questions SET q = ?, opts = ?, a = ?, chapter = ?, subject = ?, explain = ?, type = ?, updated_at = ? WHERE id = ? AND user_id = ?',
    )
    .bind(
      q,
      toDbOpts(body.opts),
      toDbAnswer(body.a),
      String(body.chapter || ''),
      String(body.subject || '默认题库'),
      String(body.explain || ''),
      String(body.type || ''),
      new Date().toISOString(),
      id,
      user,
    )
    .run();

  return json({ ok: true, message: '题目更新成功' });
});
