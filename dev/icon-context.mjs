import fs from 'node:fs';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PUB = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\fixed\\web\\public';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';

const b64 = (name) => `data:image/png;base64,${fs.readFileSync(`${PUB}/${name}`).toString('base64')}`;

const html = `<!doctype html><meta charset="utf-8">
<style>
  * { box-sizing: border-box }
  body { margin:0; background:#e9eaee; font:13px "Microsoft YaHei","Segoe UI",sans-serif; color:#202124; padding:22px }
  .win { background:#fff; border:1px solid #d3d5da; border-radius:10px; overflow:hidden; box-shadow:0 18px 40px -24px rgba(0,0,0,.35) }
  .chrome { background:#f1f3f4; padding:10px 12px 0; border-bottom:1px solid #dfe1e5 }
  .tabs { display:flex; gap:8px; align-items:flex-end }
  .tab { display:flex; gap:8px; align-items:center; background:#fff; border:1px solid #dfe1e5; border-bottom:0;
         border-radius:8px 8px 0 0; padding:7px 12px; max-width:240px }
  .tab img { width:16px; height:16px; display:block }
  .tab span { font-size:12px; color:#3c4043; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }
  .tab.off { background:transparent; border-color:transparent; opacity:.55 }
  .omni { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #dfe1e5; border-radius:999px;
          margin:10px 0; padding:7px 14px; color:#5f6368; font-size:12.5px }
  .omni img { width:16px; height:16px }
  .bar { display:flex; gap:14px; align-items:center; padding:0 4px 9px; font-size:12.5px; color:#3c4043 }
  .bar .fav { display:flex; gap:6px; align-items:center }
  .bar img { width:16px; height:16px }
  .sep { width:1px; height:16px; background:#dadce0 }
  .page { padding:26px 30px 34px }
  .kicker { font-size:10px; letter-spacing:.28em; color:#5f6368 }
  .h1 { font-size:30px; font-weight:800; letter-spacing:-.03em; margin:8px 0 0 }
  .h1 em { font-style:normal; color:#1440ff }
  .sub { margin-top:10px; color:#5f6368; font-size:12.5px }

  h3 { font-size:11px; letter-spacing:.18em; color:#6b7079; margin:26px 0 10px; font-weight:600 }
  .hs { display:flex; gap:26px; align-items:flex-end; background:#fff; border:1px solid #d3d5da; border-radius:10px; padding:20px 24px }
  .hs figure { margin:0; text-align:center }
  .hs img { display:block; margin:0 auto; border:1px solid #dfe1e5 }
  .hs figcaption { margin-top:8px; font-size:11px; color:#6b7079 }
  .rounded { border-radius:22% }         /* iOS / Android 圆角遮罩效果 */
  .circle { border-radius:50% }          /* Android 圆形遮罩 */
</style>

<div class="win">
  <div class="chrome">
    <div class="tabs">
      <div class="tab"><img src="${b64('icon-16.png')}"><span>原点 · Origin</span></div>
      <div class="tab off"><img src="${b64('icon-16.png')}"><span>新标签页</span></div>
    </div>
    <div class="omni"><img src="${b64('icon-16.png')}">data-1i1.pages.dev</div>
    <div class="bar">
      <span class="fav"><img src="${b64('icon-16.png')}">原点 · Origin</span>
      <span class="sep"></span>
      <span class="fav"><img src="${b64('icon-16.png')}">刷题</span>
      <span class="sep"></span>
      <span class="fav"><img src="${b64('icon-16.png')}">错题本</span>
    </div>
  </div>
  <div class="page">
    <div class="kicker">2026.11.12 · 周四 · @ALICE</div>
    <div class="h1">07 <em>题</em> · 今日已练</div>
    <div class="sub">正确率 71%　·　连练 3 天</div>
  </div>
</div>

<h3>不同尺寸与遮罩</h3>
<div class="hs">
  <figure><img src="${b64('icon-16.png')}" width="16" height="16"><figcaption>16 标签页</figcaption></figure>
  <figure><img src="${b64('icon-32.png')}" width="32" height="32"><figcaption>32 收藏栏</figcaption></figure>
  <figure><img src="${b64('icon-48.png')}" width="48" height="48"><figcaption>48 桌面</figcaption></figure>
  <figure><img src="${b64('icon-192.png')}" width="88" height="88" class="rounded"><figcaption>iOS 主屏</figcaption></figure>
  <figure><img src="${b64('icon-maskable-512.png')}" width="88" height="88" class="circle"><figcaption>Android 圆形</figcaption></figure>
  <figure><img src="${b64('icon-maskable-512.png')}" width="88" height="88" class="rounded"><figcaption>Android 圆角</figcaption></figure>
</div>`;

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 760, height: 640 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}\\x-icons-context.png`, fullPage: true });
await browser.close();
console.log('context sheet ok');
