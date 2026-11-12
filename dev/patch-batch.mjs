import fs from 'node:fs';

const g = 'web/src/features/generate.ts';
let s = fs.readFileSync(g, 'utf8');

s = s.replace('  let dupes = 0;\n  let failed = 0;', '  let dupes = 0;\n  let failed = 0;\n  let emptyStreak = 0;');

s = s.replace(
  '    for (const d of drafts) {\n      const key = norm(d.q);',
  '    const before = collected.length;\n    for (const d of drafts) {\n      const key = norm(d.q);',
);

s = s.replace(
  "    paintProgress(collected.length, target, dupes ? `去重 ${dupes} 道` : '');\n    await sleep(250);",
  "    emptyStreak = collected.length > before ? 0 : emptyStreak + 1;\n    if (emptyStreak >= 3) {\n      stopReason = '模型开始重复出同一批题，先停在这里';\n      break;\n    }\n    paintProgress(collected.length, target, dupes ? `去重 ${dupes} 道` : '');\n    await sleep(250);",
);

fs.writeFileSync(g, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(g));

const css = 'web/src/styles/grid.css';
let c = fs.readFileSync(css, 'utf8');
c += `
/* 批量出题进度 */
.gen-progress .gen-bar {
  height: 6px;
  background: color-mix(in srgb, var(--text) 10%, transparent);
  overflow: hidden;
}

.gen-progress .gen-bar i {
  display: block;
  height: 100%;
  width: 0;
  background: var(--accent);
  transition: width 0.28s var(--ease-out, ease);
}

.gen-progress .import-list {
  border-top: 1px solid var(--border);
  padding-top: 8px;
}
`;
fs.writeFileSync(css, c, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(css));
console.log('batch guard + progress css ok');
