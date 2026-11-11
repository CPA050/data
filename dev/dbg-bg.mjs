import { chromium } from 'playwright-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await p.waitForSelector('.auth-card', { timeout: 20000 });
await p.screenshot({ path: 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens\\dbg-a.png' });
const probe = await p.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, img: cs.backgroundImage.slice(0, 40), pos: cs.position, z: cs.zIndex };
  };
  return {
    html: pick('html'),
    body: pick('body'),
    root: pick('#app-root'),
    shell: pick('.app-shell'),
    main: pick('main'),
    view: pick('.view'),
    firstChild: document.body.firstElementChild?.tagName,
  };
});
console.log(JSON.stringify(probe, null, 2));
await p.evaluate(() => {
  document.body.style.backgroundImage = 'linear-gradient(135deg, #ff0000, #0000ff)';
});
await p.waitForTimeout(300);
await p.screenshot({ path: 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens\\dbg-b.png' });
await b.close();
