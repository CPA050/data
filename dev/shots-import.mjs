import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const DOCX = 'C:\\Users\\cpa\\AppData\\Local\\Temp\\demo-questions.docx';
const TXT = 'C:\\Users\\cpa\\AppData\\Local\\Temp\\demo-questions.txt';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.auth-card', { timeout: 20000 });
if (await page.locator('input[name="password"]').count()) {
  await page.fill('input[name="password"]', '123456');
} else {
  await page.fill('input[name="username"]', 'alice');
  await page.click('button[type="submit"]');
  await page.waitForSelector('input[name="password"]', { timeout: 15000 });
  await page.fill('input[name="password"]', '123456');
}
await page.click('button[type="submit"]');
await page.waitForSelector('.tabbar', { timeout: 20000 });
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('[data-act="import"]', { timeout: 15000 });

// 1) 打开导入弹窗，直接粘贴文本
await page.click('[data-act="import"]');
await page.waitForSelector('.dropzone', { timeout: 10000 });
await page.fill('.import-text', `1. 混凝土的初凝时间不得早于？
A. 45min
B. 60min
答案：A
章节：建筑材料`);
await page.waitForTimeout(700);
const pasteCount = await page.locator('.import-summary .tag').innerText().catch(() => '(none)');
await page.screenshot({ path: `${OUT}\\imp-1-paste.png` });
console.log('粘贴解析 =>', pasteCount);
await page.click('.modal-root [data-idx="0"]');

// 2) 上传 docx
await page.click('[data-act="import"]');
await page.waitForSelector('.dropzone', { timeout: 10000 });
await page.setInputFiles('input[data-role="file"]', DOCX);
await page.waitForTimeout(1200);
const docxCount = await page.locator('.import-summary .tag').innerText().catch(() => '(none)');
await page.screenshot({ path: `${OUT}\\imp-2-docx.png` });
console.log('docx 解析 =>', docxCount);
await page.click('.modal-root [data-idx="1"]');
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}\\imp-3-after.png` });

// 3) 上传 txt
await page.click('[data-act="import"]');
await page.waitForSelector('.dropzone', { timeout: 10000 });
await page.setInputFiles('input[data-role="file"]', TXT);
await page.waitForTimeout(1000);
const txtCount = await page.locator('.import-summary .tag').innerText().catch(() => '(none)');
console.log('txt 解析 =>', txtCount);
await page.screenshot({ path: `${OUT}\\imp-4-txt.png` });
await page.click('.modal-root [data-idx="0"]');

const total = await page.locator('.muted.small').last().innerText().catch(() => '');
console.log('题库统计 =>', total.replace(/\s+/g, ' '));
console.log('errors =>', errors.length ? errors.slice(0, 4) : 0);
await browser.close();
