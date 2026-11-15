import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const DIR = 'C:/Users/cpa/Documents/xwechat_files/wxid_2dzbi2bdhh0622_3bc5/msg/video/2026-11';
const files = ['2b3bdeb9187a3553afe46e780c3d941d.mp4', '9d6ad4d2cc16c222cb651dbfcce30ce7.mp4'];

const server = http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.slice(1));
  const file = path.join(DIR, name);
  if (!fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  const stat = fs.statSync(file);
  const range = req.headers.range;
  res.writeHead(200, { 'content-type': 'video/mp4', 'content-length': stat.size, 'accept-ranges': 'bytes' });
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

for (const [i, name] of files.entries()) {
  const page = await browser.newPage({ viewport: { width: 880, height: 1200 } });
  await page.goto(`http://127.0.0.1:${port}/${name}`, { waitUntil: 'domcontentloaded' });
  // 直接跳转到浏览器内建播放器
  await page.waitForTimeout(1200);
  const info = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? { w: v.videoWidth, h: v.videoHeight, d: v.duration, ready: v.readyState } : null;
  });
  console.log(name, JSON.stringify(info));
  await page.screenshot({ path: `${OUT}\\v${i + 1}-p0.png` });
  if (info && info.d > 0) {
    for (const ratio of [0.2, 0.5, 0.8]) {
      await page.evaluate(
        (t) =>
          new Promise((res) => {
            const v = document.querySelector('video');
            v.pause();
            v.currentTime = t;
            v.onseeked = () => res();
          }),
        info.d * ratio,
      );
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}\\v${i + 1}-p${Math.round(ratio * 100)}.png` });
    }
  }
  await page.close();
}

await browser.close();
server.close();
console.log('done');
