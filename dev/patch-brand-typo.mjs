import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
if (!s.includes('中文品牌字')) {
  s += `
/* 中文品牌字：不用大写拉丁的宽字距，改成更适合汉字的排法 */
.app-header .brand,
.sidebar-brand {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3em;
  text-indent: 0.3em; /* 抵消行尾多出来的一格字距，视觉居中 */
  text-transform: none;
}

.auth-title {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-indent: 0.16em;
}

.brand-sub {
  letter-spacing: 0.06em;
}

/* 打印试卷的抬头也跟着换 */
.sheet-kicker {
  letter-spacing: 0.18em;
}
`;
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('brand typography tuned');
