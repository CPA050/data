export async function onRequestPost({ request, env }) {
    const { user_id, id } = await request.json();
    if (!user_id || !id) {
        return Response.json({ error: "缺少 user_id 或 id" }, { status: 400 });
    }
    try {
        const result = await env.exam_db.prepare(
            "DELETE FROM questions WHERE id = ? AND user_id = ?"
        ).bind(id, user_id).run();
        const changes = result.meta?.changes ?? result.changes ?? 0;
        if (changes === 0) {
            return Response.json({ error: "题目不存在或不属于您" }, { status: 404 });
        }
        return Response.json({ ok: true, message: "题目删除成功" });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
