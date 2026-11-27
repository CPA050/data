import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';

const ROOT = process.cwd();
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const DB = path.join(os.tmpdir(), `oq-upd-${Date.now()}.db`);

function start(cmd, args, env = {}) {
  const p = spawn(cmd, args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: 'ignore' });
  p.unref?.();
  return p;
}
async function waitPort(port, host = 'localhost', timeoutMs = 20000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try {
      const r = await fetch(`http://${host}:${port}/`);
      if (r.status < 500) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`port ${port} 没起来`);
}

const out = {};
const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const server = start(process.execPath, ['dev/server.mjs'], { DB_FILE: DB });
const vite = start(process.execPath, ['node_modules/vite/bin/vite.js', '--port', '5173', '--strictPort']);
try {
  await waitPort(8788, '127.0.0.1');
  await waitPort(5173, 'localhost');

  const user = `up_${Date.now().toString(36)}`;
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[name="username"]', { timeout: 15000 });
  await page.fill('input[name="username"]', user);
  await page.click('.auth-card button[type="submit"], form button');
  await page.waitForSelector('input[name="confirm"]', { timeout: 10000 });
  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm"]', '123456');
  await page.click('.auth-card button[type="submit"], form button');
  await page.waitForSelector('.tabbar', { timeout: 10000 });
  out.barWithoutNewVersion = await page.evaluate(() => document.querySelectorAll('.update-bar').length);

  // 模拟"线上已经是另一版构建"
  await page.route(/\/version\.json/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ build: '1999-01-01 00:00' }) }),
  );
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.tabbar', { timeout: 10000 });
  await page.waitForTimeout(2200);
  out.barWithNewVersion = await page.evaluate(() => {
    const bar = document.querySelector('.update-bar');
    return bar ? { text: bar.textContent.trim(), z: getComputedStyle(bar).zIndex, visible: bar.getBoundingClientRect().height > 0 } : null;
  });
  await page.screenshot({ path: 'C:/Users/cpa/Desktop/dsh/repo/screens/diag-updatebar.png' });
  console.log(JSON.stringify(out, null, 1));
} finally {
  await browser.close();
  server.kill();
  vite.kill();
}
