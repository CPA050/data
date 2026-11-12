import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  "  const typeEl = card.querySelector<HTMLSelectElement>('[data-role=\"type\"]');",
  "  const typeEl = body.querySelector<HTMLSelectElement>('[data-role=\"type\"]');",
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('typeEl scope fixed');
