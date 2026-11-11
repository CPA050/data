import { chromium } from 'playwright-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const p = await b.newPage({ viewport: { width: 1100, height: 1500 } });
await p.goto('file:///C:/Users/cpa/Desktop/cloudflare%E5%AF%86%E7%A0%81.pdf', { waitUntil: 'load' });
await new Promise((r) => setTimeout(r, 4000));
await p.screenshot({ path: 'C:\\Users\\cpa\\Documents\\deepseek-harness\\default-workspace\\cf-cred.png' });
console.log('ok');
await b.close();
