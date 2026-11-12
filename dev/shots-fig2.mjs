import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
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
await page.waitForTimeout(600);

// 进入顺序练习，跳到最后一题（AI 生成、带梁图）
await page.click('[data-act="sequential"]');
await page.waitForTimeout(700);
const go = page.locator('.modal-card button', { hasText: '开始' });
if (await go.count()) await go.first().click();
await page.waitForSelector('.opt', { timeout: 15000 });
const idx = await page.evaluate(async () => {
  const rawToken = localStorage.getItem('oq:oq:token') || '';
  const token = rawToken.replace(/^"|"$/g, '');
  const rawUser = localStorage.getItem('oq:oq:user') || '"alice"';
  const user = rawUser.replace(/^"|"$/g, '');
  const res = await fetch('/api/questions?user_id=' + encodeURIComponent(user), {
    headers: { authorization: 'Bearer ' + token },
  });
  const data = await res.json();
  const list = data.questions || data;
  return list.findIndex((q) => String(q.q).includes('简支梁'));
});
await page.click('.quiz [data-act="nav"]');
await page.waitForSelector('.nav-cell', { timeout: 8000 });
await page.locator('.nav-cell').nth(idx).click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}\\y3-quiz-figure.png` });
const img = await page.locator('.q-text img').first().evaluate((el) => ({
  w: el.naturalWidth,
  h: el.naturalHeight,
  alt: el.getAttribute('alt'),
}));

// 题库列表里也该提示"含图"
await page.click('.quiz [data-act="exit"]');
await page.waitForTimeout(400);
const quit = page.locator('.modal-card button:has-text("退出")');
if (await quit.count()) await quit.first().click();
await page.waitForTimeout(500);
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('.q-table', { timeout: 10000 });
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}\\y4-bank-figure.png` });

console.log('quiz img =>', JSON.stringify(img));
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
