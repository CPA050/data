import fs from 'node:fs';

const h = 'web/index.html';
let s = fs.readFileSync(h, 'utf8');

// 替换现有的 icon 链接块
s = s.replace(
  /<link rel="icon"[^>]*>\s*<link rel="icon"[^>]*>/,
  `<link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png" />`,
);

s = s.replace(
  '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />',
  `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0a0c0f" />`,
);

fs.writeFileSync(h, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(h));

// 顺便把 apple-mobile-web-app-title 统一成中文名
console.log(s.match(/<link rel="[^"]*icon[^>]*>/g));
