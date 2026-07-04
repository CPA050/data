// functions/api/wrong-add.js
export async function onRequestPost({ request, env }) {
    const body = await request.json();

    if (!body.user_id) {
        return Response.json({ error: "缺少 user_id" }, { status: 400 });
    }

    if (!body.q) {
        return Response.json({ error: "缺少题目内容 q" }, { status: 400 });
    }

    try {
        const userId = body.user_id;
        const q = body.q;
        const opts = body.opts || [];
        const a = body.a !== undefined ? body.a : 0;

        // 插入到你现有的表中
        await env.exam_db.prepare(
            "INSERT INTO wrong_questions (user_id, q, opts, a) VALUES (?, ?, ?, ?)"
        ).bind(
            userId,
            q,
            JSON.stringify(opts),
            a
        ).run();

        return Response.json({ ok: true, message: "错题已记录" });

    } catch (err) {
        return Response.json({ 
            error: err.message,
            stack: err.stack 
        }, { status: 500 });
    }
}
