export async function onRequestPost({ request, env }) {
    const body = await request.json();
    // ✅ 修改点1：解构时加上 chapter（允许为空）
    const { user_id, q, opts, a, chapter } = body;

    if (!user_id || !q || !opts || a === undefined) {
        return Response.json({ error: "缺少必要参数 (user_id, q, opts, a)" }, { status: 400 });
    }

    try {
        // ✅ 修改点2：INSERT 加上 chapter 字段
        await env.exam_db.prepare(
            "INSERT INTO questions (user_id, q, opts, a, chapter) VALUES (?, ?, ?, ?, ?)"
        ).bind(
            user_id,
            q,
            JSON.stringify(opts),
            a,
            chapter || ''  // 如果没有传 chapter，存空字符串
        ).run();

        return Response.json({ ok: true, message: "题目添加成功" });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
