import fs from 'node:fs';

const p = 'dev/shots-types.mjs';
let s = fs.readFileSync(p, 'utf8');

// 加完题后重载，让科目列表刷新
s = s.replace(
  "log('stored types =>', JSON.stringify(types));",
  "log('stored types =>', JSON.stringify(types));\nawait page.reload({ waitUntil: 'domcontentloaded' });\nawait page.waitForSelector('.tabbar', { timeout: 20000 });\nawait page.waitForTimeout(700);",
);

// 题型标签选择器更宽松
s = s.replace(
  "const tag = (await page.locator('.q-card .muted.small, .quiz .muted.small').first().innerText().catch(() => '')).trim();",
  "const tag = (await page.locator('.quiz .q-head').first().innerText().catch(() => '')).replace(/\\s+/g, ' ').trim();",
);

fs.writeFileSync(p, s, 'utf8');
console.log('script updated');
