import fs from 'node:fs';

// 1) index.html：改用 /icons/ 下的新路径（换 URL = 绕过浏览器 favicon 缓存）
const h = 'web/index.html';
let s = fs.readFileSync(h, 'utf8');
s = s.replace(
  /<link rel="icon" href="\/favicon\.ico" sizes="any" \/>[\s\S]*?<link rel="mask-icon"[^>]*>/,
  `<link rel="icon" href="/icons/favicon.ico" sizes="any" />
    <link rel="shortcut icon" href="/icons/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch.png" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0a0c0f" />`,
);
fs.writeFileSync(h, s, 'utf8');

// 2) manifest icons
const v = 'vite.config.ts';
let t = fs.readFileSync(v, 'utf8');
t = t.replace(/icons: \[[\s\S]*?\],/, `icons: [
          { src: '/icons/app-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/app-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/app-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],`);
fs.writeFileSync(v, t, 'utf8');

for (const f of [h, v]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log(s.match(/<link rel="icon"[^>]*>/g).length, 'icon links');
console.log(t.match(/icons: \[[\s\S]*?\],/)[0].split('\n').length, 'manifest lines');
