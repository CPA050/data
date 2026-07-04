export async function onRequestPost({ request, env }) {
    const body = await request.json();

    if (!body.user_id) {
        return Response.json({ error: "缺少 user_id" }, { status: 400 });
    }

    const userId = body.user_id;
    const question = body.q || body.question || '';
    let correctAnswer = body.a !== undefined ? String(body.a) : (body.correct_answer || '');
    let userAnswer = body.user_answer !== undefined ? String(body.user_answer) : '';

    // 如果传了 opts，将索引转为文本
    if (body.opts && Array.isArray(body.opts)) {
        const idx = parseInt(correctAnswer);
        if (!isNaN(idx) && idx >= 0 && idx < body.opts.length) {
            correctAnswer = body.opts[idx];
        }
        const uIdx = parseInt(userAnswer);
        if (!isNaN(uIdx) && uIdx >= 0 && uIdx < body.opts.length) {
            userAnswer = body.opts[uIdx];
        }
    }

    await env.exam_db.prepare(
        "INSERT INTO wrong_questions (user_id, question, correct_answer, user_answer) VALUES (?, ?, ?, ?)"
    ).bind(userId, question, correctAnswer, userAnswer).run();

    return Response.json({ ok: true });
}
