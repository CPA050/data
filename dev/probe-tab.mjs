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
await page.waitForTimeout(600);

const info = await page.evaluate(() => {
  const el = document.querySelector('.tabbar .tab-btn.is-active');
  const cs = el ? getComputedStyle(el) : null;
  return {
    found: Boolean(el),
    bg: cs && cs.backgroundColor,
    bgImage: cs && cs.backgroundImage.slice(0, 80),
    radius: cs && cs.borderRadius,
    padding: cs && cs.padding,
    boxShadow: cs && cs.boxShadow,
    outer: el && el.outerHTML.slice(0, 160),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
