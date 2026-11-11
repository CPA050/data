import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 120)); });

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
  const canvas = document.createElement('canvas');
  canvas.width = 420;
  canvas.height = 150;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 420, 150);
  ctx.strokeStyle = '#0a0c0f';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(30, 120);
  ctx.lineTo(390, 120);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(30, 120);
  ctx.lineTo(30, 40);
  ctx.moveTo(390, 120);
  ctx.lineTo(390, 40);
  ctx.stroke();
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(30, 40);
  ctx.lineTo(390, 40);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#1440ff';
  ctx.font = '600 20px sans-serif';
  ctx.fillText('q = 20 kN/m', 120, 30);
  const img = canvas.toDataURL('image/jpeg', 0.85);
  const q = String.raw`如图所示简支梁，跨度 $L=6\,\text{m}$，均布荷载 $q=20\,\text{kN/m}$。
<img src="` + img + String.raw`" alt="梁截面示意">
求跨中最大弯矩：$$\frac{qL^2}{8}$$ = ?`;
  const rawToken = localStorage.getItem('oq:oq:token') || localStorage.getItem('oq:token') || '""';
  const rawUser = localStorage.getItem('oq:oq:user') || localStorage.getItem('oq:user') || '"alice"';
  const token = rawToken.replace(/^"|"$/g, '');
  const user = rawUser.replace(/^"|"$/g, '');
  const res = await fetch('/api/questions-add', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + token },
    body: JSON.stringify({
      user_id: user,
      questions: [{ q, opts: ['A. 90 kN·m', 'B. 45 kN·m', 'C. 180 kN·m', 'D. 22.5 kN·m'], a: 'A', chapter: '力学', subject: '一建建筑' }],
    }),
  });
  return { status: res.status, body: (await res.text()).slice(0, 120), imgLen: img.length };
});
console.log('add =>', JSON.stringify(added));

await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('.tabbar', { timeout: 20000 });
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('.item', { timeout: 15000 });
await page.screenshot({ path: `${OUT}\\fx-1-bank.png` });

await page.click('.tab-btn[data-tab="home"]');
await page.click('[data-act="sequential"]');
await page.waitForTimeout(800);
const go = page.locator('.modal-card button', { hasText: '开始' });
if (await go.count()) await go.first().click();
await page.waitForSelector('.opt', { timeout: 15000 });
// 用题目导航直接跳到最后一题（新加的图文题）
await page.click('.quiz [data-act="nav"]');
await page.waitForSelector('.nav-cell', { timeout: 8000 });
const cells = page.locator('.nav-cell');
const count = await cells.count();
await cells.nth(count - 1).click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}\\fx-2-quiz.png`, fullPage: false });
const hasImg = await page.locator('.q-text img').count();
const hasMath = await page.locator('.q-text math').count();
console.log('img =>', hasImg, '| math =>', hasMath, '| errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
