// 自检：题库性能/批量删除/学科计数（本地 server 8788 + vite 5173 需已启动）
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'C:\\Users\\cpa\\Desktop\\dsh\\repo\\screens';
const errors = [];
const stamp = Date.now().toString(36);
const SUBJ_A = `学科甲${stamp}`;
const SUBJ_B = `学科乙${stamp}`;

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.auth-card', { timeout: 20000 });
if (await page.locator('input[name="password"]').count()) {
  await page.fill('input[name="password"]', '123456');
} else {
  await page.fill('input[name="username"]', 'alice');
  await page.click('button[type="submit"]');
  await page.waitForSelector('input[name="password"]', { timeout: 15000 });
  await page.fill('input[name="password"]', '123456');
}
await page.click('button[type="submit"]');
await page.waitForSelector('.tabbar', { timeout: 20000 });

// 基线 + 种子：用页面内 fetch 走真实 API（两学科 25 + 7 题）
const seed = await page.evaluate(async ({ a, b }) => {
  const token = localStorage.getItem('oq:oq:token');
  const hdr = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (token ?? '') };
  const listResp = await fetch(`/api/questions?user_id=alice`, { headers: { Authorization: 'Bearer ' + (token ?? '') } });
  const list = await listResp.json();
  const mk = (n, subj) => Array.from({ length: n }, (_, i) => ({
    q: `${subj}第${i + 1}题：这是题干内容测试${i}`,
    opts: ['A. 选项一', 'B. 选项二', 'C. 选项三', 'D. 选项四'],
    a: 0, chapter: 'ch1', subject: subj,
  }));
  const r1 = await fetch('/api/questions-add', { method: 'POST', headers: hdr, body: JSON.stringify({ user_id: 'alice', questions: mk(25, a) }) });
  const r2 = await fetch('/api/questions-add', { method: 'POST', headers: hdr, body: JSON.stringify({ user_id: 'alice', questions: mk(7, b) }) });
  return { base: Array.isArray(list) ? list.length : 0, a1: r1.status, a2: r2.status, token: !!token };
}, { a: SUBJ_A, b: SUBJ_B });
console.log('种子 =>', JSON.stringify(seed));

// 重新加载题库页（带缓存路径：先看瞬时渲染，再等数据到位）
const t0 = Date.now();
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('.tabbar', { timeout: 20000 });
await page.click('.tab-btn[data-tab="bank"]');
await page.waitForSelector('[data-act="import"]', { timeout: 15000 });
console.log('题库页可交互耗时 =>', Date.now() - t0, 'ms');

// 等待后台数据刷新完（type chip 全部计数 = 基线 + 32）
await page.waitForFunction(({ want }) => {
  const el = document.querySelector('.chips-type [data-type="all"] .chip-n');
  return el && parseInt(el.textContent, 10) >= want;
}, { want: seed.base + 32 }, { timeout: 15000 });

// 1) 学科 chips 计数
const subjTexts = await page.$$eval('[data-act="subject"]', (els) => els.map((e) => e.textContent.replace(/\s+/g, ' ').trim()));
console.log('学科 chips =>', subjTexts.join(' | '));

// 2) 点学科乙 → 「全部」题型 chip 计数应变成 7
await page.click(`[data-act="subject"][data-subject="${SUBJ_B}"]`);
await page.waitForTimeout(400);
const scopedAll = await page.locator('.chips-type [data-type="all"] .chip-n').innerText();
const pagerInfo = await page.locator('.table-count, .pager-info').innerText().catch(() => '(none)');
console.log('选学科乙后 全部计数 =>', scopedAll, '| 分页信息 =>', pagerInfo.replace(/\s+/g, ' '));
await page.screenshot({ path: `${OUT}\\bk-1-subject-scoped.png` });

// 3) 编辑模式按钮
await page.click('[data-act="toggle-edit"]');
await page.waitForTimeout(300);
const editBtns = await page.$$eval('.row.between .btn', (els) => els.map((e) => e.textContent.replace(/\s+/g, ' ').trim()));
console.log('编辑栏 =>', editBtns.join(' | '));
await page.screenshot({ path: `${OUT}\\bk-2-edit-bar.png` });

// 4) 全选筛选（跨页）→ 已选 7 题
await page.click('[data-act="select-filtered"]');
await page.waitForTimeout(200);
const selInfo = await page.locator('.row.between .muted').first().innerText().catch(() => '(none)');
console.log('全选筛选后 =>', selInfo);

// 5) 删除本学科全部 → 确认 → 学科乙消失、计数回 25
await page.click('[data-act="delete-subject"]');
await page.waitForSelector('.modal-card', { timeout: 8000 });
const confirmTitle = await page.locator('.modal-card .modal-title').innerText().catch(() => '(none)');
console.log('确认框标题 =>', confirmTitle.replace(/\s+/g, ' '));
await page.click('.modal-root [data-idx="1"]'); // 全部删除
await page.waitForTimeout(800);
const afterSubj = await page.$$eval('[data-act="subject"]', (els) => els.map((e) => e.textContent.replace(/\s+/g, ' ').trim()));
const afterAll = await page.locator('.chips-type [data-type="all"] .chip-n').innerText().catch(() => '(none)');
console.log('删除后学科 =>', afterSubj.join(' | '));
console.log('删除后 全部计数 =>', afterAll, '(应为', seed.base + 25 + ')');
await page.screenshot({ path: `${OUT}\\bk-3-after-delete.png` });

// 6) 导入关闭速度（不阻塞）：粘贴 1 题 → 点导入 → toast 出现耗时
await page.click('[data-act="import"]');
await page.waitForSelector('.dropzone', { timeout: 10000 });
await page.fill('textarea[data-role="text"]', `1. 测试导入题\nA. 一\nB. 二\nC. 三\nD. 四\n答案：A`);
await page.waitForTimeout(500);
const tImport = Date.now();
await page.click('.modal-root [data-idx="1"]');
await page.waitForSelector('.toast', { timeout: 8000 });
console.log('导入 1 题（点击→toast）耗时 =>', Date.now() - tImport, 'ms');
// 后台刷新后计数应 +1
await page.waitForFunction(({ want }) => {
  const el = document.querySelector('.chips-type [data-type="all"] .chip-n');
  return el && parseInt(el.textContent, 10) >= want;
}, { want: seed.base + 26 }, { timeout: 15000 });
console.log('导入后 全部计数 =>', await page.locator('.chips-type [data-type="all"] .chip-n').innerText());

// 7) 全选本页 vs 全选筛选在「全部」下也可用（渲染抖动时重试点 toggle）
await page.waitForTimeout(800);
let hasFilterBtn = 0;
for (let i = 0; i < 5 && !hasFilterBtn; i++) {
  await page.click('[data-act="toggle-edit"]').catch(() => {});
  await page.waitForTimeout(400);
  hasFilterBtn = await page.locator('[data-act="select-filtered"]').count();
}
console.log('全部视图 toggle 后筛选按钮存在 =>', hasFilterBtn);
if (hasFilterBtn) {
  await page.click('[data-act="select-filtered"]');
  await page.waitForTimeout(200);
  const selAll = await page.locator('.row.between .muted').first().innerText().catch(() => '(none)');
  console.log('全部视图全选筛选后 =>', selAll);
  await page.screenshot({ path: `${OUT}\\bk-4-select-all.png` });
}

console.log('errors =>', errors.length, errors.slice(0, 5));
await browser.close();
