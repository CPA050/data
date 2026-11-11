import { chromium } from 'playwright-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await p.waitForSelector('.auth-card', { timeout: 20000 });
await p.fill('input[name="username"]', 'alice');
await p.keyboard.press('Enter');
await p.waitForSelector('input[name="password"]', { timeout: 10000 });
await p.fill('input[name="password"]', '123456');
await p.keyboard.press('Enter');
await p.waitForSelector('.tabbar', { timeout: 20000 });
await p.waitForTimeout(600);
const info = await p.evaluate(() => {
  const body = getComputedStyle(document.body);
  const card = document.querySelector('.card');
  const cs = card ? getComputedStyle(card) : null;
  return {
    bodyBgImage: body.backgroundImage.slice(0, 160),
    bodyBgColor: body.backgroundColor,
    cardBg: cs?.backgroundColor,
    cardBackdrop: cs?.backdropFilter || cs?.webkitBackdropFilter,
    sheets: [...document.styleSheets].map((s) => (s.href || 'inline').split('/').pop()),
    glassLoaded: [...document.styleSheets].some((s) => {
      try {
        return [...s.cssRules].some((r) => r.cssText.includes('38vmax'));
      } catch {
        return false;
      }
    }),
  };
});
console.log(JSON.stringify(info, null, 2));
await b.close();
