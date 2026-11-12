import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
if (!s.includes('.modal-layer {\n  z-index')) {
  s += `
/* 弹窗要盖在 toast 之上：否则底部的提示条会压住「关闭」按钮 */
.modal-layer {
  z-index: 130;
}
`;
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('modal above toast');
