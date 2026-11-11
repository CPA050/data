// 用本机 Edge 走 Playwright 拍几张真实渲染截图，验证 UI 与交互
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '..', '..', 'screens');
mkdirSync(outDir, { recursive: true });

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.env.BASE_URL || 'http://localhost:5173';
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 200));
});

const shot = async (page, name) => {
  await page.waitForTimeout(350);
  const file = path.join(outDir, name + '.png');
  await page.screenshot({ path: file });
  log('📸', name);
};

try {
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForSelector('.auth-card', { timeout: 15000 });
  await shot(page, '01-login');

  await page.fill('input[name="username"]', 'alice');
  await page.click('button[type="submit"]');
  await page.waitForSelector('input[name="password"]', { timeout: 10000 });
  await shot(page, '02-password');

  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.tabbar', { timeout: 15000 });
  await page.waitForTimeout(900);
  await shot(page, '03-home');

  for (const [tab, name] of [
    ['bank', '04-bank'],
    ['wrong', '05-wrong'],
    ['fav', '06-fav'],
    ['me', '07-me'],
  ]) {
    await page.click(`.tab-btn[data-tab="${tab}"]`);
    await page.waitForTimeout(500);
    await shot(page, name);
  }

  await page.click('button[data-act="theme"][data-value="dark"]');
  await page.waitForTimeout(600);
  await shot(page, '08-dark-me');
  await page.click('.tab-btn[data-tab="home"]');
  await page.waitForTimeout(600);
  await shot(page, '09-dark-home');

  // 切回浅色再看答题界面
  await page.click('.tab-btn[data-tab="me"]');
  await page.waitForTimeout(400);
  await page.click('button[data-act="theme"][data-value="light"]');
  await page.waitForTimeout(400);
  await page.click('.tab-btn[data-tab="home"]');
  await page.waitForTimeout(500);

  await page.click('[data-act="sequential"]');
  await page.waitForTimeout(600);
  const startBtn = page.locator('.modal-card button', { hasText: '开始' });
  if (await startBtn.count()) await startBtn.first().click();
  await page.waitForSelector('.quiz', { timeout: 10000 });
  await page.waitForTimeout(600);
  await shot(page, '10-quiz');

  const opt = page.locator('.opt').nth(1);
  if (await opt.count()) {
    await opt.click();
    await page.waitForTimeout(800);
    await shot(page, '11-quiz-answered');
  }

  const startedAi = Date.now();
  const ai = page.locator('[data-act="ai"]');
  if (await ai.count()) {
    await ai.click();
    // 流式解析：先等第一段文字出现（首字延迟），再等 done 后的完整文本
    await page.waitForFunction(() => {
      const node = document.querySelector('[data-role="text"]');
      return !!node && (node.textContent || '').trim().length > 4;
    }, { timeout: 15000 });
    const firstMs = Date.now() - startedAi;
    await page.waitForTimeout(1800);
    await shot(page, '12-quiz-ai');
    log(`   AI 首字 ${firstMs} ms`);
  }
} catch (e) {
  errors.push('flow: ' + e.message.split('\n')[0]);
} finally {
  log(errors.length ? '⚠️ 问题：\n' + errors.join('\n') : '✅ 无页面错误');
  await browser.close();
}
