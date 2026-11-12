import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
if (!s.includes('.brand-mark')) {
  s += `
/* 品牌方块：与图标同一形态（直角黑块 + 白字） */
.brand-mark {
  border-radius: 2px;
  background: #0a0c0f;
  color: #fff;
  font-weight: 700;
}
`;
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('brand mark squared');
