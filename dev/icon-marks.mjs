import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PUB = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\fixed\\web\\public';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens\\iconv2';
fs.mkdirSync(OUT, { recursive: true });

const variants = {
  frame: (s) => {
    const pad = s * 0.19, sw = Math.max(2, s * 0.125);
    return `<rect x="${pad}" y="${pad}" width="${s - pad * 2}" height="${s - pad * 2}" fill="none" stroke="#fff" stroke-width="${sw}"/>`;
  },
  framedot: (s) => {
    const pad = s * 0.17, sw = Math.max(2, s * 0.115), d = s * 0.15;
    return `<rect x="${pad}" y="${pad}" width="${s - pad * 2}" height="${s - pad * 2}" fill="none" stroke="#fff" stroke-width="${sw}"/><circle cx="${s / 2}" cy="${s / 2}" r="${d}" fill="#fff"/>`;
  },
  ringthick: (s) => {
    const c = s / 2, r = s * 0.31, sw = Math.max(2, s * 0.155);
    return `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#fff" stroke-width="${sw}"/>`;
  },
  half: (s) => {
    const pad = s * 0.2, sw = Math.max(2, s * 0.13);
    return `<path d="M${s / 2} ${pad}V${s - pad}" stroke="#fff" stroke-width="${sw}"/><path d="M${pad} ${pad}H${s / 2}" stroke="#fff" stroke-width="${sw}"/><path d="M${pad} ${s - pad}H${s / 2}" stroke="#fff" stroke-width="${sw}"/>`;
  },
};

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

for (const [name, fn] of Object.entries(variants)) {
  for (const size of [16, 32, 48]) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#0a0c0f"/>${fn(size)}</svg>`;
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await page.setContent(`<style>html,body{margin:0;background:#0a0c0f}svg{display:block}</style>${svg}`, { waitUntil: 'load' });
    await page.waitForTimeout(70);
    await page.screenshot({ path: `${OUT}/${name}-${size}.png` });
    await page.close();
  }
}

const b64 = (p) => `data:image/png;base64,${fs.readFileSync(`${OUT}/${p}`).toString('base64')}`;
const names = Object.keys(variants);

const page = await browser.newPage({ viewport: { width: 820, height: 380 }, deviceScaleFactor: 2 });
const tab = (name) => `<div style="display:flex;gap:8px;align-items:center;background:#fff;border:1px solid #dfe1e5;border-radius:8px;padding:7px 12px">
  <img src="${b64(`${name}-16.png`)}" width="16" height="16"><span style="font-size:12px;color:#3c4043">${name}</span></div>`;
await page.setContent(
  `<style>body{margin:0;background:#f1f3f4;font:12px "Microsoft YaHei";padding:18px}
   .tabs{display:flex;gap:10px;flex-wrap:wrap}
   .grid{display:flex;gap:22px;margin-top:20px;align-items:flex-end}
   figure{margin:0;text-align:center}
   img.pix{image-rendering:pixelated;border:1px solid #cfd2d8;display:block}
   figcaption{margin-top:6px;font-size:11px;color:#6b7079}</style>
   <div class="tabs">${names.map(tab).join('')}</div>
   <div class="grid">${names
     .map(
       (n) => `<figure><img class="pix" src="${b64(`${n}-16.png`)}" width="96" height="96"><figcaption>${n} 16</figcaption></figure>`,
     )
     .join('')}</div>
   <div class="grid">${names
     .map(
       (n) => `<figure><img class="pix" src="${b64(`${n}-48.png`)}" width="96" height="96"><figcaption>${n} 48</figcaption></figure>`,
     )
     .join('')}</div>`,
  { waitUntil: 'load' },
);
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/../w-icon-mark.png`, fullPage: true });
await browser.close();
console.log('mark variants ok');
