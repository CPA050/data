export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const user_id = url.searchParams.get('user_id');
    const subject = url.searchParams.get('subject');

    if (!user_id) {
      return new Response(JSON.stringify({ error: '缺少 user_id' }), { status: 400 });
    }

    let sql = "SELECT * FROM questions WHERE user_id = ?";
    let params = [user_id];

    if (subject) {
      sql += " AND subject = ?";
      params.push(subject);
    }

    const { results } = await env.DB.prepare(sql).bind(...params).all();

    const questions = results.map(row => ({
      ...row,
      opts: JSON.parse(row.opts),
      a: JSON.parse(row.a)
    }));

    return new Response(JSON.stringify(questions), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
