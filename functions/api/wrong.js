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
        // 1. 从数据库中查询该用户的错题 (字段名必须与表结构一致)
        const { results } = await env.exam_db.prepare(
            "SELECT id, question, correct_answer, user_answer FROM wrong_questions WHERE user_id = ?"
        ).bind(userId).all();

        // 2. 核心转换：格式化输出给前端
        const formattedResults = results.map(item => {
            return {
                id: item.id,
                q: item.question,
                // 如果你的前端需要数组格式，可以在这里进行处理
                // 如果数据库里存的是纯文本，则直接赋值
                answer: item.correct_answer,
                user_choice: item.user_answer
            };
        });

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
