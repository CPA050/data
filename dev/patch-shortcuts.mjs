import fs from 'node:fs';

const p = 'web/src/features/shortcuts.ts';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  "import { openModal } from '../ui/modal';",
  "import { openModal } from '../ui/modal';\nimport { openSearch } from './search';",
);
s = s.replace(
  "  { keys: '/', desc: '聚焦题库搜索框', scope: '题库页' },",
  "  { keys: '/ 或 Ctrl+K', desc: '全局搜索（题库 / 错题 / 收藏）', scope: '全局' },",
);
s = s.replace(
  `  document.addEventListener('keydown', (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    if (document.querySelector('.quiz')) return;`,
  `  document.addEventListener('keydown', (ev) => {
    const cmdK = (ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k';
    if (cmdK) {
      if (document.querySelector('.quiz')) return;
      ev.preventDefault();
      openSearch();
      return;
    }
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    if (document.querySelector('.quiz')) return;`,
);
s = s.replace(
  `    if (ev.key === '/') {
      const input = document.querySelector<HTMLInputElement>('.view input[data-role="search"]');
      if (input) {
        ev.preventDefault();
        input.focus();
      }
      return;
    }`,
  `    if (ev.key === '/') {
      ev.preventDefault();
      openSearch();
      return;
    }`,
);

fs.writeFileSync(p, s, 'utf8');
console.log('shortcuts patched');
