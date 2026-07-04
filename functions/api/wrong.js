// functions/api/wrong.js
export async function onRequestGet(context) {
    const { env } = context;
    const url = new URL(context.request.url);
    const userId = url.searchParams.get("user_id");

    if (!userId) {
        return new Response(JSON.stringify({ error: "缺少 user_id 参数" }), {
            status: 400,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
    }

    try {
        // 查询该用户的所有错题
        const { results } = await env.exam_db.prepare(
            "SELECT id, q, opts, a FROM wrong_questions WHERE user_id = ? ORDER BY created_at DESC"
        ).bind(userId).all();

        // 格式化输出给前端
        const formattedResults = results.map(item => {
            let optsArray = [];
            try {
                optsArray = JSON.parse(item.opts || '[]');
            } catch (e) {
                optsArray = [];
            }
            return {
                id: item.id,
                q: item.q,
                answer: optsArray[item.a] || '',
                user_choice: '', // 你的表没有存用户选择，留空
                opts: optsArray
            };
        });

        return new Response(JSON.stringify(formattedResults), {
            headers: { 
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache" 
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({ 
            error: err.message, 
            stack: err.stack 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
    }
}
