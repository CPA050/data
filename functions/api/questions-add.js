export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    // 接收前端传来的数组
    const { user_id, questions } = body;

    if (!user_id || !Array.isArray(questions) || questions.length === 0) {
      return Response.json({ ok: false, error: '参数错误' }, { status: 400 });
    }

    let totalInserted = 0;
    const BATCH_SIZE = 20; // 数据库每次最多同时插 20 题

    for (let i = 0; i < questions.length; i += BATCH_SIZE) {
      const batch = questions.slice(i, i + BATCH_SIZE);
      
      // 构造批量插入语句
      const statements = batch.map(item => 
        env.exam_db.prepare(
          "INSERT INTO questions (user_id, q, opts, a, chapter, subject) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(
          user_id, 
          item.q, 
          JSON.stringify(item.opts), 
          JSON.stringify(item.a), 
          item.chapter || '', 
          item.subject || '默认题库'
        )
      );
      
      // 使用 D1 的批量执行
      await env.exam_db.batch(statements);
      totalInserted += batch.length;
    }

    return Response.json({ ok: true, count: totalInserted });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
