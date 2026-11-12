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

// 1) 导出试卷：捕获新窗口内容
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('.q-table', { timeout: 15000 });
const [sheet] = await Promise.all([page.waitForEvent('popup'), page.click('[data-act="print"]')]);
await sheet.waitForLoadState('domcontentloaded');
const sheetHtml = await sheet.content();
await sheet.screenshot({ path: `${OUT}\\g6-export.png`, fullPage: true });
console.log('export =>', /参考答案/.test(sheetHtml) ? 'ok' : 'MISSING', sheetHtml.length, 'bytes');
await sheet.close();

// 2) 离线队列：断网后答错一题，检查队列写入，再联网补传
await page.click('.tab-btn[data-tab="home"]');
await page.click('[data-act="sequential"]');
await page.waitForTimeout(700);
const go = page.locator('.modal-card button', { hasText: '开始' });
if (await go.count()) await go.first().click();
await page.waitForSelector('.opt', { timeout: 15000 });

await ctx.setOffline(true);
await page.locator('.opt').nth(2).click();
await page.waitForTimeout(900);
const queued = await page.evaluate(() => JSON.parse(localStorage.getItem('oq:queue') || '[]').length);
console.log('queued while offline =>', queued);

await ctx.setOffline(false);
await page.evaluate(() => window.dispatchEvent(new Event('online')));
await page.waitForTimeout(2500);
const after = await page.evaluate(() => JSON.parse(localStorage.getItem('oq:queue') || '[]').length);
console.log('queue after online =>', after);

console.log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
