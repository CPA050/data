import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'web/public';

// 统一标记：黑方 + 白色方框 + 中心点（「原点」）
// pad 控制方框内缩，maskable 用更大 pad 保证安全区
function markSvg(size, pad = 0.19) {
  const p = size * pad;
  const sw = Math.max(1.5, size * 0.115);
  const d = size * 0.145;
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

await shoot(16, markSvg(16), 'icon-16.png');
await shoot(32, markSvg(32), 'icon-32.png');
await shoot(48, markSvg(48), 'icon-48.png');
await shoot(180, markSvg(180), 'apple-touch-icon.png');
await shoot(192, markSvg(192), 'icon-192.png');
await shoot(512, markSvg(512), 'icon-512.png');
// maskable：内容压到 ~62% 直径内，圆形/圆角遮罩都不会切到
await shoot(512, markSvg(512, 0.26), 'icon-maskable-512.png');

fs.copyFileSync(`${OUT}/icon-32.png`, `${OUT}/favicon.png`);

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

fs.writeFileSync(
  `${OUT}/safari-pinned-tab.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#0a0c0f"/><rect x="19" y="19" width="62" height="62" fill="none" stroke="#ffffff" stroke-width="11.5"/><circle cx="50" cy="50" r="14.5" fill="#ffffff"/></svg>`,
);
console.log('pinned tab ok');
