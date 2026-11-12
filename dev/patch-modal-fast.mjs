import fs from 'node:fs';

const p = 'web/src/ui/modal.ts';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  `      cleanup();
      container.classList.remove('open');
      window.setTimeout(() => {
        container.remove();
        unlockBody();
      }, 110);`,
  `      cleanup();
      container.classList.remove('open');
      // 立刻让遮罩不再拦截点击，动画只是视觉残留，不再"卡一下"
      container.style.pointerEvents = 'none';
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        container.remove();
        unlockBody();
      } else {
        window.setTimeout(() => {
          container.remove();
          unlockBody();
        }, 80);
      }`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('modal closes instantly for input, 80ms for paint');
