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

const added = await page.evaluate(async () => {
  const rawToken = localStorage.getItem('oq:oq:token') || '';
  const token = rawToken.replace(/^"|"$/g, '');
  const rawUser = localStorage.getItem('oq:oq:user') || '"alice"';
  const user = rawUser.replace(/^"|"$/g, '');
  const questions = Array.from({ length: 26 }, (_, i) => ({
    q: `分页测试题 ${i + 1}：某工程混凝土强度等级 C${30 + (i % 3) * 5}，测区平均回弹值 R = ${20 + i}，求推定强度？`,
    opts: ['A. 25.0 MPa', 'B. 30.0 MPa', 'C. 35.0 MPa', 'D. 40.0 MPa'],
    a: 'B',
    chapter: '混凝土',
    subject: '一建建筑',
  }));
  const res = await fetch('/api/questions-add', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + token },
    body: JSON.stringify({ user_id: user, questions }),
  });
  return { status: res.status, added: (await res.json()).added };
});
console.log('added =>', JSON.stringify(added));

await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('.tabbar', { timeout: 20000 });
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('.q-table', { timeout: 15000 });
await page.waitForTimeout(800);
const pager = await page.locator('.pager-info').innerText();
const rowCount = await page.locator('.q-row').count();
await page.screenshot({ path: `${OUT}\\g5-pager.png` });
await page.click('[data-act="page-next"]');
await page.waitForTimeout(500);
const pager2 = await page.locator('.pager-info').innerText();
const firstNo = await page.locator('.q-row .c-no').first().innerText();

console.log('pager =>', pager, '| rows =>', rowCount, '| page2 =>', pager2, '| firstNo =>', firstNo);
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
