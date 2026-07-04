export async function onRequestPost({ request, env }) {
    const db = env.exam_db; // 确保绑定名称与你在Cloudflare设置的一致
    const body = await request.json();

    // 必须确保 body 中包含 user_id
    if (!body.user_id) {
        return Response.json({ error: "缺少 user_id" }, { status: 400 });
    }

    await db.prepare(
        "INSERT INTO wrong_questions (user_id, question, correct_answer, user_answer) VALUES (?, ?, ?, ?)"
    ).bind(
        body.user_id,         // 存入当前账号
        body.question,
        body.correct_answer,
        body.user_answer
    ).run();

    return Response.json({ ok: true });
}
