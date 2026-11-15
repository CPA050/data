import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';

const videos = [
  ['C:/Users/cpa/Documents/xwechat_files/wxid_2dzbi2bdhh0622_3bc5/msg/video/2026-11/2b3bdeb9187a3553afe46e780c3d941d.mp4', 'vid1'],
  ['C:/Users/cpa/Documents/xwechat_files/wxid_2dzbi2bdhh0622_3bc5/msg/video/2026-11/9d6ad4d2cc16c222cb651dbfcce30ce7.mp4', 'vid2'],
];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

for (const [file, tag] of videos) {
  const page = await browser.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><body style="margin:0;background:#000;display:grid;place-items:center">
    <video id="v" src="file:///${file}" muted preload="auto" style="max-width:100%;max-height:100vh"></video>
  </body>`, { waitUntil: 'load' });

  const meta = await page.evaluate(async () => {
    const v = document.getElementById('v');
    await new Promise((res) => {
      if (v.readyState >= 1) return res();
      v.onloadedmetadata = res;
      setTimeout(res, 4000);
    });
    return { w: v.videoWidth, h: v.videoHeight, d: v.duration };
  });
  console.log(tag, JSON.stringify(meta));

  if (meta.w && meta.d) {
    for (const ratio of [0.15, 0.45, 0.75]) {
      await page.evaluate(
        async (t) =>
          new Promise((res) => {
            const v = document.getElementById('v');
            v.currentTime = t;
            v.onseeked = () => setTimeout(res, 120);
            setTimeout(res, 1500);
          }),
        meta.d * ratio,
      );
      await page.screenshot({ path: `${OUT}\\${tag}-${Math.round(ratio * 100)}.png` });
    }
  }
  await page.close();
}

await browser.close();
console.log('frames ok');
