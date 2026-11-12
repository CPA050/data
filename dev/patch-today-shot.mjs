import fs from 'node:fs';

const p = 'dev/shots-today.mjs';
let s = fs.readFileSync(p, 'utf8');
if (!s.includes('oq:log')) {
  s = s.replace(
    "await page.waitForTimeout(900);\n\nconst hero",
    `await page.waitForTimeout(900);

// 造几条今天的记录，验证刻度与正确率
await page.evaluate(() => {
  const now = Date.now();
  const list = [];
  for (let i = 0; i < 7; i += 1) list.push({ ts: now - i * 60000, type: i % 3 === 0 ? 'multi' : 'single', ok: i % 4 !== 0 });
  localStorage.setItem('oq:log', JSON.stringify(list));
});
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('.today', { timeout: 20000 });
await page.waitForTimeout(700);

const hero`,
  );
  fs.writeFileSync(p, s, 'utf8');
}
console.log('seed log added');
