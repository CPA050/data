import fs from 'node:fs';

// 1) home.ts：去掉刻度与目标，只保留"今日已练 + 正确率 + 连练"
const h = 'web/src/views/home.ts';
let s = fs.readFileSync(h, 'utf8');

s = s.replace(
  /        <div class="today-goal">[\s\S]*?<\/div>\n/,
  '',
);

s = s.replace(
  '<span class="today-side">${stats.today.n ? `正确率 <b>${rateText}</b>` : \'今天还没开始\'}</span>',
  '<span class="today-side">${stats.today.n ? `正确率 <b>${rateText}</b>${stats.streak > 1 ? ` · 连练 <b>${stats.streak}</b> 天` : \'\'}` : \'今天还没开始\'}</span>',
);

// 不再需要目标常量
s = s.replace(
  "import { DAILY_GOAL, summary as statsSummary } from '../core/stats';",
  "import { summary as statsSummary } from '../core/stats';",
);

fs.writeFileSync(h, s, 'utf8');

// 2) stats.ts：删掉 DAILY_GOAL
const st = 'web/src/core/stats.ts';
let t = fs.readFileSync(st, 'utf8');
t = t.replace("/** 每天的目标题量，首页进度条用 */\nexport const DAILY_GOAL = 20;\n\n", '');
fs.writeFileSync(st, t, 'utf8');

for (const f of [h, st]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('goal removed:', !s.includes('today-ticks') && !s.includes('DAILY_GOAL'));
