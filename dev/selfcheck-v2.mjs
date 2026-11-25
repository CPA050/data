import { chromium } from 'playwright-core';
import { spawn, execSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = process.cwd();
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const DB = path.join(os.tmpdir(), `oq-selfcheck-v2-${Date.now()}.db`);

function start(cmd, args, env = {}) {
  const p = spawn(cmd, args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: 'ignore' });
  p.unref?.();
  return p;
}
async function waitPort(port, host = 'localhost', timeoutMs = 15000) {
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
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });

const server = start(process.execPath, ['dev/server.mjs'], { DB_FILE: DB });
const vite = start(process.execPath, ['node_modules/vite/bin/vite.js', '--port', '5173', '--strictPort']);
try {
  await waitPort(8788, '127.0.0.1');
  await waitPort(5173, 'localhost');

  const user = `v2_${Date.now().toString(36)}`;
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[name="username"]', { timeout: 15000 });

  // 注册（两步：先输用户名点继续 → 设密码 + 确认）
  await page.fill('input[name="username"]', user);
  await page.click('.auth-card button[type="submit"], form button');
  await page.waitForSelector('input[name="confirm"]', { timeout: 10000 });
  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm"]', '123456');
  await page.click('.auth-card button[type="submit"], form button');
  await page.waitForSelector('.tabbar', { timeout: 10000 });

  // 用页面里的 token 种题：1 单选 + 1 简答
  const seeded = await page.evaluate(async () => {
    const token = localStorage.getItem('oq:oq:token');
    const add = (questions) =>
      fetch('/api/questions-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ questions }),
      }).then((r) => r.json());
    const r1 = await add([{ q: '自检单选：1+1=？', opts: ['A. 1', 'B. 2', 'C. 3', 'D. 4'], a: 1, chapter: '自检', subject: '自检科目', type: 'single' }]);
    const r2 = await add([{ q: '自检简答：什么是营养？', opts: [], a: '参考答案长文本：营养素是机体……共 30 个字以上', chapter: '自检', subject: '自检科目', type: 'essay' }]);
    return { r1, r2 };
  });
  console.log('seed =>', JSON.stringify(seeded).slice(0, 120));

  // 重载让题库带数据
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.tabbar', { timeout: 10000 });

  // 1) 编辑简答不丢答案
  await page.click('.tab-btn[data-tab="bank"]');
  await page.waitForSelector('tr.q-row', { timeout: 10000 });
  const rows = page.locator('tr.q-row');
  console.log('bank rows =>', await rows.count());
  await rows.nth(1).locator('[data-act="edit"]').click();
  await page.waitForSelector('[data-role="a"]', { timeout: 5000 });
  const essayVal = await page.$eval('[data-role="a"]', (el) => el.value);
  console.log('essay answer input =>', essayVal.slice(0, 30));
  await page.$eval('[data-close]', el => el.click());
  await page.waitForTimeout(300);

  // 2) 随机练习 → 全部做完 → 「再来一组」真的重开
  await page.click('.tab-btn[data-tab="home"]');
  await page.waitForTimeout(300);
  await page.click('[data-act="random"]');
  await page.waitForSelector('[data-act="exit"]', { timeout: 8000 });
  for (let i = 0; i < 2; i++) {
    const ta = await page.$('.essay-box textarea');
    if (ta) {
      await page.fill('.essay-box textarea', `第${i + 1}轮的简答文字`);
      await page.click('[data-act="submit"]');
      await page.waitForTimeout(400);
      const markBad = await page.$('[data-act="mark"][data-ok="0"]');
      if (markBad) { await markBad.click(); await page.waitForTimeout(300); }
      const nxt = await page.$('[data-act="next"]');
      if (nxt) await nxt.click();
    } else {
      // 单选点击即自动判分（submit 只在多选/文字题出现），等 next 出来点下一题
      await page.click('.opt[data-act="pick"]');
      await page.waitForTimeout(600);
      const nxt = await page.$('[data-act="next"]');
      if (nxt) await nxt.click();
    }
    await page.waitForTimeout(400);
  }
  // 完成弹窗 → 再来一组
  await page.waitForSelector('.modal-actions [data-idx="1"]', { timeout: 8000 });
  await page.$eval('.modal-actions [data-idx="1"]', el => el.click());
  await page.waitForSelector('[data-act="exit"]', { timeout: 5000 });
  console.log('retry reopens quiz => true');

  // 3) 第二轮：简答答错 → 错题本里 user_choice 有文字
  for (let i = 0; i < 2; i++) {
    const ta = await page.$('.essay-box textarea');
    if (ta) {
      await page.fill('.essay-box textarea', '我的简答答案ABC');
      await page.click('[data-act="submit"]');
      await page.waitForTimeout(400);
      const markBad = await page.$('[data-act="mark"][data-ok="0"]');
      if (markBad) { await markBad.click(); await page.waitForTimeout(300); }
      const nxt = await page.$('[data-act="next"]');
      if (nxt) await nxt.click();
    } else {
      // 单选点击即自动判分（submit 只在多选/文字题出现），等 next 出来点下一题
      await page.click('.opt[data-act="pick"]');
      await page.waitForTimeout(600);
      const nxt = await page.$('[data-act="next"]');
      if (nxt) await nxt.click();
    }
    await page.waitForTimeout(400);
  }
  await page.waitForSelector('.modal-actions [data-idx="0"]', { timeout: 8000 });
  await page.$eval('.modal-actions [data-idx="0"]', el => el.click());
  await page.waitForSelector('.tabbar', { timeout: 8000 });

  // 进错题本看文字作答是否留存
  await page.click('.tab-btn[data-tab="wrong"]');
  await page.waitForTimeout(1200);
  const body = await page.evaluate(() => document.body.innerText);
  console.log('wrong has 我的简答答案ABC =>', body.includes('我的简答答案ABC'));

  await page.screenshot({ path: path.join(ROOT, '../screens/selftest-v2-final.png') });
  console.log('pageerrors =>', errors.length, errors.slice(0, 3));
} finally {
  await browser.close().catch(() => {});
  try { execSync('taskkill /F /T /PID ' + vite.pid); } catch {}
  try { execSync('taskkill /F /T /PID ' + server.pid); } catch {}
  await fs.rm(DB, { force: true });
}
