import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.auth-card', { timeout: 20000 });
if (!(await page.locator('input[name="password"]').count())) {
  await page.fill('input[name="username"]', 'alice');
  await page.click('button[type="submit"]');
  await page.waitForSelector('input[name="password"]', { timeout: 15000 });
}
await page.fill('input[name="password"]', '123456');
await page.click('button[type="submit"]');
await page.waitForSelector('.tabbar', { timeout: 20000 });
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}\\x0-home.png` });

// ---- 模拟考试 ----
await page.click('[data-act="exam"]');
await page.waitForSelector('.modal-card [data-role="count"]', { timeout: 10000 });
await page.screenshot({ path: `${OUT}\\x1-exam-setup.png` });
await page.click('.modal-card button:has-text("开始考试")');
await page.waitForSelector('.exam', { timeout: 10000 });
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}\\x2-exam.png` });
const clockText = await page.locator('.exam-clock').innerText();

const progressText = await page.locator('.exam-progress').innerText();
const total = Number((progressText.match(/\/\s*(\d+)/) ?? [])[1] ?? 0);
for (let i = 0; i < total; i += 1) {
  await page.locator('.exam [data-ex="pick"]').first().click();
  const next = page.locator('.exam [data-ex="next"]');
  if (await next.count()) await next.click();
  await page.waitForTimeout(120);
}
await page.locator('.exam [data-ex="sheet"]').click();
await page.waitForSelector('.nav-cell', { timeout: 8000 });
await page.screenshot({ path: `${OUT}\\x3-exam-sheet.png` });
await page.locator('.modal-card button:has-text("继续答题")').click();
await page.waitForTimeout(200);
await page.locator('.exam [data-ex="submit"]').click();
const confirmSubmit = page.locator('.modal-card button:has-text("交卷")');
await confirmSubmit.first().click({ timeout: 8000 }).catch(() => undefined);
await page.waitForSelector('.score-big', { timeout: 15000 });
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}\\x4-exam-result.png` });
const score = (await page.locator('.score-big').innerText()).replace(/\s+/g, '');
await page.locator('.modal-card button:has-text("知道了")').click();
await page.waitForTimeout(400);

// ---- AI 出题 ----
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('[data-act="generate"]', { timeout: 10000 });
await page.click('[data-act="generate"]');
await page.waitForSelector('.modal-card [data-role="count"]', { timeout: 10000 });
await page.screenshot({ path: `${OUT}\\x5-generate.png` });
await page.click('.modal-card button:has-text("开始生成")');
await page.waitForSelector('.modal-card .import-item', { timeout: 30000 });
await page.screenshot({ path: `${OUT}\\x6-generate-preview.png` });
const preview = await page.locator('.modal-card .import-item').first().innerText();
await page.locator('.modal-card button:has-text("导入")').click();
await page.waitForTimeout(1500);

console.log('clock =>', clockText, '| total =>', total, '| score =>', score);
console.log('preview =>', preview.slice(0, 36));
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
