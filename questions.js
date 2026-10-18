export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    // 新增接收 subject
    const { user_id, q, opts, a, chapter, subject } = body;

    if (!user_id || !q) {
      return new Response(JSON.stringify({ ok: false, error: '缺少必要参数' }), { status: 400 });
    }

    // 写入数据库，加上 subject 字段
    const stmt = env.DB.prepare(
      "INSERT INTO questions (user_id, q, opts, a, chapter, subject) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(
      user_id, 
      q, 
      JSON.stringify(opts), 
      JSON.stringify(a), 
      chapter || '', 
      subject || '默认题库'
    );
    
    await stmt.run();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
