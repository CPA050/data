export async function onRequestGet(context) {
    const { env } = context;
    const url = new URL(context.request.url);
    const userId = url.searchParams.get("user_id");
    if (!userId) {
        return new Response(JSON.stringify({ error: "缺少 user_id" }), { status: 400 });
    }
    try {
        const { results } = await env.exam_db.prepare(
            "SELECT id, q, opts, a FROM questions WHERE user_id = ? ORDER BY id"
        ).bind(userId).all();

        const formatted = results.map(item => ({
            id: item.id,
            q: item.q,
            opts: JSON.parse(item.opts || '[]'),
            a: item.a
        }));
        return new Response(JSON.stringify(formatted), {
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
