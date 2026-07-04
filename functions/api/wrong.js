export async function onRequestGet({ env }) {
    const db = env.exam_db;

    const data = await db.prepare(
        "SELECT * FROM wrong_questions ORDER BY id DESC"
    ).all();

    return Response.json(data.results);
}
