import fs from 'node:fs';

const p = 'web/src/styles/atelier.css';
const buf = fs.readFileSync(p);
const marker = Buffer.from([0xca, 0xd5, 0xce, 0xb2, 0xd0, 0xde, 0xd5, 0xfd]); // GBK: 收尾修正
const at = buf.indexOf(marker);
if (at < 0) throw new Error('marker not found');
// 回退到这段注释的起始位置
let start = buf.lastIndexOf(Buffer.from('/* ----------'), at);
if (start < 0) start = at - 20;
const head = buf.subarray(0, start).toString('utf8').replace(/\s+$/, '');

const tail = `
/* ---------- 收尾修正 ---------- */
.hero::after {
  display: none;
}

.hero {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.action-list .action:first-child {
  border-top: 0;
}

.tabbar .tab-btn.is-active .tab-ico,
.tabbar .tab-btn.is-active .tab-label {
  background: none;
  box-shadow: none;
}

/* 答题页右侧三个动作：细线圆钮 */
.fab {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  border: 1px solid var(--border);
  box-shadow: none;
  color: var(--text-2);
  font-family: var(--font-serif);
  font-size: 15px;
  line-height: 1;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transition: border-color 0.2s var(--ease-out), color 0.2s var(--ease-out), transform 0.2s var(--ease-out);
}

.fab:hover {
  border-color: var(--border-strong);
  color: var(--text);
  transform: none;
}

.fab:active {
  transform: scale(0.94);
}

.fab[data-on='true'] {
  color: var(--accent-2);
  border-color: color-mix(in srgb, var(--accent-2) 45%, transparent);
}
`;

fs.writeFileSync(p, head + '\n' + tail, 'utf8');
const check = fs.readFileSync(p);
new TextDecoder('utf-8', { fatal: true }).decode(check);
console.log('rewritten as utf-8, bytes =', check.length);
