import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';

const ROOT = process.cwd();
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const DB = path.join(os.tmpdir(), `oq-quizui-${Date.now()}.db`);
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
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });

const server = start(process.execPath, ['dev/server.mjs'], { DB_FILE: DB });
const vite = start(process.execPath, ['node_modules/vite/bin/vite.js', '--port', '5173', '--strictPort']);
try {
  await waitPort(8788, '127.0.0.1');
  await waitPort(5173, 'localhost');

  const user = `qz_${Date.now().toString(36)}`;
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
    const longChapter = '复习题（单选和判断）——超长章节名用来验证不溢出方框';
    const qs = [1, 2, 3].map((n) => ({
      q: `自检第 ${n} 题：GPS 动态测量中，基准站需满足（　）条件`,
      opts: ['A. 长期稳定', 'B. 高精度已知点', 'C. 观测时间≥20分钟', 'D. 以上均需'],
      a: 3,
      chapter: longChapter,
      subject: '工程测量员培训班',
      type: 'single',
    }));
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

  // 1. 结构：题号/题型横排、标签不溢出、工具按钮是文字、底部三键
  const layout = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const no = q('.q-no');
    const type = q('.q-type');
    const sub = q('.q-sub');
    const tools = [...document.querySelectorAll('.tool-btn')].map((b) => b.textContent.trim());
    const foot = [...document.querySelectorAll('.quiz-foot .btn')].map((b) => b.textContent.trim());
    const typeBox = type?.getBoundingClientRect();
    return {
      noText: no?.textContent.trim(),
      typeText: type?.textContent.trim(),
      typeWide: typeBox ? Math.round(typeBox.width) : 0,
      typeTall: typeBox ? Math.round(typeBox.height) : 0,
      subOverflow: sub ? sub.scrollWidth > sub.clientWidth + 1 : null,
      subText: sub?.textContent.trim().slice(0, 12),
      cardOverflow: (() => {
        const card = q('.q-card');
        return card ? card.scrollWidth > card.clientWidth + 1 : null;
      })(),
      tools,
      foot,
      fab: document.querySelectorAll('.fab').length,
    };
  });
  out.layout = layout;
  await page.screenshot({ path: `${SHOT}/q-ui-1-first.png` });

  // 2. 左滑切到下一题（合成 touch 序列）
  const swipeTo = async (dir) => {
    await page.evaluate((d) => {
      const body = document.querySelector('.quiz-body');
      const x0 = 195 - d * 90;
      const seq = [
        ['touchstart', x0],
        ['touchmove', x0 + d * 40],
        ['touchmove', x0 + d * 120],
        ['touchend', x0 + d * 160],
      ];
      for (const [type, x] of seq) {
        const t = new Touch({ identifier: 1, target: body, clientX: x, clientY: 420 });
        body.dispatchEvent(new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          touches: type === 'touchend' ? [] : [t],
          targetTouches: type === 'touchend' ? [] : [t],
          changedTouches: [t],
        }));
      }
    }, dir);
    await page.waitForTimeout(420);
  };

  await swipeTo(-1);
  out.afterSwipeLeft = await page.$eval('.q-no', (el) => el.textContent.trim());
  await page.screenshot({ path: `${SHOT}/q-ui-2-swiped.png` });

  // 3. 右滑回到上一题
  await swipeTo(1);
  out.afterSwipeRight = await page.$eval('.q-no', (el) => el.textContent.trim());

  // 4. 「跳过」按钮真能跳到下一题（不判分）
  await page.click('[data-act="skip"]');
  await page.waitForTimeout(250);
  out.afterSkip = await page.$eval('.q-no', (el) => el.textContent.trim());
  out.skipKeptAnswerPanel = await page.$$eval('.answer-panel', (n) => n.length);

  // 5. 「上一题」按钮
  await page.click('[data-act="prev"]');
  await page.waitForTimeout(250);
  out.afterPrev = await page.$eval('.q-no', (el) => el.textContent.trim());

  // 6. 答一题看判分后底部变成「下一题」
  await page.click('.opt[data-act="pick"]');
  await page.waitForTimeout(900);
  out.footAfterAnswer = await page.$$eval('.quiz-foot .btn', (n) => n.map((b) => b.textContent.trim()));
  await page.screenshot({ path: `${SHOT}/q-ui-3-answered.png` });

  out.errors = errors;
  console.log(JSON.stringify(out, null, 1));
} finally {
  await browser.close().catch(() => {});
  try { process.kill(vite.pid); } catch {}
  try { process.kill(server.pid); } catch {}
}
