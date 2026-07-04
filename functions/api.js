export async function onRequestGet({ env }) {
  const db = env.exam_db;

  const result = await db.prepare(
    "SELECT * FROM wrong_questions ORDER BY id DESC"
  ).all();

  return Response.json(result.results);
}

export async function onRequestPost({ request, env }) {
  const db = env.exam_db;
  const body = await request.json();

  const { question, correct_answer, user_answer } = body;

  await db.prepare(
    "INSERT INTO wrong_questions (question, correct_answer, user_answer) VALUES (?, ?, ?)"
  ).bind(question, correct_answer, user_answer).run();

  return Response.json({ ok: true });
}
