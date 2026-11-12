import fs from 'node:fs';

// 1) 行文案：去掉点号
const me = 'web/src/views/me.ts';
let m = fs.readFileSync(me, 'utf8');
m = m.replace('关于基准 · 快捷键', '关于基准与快捷键');
fs.writeFileSync(me, m, 'utf8');

// 2) 关于页细节
const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  `.about .kbd-row {
  padding: 7px 0;
}

.about .kbd {
  min-width: 92px;
}`,
  `.about .kbd-row {
  padding: 6px 0;
  grid-template-columns: minmax(84px, auto) 1fr auto;
  border-bottom: 1px solid var(--border);
}

/* 键帽也守直角，不搞圆角厚边 */
.about .kbd {
  justify-self: start;
  min-width: 0;
  padding: 1px 7px;
  font-size: 11px;
  border-radius: 0;
  border-bottom-width: 1px;
  background: transparent;
}

.about .kbd-desc {
  font-size: 12.5px;
}

.about .kbd-scope {
  font-size: 10.5px;
}`,
);
s = s.replace(
  `.about-ver {
  margin-left: auto;`,
  `.about-ver {
  margin-left: auto;
  margin-right: 30px;`,
);
fs.writeFileSync(p, s, 'utf8');

for (const f of [me, p]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('about polish ok');
