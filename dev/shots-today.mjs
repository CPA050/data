import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push(String(e.message)));

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
await page.waitForTimeout(900);

// 造几条今天的记录，验证刻度与正确率
await page.evaluate(() => {
  const now = Date.now();
  const list = [];
  for (let i = 0; i < 7; i += 1) list.push({ ts: now - i * 60000, type: i % 3 === 0 ? 'multi' : 'single', ok: i % 4 !== 0 });
  localStorage.setItem('oq:log', JSON.stringify(list));
});
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('.today', { timeout: 20000 });
await page.waitForTimeout(700);

const hero = await page.locator('.today').innerText();
console.log('hero =>', JSON.stringify(hero.replace(/\s+/g, ' ')));
await page.screenshot({ path: `${OUT}\\u-phone-home.png` });

const docScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
console.log('docScroll =>', docScroll, 'errors =>', errors.length ? errors : 0);
await browser.close();
