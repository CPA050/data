import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 140)); });

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

await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('.q-table', { timeout: 15000 });
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}\\g1-table.png` });
const rows = await page.locator('.q-row').count();
const types = await page.locator('.tag-type').allInnerTexts();

// 搜索高亮（表格内）
await page.fill('input[data-role="search"]', '混凝土');
await page.waitForTimeout(400);
const marks = await page.locator('mark.hl').count();
await page.screenshot({ path: `${OUT}\\g2-highlight.png` });

// 全局搜索
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press('/');
await page.waitForSelector('.search-panel', { timeout: 8000 });
await page.fill('[data-role="kw"]', '水泥');
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}\\g3-global-search.png` });
const hits = await page.locator('.hit').count();
await page.keyboard.press('Escape');
await page.waitForTimeout(300);

// 富文本编辑器
await page.click('[data-act="add"]');
await page.waitForSelector('.rt-area', { timeout: 8000 });
await page.click('.rt-area');
await page.keyboard.type('普通硅酸盐水泥初凝时间不得早于？');
await page.click('.rt-btn[title^="公式"]');
await page.keyboard.type('$t=45min$');
await page.screenshot({ path: `${OUT}\\g4-rich-editor.png` });
const richHtml = await page.locator('.rt-area').innerHTML();

console.log('rows =>', rows, '| types =>', [...new Set(types)].join('/'), '| marks =>', marks, '| hits =>', hits);
console.log('rich =>', richHtml.slice(0, 120).replace(/\n/g, ' '));
console.log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
