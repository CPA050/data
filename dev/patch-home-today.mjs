import fs from 'node:fs';

const p = 'web/src/views/home.ts';
let s = fs.readFileSync(p, 'utf8');

// 引入统计
if (!s.includes("from '../core/stats'")) {
  s = s.replace(
    "import { getProgress, getSession, hasWelcomedToday, markWelcomed } from '../core/storage';",
    "import { getProgress, getSession, hasWelcomedToday, markWelcomed } from '../core/storage';\nimport { DAILY_GOAL, summary as statsSummary } from '../core/stats';",
  );
}

// 计算今日数据
if (!s.includes('const stats = statsSummary();')) {
  s = s.replace(
    '  const num = (v: number | undefined) => (v === undefined ? \'—\' : pad2(v));',
    [
      "  const num = (v: number | undefined) => (v === undefined ? '—' : pad2(v));",
      '  const stats = statsSummary();',
      '  const todayN = stats.today.n;',
      '  const goalPct = Math.min(100, Math.round((todayN / DAILY_GOAL) * 100));',
      "  const rateText = stats.today.n ? `${Math.round(stats.today.rate * 100)}%` : '—';",
    ].join('\n'),
  );
}

// 用"今日进度"替换 练 N 题
const oldTitle = `      <h1 class="mast-title mast-title-sm">
        练 <em>\${pad2(suggestion)}</em> 题
      </h1>`;

const newTitle = `      <div class="today">
        <div class="today-head">
          <span class="today-num">\${pad2(todayN)}</span>
          <span class="today-cap">题<small>今日已练</small></span>
          <span class="today-side">
            正确率 <b>\${rateText}</b>
          </span>
        </div>
        <div class="today-goal">
          <span class="today-bar"><i style="width:\${goalPct}%"></i></span>
          <span class="today-goal-cap">目标 \${DAILY_GOAL} 题\${stats.streak > 1 ? ` · 连续 \${stats.streak} 天` : ''}</span>
        </div>
      </div>`;

if (!s.includes('class="today"')) {
  s = s.replace(oldTitle, newTitle);
}

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('home hero replaced:', s.includes('class="today"'), '| suggestion left:', s.includes('suggestion'));
