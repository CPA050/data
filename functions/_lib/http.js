// functions/_lib/http.js —— 统一响应格式 / 错误处理
export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

// 统一包一层：所有异常都变成 JSON，绝不把 stack 回传给客户端
export function route(handler) {
  return async function (context) {
    try {
      return await handler(context);
    } catch (err) {
      if (err instanceof HttpError) return json({ ok: false, success: false, error: err.message }, err.status);
      console.error('[api]', err && err.stack || err);
      return json({ ok: false, success: false, error: '服务器内部错误' }, 500);
    }
  };
}

export async function readJson(request) {
  try { return await request.json(); }
  catch { throw new HttpError(400, '请求体不是合法 JSON'); }
}
