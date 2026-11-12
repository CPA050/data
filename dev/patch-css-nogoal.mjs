import fs from 'node:fs';

const c = 'web/src/styles/responsive.css';
let t = fs.readFileSync(c, 'utf8');

// 删掉刻度条样式
t = t.replace(/\n\/\* 今日目标：刻度条 \*\/[\s\S]*?\.today-ticks i\.on \{\n  background: var\(--text\);\n\}\n/, '\n');

// 数字放大一点，补上删掉刻度后的留白
t = t.replace(
  `.today-num {
  font-size: 56px;`,
  `.today-num {
  font-size: 64px;`,
);
t = t.replace(
  `@media (min-width: 720px) {
  .today-num {
    font-size: 64px;
  }
}`,
  `@media (min-width: 720px) {
  .today-num {
    font-size: 76px;
  }
}`,
);

// 进度条移除后，给头部一点下边距撑住版面
if (!t.includes('.today {\n  margin-top: 8px;\n  padding-bottom: 6px;')) {
  t = t.replace('.today {\n  margin-top: 8px;\n}', '.today {\n  margin-top: 10px;\n  padding-bottom: 10px;\n}');
}

fs.writeFileSync(c, t, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(c));
console.log('css trimmed:', !t.includes('.today-ticks'));
