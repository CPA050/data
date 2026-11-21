import { chromium } from 'playwright-core';
import { zlibSync, strToU8 } from 'fflate';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const errors = [];

// 现做一个带文字的小 PDF（FlateDecode 内容流）
const pdfPath = join(tmpdir(), 'demo-questions.pdf');
{
  const content = [
    '(1. 普通硅酸盐水泥的初凝时间不得早于？) Tj',
    '(A. 45min) Tj',
    '(B. 60min) Tj',
    '(C. 90min) Tj',
    '(D. 30min) Tj',
    '(答案：A) Tj',
    '(章节：建筑材料) Tj',
  ].join(' ');
  const body = zlibSync(strToU8(content));
  const head = strToU8('%PDF-1.4\n1 0 obj\n<< /Length ' + body.length + ' /Filter /FlateDecode >>\nstream\n');
  const tail = strToU8('\nendstream\nendobj\n%%EOF\n');
  const pdf = new Uint8Array(head.length + body.length + tail.length);
  pdf.set(head, 0);
  pdf.set(body, head.length);
  pdf.set(tail, head.length + body.length);
  writeFileSync(pdfPath, pdf);
}

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

// 1) 导入弹窗：accept 与提示
await page.click('[data-act="import"]');
await page.waitForSelector('.dropzone', { timeout: 10000 });
const accept = await page.getAttribute('input[data-role="file"]', 'accept');
const hint = await page.locator('.dz-hint').innerText().catch(() => '');
console.log('accept =>', accept);
console.log('hint =>', hint.replace(/\s+/g, ' '));
await page.screenshot({ path: `${OUT}\\ig-1-import.png` });

// 2) 上传 PDF
await page.setInputFiles('input[data-role="file"]', pdfPath);
await page.waitForTimeout(1200);
const pdfCount = await page.locator('.import-summary .tag').innerText().catch(() => '(none)');
await page.screenshot({ path: `${OUT}\\ig-2-pdf.png` });
console.log('pdf 解析 =>', pdfCount);
await page.click('.modal-root [data-idx="0"]');
await page.waitForTimeout(400);

// 3) AI 出题弹窗：单个大输入框
await page.click('[data-act="generate"]');
await page.waitForSelector('.modal-card', { timeout: 10000 });
const askBox = await page.locator('textarea[data-role="ask"]').count();
const countOpts = await page.locator('select[data-role="count"] option').count();
const oldFields = await page.locator('[data-role="subject"], [data-role="chapter"], [data-role="level"], [data-role="hint"]').count();
await page.fill('textarea[data-role="ask"]', '初级会计的增值税计算题，20 道单选，带解析');
await page.screenshot({ path: `${OUT}\\ig-3-generate.png` });
console.log('出题输入框 =>', askBox, '数量选项 =>', countOpts, '旧字段残留 =>', oldFields);
await page.click('.modal-root [data-idx="0"]');

console.log('errors =>', errors.length ? errors.slice(0, 4) : 0);
await browser.close();
