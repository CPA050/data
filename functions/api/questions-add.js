export async function onRequestPost({ request, env }) {
    const body = await request.json();
    const { user_id, q, opts, a } = body;
    if (!user_id || !q || !opts || a === undefined) {
        return Response.json({ error: "缺少必要参数 (user_id, q, opts, a)" }, { status: 400 });
    }
    try {
        await env.exam_db.prepare(
            "INSERT INTO questions (user_id, q, opts, a) VALUES (?, ?, ?, ?)"
        ).bind(user_id, q, JSON.stringify(opts), a).run();
        return Response.json({ ok: true, message: "题目添加成功" });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
