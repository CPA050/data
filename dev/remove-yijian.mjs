import fs from 'node:fs';

const edits = [
  ['web/index.html', [
    ['<meta name="description" content="基准 —— 一建刷题、错题本、收藏夹，离线也能练。" />',
     '<meta name="description" content="基准 —— 多科目刷题、错题本、收藏夹，离线也能练。" />'],
    ['<title>基准 一建刷题</title>', '<title>基准 刷题</title>'],
  ]],
  ['web/src/views/auth.ts', [
    ['<div class="brand-sub">一建刷题 / 错题 / 收藏</div>', '<div class="brand-sub">刷题 / 错题 / 收藏</div>'],
  ]],
  ['web/src/features/about.ts', [
    ['<p class="about-line">一建刷题、错题本、收藏夹。数据存在你自己的 Cloudflare D1，别人看不到。</p>',
     '<p class="about-line">多科目刷题、错题本、收藏夹。数据存在你自己的 Cloudflare D1，别人看不到。</p>'],
  ]],
  ['web/src/features/generate.ts', [
    ['placeholder="如 一建建筑"', 'placeholder="如 建筑工程 / 经济法 / 英语"'],
  ]],
];

let miss = [];
for (const [file, pairs] of edits) {
  let s = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!s.includes(from)) miss.push(file + ' :: ' + from.slice(0, 30));
    s = s.split(from).join(to);
  }
  fs.writeFileSync(file, s, 'utf8');
  new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(file));
}
console.log(miss.length ? '未命中:\n' + miss.join('\n') : '一建 已移除');
