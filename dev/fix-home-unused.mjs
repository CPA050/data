import fs from 'node:fs';

const p = 'web/src/views/home.ts';
let s = fs.readFileSync(p, 'utf8');
s = s.replace('  const total = bank ? bank.length : 0;\n', '');
fs.writeFileSync(p, s, 'utf8');
console.log('removed total');
