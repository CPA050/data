import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const logs = [];
page.on('pageerror', (e) => logs.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') logs.push('console: ' + m.text()); });

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
await page.waitForTimeout(1200);

const btn = await page.evaluate(() => {
  const el = document.querySelector('[data-act="shuffle"]');
  if (!el) return { found: false };
  const r = el.getBoundingClientRect();
  return { found: true, disabled: el.disabled, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, text: el.textContent.trim().slice(0, 20) };
});
console.log('shuffle btn =>', JSON.stringify(btn));

await page.click('[data-act="shuffle"]');
await page.waitForTimeout(1500);
const state = await page.evaluate(() => ({
  quiz: Boolean(document.querySelector('.quiz')),
  opts: document.querySelectorAll('.opt').length,
  body: document.body.className,
  qtext: document.querySelector('.q-text')?.textContent?.slice(0, 40) ?? '',
}));
console.log('after click =>', JSON.stringify(state));
console.log('logs =>', logs.slice(0, 5));
await page.screenshot({ path: 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens\\dbg-shuffle.png' });
await browser.close();
