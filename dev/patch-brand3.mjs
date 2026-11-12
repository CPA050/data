import fs from 'node:fs';

const a = 'web/src/views/auth.ts';
let s = fs.readFileSync(a, 'utf8');

s = s.replace(
  '<rect x="19" y="19" width="62" height="62" fill="none" stroke="currentColor" stroke-width="11.5" />',
  '<rect x="18.5" y="18.5" width="63" height="63" fill="none" stroke="currentColor" stroke-width="4.2" />',
);
s = s.replace('<circle cx="50" cy="50" r="14.5" fill="currentColor" />', '<circle cx="50" cy="50" r="10" fill="currentColor" />');

fs.writeFileSync(a, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(a));
console.log(s.match(/stroke-width="[^"]+"/)?.[0], s.match(/r="10"/)?.[0]);
