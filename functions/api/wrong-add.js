export async function onRequestPost({ request, env }) {
    const db = env.exam_db;
    const body = await request.json();

    // 1. 验证 user_id
    if (!body.user_id) {
        return Response.json({ error: "缺少 user_id" }, { status: 400 });
    }

    // 2. 验证必填字段（至少要有题目内容）
    if (!body.q && !body.question) {
        return Response.json({ error: "缺少题目内容" }, { status: 400 });
    }

    try {
        // 3. 兼容前端传来的不同字段名
        //    前端可能传: { q, opts, a, user_id } 或 { question, correct_answer, user_answer, user_id }
        const userId = body.user_id;
        const question = body.q || body.question || '';           // 题目
        const correctAnswer = body.a !== undefined ? String(body.a) : (body.correct_answer || '');  // 正确答案索引或文本
        const userAnswer = body.user_answer !== undefined ? String(body.user_answer) : '';          // 用户选择的答案

        // 4. 如果 correctAnswer 是数字（选项索引），转换为文本（可选）
        //    这取决于你的数据库设计，如果你想存文本，可以转换
        //    例如：如果 body.opts 存在，用 opts[correctAnswer] 获取文本
        let finalCorrectAnswer = correctAnswer;
        if (body.opts && Array.isArray(body.opts) && !isNaN(correctAnswer)) {
            const idx = parseInt(correctAnswer);
            if (idx >= 0 && idx < body.opts.length) {
                finalCorrectAnswer = body.opts[idx];
            }
        }

        let finalUserAnswer = userAnswer;
        if (body.opts && Array.isArray(body.opts) && !isNaN(userAnswer)) {
            const idx = parseInt(userAnswer);
            if (idx >= 0 && idx < body.opts.length) {
                finalUserAnswer = body.opts[idx];
            }
        }

        // 5. 插入数据库（使用兼容后的字段名）
        await db.prepare(
            "INSERT INTO wrong_questions (user_id, question, correct_answer, user_answer) VALUES (?, ?, ?, ?)"
        ).bind(
            userId,
            question,
            finalCorrectAnswer,
            finalUserAnswer
        ).run();

        return Response.json({ ok: true });

    } catch (err) {
        return Response.json({ 
            error: "数据库操作失败", 
            details: err.message 
        }, { status: 500 });
    }
}
