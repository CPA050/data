export async function onRequestPost({ request, env }) {
    const db = env.exam_db;
    const body = await request.json();

    await db.prepare(
        "INSERT INTO wrong_questions (question, correct_answer, user_answer) VALUES (?, ?, ?)"
    ).bind(
        body.question,
        body.correct_answer,
        body.user_answer
    ).run();

    return Response.json({ ok: true });
}
