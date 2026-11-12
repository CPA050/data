import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const DOCX = `${OUT}\\import-with-image.docx`;
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
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

await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('.q-table', { timeout: 15000 });

// 行点击 → 预览弹窗
await page.click('.q-row.is-clickable');
await page.waitForSelector('.peek', { timeout: 8000 });
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}\\g7-peek.png` });
const peekText = await page.locator('.peek').innerText();
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// 导入带图片的 docx
await page.click('[data-act="import"]');
await page.waitForSelector('.dropzone', { timeout: 8000 });
await page.setInputFiles('input[data-role="file"]', DOCX);
await page.waitForTimeout(1200);
const textValue = await page.locator('textarea[data-role="text"]').inputValue();
const summary = await page.locator('.import-summary').innerText();
await page.screenshot({ path: `${OUT}\\g8-import-docx.png` });
const warn = await page.locator('.tag-warn').count();

console.log('peek =>', peekText.replace(/\s+/g, ' ').slice(0, 60));
console.log('docx has img markup =>', textValue.includes('![docx 图片]('), '| markdown len =>', textValue.length);
console.log('summary =>', summary.replace(/\s+/g, ' ').slice(0, 60), '| warns =>', warn);
console.log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
