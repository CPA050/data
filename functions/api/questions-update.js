export async function onRequestPost({ request, env }) {
    const body = await request.json();
    const { user_id, id, q, opts, a } = body;
    if (!user_id || !id) {
        return Response.json({ error: "缺少 user_id 或 id" }, { status: 400 });
    }
    try {
        const check = await env.exam_db.prepare(
            "SELECT id FROM questions WHERE id = ? AND user_id = ?"
        ).bind(id, user_id).first();
        if (!check) {
            return Response.json({ error: "题目不存在或不属于您" }, { status: 404 });
        }
        await env.exam_db.prepare(
            "UPDATE questions SET q = ?, opts = ?, a = ? WHERE id = ? AND user_id = ?"
        ).bind(q, JSON.stringify(opts), a, id, user_id).run();
        return Response.json({ ok: true, message: "题目更新成功" });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
