import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'desktop', width: 1280, height: 900, mobile: false },
  { name: 'wide', width: 1512, height: 982, mobile: false },
];
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1.5,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`${vp.name}: ${e.message}`));

  const nav = async (tab) => {
    const side = page.locator(`.side-btn[data-tab="${tab}"]`);
    if (await side.isVisible().catch(() => false)) await side.click();
    else await page.click(`.tab-btn[data-tab="${tab}"]`);
    await page.waitForTimeout(280);
  };

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.auth-card', { timeout: 20000 });
  if (!(await page.locator('input[name="password"]').count())) {
    await page.fill('input[name="username"]', 'alice');
    await page.click('button[type="submit"]');
    await page.waitForSelector('input[name="password"]', { timeout: 15000 });
  }
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.app-shell', { timeout: 20000 });
  await page.waitForTimeout(900);

  const home = await page.evaluate(() => {
    const view = document.querySelector('.view');
    return {
      docScroll: document.documentElement.scrollHeight - window.innerHeight,
      viewH: view ? Math.round(view.scrollHeight) : 0,
      vh: window.innerHeight,
      sidebar: Boolean(document.querySelector('.sidebar') && getComputedStyle(document.querySelector('.sidebar')).display !== 'none'),
      tabbar: Boolean(document.querySelector('.tabbar') && getComputedStyle(document.querySelector('.tabbar')).display !== 'none'),
      toast: document.querySelector('.toast-text')?.textContent?.slice(0, 18) ?? '',
    };
  });
  await page.screenshot({ path: `${OUT}\\s-${vp.name}-home.png` });

  await nav('bank');
  await page.waitForSelector('.q-table', { timeout: 15000 });
  await page.screenshot({ path: `${OUT}\\s-${vp.name}-bank.png` });

  await nav('home');
  await page.click('[data-act="shuffle"]');
  await page.waitForSelector('.q-text', { timeout: 15000 });
  const quiz = await page.evaluate(() => ({
    opts: document.querySelectorAll('.opt').length,
    q: document.querySelector('.q-text')?.textContent?.slice(0, 24) ?? '',
  }));
  await page.screenshot({ path: `${OUT}\\s-${vp.name}-shuffle.png` });

  console.log(vp.name, '=>', JSON.stringify({ ...home, quiz }));
  await ctx.close();
}

console.log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
