// functions/api/wrong-delete.js
export async function onRequestPost(context) {
    const { env } = context;
    
    try {
        const { user_id, q } = await context.request.json();

        if (!user_id || !q) {
            return new Response(JSON.stringify({ error: "缺少必要参数" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 🌟 从云端数据库中抹除该用户对应的这道错题
        await env.DB.prepare(
            "DELETE FROM wrong_questions WHERE user_id = ? AND q = ?"
        ).bind(user_id, q).run();

        return new Response(JSON.stringify({ success: true, message: "错题已成功消灭！" }), {
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
