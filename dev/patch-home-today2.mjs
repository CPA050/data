import fs from 'node:fs';

const p = 'web/src/views/home.ts';
let s = fs.readFileSync(p, 'utf8');

if (!s.includes("from '../core/stats'")) {
  s = s.replace(
    "import { getProgress, getSession, hasWelcomedToday, markWelcomed } from '../core/storage';",
    "import { getProgress, getSession, hasWelcomedToday, markWelcomed } from '../core/storage';\nimport { DAILY_GOAL, summary as statsSummary } from '../core/stats';",
  );
}

if (!s.includes('const stats = statsSummary();')) {
  s = s.replace(
    "  const num = (v: number | undefined) => (v === undefined ? '—' : pad2(v));",
    [
      "  const num = (v: number | undefined) => (v === undefined ? '—' : pad2(v));",
      '  const stats = statsSummary();',
      '  const todayN = stats.today.n;',
      '  const goalPct = Math.min(100, Math.round((todayN / DAILY_GOAL) * 100));',
      "  const rateText = stats.today.n ? `${Math.round(stats.today.rate * 100)}%` : '—';",
    ].join('\n'),
  );
}

const block = fs.readFileSync('dev/home-today.txt', 'utf8').replace(/\n$/, '');

const start = '      <h1 class="mast-title mast-title-sm">';
const end = '      </h1>';
const i = s.indexOf(start);
if (i >= 0 && !s.includes('class="today"')) {
  const j = s.indexOf(end, i);
  s = s.slice(0, i) + block + s.slice(j + end.length);
}

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('today block:', s.includes('class="today"'));
