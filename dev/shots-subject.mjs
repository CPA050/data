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
await page.waitForTimeout(600);

// 顺序练习 -> 先弹科目
await page.click('[data-act="sequential"]');
await page.waitForSelector('.chip-row', { timeout: 10000 });
const chips = await page.locator('.chip-row .chip').allInnerTexts();
log('subjects =>', JSON.stringify(chips));
await page.screenshot({ path: `${OUT}\\t1-subject-modal.png` });
await page.click('.chip-row .chip:nth-child(2)');
await page.click('.modal-actions button:last-child');
await page.waitForTimeout(900);

// 可能还会弹"练多少题"
const go = page.locator('.modal-actions button', { hasText: '开始' });
if (await go.count()) await go.first().click();
await page.waitForSelector('.q-text', { timeout: 15000 });
const qtext = (await page.locator('.q-text').innerText()).slice(0, 28);
const tag = await page.locator('.q-head .muted.small').innerText().catch(() => '');
log('quiz =>', JSON.stringify({ qtext, type: tag }));

// 作答：单选题点第一个选项再提交
const opt = page.locator('.opt').first();
if (await opt.count()) await opt.click();
const submit = page.locator('[data-act="submit"]');
if (await submit.count()) await submit.first().click();
await page.waitForTimeout(700);

// 退出答题，回到外壳
const exitBtn = page.locator('.quiz [data-act="exit"]');
if (await exitBtn.count()) await exitBtn.first().click();
await page.waitForTimeout(500);
const yes = page.locator('.modal-actions button', { hasText: '退出' });
if (await yes.count()) await yes.first().click();
await page.waitForTimeout(600);

// 我的 -> 练习记录
await page.click('.tab-btn[data-tab="me"]');
await page.waitForTimeout(900);
const hasCard = await page.locator('.stat-grid').count();
const statText = hasCard ? (await page.locator('.card-pad').first().innerText()).replace(/\s+/g, ' ').slice(0, 90) : '(none)';
log('stats card =>', hasCard, JSON.stringify(statText));
await page.screenshot({ path: `${OUT}\\t2-me-stats.png` });

log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
