import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ROOT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\fixed\\web\\public';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';

const html = `<!doctype html><meta charset="utf-8">
<style>
  body { margin:0; background:#f3f4f6; font:13px "Microsoft YaHei",sans-serif; color:#0a0c0f }
  .row { display:flex; gap:28px; align-items:flex-end; padding:22px 26px; border-bottom:1px solid #d9dbe0 }
  .cell { text-align:center }
  .cell img { display:block; image-rendering:pixelated; border:1px solid #cfd2d8 }
  .cap { margin-top:8px; font-size:11px; color:#6b7079 }
  .bar { padding:14px 26px; background:#fff; border-bottom:1px solid #d9dbe0; display:flex; gap:14px; align-items:center }
  .bar span { font-size:12px; color:#6b7079 }
</style>
<div class="bar">收藏栏效果：<img src="/favicon.ico" width="16" height="16"><span>原点 · Origin</span>
<img src="/icon-32.png" width="16" height="16"><span>第二个标签页</span></div>
<div class="row">
  <div class="cell"><img src="/icon-16.png" width="128" height="128"><div class="cap">16px ×8</div></div>
  <div class="cell"><img src="/icon-32.png" width="128" height="128"><div class="cap">32px ×4</div></div>
  <div class="cell"><img src="/icon-48.png" width="96" height="96"><div class="cap">48px ×2</div></div>
</div>
<div class="row">
  <div class="cell"><img src="/favicon-legacy.png" width="128" height="128"><div class="cap">16/32 备选：原字 ×4</div></div>
  <div class="cell"><img src="/icon-192.png" width="96" height="96"><div class="cap">192</div></div>
  <div class="cell"><img src="/icon-maskable-512.png" width="96" height="96"><div class="cap">maskable 512</div></div>
</div>`;

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 640, height: 460 }, deviceScaleFactor: 2 });
await page.goto('file:///' + ROOT.replace(/\\/g, '/') + '/', { waitUntil: 'domcontentloaded' }).catch(() => {});
await page.setContent(html, { waitUntil: 'load' });
// setContent 用的是 about:blank，图片相对路径要重定基底
await page.evaluate(() => {
  const base = document.createElement('base');
  base.href = 'file:///' + 'C:/Users/cpa/Documents/deepseek-harness/default-workspace/repo/fixed/web/public/';
  document.head.appendChild(base);
  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    img.src = base.href + src.replace(/^\//, '');
  });
});
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}\\w-icons.png`, fullPage: true });
console.log('ok');
await browser.close();
