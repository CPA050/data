import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const logs = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') logs.push(m.type().toUpperCase() + ' ' + m.text().slice(0, 200));
});

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

await page.click('[data-act="exam"]');
await page.waitForSelector('.modal-card [data-role="count"]', { timeout: 10000 });
await page.click('.modal-card button:has-text("开始考试")');
await page.waitForSelector('.exam', { timeout: 10000 });
await page.waitForTimeout(300);
await page.locator('.exam [data-ex="pick"]').first().click();
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}\\dbg-exam-picked.png` });
await page.locator('.exam [data-ex="submit"]').click();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}\\dbg-exam-submit.png` });
const html = await page.evaluate(() => document.body.innerText.slice(0, 400).replace(/\s+/g, ' '));
console.log('body =>', html);
console.log('logs =>', logs.slice(0, 6));
await browser.close();
