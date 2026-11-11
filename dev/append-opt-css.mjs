import fs from 'node:fs';

const p = 'web/src/styles/grid.css';
const add = `
/* 选项状态：用 data-state 精确命中（组件用属性而非类名） */
.opt[data-state='correct'] {
  border-width: 2px;
  border-color: var(--ok);
  background: var(--surface);
}

.opt[data-state='wrong'] {
  border-width: 2px;
  border-color: var(--bad);
  background: var(--surface);
}

.opt[data-state='picked'] {
  border-width: 2px;
  border-color: var(--text);
  background: var(--surface);
}

.opt[data-state='muted'] {
  border-color: var(--border);
  background: var(--surface);
  opacity: 0.42;
}

.opt[data-state='correct'] .opt-key {
  background: var(--ok);
  border-color: var(--ok);
  color: #fff;
}

.opt[data-state='wrong'] .opt-key {
  background: var(--bad);
  border-color: var(--bad);
  color: #fff;
}
`;

fs.appendFileSync(p, add, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('appended ok');
