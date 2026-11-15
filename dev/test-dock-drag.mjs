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
await page.waitForTimeout(600);

const nav = await page.locator('.tabbar').boundingBox();
const before = await page.locator('.tab-btn.is-active').getAttribute('data-tab');

// 长按 200ms 后从「首页」拖到「收藏」
const y = nav.y + nav.height / 2;
const x0 = nav.x + nav.width * 0.1;
const x1 = nav.x + nav.width * 0.7;

await page.mouse.move(x0, y);
await page.mouse.down();
await page.waitForTimeout(220);
for (let i = 1; i <= 12; i += 1) {
  await page.mouse.move(x0 + ((x1 - x0) * i) / 12, y);
  await page.waitForTimeout(20);
}
await page.mouse.up();
await page.waitForTimeout(500);

const after = await page.locator('.tab-btn.is-active').getAttribute('data-tab');
const view = await page.locator('#view').innerText();
await page.screenshot({ path: `${OUT}\\dock-drag.png` });
console.log('before =>', before, '| after =>', after, '| view has 收藏 =>', view.includes('收藏'));
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
