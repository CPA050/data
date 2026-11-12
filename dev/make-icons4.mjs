import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'web/public';

// 小尺寸：环（16/32/48 都清晰）
function ringSvg(size) {
  const c = size / 2;
  const r = size * 0.33;
  const sw = Math.max(2, size * 0.125);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0c0f"/>
  <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#ffffff" stroke-width="${sw}"/>
</svg>`;
}

// 大尺寸：黑块 + 白色「原」
function glyphSvg(size, ratio = 0.6) {
  const fs2 = Math.round(size * ratio);
  const y = Math.round(size * 0.5 + fs2 * 0.355);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0c0f"/>
  <text x="${size / 2}" y="${y}" text-anchor="middle"
        font-family="Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif"
        font-size="${fs2}" font-weight="700" fill="#ffffff">原</text>
</svg>`;
}

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

async function shoot(size, svg, name) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(`<style>html,body{margin:0;background:#0a0c0f}svg{display:block}</style>${svg}`, { waitUntil: 'load' });
  await page.waitForTimeout(90);
  await page.screenshot({ path: `${OUT}/${name}` });
  console.log(name, fs.statSync(`${OUT}/${name}`).size);
  await page.close();
}

await shoot(16, ringSvg(16), 'icon-16.png');
await shoot(32, ringSvg(32), 'icon-32.png');
await shoot(48, ringSvg(48), 'icon-48.png');
await shoot(180, glyphSvg(180), 'apple-touch-icon.png');
await shoot(192, glyphSvg(192), 'icon-192.png');
await shoot(512, glyphSvg(512), 'icon-512.png');
await shoot(512, glyphSvg(512, 0.46), 'icon-maskable-512.png');

// 32px 的 PNG 也直接当 favicon 用（老浏览器兜底）
fs.copyFileSync(`${OUT}/icon-32.png`, `${OUT}/favicon.png`);

await browser.close();

// 多尺寸 ICO：16 / 32 / 48
const sizes = [16, 32, 48];
const pngs = sizes.map((s) => fs.readFileSync(`${OUT}/icon-${s}.png`));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + sizes.length * 16;
const dirs = sizes.map((s, i) => {
  const buf = pngs[i];
  const d = Buffer.alloc(16);
  d.writeUInt8(s, 0);
  d.writeUInt8(s, 1);
  d.writeUInt16LE(1, 4);
  d.writeUInt16LE(32, 6);
  d.writeUInt32LE(buf.length, 8);
  d.writeUInt32LE(offset, 12);
  offset += buf.length;
  return d;
});
fs.writeFileSync(`${OUT}/favicon.ico`, Buffer.concat([header, ...dirs, ...pngs]));
console.log('favicon.ico', fs.statSync(`${OUT}/favicon.ico`).size);

// Safari 固定标签：单色 SVG（浏览器会按主题着色）
fs.writeFileSync(
  `${OUT}/safari-pinned-tab.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#0a0c0f"/><circle cx="50" cy="50" r="33" fill="none" stroke="#ffffff" stroke-width="12.5"/></svg>`,
);
console.log('safari-pinned-tab.svg ok');
