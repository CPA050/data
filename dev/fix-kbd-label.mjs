import fs from 'node:fs';

const p = 'web/src/features/shortcuts.ts';
let s = fs.readFileSync(p, 'utf8');
s = s.replace("{ keys: '/ 或 ⌘K',", "{ keys: '/ 或 Ctrl+K',");
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log(s.includes("Ctrl+K"));
