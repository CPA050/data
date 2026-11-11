import fs from 'node:fs';

const p = 'web/src/styles/grid.css';
const add = `
/* 题干里的插图：列表里收窄，答题卡里限制高度 */
.item img,
.q-preview img {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  border: 1px solid var(--border);
  background: #fff;
  display: block;
  margin: 8px 0;
}

.q-text img {
  max-width: 100%;
  max-height: 320px;
  object-fit: contain;
  border: 1px solid var(--border);
  background: #fff;
  display: block;
  margin: 10px auto;
}

/* MathML 公式：跟随正文颜色与字号 */
.q-text math,
.item math,
.opt-text math,
.ans-body math {
  font-size: 1.02em;
  color: inherit;
}
`;

fs.appendFileSync(p, add, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('img css ok');
