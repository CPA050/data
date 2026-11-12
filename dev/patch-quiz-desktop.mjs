import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
s += `
/* 大屏答题：进度条/底部按钮与题卡同宽，悬浮动作挪到卡左侧 */
@media (min-width: 1080px) {
  .quiz-progress {
    width: min(820px, 100%);
    margin-inline: auto;
  }

  .quiz-foot {
    padding-inline: max(16px, calc((100% - 820px) / 2));
  }

  .floating-actions {
    right: max(16px, calc((100% - 820px) / 2 - 56px));
    bottom: calc(var(--safe-b) + 96px);
  }
}
`;
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('quiz desktop alignment ok');
