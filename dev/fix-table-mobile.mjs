import fs from 'node:fs';

const p = 'web/src/styles/grid.css';
let s = fs.readFileSync(p, 'utf8');
s += `
/* 窄屏：表格只保留 编号 / 题干 / 题型 / 操作，避免题干被挤成竖排 */
@media (max-width: 620px) {
  .q-table .c-chapter,
  .q-table .c-ans {
    display: none;
  }

  .q-table .c-no {
    width: 34px;
  }

  .q-table .c-type {
    width: 52px;
  }

  .q-table .c-act {
    width: 36px;
  }

  .q-table th,
  .q-table td {
    padding: 10px 8px;
  }
}
`;
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));

const shot = 'dev/shots-grid2.mjs';
let t = fs.readFileSync(shot, 'utf8');
t = t.replace(
  "await page.waitForSelector('.q-table', { timeout: 15000 });",
  "await page.waitForSelector('.q-table', { timeout: 15000 });\nawait page.waitForTimeout(800);",
);
fs.writeFileSync(shot, t, 'utf8');
console.log('responsive table + shot delay ok');
