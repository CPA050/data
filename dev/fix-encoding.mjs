import fs from 'node:fs';
import path from 'node:path';

const roots = ['web/src', 'functions', 'dev'];
const exts = /\.(css|ts|js|mjs|html|md|sql|json)$/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'dist') continue;
      walk(p, out);
    } else if (exts.test(e.name)) out.push(p);
  }
  return out;
}

const files = ['web/src/styles/glass.css', 'web/src/styles/app.css', 'web/src/styles/tokens.css', 'README.md', ...roots.flatMap((r) => (fs.existsSync(r) ? walk(r) : []))];

for (const f of [...new Set(files)]) {
  if (!fs.existsSync(f)) continue;
  const buf = fs.readFileSync(f);
  let decoded;
  try {
    decoded = new TextDecoder('utf-8', { fatal: true }).decode(buf);
    if (decoded.charCodeAt(0) === 0xfeff) {
      fs.writeFileSync(f, decoded.slice(1), 'utf8');
      console.log('bom stripped:', f);
    }
    continue;
  } catch {
    decoded = new TextDecoder('gbk').decode(buf);
    fs.writeFileSync(f, decoded, 'utf8');
    console.log('gbk -> utf8:', f);
  }
}
console.log('scan done');
