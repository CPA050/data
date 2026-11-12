import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];
const log = (...a) => console.log(...a);

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
  const token = (localStorage.getItem('oq:oq:token') || '').replace(/^"|"$/g, '');
  const user = (localStorage.getItem('oq:oq:user') || '"alice"').replace(/^"|"$/g, '');
  const questions = [
    {
      q: '水泥的体积安定性不良会导致混凝土开裂。',
      opts: ['正确', '错误'],
      a: 0,
      type: 'judge',
      chapter: '建筑材料',
      subject: '题型测试',
    },
    {
      q: '普通硅酸盐水泥的初凝时间不得早于 ____ min。',
      opts: [],
      a: '45',
      type: 'blank',
      chapter: '建筑材料',
      subject: '题型测试',
    },
    {
      q: '简支梁跨度 6m，均布荷载 20kN/m，计算跨中最大弯矩。',
      opts: [],
      a: 'M = qL²/8 = 90 kN·m',
      type: 'calc',
      chapter: '结构',
      subject: '题型测试',
    },
  ];
  const res = await fetch('/api/questions-add', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + token },
    body: JSON.stringify({ user_id: user, questions }),
  });
  return { status: res.status, body: await res.json() };
});
log('added =>', JSON.stringify(added));

const types = await page.evaluate(async () => {
  const token = (localStorage.getItem('oq:oq:token') || '').replace(/^"|"$/g, '');
  const user = (localStorage.getItem('oq:oq:user') || '"alice"').replace(/^"|"$/g, '');
  const res = await fetch('/api/questions?user_id=' + encodeURIComponent(user), {
    headers: { authorization: 'Bearer ' + token },
  });
  const list = await res.json();
  return list.filter((q) => q.subject === '题型测试').map((q) => ({ t: q.type, q: q.q.slice(0, 12) }));
});
log('stored types =>', JSON.stringify(types));
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('.tabbar', { timeout: 20000 });
await page.waitForTimeout(700);

// 练题型测试科目
await page.click('[data-act="sequential"]');
await page.waitForSelector('.chip-row', { timeout: 10000 });
const chip = page.locator('.chip-row .chip', { hasText: '题型测试' });
if (await chip.count()) await chip.first().click();
await page.click('.modal-actions button:last-child');
await page.waitForTimeout(800);
const go = page.locator('.modal-actions button', { hasText: '开始' });
if (await go.count()) await go.first().click();
await page.waitForSelector('.q-text', { timeout: 15000 });

const seen = [];
for (let i = 0; i < 3; i += 1) {
  const tag = (await page.locator('.quiz .q-head').first().innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
  const hasEssayBox = await page.locator('.essay-box').count();
  const opts = await page.locator('.opt').count();
  seen.push({ tag, opts, essayBox: hasEssayBox, q: (await page.locator('.q-text').innerText()).slice(0, 16) });

  if (opts) {
    await page.locator('.opt').first().click();
    const submit = page.locator('[data-act="submit"]');
    if (await submit.count()) await submit.first().click();
  } else if (hasEssayBox) {
    await page.fill('.essay-box textarea', i === 1 ? '45' : '90 kN·m');
    const sub = page.locator('.quiz-foot button', { hasText: '提交' });
    if (await sub.count()) await sub.first().click();
    await page.waitForTimeout(500);
    const grade = page.locator('[data-act="ai-grade"]');
    if (await grade.count()) await grade.first().click();
    await page.waitForTimeout(2500);
  }
  await page.waitForTimeout(600);
  const next = page.locator('.quiz-foot button', { hasText: '下一题' });
  if (await next.count()) await next.first().click();
  await page.waitForTimeout(500);
}
log('quiz types =>', JSON.stringify(seen));
await page.screenshot({ path: `${OUT}\\t3-types.png` });
log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
