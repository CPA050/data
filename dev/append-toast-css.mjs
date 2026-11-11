import fs from 'node:fs';

const p = 'web/src/styles/grid.css';
const add = `
/* toast：黑条只用一个小方点示意状态 */
.toast {
  border-left: 0;
}

.toast .toast-dot {
  width: 5px;
  height: 5px;
  border-radius: 0;
  background: #fff;
  opacity: 0.55;
  box-shadow: none;
}

.toast-success .toast-dot {
  background: var(--ok);
  opacity: 1;
}

.toast-error .toast-dot {
  background: var(--bad);
  opacity: 1;
}
`;

fs.appendFileSync(p, add, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('toast css ok');
