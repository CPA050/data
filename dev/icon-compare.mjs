import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PUB = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\fixed\\web\\public';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';

const master = fs.readFileSync(`${PUB}/icon-512.png`).toString('base64');
const ring16 = fs.readFileSync(`${PUB}/icon-16.png`).toString('base64');
const ring32 = fs.readFileSync(`${PUB}/icon-32.png`).toString('base64');

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 760, height: 420 }, deviceScaleFactor: 2 });

const html = `<!doctype html><meta charset="utf-8">
<style>
  body{margin:0;background:#e9eaee;font:12px "Microsoft YaHei";padding:20px}
  .win{background:#f1f3f4;border:1px solid #d3d5da;border-radius:10px;padding:10px 12px}
  .tabs{display:flex;gap:10px;align-items:flex-end}
  .tab{display:flex;gap:8px;align-items:center;background:#fff;border:1px solid #dfe1e5;border-bottom:0;border-radius:8px 8px 0 0;padding:7px 12px}
  .tab img{width:16px;height:16px;display:block;image-rendering:auto}
  .tab span{font-size:12px;color:#3c4043}
  .bar{display:flex;gap:16px;align-items:center;background:#fff;border:1px solid #dfe1e5;border-radius:0 0 8px 8px;padding:8px 12px;margin-top:-1px}
  .bar img{width:16px;height:16px}
  .row{display:flex;gap:24px;margin-top:18px;align-items:flex-end}
  figure{margin:0;text-align:center}
  canvas{border:1px solid #cfd2d8;display:block}
  figcaption{margin-top:6px;color:#6b7079;font-size:11px}
</style>
<div class="win">
  <div class="tabs">
    <div class="tab"><img id="t1" src="data:image/png;base64,${ring16}"><span>方案 A：环（当前）</span></div>
    <div class="tab"><img id="t2" src="data:image/png;base64,${ring16}"><span>方案 B：缩小的「原」</span></div>
  </div>
  <div class="bar">
    <span style="display:flex;gap:6px;align-items:center"><img src="data:image/png;base64,${ring16}"> A 收藏栏</span>
    <span style="display:flex;gap:6px;align-items:center"><img id="b2" src="data:image/png;base64,${ring16}"> B 收藏栏</span>
  </div>
</div>
<div class="row" id="row"></div>
<script>
  const img = new Image();
  img.src = 'data:image/png;base64,${master}';
  function make(size) {
    const cv = document.createElement('canvas');
    cv.width = size; cv.height = size;
    const ctx = cv.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, size, size);
    return cv;
  }
  img.onload = () => {
    for (const size of [16, 32, 48]) {
      const cv = make(size);
      const url = cv.toDataURL('image/png');
      document.getElementById('t2').src = size === 16 ? url : document.getElementById('t2').src;
      document.getElementById('b2').src = size === 16 ? url : document.getElementById('b2').src;
      const fig = document.createElement('figure');
      const big = document.createElement('canvas');
      big.width = big.height = size * 6;
      const bx = big.getContext('2d');
      bx.imageSmoothingEnabled = false;
      bx.drawImage(cv, 0, 0, big.width, big.height);
      fig.appendChild(big);
      const cap = document.createElement('figcaption');
      cap.textContent = size + 'px 缩小版原字';
      fig.appendChild(cap);
      document.getElementById('row').appendChild(fig);
    }
    // 顺带导出 16/32 供挑选
    for (const size of [16, 32]) {
      window['png' + size] = make(size).toDataURL('image/png');
    }
    document.title = 'ready';
  };
</script>`;

await page.setContent(html, { waitUntil: 'load' });
await page.waitForFunction(() => document.title === 'ready', { timeout: 15000 });
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}\\y-icon-compare.png`, fullPage: true });

const data16 = await page.evaluate(() => window.png16);
const data32 = await page.evaluate(() => window.png32);
fs.writeFileSync(`${OUT}\\..\\fixed\\web\\public\\icon-16-glyph.png`, Buffer.from(data16.split(',')[1], 'base64'));
fs.writeFileSync(`${OUT}\\..\\fixed\\web\\public\\icon-32-glyph.png`, Buffer.from(data32.split(',')[1], 'base64'));
await browser.close();
console.log('compare ok');
