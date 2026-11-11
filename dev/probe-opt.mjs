import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
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
await page.click('[data-act="sequential"]');
await page.waitForTimeout(700);
const go = page.locator('.modal-card [data-role="go"], .modal-card button', { hasText: '开始' });
if (await go.count()) await go.first().click();
await page.waitForSelector('.opt', { timeout: 10000 });
await page.locator('.opt').nth(1).click();
await page.waitForTimeout(900);

const info = await page.evaluate(() => {
  return [...document.querySelectorAll('.opt')].map((el) => {
    const cs = getComputedStyle(el);
    return {
      state: el.dataset.state,
      border: cs.borderTopWidth + ' ' + cs.borderTopColor,
      bg: cs.backgroundColor,
      cls: el.className,
    };
  });
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
