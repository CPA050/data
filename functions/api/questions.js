export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const user_id = url.searchParams.get('user_id');
    const subject = url.searchParams.get('subject'); 

    if (!user_id) {
      return Response.json({ error: '缺少 user_id' }, { status: 400 });
    }

    let sql = "SELECT * FROM questions WHERE user_id = ?";
    let params = [user_id];

    if (subject) {
      sql += " AND subject = ?";
      params.push(subject);
    }

    // ★ 必须用 env.exam_db
    const { results } = await env.exam_db.prepare(sql).bind(...params).all();

    const questions = results.map(row => ({
      ...row,
      opts: JSON.parse(row.opts),
      a: JSON.parse(row.a)
    }));

    return Response.json(questions);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
