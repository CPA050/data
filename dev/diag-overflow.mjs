import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';

const ROOT = process.cwd();
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const DB = path.join(os.tmpdir(), `oq-diag-${Date.now()}.db`);
const SHOT = 'C:/Users/cpa/Desktop/dsh/repo/screens';

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

const errors = [];
const out = {};
const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
});
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`);
});

const server = start(process.execPath, ['dev/server.mjs'], { DB_FILE: DB });
const vite = start(process.execPath, ['node_modules/vite/bin/vite.js', '--port', '5173', '--strictPort']);
try {
  await waitPort(8788, '127.0.0.1');
  await waitPort(5173, 'localhost');

  const user = `dg_${Date.now().toString(36)}`;
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[name="username"]', { timeout: 15000 });
  await page.fill('input[name="username"]', user);
  await page.click('.auth-card button[type="submit"], form button');
  await page.waitForSelector('input[name="confirm"]', { timeout: 10000 });
  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm"]', '123456');
  await page.click('.auth-card button[type="submit"], form button');
  await page.waitForSelector('.tabbar', { timeout: 10000 });

  await page.evaluate(async () => {
    const token = localStorage.getItem('oq:oq:token');
    const qs = [
      {
        q: 'www.example.com/very/long/path/without/any/space/that/should/wrap/inside/the/box/please/check/it',
        opts: [
          'A. 一个包含超长英文单词 UnnecessarilyLongEnglishWordThatCannotBreakNaturally 的选项',
          'B. 正常选项',
          'C. 另一个正常选项',
          'D. 还有一个正常选项',
        ],
        a: 0,
        chapter: '超长章节名称测试用这一行文字长度明显超过一行的宽度需要自动换行而不能超出边框',
        subject: '工程测量员培训班',
        type: 'single',
      },
    ];
    await fetch('/api/questions-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ questions: qs }),
    });
  });

  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.tabbar', { timeout: 10000 });
  await page.click('[data-act="random"]');
  await page.waitForSelector('.quiz [data-act="exit"]', { timeout: 10000 });
  await page.waitForTimeout(400);

  // A. 不选答案，直接点「查看答案」
  const beforeSubmit = await page.evaluate(() => ({
    panels: document.querySelectorAll('.answer-panel').length,
    foot: [...document.querySelectorAll('.quiz-foot .btn')].map((b) => b.textContent.trim()),
  }));
  await page.click('.quiz-foot .btn-primary');
  await page.waitForTimeout(350);
  const afterSubmit = await page.evaluate(() => ({
    panels: document.querySelectorAll('.answer-panel').length,
    verdict: document.querySelector('.answer-panel .ai-title')?.textContent.trim(),
    panelText: document.querySelector('.answer-panel')?.textContent.replace(/\s+/g, ' ').trim().slice(0, 80),
    foot: [...document.querySelectorAll('.quiz-foot .btn')].map((b) => b.textContent.trim()),
    toast: document.querySelector('.toast')?.textContent.trim() ?? null,
  }));
  out.reveal = { beforeSubmit, afterSubmit };
  await page.screenshot({ path: `${SHOT}/diag-reveal.png` });

  // B. 扫描横向溢出：scrollWidth 超过 clientWidth 的元素
  out.overflow = await page.evaluate(() => {
    const bad = [];
    const root = document.querySelector('.quiz') ?? document.body;
    for (const el of root.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.overflowX === 'auto' || cs.overflowX === 'scroll') continue;
      if (el.scrollWidth > el.clientWidth + 1) {
        bad.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 40),
          scroll: el.scrollWidth,
          client: el.clientWidth,
          text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
        });
      }
    }
    // 文本节点是否越出父框
    const overText = [];
    for (const el of root.querySelectorAll('.opt, .q-text, .q-sub, .answer-panel, .q-card')) {
      const r = el.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(el);
      const rr = range.getBoundingClientRect();
      if (rr.right > r.right + 1 || rr.left < r.left - 1) {
        overText.push({ cls: el.className.toString().slice(0, 30), elRight: Math.round(r.right), textRight: Math.round(rr.right) });
      }
    }
    return { bad: bad.slice(0, 12), overText };
  });
  await page.screenshot({ path: `${SHOT}/diag-overflow.png`, fullPage: true });
  out.errors = errors;
  console.log(JSON.stringify(out, null, 1));
} finally {
  await browser.close();
  server.kill();
  vite.kill();
}
