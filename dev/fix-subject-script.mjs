import fs from 'node:fs';

const p = 'dev/shots-subject.mjs';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  `// 我的 -> 练习记录
await page.click('.tab-btn[data-tab="me"]');`,
  `// 退出答题，回到外壳
const exitBtn = page.locator('.quiz [data-act="exit"]');
if (await exitBtn.count()) await exitBtn.first().click();
await page.waitForTimeout(500);
const yes = page.locator('.modal-actions button', { hasText: '退出' });
if (await yes.count()) await yes.first().click();
await page.waitForTimeout(600);

// 我的 -> 练习记录
await page.click('.tab-btn[data-tab="me"]');`,
);

fs.writeFileSync(p, s, 'utf8');
console.log('exit step added');
