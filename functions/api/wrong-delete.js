// functions/api/wrong-delete.js

export async function onRequestPost(context) {
    const { env } = context;
    
    try {
        const { user_id, id } = await context.request.json();

        // 校验：必须同时提供 user_id 和 id，防止越权删除
        if (!user_id || !id) {
            return new Response(JSON.stringify({ error: "缺少必要参数 (user_id 或 id)" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 🌟 核心：使用 user_id + id 双重校验，确保用户只能删除自己的错题
        // 假设数据库中的主键列名为 id
        const result = await env.exam_db.prepare(
            "DELETE FROM wrong_questions WHERE user_id = ? AND id = ?"
        ).bind(user_id, id).run();

        // 检查是否有行被删除
        if (result.meta.changes === 0) {
            return new Response(JSON.stringify({ success: false, message: "未找到该错题，可能已被删除。" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

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
