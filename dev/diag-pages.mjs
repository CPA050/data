import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';

const ROOT = process.cwd();
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const DB = path.join(os.tmpdir(), `oq-pages-${Date.now()}.db`);
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
  viewport: { width: Number(process.env.WIDTH || 390), height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
});
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

const server = start(process.execPath, ['dev/server.mjs'], { DB_FILE: DB });
const vite = start(process.execPath, ['node_modules/vite/bin/vite.js', '--port', '5173', '--strictPort']);
try {
  await waitPort(8788, '127.0.0.1');
  await waitPort(5173, 'localhost');

  const user = `pg_${Date.now().toString(36)}`;
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
    const long = 'UnnecessarilyLongEnglishWordThatCannotBreakNaturally';
    const qs = [
      {
        q: `超长题干测试：请阅读 www.example.com/a/very/long/url?with=query&and=更多参数&more=参数 并判断（　）`,
        opts: [
          `A. 包含长单词 ${long} 的选项文字`,
          'B. 正常选项',
          'C. 正常选项三',
          'D. 正常选项四',
        ],
        a: 0,
        chapter: '这是一段很长很长的章节名称，用来测试在题目卡片与题库列表里是否会自动换行而不是顶出边框外',
        subject: '工程测量员培训班超长科目名称测试',
        type: 'single',
      },
      {
        q: '第二题（多选）：下列哪些说法正确？',
        opts: ['A. 甲说法', 'B. 乙说法', 'C. 丙说法', 'D. 丁说法', 'E. 戊说法'],
        a: [0, 2, 4],
        chapter: '多选章节',
        subject: '工程测量员培训班超长科目名称测试',
        type: 'multi',
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

  const scan = async () =>
    page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        if (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowX === 'hidden') continue;
        if (el.scrollWidth > el.clientWidth + 1) {
          bad.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className || '').toString().slice(0, 44),
            scroll: el.scrollWidth,
            client: el.clientWidth,
            text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 46),
          });
        }
      }
      return bad.slice(0, 10);
    });

  const tabs = ['home', 'bank', 'wrong', 'fav', 'me'];
  for (const t of tabs) {
    await page.click(`.tabbar [data-act="tab"][data-tab="${t}"], .tabbar [data-tab="${t}"]`).catch(() => {});
    await page.waitForTimeout(500);
    out[t] = await scan();
    await page.screenshot({ path: `${SHOT}/scan-${t}.png` });
  }

  // 答题页（单选 + 多选）
  await page.click('.tabbar [data-tab="home"]').catch(() => {});
  await page.waitForTimeout(300);
  await page.click('[data-act="random"]');
  await page.waitForSelector('.quiz [data-act="exit"]', { timeout: 10000 });
  await page.waitForTimeout(400);
  out.quiz = await scan();
  out.quizFoot = await page.evaluate(() => [...document.querySelectorAll('.quiz-foot .btn')].map((b) => b.textContent.trim()));

  // 点查看答案（未选）
  await page.click('.quiz-foot .btn-primary');
  await page.waitForTimeout(350);
  out.afterReveal = await page.evaluate(() => ({
    verdict: document.querySelector('.answer-panel .ai-title')?.textContent.trim(),
    panels: document.querySelectorAll('.answer-panel').length,
  }));
  out.quizAnswered = await scan();
  await page.screenshot({ path: `${SHOT}/scan-quiz.png`, fullPage: true });

  out.errors = errors;
  console.log(JSON.stringify(out, null, 1));
} finally {
  await browser.close();
  server.kill();
  vite.kill();
}
