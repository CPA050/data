export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    // 接收要删除的 id 数组
    const { user_id, ids } = body;

    if (!user_id || !Array.isArray(ids) || ids.length === 0) {
      return Response.json({ error: '参数错误' }, { status: 400 });
    }

    // 构造批量删除语句
    const statements = ids.map(id => 
      env.exam_db.prepare("DELETE FROM questions WHERE id = ? AND user_id = ?").bind(id, user_id)
    );
    
    // 批量执行
    await env.exam_db.batch(statements);

    return Response.json({ ok: true, count: ids.length });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
