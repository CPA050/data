// dev/server.mjs —— 在 Node 里跑这个 Cloudflare Pages 站点（静态资源 + Pages Functions + D1）
// 用法：npm run dev            默认 8788 端口
//      PORT=9000 npm run dev
//      DB_FILE=./data/dev.db npm run dev   （把数据落到文件，不传就是内存库）
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { D1Shim } from './d1.mjs';
import { seed } from './seed.mjs';
import { migrate } from './migrate.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 8788);

// 记录对智谱的真实调用次数（测试用来断言配额生效）
export const stats = { aiCalls: 0 };

const db = new D1Shim(process.env.DB_FILE || ':memory:');
// 与线上同一份 migrations/*.sql，本地不再单独维护 schema.sql
await migrate(db, undefined, { quiet: true });
await seed(db);

// 拦截对 AI 上游（DeepSeek / 智谱）的调用：本地不烧真 key，返回固定内容；真实部署由 Cloudflare 出网
const realFetch = globalThis.fetch;
const AI_HOSTS = ['open.bigmodel.cn', 'api.deepseek.com'];
globalThis.fetch = async (input, init = {}) => {
  const url = typeof input === 'string' ? input : input.url;
  if (AI_HOSTS.some((h) => url.includes(h))) {
    stats.aiCalls++;
    const body = JSON.parse(init.body || '{}');
    const sys = JSON.stringify(body.messages || '');
    const isGrade = sys.includes('阅卷老师');
    const isClassify = sys.includes('题库整理助手');
    const isExtract = sys.includes('题目提取助手');
    let content = '1. 【考点定位】模拟解析\n2. 【解析】这是一条本地开发用的假数据。';
    if (isGrade) content = '得分';
    if (isClassify) content = '{"subject":"一建建筑","chapter":"建筑材料"}';
    if (isExtract) {
      content = JSON.stringify([
        { q: '普通硅酸盐水泥的初凝时间不得早于？', opts: ['A. 45min', 'B. 60min', 'C. 90min', 'D. 30min'], a: 0, chapter: '建筑材料', subject: '一建建筑' },
      ]);
    }
    stats.aiLastBody = body;

    // 流式：按字符切片模拟上游 SSE，顺便验证客户端的增量解析
    if (body.stream === true) {
      const encoder = new TextEncoder();
      const chunks = content.match(/[\s\S]{1,6}/g) || [];
      const stream = new ReadableStream({
        async start(controller) {
          for (const piece of chunks) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: piece } }] })}\n\n`));
            await new Promise(r => setTimeout(r, 2));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      });
      return new Response(stream, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
    }

    return new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return realFetch(input, init);
};

export const env = {
  exam_db: db,
  // 本地默认走 DeepSeek（与线上一致），只给一个假 key；图片识别会自动回落到智谱
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || 'dev-fake-deepseek-key',
  ZAI_API_KEY: process.env.ZAI_API_KEY || 'dev-fake-zai-key',
  AUTH_SECRET: process.env.AUTH_SECRET || 'dev-only-insecure-secret-change-me'
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8'
};

const modCache = new Map();
async function loadFunction(name) {
  if (!/^[a-z0-9-]+$/i.test(name)) return null;
  const file = path.join(ROOT, 'functions', 'api', `${name}.js`);
  const st = await stat(file).catch(() => null);
  if (!st) return null;
  const key = `${file}:${Math.round(st.mtimeMs)}`;
  if (!modCache.has(key)) modCache.set(key, import(pathToFileURL(file).href + '?t=' + Math.round(st.mtimeMs)));
  return modCache.get(key);
}

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return Buffer.concat(chunks);
}

export const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) {
      const name = url.pathname.slice(5).replace(/\/+$/, '');
      const mod = await loadFunction(name);
      if (!mod) { res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' }); return res.end(JSON.stringify({ ok: false, error: '接口不存在' })); }

      const handler = req.method === 'GET' ? mod.onRequestGet
        : req.method === 'POST' ? mod.onRequestPost
          : (mod.onRequest || mod.onRequestGet || mod.onRequestPost);
      if (!handler) { res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8' }); return res.end(JSON.stringify({ ok: false, error: '方法不允许' })); }

      const bodyBuf = await readBody(req);
      const request = new Request(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: ['GET', 'HEAD'].includes(req.method) ? undefined : bodyBuf
      });
      const resp = await handler({ request, env, params: {}, data: {}, next: async () => new Response('', { status: 404 }) });
      const out = resp instanceof Response ? resp : new Response(String(resp));
      res.writeHead(out.status || 200, Object.fromEntries(out.headers));
      res.end(Buffer.from(await out.arrayBuffer()));
      return;
    }

    let p = path.join(ROOT, decodeURIComponent(url.pathname));
    if (!p.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
    let st = await stat(p).catch(() => null);
    if (st && st.isDirectory()) { p = path.join(p, 'index.html'); st = await stat(p).catch(() => null); }
    if (!st) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('404 Not Found'); }
    const buf = await readFile(p);
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(p).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': p.endsWith('.html') ? 'no-cache' : 'public, max-age=600'
    });
    res.end(buf);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: '服务器内部错误' }));
    console.error('[dev]', e);
  }
});

export { db };

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  server.listen(PORT, () => {
    console.log(`\n  原点 · Origin 已启动`);
    console.log(`  本地地址: http://127.0.0.1:${PORT}`);
    console.log(`  演示账号: alice / 123456   （也可以自己注册新账号）`);
    console.log(`  数据库  : ${process.env.DB_FILE || '内存（重启即清空）'}\n`);
  });
}
