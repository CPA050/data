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
        // 🔧 改动1：用 SELECT * 避免字段名硬编码
        const { results } = await env.exam_db.prepare(
            "SELECT * FROM wrong_questions WHERE user_id = ?"
        ).bind(userId).all();

        // 如果没有数据，直接返回空数组
        if (!results || results.length === 0) {
            return new Response(JSON.stringify([]), {
                headers: { 
                    "Content-Type": "application/json;charset=UTF-8",
                    "Cache-Control": "no-cache" 
                }
            });
        }

        // 🔧 改动2：动态映射，兼容常见字段名
        const formattedResults = results.map(item => ({
            id: item.id,
            q: item.question || item.content || item.text || '',           // 题目
            answer: item.correct_answer || item.answer || item.correct || '', // 正确答案
            user_choice: item.user_answer || item.selected || item.user_choice || '' // 用户选择
        }));

        return new Response(JSON.stringify(formattedResults), {
            headers: { 
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache" 
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
            status: 500,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
    }
}
