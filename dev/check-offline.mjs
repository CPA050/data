// dev/check-offline.mjs —— 验证 PWA 离线可用：构建产物在断网后仍能打开首屏
// 用法：node dev/check-offline.mjs
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PORT = 5199;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
      let file = path.join(DIST, decodeURIComponent(url.pathname));
      if (url.pathname === '/') file = path.join(DIST, 'index.html');
      try {
        const buf = await readFile(file);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
        res.end(buf);
      } catch {
        // 单页应用回退
        try {
          const buf = await readFile(path.join(DIST, 'index.html'));
          res.writeHead(200, { 'Content-Type': MIME['.html'] });
          res.end(buf);
        } catch {
          res.writeHead(404).end('not found');
        }
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
};

const server = await startServer();
const browser = await chromium.launch({
  executablePath: EDGE,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.auth-card', { timeout: 15000 });

  const swReady = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return 'no-sw';
    const reg = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((r) => setTimeout(() => r(null), 15000))
    ]);
    return reg && reg.active ? 'active' : 'timeout';
  });
  check('Service Worker 已激活', swReady === 'active', String(swReady));

  // 等预缓存写入完成
  await page.evaluate(() => new Promise((r) => setTimeout(r, 1500)));

  const cached = await page.evaluate(async () => {
    const keys = await caches.keys();
    let count = 0;
    for (const k of keys) {
      const cache = await caches.open(k);
      count += (await cache.keys()).length;
    }
    return { caches: keys.length, entries: count };
  });
  check('预缓存条目 > 0', cached.entries > 0, `${cached.caches} 个缓存 / ${cached.entries} 条资源`);

  // 断网后重新打开
  await context.setOffline(true);
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.auth-card', { timeout: 15000 });
  const offlineTitle = await page.title();
  const offlineText = (await page.textContent('.auth-title')) || '';
  check('断网后首屏仍可打开', offlineTitle.length > 0, `title="${offlineTitle}"`);
  check('登录卡片离线渲染', offlineText.includes('原点') || offlineText.length > 0, offlineText.slice(0, 30));

  await context.setOffline(false);
  check('离线期间无 JS 崩溃', errors.length === 0, errors.slice(0, 2).join(' | '));
} finally {
  await browser.close();
  server.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n=== 离线自检：${results.length - failed.length} 通过 / ${failed.length} 失败 ===`);
process.exit(failed.length ? 1 : 0);
