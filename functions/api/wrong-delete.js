// functions/api/wrong-delete.js
export async function onRequestPost(context) {
    const { env } = context;
    
    try {
        const { user_id, id } = await context.request.json();

        if (!user_id || !id) {
            return new Response(JSON.stringify({ error: "缺少必要参数 (user_id 或 id)" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 双重校验：只能删除自己的错题
        const result = await env.exam_db.prepare(
            "DELETE FROM wrong_questions WHERE user_id = ? AND id = ?"
        ).bind(user_id, id).run();

        // 检查是否有行被删除
        const changes = result.meta?.changes ?? result.changes ?? 0;

        if (changes === 0) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: "未找到该错题，可能已被删除或不属于您。" 
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ 
            success: true, 
            message: "错题已成功消灭！" 
        }), {
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ 
            error: err.message,
            stack: err.stack 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
