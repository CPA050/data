import fs from 'node:fs';

const v = 'vite.config.ts';
let t = fs.readFileSync(v, 'utf8');

t = t.replace(
  /\{ src: '\/icon-512\.png', sizes: '512x512', type: 'image\/png', purpose: 'maskable' \},/,
  `{ src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },`,
);

fs.writeFileSync(v, t, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(v));
console.log(t.match(/maskable[^\n]*/)?.[0]);
