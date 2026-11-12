import fs from 'node:fs';

// 1) index.html：换成新图标
const h = 'web/index.html';
let s = fs.readFileSync(h, 'utf8');
s = s.replace(
  '<link rel="icon" type="image/png" href="/favicon.png" />',
  `<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />`,
);
s = s.replace('<link rel="apple-touch-icon" href="/favicon.png" />', '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />');
fs.writeFileSync(h, s, 'utf8');

// 2) manifest icons
const v = 'vite.config.ts';
let t = fs.readFileSync(v, 'utf8');
t = t.replace(
  /icons: \[[\s\S]*?\],/,
  `icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],`,
);
fs.writeFileSync(v, t, 'utf8');

// 3) sync-root：favicon 也要同步（现在是新图标）
const sr = 'dev/sync-root.mjs';
let u = fs.readFileSync(sr, 'utf8');
u = u.replace("  if (entry.name === 'favicon.png') continue; // 根目录已有同名文件\n", '');
fs.writeFileSync(sr, u, 'utf8');

for (const f of [h, v, sr]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('icons wired:', s.includes('icon-192.png'), t.includes("'/icon-512.png'"), !u.includes('continue'));
