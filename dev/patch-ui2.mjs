import fs from 'node:fs';

// ---- 样式 ----
const p = 'web/src/styles/grid.css';
let s = fs.readFileSync(p, 'utf8');
if (!s.includes('.gen-thumb')) {
  s += `
/* AI 出题预览里的配图缩略图 */
.gen-item {
  display: block;
}

.gen-row {
  display: block;
  margin-bottom: 6px;
}

.gen-thumb {
  width: 100%;
  max-height: 128px;
  object-fit: contain;
  background: #fff;
  border: 1px solid var(--border);
  display: block;
}

/* 键盘可达性：统一焦点环 */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* 题库表头滚动时吸顶 */
.q-table thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--bg);
}

/* toast 抬到底栏之上，别压住内容 */
.toast-host {
  bottom: calc(84px + var(--safe-b));
  left: 12px;
  right: 12px;
  align-items: stretch;
  pointer-events: none;
}

.toast {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}
`;
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));

// ---- 假上游：生成题带 figure ----
const sp = 'dev/server.mjs';
let v = fs.readFileSync(sp, 'utf8');
if (!v.includes('"kind":"beam"')) {
  v = v.replace(
    "'chapter': '混凝土',",
    "'chapter': '混凝土',\n          figure: { kind: 'beam', caption: '简支梁受力图', span: 6, load: 'uniform', value: 20 },",
  );
  fs.writeFileSync(sp, v, 'utf8');
}
console.log('styles + fake figure');
