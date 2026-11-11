import { chromium } from 'playwright-core';
import fs from 'node:fs';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const base = process.env.BASE_URL || 'http://localhost:5173';

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});

await page.goto(base, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.auth-card', { timeout: 20000 });
await page.fill('input[name="username"]', 'alice');
await page.keyboard.press('Enter');
await page.waitForSelector('input[name="password"]', { timeout: 10000 });
await page.fill('input[name="password"]', '123456');
await page.keyboard.press('Enter');
await page.waitForSelector('.tabbar', { timeout: 20000 });

await page.click('[data-act="sequential"]');
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}\\dbg-start.png` });
const modalText = await page.locator('.modal-root').innerText().catch(() => '(no modal)');
console.log('MODAL =>', modalText.replace(/\s+/g, ' ').slice(0, 120));
// 顺序练习会先弹“练多少题”，点开始
const startBtn = page.locator('.modal-root button').filter({ hasText: /开始/ });
if (await startBtn.count()) {
  await startBtn.last().click();
  console.log('clicked start');
}
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}\\dbg-start2.png` });
await page.waitForSelector('.quiz', { timeout: 10000 });

// 打开题目导航，跳到第 3 题（种子里的简答题）
await page.click('.quiz [data-act="nav"]');
await page.waitForSelector('.nav-cell[data-idx="2"]', { timeout: 8000 });
await page.click('.nav-cell[data-idx="2"]');
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}\\dbg-jump.png` });
const found = (await page.locator('.essay-box textarea').count()) > 0;
if (!found) throw new Error('跳到第 3 题后没有出现简答输入框');
await page.fill('.essay-box textarea', '选低水化热水泥、控制入模温度、分层浇筑、加强养护');
await page.click('[data-act="submit"]');
await page.waitForSelector('.essay-actions', { timeout: 8000 });
await page.screenshot({ path: `${OUT}\\13-essay-submitted.png` });
await page.click('[data-act="ai-grade"]');
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}\\14-essay-graded.png` });
const text = await page.textContent('.essay-actions');
console.log('essay actions =>', (text || '').trim().slice(0, 60));
console.log('errors =>', errors.length);
await browser.close();
