import fs from 'node:fs';

const h = 'web/src/views/home.ts';
let s = fs.readFileSync(h, 'utf8');

// 副标题：没练时不要写"正确率 —"
s = s.replace(
  '<span class="today-side">正确率 <b>${rateText}</b></span>',
  '<span class="today-side">${stats.today.n ? `正确率 <b>${rateText}</b>` : \'今天还没开始\'}</span>',
);

// 进度条换成刻度（更有编辑感，0 题时也成立）
s = s.replace(
  `          <span class="today-bar"><i style="width:\${goalPct}%"></i></span>`,
  '          <span class="today-ticks">${Array.from({ length: DAILY_GOAL }, (_, i) => `<i class="${i < todayN ? \'on\' : \'\'}"></i>`).join(\'\')}</span>',
);

// 目标文案带上已完成比例
s = s.replace(
  '<span class="today-goal-cap">目标 ${DAILY_GOAL} 题${stats.streak > 1 ? ` · 连续 ${stats.streak} 天` : \'\'}</span>',
  '<span class="today-goal-cap">${todayN} / ${DAILY_GOAL}${stats.streak > 1 ? ` · 连练 ${stats.streak} 天` : \'\'}</span>',
);

fs.writeFileSync(h, s, 'utf8');

const c = 'web/src/styles/responsive.css';
let t = fs.readFileSync(c, 'utf8');
if (!t.includes('.today-ticks')) {
  t += `
/* 今日目标：刻度条 */
.today-ticks {
  display: flex;
  flex: 1;
  gap: 3px;
  align-items: center;
}

.today-ticks i {
  flex: 1;
  height: 9px;
  max-width: 6px;
  background: color-mix(in srgb, var(--text) 14%, transparent);
  transition: background 0.25s ease;
}

.today-ticks i.on {
  background: var(--text);
}
`;
  fs.writeFileSync(c, t, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(h));
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(c));
console.log('ticks:', s.includes('today-ticks'), '| side:', s.includes('今天还没开始'));
