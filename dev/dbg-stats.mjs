import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

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
await page.waitForTimeout(900);

const info = await page.evaluate(() => {
  const card = document.querySelector('.stat-grid')?.closest('.card');
  const grid = document.querySelector('.stat-grid');
  if (!card || !grid) return null;
  const c = card.getBoundingClientRect();
  const g = grid.getBoundingClientRect();
  const cs = getComputedStyle(grid);
  return {
    cardTop: Math.round(c.top),
    gridTop: Math.round(g.top),
    gap: Math.round(g.top - c.top),
    gridMargin: cs.margin,
    cardPad: getComputedStyle(card).padding,
    firstHTML: card.innerHTML.slice(0, 120),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
