// functions/_lib/rate.js —— 基于 D1 的固定窗口限流（跨 isolate 共享计数）
// 说明：如果线上库还没建 rate_limits 表，这里会降级为"不限流"并在日志里告警，
//       避免因为漏跑迁移把登录接口整挂。执行 schema.sql 之后限流自动生效。

let warned = false;

export async function consume(env, bucket, windowSeconds, limit) {
  try {
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - (now % windowSeconds);
    await env.exam_db.prepare(
      `INSERT INTO rate_limits (bucket, window_start, count) VALUES (?, ?, 1)
       ON CONFLICT(bucket) DO UPDATE SET
         count = CASE WHEN window_start = excluded.window_start THEN count + 1 ELSE 1 END,
         window_start = excluded.window_start`
    ).bind(bucket, windowStart).run();
    const row = await env.exam_db.prepare('SELECT count FROM rate_limits WHERE bucket = ?').bind(bucket).first();
    const count = row ? Number(row.count) : 0;
    return { allowed: count <= limit, count, limit };
  } catch (e) {
    if (!warned) {
      warned = true;
      console.warn('[rate] rate_limits 表不可用，已降级为不限流；请执行 schema.sql 建表。', e && e.message);
    }
    return { allowed: true, count: 0, limit, degraded: true };
  }
}

export function today() { return new Date().toISOString().slice(0, 10); }
