import fs from 'node:fs';

const edits = [
  ['web/index.html', [
    ['<meta name="description" content="原点 · Origin —— 刷题、错题本、收藏夹，离线也能练。" />',
     '<meta name="description" content="基准 —— 一建刷题、错题本、收藏夹，离线也能练。" />'],
    ['<meta name="apple-mobile-web-app-title" content="原点" />', '<meta name="apple-mobile-web-app-title" content="基准" />'],
    ['<title>原点 · Origin</title>', '<title>基准 · 一建刷题</title>'],
    ['需要启用 JavaScript 才能使用原点。', '需要启用 JavaScript 才能使用基准。'],
  ]],
  ['vite.config.ts', [
    ["name: '原点 · Origin',", "name: '基准',"],
    ["short_name: '原点',", "short_name: '基准',"],
  ]],
  ['web/src/core/router.ts', [
    ['<div class="sidebar-brand">Origin Quiz</div>', '<div class="sidebar-brand">基准</div>'],
    ['<span class="brand-name">Origin Quiz</span>', '<span class="brand-name">基准</span>'],
  ]],
  ['web/src/features/export-sheet.ts', [
    ['<div class="sheet-kicker">Origin Quiz / Practice Sheet</div>', '<div class="sheet-kicker">基准 DATUM / Practice Sheet</div>'],
    ['由「原点 · Origin」导出 · 打印对话框里选择「另存为 PDF」即可保存。', '由「基准」导出 · 打印对话框里选择「另存为 PDF」即可保存。'],
  ]],
  ['web/src/views/auth.ts', [
    ['<div class="auth-title">原点 · Origin</div>', '<div class="auth-title">基准</div>'],
    ['<div class="brand-sub">刷题 · 错题 · 收藏</div>', '<div class="brand-sub">一建刷题 / 错题 / 收藏</div>'],
  ]],
  ['web/src/views/bank.ts', [
    ["subtitle: '原点 · Origin',", "subtitle: '基准',"],
  ]],
  ['web/src/views/me.ts', [
    ['origin-quiz v2.0.0', 'DATUM v2.0.0'],
    ['原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。', '基准 —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。'],
  ]],
  ['web/src/app.test.ts', [
    ["expect(text()).toContain('原点 · Origin');", "expect(text()).toContain('基准');"],
  ]],
  ['web/src/main.ts', [
    ["console.error('[origin-quiz] 启动失败', error);", "console.error('[datum] 启动失败', error);"],
  ]],
];

let failed = [];
for (const [file, pairs] of edits) {
  let s = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!s.includes(from)) failed.push(`${file}: ${from.slice(0, 40)}`);
    s = s.split(from).join(to);
  }
  fs.writeFileSync(file, s, 'utf8');
  new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(file));
}

console.log(failed.length ? '未命中：\n' + failed.join('\n') : '全部替换完成');
