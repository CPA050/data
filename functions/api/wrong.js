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
        // 1. 从数据库中查询该用户的错题
        const { results } = await env.DB.prepare(
            "SELECT id, q, opts, a FROM wrong_questions WHERE user_id = ?"
        ).bind(userId).all();

        // 2. 核心转换：防止本地数据库存的 opts 格式异常导致报错
        const formattedResults = results.map(item => {
            let parsedOpts = [];
            try {
                parsedOpts = typeof item.opts === 'string' ? JSON.parse(item.opts) : item.opts;
            } catch (e) {
                // 如果解析失败，尝试按逗号切分，或者给个空数组保底，防止整页崩溃
                parsedOpts = typeof item.opts === 'string' ? item.opts.split(',') : [];
            }
            
            return {
                id: item.id,
                q: item.q,
                opts: parsedOpts,
                a: Number(item.a)
            };
        });

        return new Response(JSON.stringify(formattedResults), {
            headers: { 
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache" 
            }
        });

    } catch (err) {
        // 如果这里报错，会把具体的数据库错误吐给前端，方便调试
        return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
            status: 500,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
    }
}
