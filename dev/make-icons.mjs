import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'web/public';

function svg(size) {
  const r = Math.round(size * 0.30);
  const fs2 = Math.round(size * 0.6);
  const y = Math.round(size * 0.735);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0c0f"/>
  <text x="${size / 2}" y="${y}" text-anchor="middle"
        font-family="Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif"
        font-size="${fs2}" font-weight="700" fill="#ffffff" letter-spacing="0">原</text>
  <rect x="${size - r - Math.round(size * 0.06)}" y="${Math.round(size * 0.06)}" width="${r}" height="${Math.round(size * 0.012)}" fill="#ffffff" opacity="0.5"/>
</svg>`;
}

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

for (const size of [32, 180, 192, 512]) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#0a0c0f}svg{display:block}</style>${svg(size)}`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForTimeout(120);
  const name = size === 32 ? 'favicon.png' : size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
  await page.screenshot({ path: `${OUT}/${name}`, omitBackground: false });
  const stat = fs.statSync(`${OUT}/${name}`);
  console.log(name, stat.size, 'bytes');
  await page.close();
}

await browser.close();
