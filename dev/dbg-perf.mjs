import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
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
await page.waitForTimeout(800);

const t = async (label, fn) => {
  const ms = await page.evaluate(async () => {
    const start = performance.now();
    // 等两帧，确保布局与绘制完成
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    return performance.now() - start;
  });
  return ms;
};

// 切换 tab 的耗时：从点击到目标内容出现
const switchMs = [];
for (const tab of ['bank', 'wrong', 'fav', 'home', 'bank', 'home']) {
  const started = Date.now();
  await page.click(`.tab-btn[data-tab="${tab}"]`);
  const sel = { bank: '.q-table', wrong: '.wi-item, .item', fav: '.fav-item, .item', home: '.mast-title' }[tab];
  await page.waitForSelector(sel, { timeout: 8000 }).catch(() => {});
  switchMs.push(Date.now() - started);
}

// 弹窗打开/关闭
const openMs = [];
const closeMs = [];
for (let i = 0; i < 3; i += 1) {
  await page.click('.tab-btn[data-tab="bank"]');
  await page.waitForSelector('[data-act="import"]', { timeout: 8000 });
  let started = Date.now();
  await page.click('[data-act="import"]');
  await page.waitForSelector('.modal-card', { timeout: 8000 });
  openMs.push(Date.now() - started);
  started = Date.now();
  await page.click('.modal-actions button:has-text("取消"), .modal-card button[aria-label="关闭"]').catch(async () => {
    await page.keyboard.press('Escape');
  });
  await page.waitForFunction(() => !document.querySelector('.modal-card'), { timeout: 8000 }).catch(() => {});
  closeMs.push(Date.now() - started);
}

const paint = await t('paint', async () => {});
console.log('tab switch ms =>', switchMs.join(', '), '| avg', Math.round(switchMs.reduce((a, b) => a + b, 0) / switchMs.length));
console.log('modal open ms =>', openMs.join(', '), '| modal close ms =>', closeMs.join(', '));
console.log('two-frame paint =>', Math.round(paint), 'ms');
await browser.close();
