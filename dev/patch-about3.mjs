import fs from 'node:fs';

const sc = 'web/src/features/shortcuts.ts';
let s = fs.readFileSync(sc, 'utf8');
s = s.replace("{ keys: '1 2 3 4 / A B C D', desc: '选择对应选项', scope: '答题中' },", "{ keys: '1–4 / A–D', desc: '选择对应选项', scope: '答题中' },");
s = s.replace("{ keys: '1 – 5', desc: '切换 首页 / 题库 / 错题 / 收藏 / 我的', scope: '非答题时' },", "{ keys: '1–5', desc: '切换 首页 / 题库 / 错题 / 收藏 / 我的', scope: '非答题时' },");
s = s.replace("{ keys: '/ 或 Ctrl+K', desc: '全局搜索（题库 / 错题 / 收藏）', scope: '全局' },", "{ keys: '/ 或 ⌘K', desc: '全局搜索（题库 / 错题 / 收藏）', scope: '全局' },");
fs.writeFileSync(sc, s, 'utf8');

const p = 'web/src/styles/responsive.css';
let t = fs.readFileSync(p, 'utf8');
t = t.replace(
  `  grid-template-columns: minmax(84px, auto) 1fr auto;
  border-bottom: 1px solid var(--border);`,
  `  grid-template-columns: 104px 1fr auto;
  border-bottom: 1px solid var(--border);`,
);
t = t.replace(
  `  padding: 1px 7px;
  font-size: 11px;`,
  `  padding: 1px 6px;
  font-size: 10.5px;
  max-width: 104px;
  overflow: hidden;
  text-overflow: ellipsis;`,
);
fs.writeFileSync(p, t, 'utf8');

for (const f of [sc, p]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('kbd alignment ok');
