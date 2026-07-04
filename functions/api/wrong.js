export async function onRequestGet(context) {
  const db = context.env.exam_db;

  const { results } = await db.prepare(
    "SELECT * FROM wrong_questions ORDER BY id DESC"
  ).all();

  return Response.json(results);
}
