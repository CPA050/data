import fs from 'node:fs';

const p = 'web/src/views/home.ts';
let s = fs.readFileSync(p, 'utf8');
const pairs = [
  ['<span class="action-ico">⚡</span>', '<span class="action-ico">${ICONS.random}</span>'],
  ['<span class="action-ico">▤</span>', '<span class="action-ico">${ICONS.sequential}</span>'],
  ['<span class="action-ico">❖</span>', '<span class="action-ico">${ICONS.chapter}</span>'],
  ['<span class="action-ico red">⚑</span>', '<span class="action-ico red">${ICONS.wrong}</span>'],
  ['<span class="action-ico green">↻</span>', '<span class="action-ico green">${ICONS.resume}</span>'],
];
let n = 0;
for (const [from, to] of pairs) {
  if (s.includes(from)) {
    s = s.replace(from, to);
    n += 1;
  } else {
    console.log('missing:', from);
  }
}
fs.writeFileSync(p, s);
console.log('replaced', n);
