import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'web/public';

// 每个尺寸单独调「光学」比例：小图标线要粗、点要大；大图标要收敛
const SPEC = {
  16: { pad: 0.155, sw: 0.125, dot: 0.155 },
  32: { pad: 0.165, sw: 0.098, dot: 0.145 },
  48: { pad: 0.17, sw: 0.083, dot: 0.138 },
  180: { pad: 0.185, sw: 0.052, dot: 0.112 },
  192: { pad: 0.185, sw: 0.052, dot: 0.112 },
  512: { pad: 0.185, sw: 0.042, dot: 0.1 },
};

function markSvg(size, spec) {
  const p = size * spec.pad;
  const sw = Math.max(1.6, size * spec.sw);
  const d = size * spec.dot;
  const c = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0c0f"/>
  <rect x="${p}" y="${p}" width="${size - p * 2}" height="${size - p * 2}" fill="none" stroke="#ffffff" stroke-width="${sw}"/>
  <circle cx="${c}" cy="${c}" r="${d}" fill="#ffffff"/>
</svg>`;
}

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

async function shoot(size, svg, name) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(`<style>html,body{margin:0;background:#0a0c0f}svg{display:block}</style>${svg}`, { waitUntil: 'load' });
  await page.waitForTimeout(80);
  await page.screenshot({ path: `${OUT}/${name}` });
  console.log(name, fs.statSync(`${OUT}/${name}`).size);
  await page.close();
}

for (const size of [16, 32, 48, 192, 512]) {
  const name = size === 32 ? 'favicon.png' : `icon-${size}.png`;
  await shoot(size, markSvg(size, SPEC[size]), `icon-${size}.png`);
  if (size === 32) fs.copyFileSync(`${OUT}/icon-32.png`, `${OUT}/favicon.png`);
}

await shoot(180, markSvg(180, SPEC[180]), 'apple-touch-icon.png');
// maskable：把整组元素缩到 76% 居中，圆形遮罩也安全
await shoot(512, markSvg(512, { pad: 0.28, sw: 0.045, dot: 0.095 }), 'icon-maskable-512.png');

await browser.close();

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
