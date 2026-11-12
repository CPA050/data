import fs from 'node:fs';

const h = 'web/src/views/home.ts';
let s = fs.readFileSync(h, 'utf8');
s = s.replace(
  '<span class="today-cap">题<small>今日已练</small></span>',
  '<span class="today-unit">题 · 今日已练</span>',
);
fs.writeFileSync(h, s, 'utf8');

const c = 'web/src/styles/responsive.css';
let t = fs.readFileSync(c, 'utf8');
if (!t.includes('.today-unit')) {
  t = t.replace(
    '.today-cap {',
    `.today-unit {
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--text-2);
  white-space: nowrap;
}

.today-cap {`,
  );
  t += `
/* 进度条与下方数据条之间留一点空气 */
.stat-strip {
  margin-top: 18px;
}
`;
  fs.writeFileSync(c, t, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(h));
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(c));
console.log('today layout refined');
