import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
s += `
/* 首页头部：统计条自带上下发丝线，头部不再多一条线、不再留 26px 尾距 */
.masthead {
  padding: 18px 0 0;
  border-bottom: 0;
}
`;
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('masthead tightened');
