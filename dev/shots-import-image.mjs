import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const IMG = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens\\11-quiz-answered.png';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('response', async (r) => {
  if (r.url().includes('/api/')) {
    const body = await r.text().catch(() => '');
    console.log('RESP', r.status(), r.url().replace(/^.*\/api\//, '/api/'), body.slice(0, 120));
  }
});
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

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
await page.waitForSelector('[data-act="import"]', { timeout: 15000 });
await page.click('[data-act="import"]');
await page.waitForSelector('.dropzone', { timeout: 10000 });
await page.setInputFiles('input[data-role="file"]', IMG);
await page.waitForTimeout(4000);
const summary = await page.locator('.import-summary').innerText().catch(() => '(none)');
console.log('图片识别 =>', summary.replace(/\s+/g, ' ').slice(0, 80));
await page.screenshot({ path: `${OUT}\\imp-5-image.png` });
console.log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
