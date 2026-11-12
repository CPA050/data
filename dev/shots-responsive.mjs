import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'desktop', width: 1280, height: 900, mobile: false },
];
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1.5,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`${vp.name}: ${e.message}`));

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
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}\\r-${vp.name}-home.png` });

  // 题库 + 弹窗滚动检查
  await page.click('.tab-btn[data-tab="bank"]');
  await page.waitForSelector('.q-table', { timeout: 15000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}\\r-${vp.name}-bank.png` });

  await page.click('[data-act="generate"]');
  await page.waitForSelector('.modal-card [data-role="count"]', { timeout: 10000 });
  await page.waitForTimeout(400);
  await page.selectOption('.modal-card [data-role="count"]', '10');
  await page.click('.modal-card button:has-text("开始生成")');
  await page.waitForSelector('.modal-card button:has-text("导入")', { timeout: 90000 });
  await page.waitForTimeout(400);

  const metrics = await page.evaluate(() => {
    const card = document.querySelector('.modal-card');
    const body = document.querySelector('.modal-body');
    const actions = document.querySelector('.modal-actions');
    if (!card || !body || !actions) return null;
    const cr = card.getBoundingClientRect();
    const ar = actions.getBoundingClientRect();
    return {
      cardTop: Math.round(cr.top),
      cardBottom: Math.round(cr.bottom),
      vh: window.innerHeight,
      bodyScrollable: body.scrollHeight > body.clientHeight + 4,
      bodyScrollH: body.scrollHeight,
      bodyClientH: body.clientHeight,
      actionsVisible: ar.bottom <= window.innerHeight + 1 && ar.top >= 0,
    };
  });
  await page.screenshot({ path: `${OUT}\\r-${vp.name}-modal.png` });
  // 滚到底再拍一张，确认能看完全部内容
  await page.evaluate(() => {
    const body = document.querySelector('.modal-body');
    if (body) body.scrollTop = body.scrollHeight;
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}\\r-${vp.name}-modal-end.png` });
  console.log(vp.name, '=>', JSON.stringify(metrics));

  await page.click('.modal-card button:has-text("不要了")');
  await page.waitForTimeout(400);

  // 答题卡
  await page.click('.tab-btn[data-tab="home"]');
  await page.click('[data-act="sequential"]');
  await page.waitForTimeout(700);
  const go = page.locator('.modal-card button', { hasText: '开始' });
  if (await go.count()) await go.first().click();
  await page.waitForSelector('.opt', { timeout: 15000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}\\r-${vp.name}-quiz.png` });

  // 我的
  await page.click('.quiz [data-act="exit"]');
  await page.waitForTimeout(300);
  const quit = page.locator('.modal-card button:has-text("退出")');
  if (await quit.count()) await quit.first().click();
  await page.waitForTimeout(400);
  await page.click('.tab-btn[data-tab="me"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}\\r-${vp.name}-me.png` });

  await ctx.close();
}

console.log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
