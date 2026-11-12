import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
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
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('[data-act="generate"]', { timeout: 10000 });

await page.click('[data-act="generate"]');
await page.waitForSelector('.modal-card [data-role="count"]', { timeout: 10000 });
await page.selectOption('.modal-card [data-role="count"]', '50');
await page.click('.modal-card button:has-text("开始生成")');

// 生成中：等进度条出现，抓一张
await page.waitForSelector('.gen-progress', { timeout: 10000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}\\z1-generating.png` });
const midLine = await page.locator('.modal-card [data-role="line"]').innerText().catch(() => '(none)');

// 汇总弹窗
await page.waitForSelector('.modal-card button:has-text("导入")', { timeout: 120000 });
const summary = await page.locator('.modal-card .muted.small').first().innerText();
await page.screenshot({ path: `${OUT}\\z2-generate-summary.png` });

await page.click('.modal-card button:has-text("导入")');
await page.waitForTimeout(4000);
await page.screenshot({ path: `${OUT}\\z3-bank-bulk.png` });
const total = await page.locator('.q-table .q-row').count();
const pagerText = await page.locator('.pager-info').innerText().catch(() => '(no pager)');

console.log('mid =>', midLine.replace(/\s+/g, ' '));
console.log('summary =>', summary.replace(/\s+/g, ' ').slice(0, 90));
console.log('rows =>', total, '| pager =>', pagerText.replace(/\s+/g, ' '));
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
