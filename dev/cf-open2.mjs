// dev/cf-open2.mjs —— 用复制的 Edge 配置打开 Cloudflare 后台（复用已登录会话）
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PROFILE = 'C:\\Users\\cpa\\AppData\\Local\\Temp\\edge-prof';
const TARGET = process.argv[2] || 'https://dash.cloudflare.com/8eeb922d575face6a8b69ec8c84939f5/workers-and-pages';

const context = await chromium.launchPersistentContext(PROFILE, {
  executablePath: EDGE,
  headless: false,
  viewport: { width: 1400, height: 900 },
  args: ['--profile-directory=Default', '--no-sandbox', '--disable-dev-shm-usage'],
  timeout: 60000
});

const page = context.pages()[0] || (await context.newPage());
await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {});
await page.waitForTimeout(7000);

console.log('URL:', page.url());
console.log('TITLE:', await page.title());
const body = await page.evaluate(() => document.body.innerText.slice(0, 800));
console.log('TEXT:', body.replace(/\n+/g, ' | ').slice(0, 600));
await page.screenshot({ path: 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\cf-live.png' });
console.log('screenshot saved');
await context.close();
