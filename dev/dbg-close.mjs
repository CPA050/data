import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
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
await page.waitForSelector('.app-shell', { timeout: 20000 });
await page.waitForTimeout(800);
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('[data-act="import"]', { timeout: 8000 });

const close = [];
for (let i = 0; i < 3; i += 1) {
  await page.click('[data-act="import"]');
  await page.waitForSelector('.modal-card');
  await page.waitForTimeout(400);
  const ms = await page.evaluate(() => new Promise((resolve) => {
    const t0 = performance.now();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    const tick = () => {
      if (!document.querySelector('.modal-card')) resolve(Math.round(performance.now() - t0));
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
  close.push(ms);
  await page.waitForTimeout(150);
}
console.log('escape close ms =>', close.join(', '));
await browser.close();
