import fs from 'node:fs';

const p = 'web/src/views/home.ts';
let s = fs.readFileSync(p, 'utf8');
s = s.replace('  const goalPct = Math.min(100, Math.round((todayN / DAILY_GOAL) * 100));\n', '');
fs.writeFileSync(p, s, 'utf8');
console.log('goalPct removed');
