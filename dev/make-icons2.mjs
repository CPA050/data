import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'web/public';

function svg(size) {
  const fs2 = Math.round(size * 0.62);
  const y = Math.round(size * 0.74);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0c0f"/>
  <text x="${size / 2}" y="${y}" text-anchor="middle"
        font-family="Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif"
        font-size="${fs2}" font-weight="700" fill="#ffffff">原</text>
</svg>`;
}

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

for (const size of [32, 180, 192, 512]) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#0a0c0f}svg{display:block}</style>${svg(size)}`,
    { waitUntil: 'load' },
  );
  await page.waitForTimeout(120);
  const name = size === 32 ? 'favicon.png' : size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
  await page.screenshot({ path: `${OUT}/${name}` });
  console.log(name, fs.statSync(`${OUT}/${name}`).size, 'bytes');
  await page.close();
}

await browser.close();
