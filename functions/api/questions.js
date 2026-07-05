// functions/api/questions.js
export async function onRequestGet(context) {
    const { env } = context;
    const url = new URL(context.request.url);
    const userId = url.searchParams.get("user_id");
    const chaptersParam = url.searchParams.get("chapters");

    if (!userId) {
        return new Response(JSON.stringify({ error: "缺少 user_id" }), { status: 400 });
    }

    try {
        let sql = "SELECT id, q, opts, a, chapter FROM questions WHERE user_id = ?";
        let params = [userId];

        if (chaptersParam && chaptersParam.trim() !== '') {
            const chapters = decodeURIComponent(chaptersParam).split(',').filter(c => c.trim() !== '');
            if (chapters.length > 0) {
                const placeholders = chapters.map(() => '?').join(',');
                sql += ` AND chapter IN (${placeholders})`;
                params.push(...chapters);
            }
        }

        sql += " ORDER BY id";

        const { results } = await env.exam_db.prepare(sql).bind(...params).all();

        const formatted = results.map(item => ({
            id: item.id,
            q: item.q,
            opts: JSON.parse(item.opts || '[]'),
            a: item.a,
            chapter: item.chapter || null
        }));

        // 获取所有章节列表
        const allChaptersRes = await env.exam_db.prepare(
            "SELECT DISTINCT chapter FROM questions WHERE user_id = ? ORDER BY chapter"
        ).bind(userId).all();
        const allChapters = allChaptersRes.results
            .map(row => row.chapter)
            .filter(c => c && c !== '其他');

        return new Response(JSON.stringify({
            questions: formatted,
            total: formatted.length,
            chapters: allChapters
        }), {
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
