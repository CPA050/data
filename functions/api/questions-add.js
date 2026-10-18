export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { user_id, q, opts, a, chapter, subject } = body;

    if (!user_id || !q) {
      return Response.json({ ok: false, error: '缺少必要参数' }, { status: 400 });
    }

    // ★ 必须用 env.exam_db
    await env.exam_db.prepare(
      "INSERT INTO questions (user_id, q, opts, a, chapter, subject) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(
      user_id, 
      q, 
      JSON.stringify(opts), 
      JSON.stringify(a), 
      chapter || '', 
      subject || '默认题库'
    ).run();

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
