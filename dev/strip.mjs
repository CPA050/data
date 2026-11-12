import fs from 'node:fs';

const p = 'dev/dbg-stats.mjs';
let s = fs.readFileSync(p, 'utf8');
s = s.split(' as HTMLElement | null').join('');
s = s.split(' as HTMLElement').join('');
fs.writeFileSync(p, s, 'utf8');
console.log('stripped');
