import fs from 'node:fs';

const p = 'web/src/core/stats.ts';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  'export interface StatsSummary {',
  '/** 每天的目标题量，首页进度条用 */\nexport const DAILY_GOAL = 20;\n\nexport interface StatsSummary {',
);
s = s.replace(
  '  days7: DayStat[];\n}',
  '  days7: DayStat[];\n  /** 连续练习天数（今天没练就从昨天往前数） */\n  streak: number;\n}',
);
s = s.replace(
  '  return {\n    total,',
  `  const dayKeys = new Set(list.map((e) => new Date(e.ts).toDateString()));
  let streak = 0;
  const cursor = new Date();
  if (!dayKeys.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
  while (dayKeys.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    total,`,
);
s = s.replace('    days7: days.slice(-7),\n  };', '    days7: days.slice(-7),\n    streak,\n  };');

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('stats streak:', s.includes('streak,'));
