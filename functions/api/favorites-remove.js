export async function onRequestPost({ request, env }) {
    const { user_id, question_id } = await request.json();

    if (!user_id || !question_id) {
        return Response.json({ error: "缺少 user_id 或 question_id" }, { status: 400 });
    }

    try {
        await env.exam_db.prepare(
            "DELETE FROM favorites WHERE user_id = ? AND question_id = ?"
        ).bind(user_id, question_id).run();

        return Response.json({ ok: true, message: "已取消收藏" });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
