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
await page.click('.modal-card button:has-text("开始生成")');
await page.waitForSelector('.modal-card .gen-thumb', { timeout: 30000 });
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}\\y1-gen-figure.png` });
const thumb = await page.locator('.gen-thumb').first().evaluate((el) => ({
  complete: el.complete,
  w: el.naturalWidth,
  h: el.naturalHeight,
  src: el.getAttribute('src').slice(0, 40),
}));
await page.locator('.modal-card button:has-text("导入")').click();
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}\\y2-bank-after.png` });

console.log('thumb =>', JSON.stringify(thumb));
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
