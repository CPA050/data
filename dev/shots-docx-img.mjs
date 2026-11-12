import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DL = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const PNG =
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII=';
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, acceptDownloads: true });
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

const added = await page.evaluate(async (png) => {
  const tk = (localStorage.getItem('oq:oq:token') || '').replace(/^"|"$/g, '');
  const res = await fetch('/api/questions-add', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + tk },
    body: JSON.stringify({
      user_id: 'alice',
      questions: [
        {
          q: `如图所示梁截面，$b\\times h=250\\times 500$，求惯性矩 $I$。<img src="data:image/png;base64,${png}" alt="截面">`,
          opts: ['A. 1.0×10⁹ mm⁴', 'B. 2.6×10⁹ mm⁴', 'C. 3.2×10⁹ mm⁴', 'D. 5.2×10⁹ mm⁴'],
          a: 'B',
          chapter: '力学',
          subject: '一建建筑',
        },
      ],
    }),
  });
  return { status: res.status, body: await res.text() };
}, PNG);
console.log('add =>', added.status, added.body.slice(0, 60));

await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('.tabbar', { timeout: 20000 });
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('.q-table', { timeout: 15000 });

const [download] = await Promise.all([
  page.waitForEvent('download', { timeout: 30000 }),
  page.click('[data-act="docx"]'),
]);
await download.saveAs(`${DL}\\export-img.docx`);
console.log('docx =>', download.suggestedFilename());
console.log('errors =>', errors.length ? errors.slice(0, 2) : 0);
await browser.close();
