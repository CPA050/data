import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
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
await page.waitForSelector('.sidebar', { timeout: 20000 });
await page.waitForTimeout(600);

const before = await page.locator('.side-btn.is-active').getAttribute('data-tab');

// 普通点击仍要能用
await page.click('.side-btn[data-tab="wrong"]');
await page.waitForTimeout(400);
const clickWorks = (await page.locator('.side-btn.is-active').getAttribute('data-tab')) === 'wrong';
await page.click('.side-btn[data-tab="home"]');
await page.waitForTimeout(400);

// 长按后纵向拖动：首页 → 收藏
const box = await page.locator('.sidebar-nav').boundingBox();
const x = box.x + 60;
const y0 = box.y + 24;
const y1 = box.y + box.height * 0.78;

await page.mouse.move(x, y0);
await page.mouse.down();
await page.waitForTimeout(240);
for (let i = 1; i <= 14; i += 1) {
  await page.mouse.move(x, y0 + ((y1 - y0) * i) / 14);
  await page.waitForTimeout(18);
}
await page.mouse.up();
await page.waitForTimeout(500);

const after = await page.locator('.side-btn.is-active').getAttribute('data-tab');
await page.screenshot({ path: `${OUT}\\sidebar-drag.png` });
console.log('before =>', before, '| clickWorks =>', clickWorks, '| after drag =>', after);
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
