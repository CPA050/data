import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();

await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.auth-card', { timeout: 20000 });
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}\\v-login.png` });

const mark = await page.locator('.brand-mark').evaluate((el) => {
  const cs = getComputedStyle(el);
  return { text: el.textContent, bg: cs.backgroundColor, color: cs.color, radius: cs.borderRadius, size: cs.width + 'x' + cs.height };
}).catch(() => null);
console.log('brand-mark =>', JSON.stringify(mark));

const icon = await page.evaluate(async () => {
  const res = await fetch('/favicon.png');
  return { status: res.status, type: res.headers.get('content-type'), bytes: (await res.arrayBuffer()).byteLength };
});
console.log('favicon =>', JSON.stringify(icon));
await browser.close();
