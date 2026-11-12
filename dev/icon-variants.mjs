import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const TMP = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens\\iconv';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
fs.mkdirSync(TMP, { recursive: true });

const variants = {
  ring: (s) => {
    const c = s / 2, r = s * 0.33, sw = Math.max(2, s * 0.125);
    return `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#fff" stroke-width="${sw}"/>`;
  },
  dot: (s) => {
    const c = s / 2, r = s * 0.28;
    return `<circle cx="${c}" cy="${c}" r="${r}" fill="#fff"/>`;
  },
  cross: (s) => {
    const c = s / 2, a = s * 0.32, sw = Math.max(2, s * 0.125);
    return `<path d="M${c} ${c - a}V${c + a}M${c - a} ${c}H${c + a}" stroke="#fff" stroke-width="${sw}" fill="none"/>`;
  },
  ringdot: (s) => {
    const c = s / 2, r = s * 0.34, sw = Math.max(2, s * 0.11), d = s * 0.14;
    return `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#fff" stroke-width="${sw}"/><circle cx="${c}" cy="${c}" r="${d}" fill="#fff"/>`;
  },
  corner: (s) => {
    const c = s / 2, r = s * 0.32, sw = Math.max(2, s * 0.13);
    return `<path d="M${c - r} ${c}H${c + r}" stroke="#fff" stroke-width="${sw}"/><circle cx="${c}" cy="${c - r * 0.72}" r="${s * 0.1}" fill="#fff"/>`;
  },
};

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const cells = [];

for (const [name, fn] of Object.entries(variants)) {
  for (const size of [16, 32]) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#0a0c0f"/>${fn(size)}</svg>`;
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await page.setContent(`<style>html,body{margin:0;background:#0a0c0f}svg{display:block}</style>${svg}`, { waitUntil: 'load' });
    await page.waitForTimeout(80);
    await page.screenshot({ path: `${TMP}/${name}-${size}.png` });
    await page.close();
  }
  cells.push(name);
}

const b64 = (p) => `data:image/png;base64,${fs.readFileSync(`${TMP}/${p}`).toString('base64')}`;

const page = await browser.newPage({ viewport: { width: 700, height: 250 }, deviceScaleFactor: 2 });
await page.setContent(
  `<style>body{margin:0;background:#f3f4f6;font:12px "Microsoft YaHei";padding:16px}
   .row{display:flex;gap:16px;margin-bottom:14px;align-items:flex-start}
   img{image-rendering:pixelated;border:1px solid #cfd2d8;display:block}
   .cap{font-size:11px;color:#6b7079;margin-top:6px;text-align:center}</style>
   <div class="row">${cells.map((c) => `<div><img src="${b64(`${c}-16.png`)}" width="96" height="96"><div class="cap">${c} 16px</div></div>`).join('')}</div>
   <div class="row">${cells.map((c) => `<div><img src="${b64(`${c}-32.png`)}" width="96" height="96"><div class="cap">${c} 32px</div></div>`).join('')}</div>`,
  { waitUntil: 'load' },
);
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}\\w-variants.png`, fullPage: true });
await browser.close();
console.log('variants ready');
