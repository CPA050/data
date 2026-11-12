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

await page.click('.tab-btn[data-tab="me"]');
await page.waitForSelector('[data-act="about"]', { timeout: 15000 });
await page.screenshot({ path: `${OUT}\\ab-0-me.png` });
await page.click('[data-act="about"]');
await page.waitForSelector('.about', { timeout: 10000 });
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}\\ab-1-about.png` });

const box = await page.locator('.modal-card').boundingBox();
const card = await page.evaluate(() => {
  const el = document.querySelector('.modal-card');
  const body = el?.querySelector('.modal-body');
  return {
    cardH: el?.clientHeight,
    bodyScroll: body?.scrollHeight,
    bodyClient: body?.clientHeight,
    actionsVisible: !!document.querySelector('.modal-actions')?.getBoundingClientRect().bottom &&
      document.querySelector('.modal-actions').getBoundingClientRect().bottom <= window.innerHeight,
  };
});
console.log('card =>', JSON.stringify({ ...box, ...card }));
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
