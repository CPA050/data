export async function onRequestPost(context) {
  const db = context.env.exam_db;

  const body = await context.request.json();

  const { question, correct_answer, user_answer } = body;

  await db.prepare(
    `INSERT INTO wrong_questions (question, correct_answer, user_answer)
     VALUES (?, ?, ?)`
  ).bind(question, correct_answer, user_answer).run();

  return Response.json({ ok: true });
}
