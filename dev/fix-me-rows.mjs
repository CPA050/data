import fs from 'node:fs';

const me = 'web/src/views/me.ts';
let s = fs.readFileSync(me, 'utf8');
const before = (s.match(/style="justify-content:flex-start"/g) || []).length;
s = s.split(' style="justify-content:flex-start"').join('');
fs.writeFileSync(me, s, 'utf8');
console.log('removed inline justify:', before);

const css = 'web/src/styles/atelier.css';
let c = fs.readFileSync(css, 'utf8');
c += `
/* 行与行之间只留一条线 */
.btn-block {
  border-bottom: 0;
  padding: 15px 2px;
}

.btn-block + .btn-block {
  border-top: 1px solid var(--border);
}

.btn-block + .divider,
.card .divider {
  display: none;
}
`;
fs.writeFileSync(css, c, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(css));
console.log('css appended');
