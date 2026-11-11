import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\repo\\screens';
const BASE = 'https://data-1i1.pages.dev/';
const user = 'zz_grid_' + Math.random().toString(36).slice(2, 7);
const errors = [];

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 120)); });

await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.auth-card', { timeout: 25000 });
await page.screenshot({ path: `${OUT}\\p3-login.png` });

await page.fill('input[name="username"]', user);
await page.click('button[type="submit"]');
await page.waitForSelector('input[name="password"]', { timeout: 20000 });
await page.fill('input[name="password"]', '123456');
await page.fill('input[name="confirm"]', '123456');
await page.screenshot({ path: `${OUT}\\p3-password.png` });
await page.click('button[type="submit"]');
await page.waitForSelector('.tabbar', { timeout: 25000 });
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}\\p3-home.png` });

await page.click('.tab-btn[data-tab="me"]');
await page.waitForTimeout(700);
await page.click('button[data-act="theme"][data-value="dark"]');
await page.waitForTimeout(700);
await page.click('.tab-btn[data-tab="home"]');
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}\\p3-dark.png` });

console.log('user =>', user);
console.log('errors =>', errors.length ? errors.slice(0, 3) : 0);
await browser.close();
