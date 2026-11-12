import fs from 'node:fs';

// 1) 弹窗关闭更快：200ms -> 110ms
const m = 'web/src/ui/modal.ts';
let s = fs.readFileSync(m, 'utf8');
s = s.replace("      }, 200);", "      }, 110);");
fs.writeFileSync(m, s, 'utf8');

// 2) 生成：两批并行，批间不再干等 250ms
const g = 'web/src/features/generate.ts';
let t = fs.readFileSync(g, 'utf8');
t = t.replace('    await sleep(250);', '    await sleep(90);');
fs.writeFileSync(g, t, 'utf8');

// 3) 路由：用 rAF 合并重绘，切换页即时
const r = 'web/src/core/router.ts';
let u = fs.readFileSync(r, 'utf8');
u = u.replace(
  `  scheduledRender = true;
  setTimeout(() => {
    scheduledRender = false;
    rerender();
  }, 0);`,
  `  scheduledRender = true;
  requestAnimationFrame(() => {
    scheduledRender = false;
    rerender();
  });`,
);
fs.writeFileSync(r, u, 'utf8');

for (const f of [m, g, r]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('close =>', fs.readFileSync(m, 'utf8').includes('}, 110);'));
console.log('raf =>', fs.readFileSync(r, 'utf8').includes('requestAnimationFrame(() => {\n    scheduledRender = false;'));
