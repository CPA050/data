export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { user_id, q, opts, a, chapter, subject, user_choice } = body;

    if (!user_id || !q) {
      return Response.json({ ok: false, error: '缺少必要参数' }, { status: 400 });
    }

    // ★ 注意表名是 wrong_questions，并且加上了 subject 字段
    await env.exam_db.prepare(
      "INSERT INTO wrong_questions (user_id, q, opts, a, chapter, subject, user_choice) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      user_id, 
      q, 
      JSON.stringify(opts), 
      JSON.stringify(a), 
      chapter || '', 
      subject || '默认题库', 
      JSON.stringify(user_choice)
    ).run();

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
