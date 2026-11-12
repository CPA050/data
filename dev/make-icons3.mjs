import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'web/public';

// 大尺寸：黑块 + 白色「原」
function glyphSvg(size, glyphRatio = 0.62) {
  const fs2 = Math.round(size * glyphRatio);
  const y = Math.round(size * 0.5 + fs2 * 0.355);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0c0f"/>
  <text x="${size / 2}" y="${y}" text-anchor="middle"
        font-family="Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif"
        font-size="${fs2}" font-weight="700" fill="#ffffff">原</text>
</svg>`;
}

// 小尺寸（16/32）：笔画太密，改用「原点」几何标记 —— 一个环 + 一个点
function markSvg(size) {
  const c = size / 2;
  const r = size * 0.315;
  const dot = size * 0.115;
  const sw = Math.max(1, Math.round(size * 0.09));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0c0f"/>
  <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#ffffff" stroke-width="${sw}"/>
  <circle cx="${c}" cy="${c}" r="${dot}" fill="#ffffff"/>
</svg>`;
}

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

async function shoot(size, html, name) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#0a0c0f}svg{display:block}</style>${html}`,
    { waitUntil: 'load' },
  );
  await page.waitForTimeout(100);
  await page.screenshot({ path: `${OUT}/${name}` });
  console.log(name, fs.statSync(`${OUT}/${name}`).size);
  await page.close();
}

// 需要两份小图标：一个给 favicon.ico，一个给页面
await shoot(16, markSvg(16), 'icon-16.png');
await shoot(32, markSvg(32), 'icon-32.png');
await shoot(48, markSvg(48), 'icon-48.png');
await shoot(180, glyphSvg(180, 0.6), 'apple-touch-icon.png');
await shoot(192, glyphSvg(192, 0.6), 'icon-192.png');
await shoot(512, glyphSvg(512, 0.6), 'icon-512.png');
// maskable：内容收进 80% 安全区（圆形遮罩也不会切到字）
await shoot(512, glyphSvg(512, 0.46), 'icon-maskable-512.png');
await shoot(32, glyphSvg(32, 0.62), 'favicon-legacy.png');

await browser.close();

// 打包多尺寸 ICO（PNG 内嵌，现代浏览器都支持）
const sizes = [16, 32, 48];
const pngs = sizes.map((s) => fs.readFileSync(`${OUT}/icon-${s}.png`));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);

let offset = 6 + sizes.length * 16;
const dirs = [];
for (let i = 0; i < sizes.length; i += 1) {
  const buf = pngs[i];
  const d = Buffer.alloc(16);
  d.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0);
  d.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1);
  d.writeUInt8(0, 2);
  d.writeUInt8(0, 3);
  d.writeUInt16LE(1, 4);
  d.writeUInt16LE(32, 6);
  d.writeUInt32LE(buf.length, 8);
  d.writeUInt32LE(offset, 12);
  offset += buf.length;
  dirs.push(d);
}

const ico = Buffer.concat([header, ...dirs, ...pngs]);
fs.writeFileSync(`${OUT}/favicon.ico`, ico);
console.log('favicon.ico', ico.length);
