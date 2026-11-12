import fs from 'node:fs';

const p = 'web/src/views/me.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 两行合并成一行「关于基准」
s = s.replace(
  `      <button class="btn btn-ghost btn-block" data-act="shortcuts">键盘快捷键</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block" data-act="about">关于这个题库</button>`,
  `      <button class="btn btn-ghost btn-block" data-act="about">关于基准 · 快捷键</button>`,
);

// 2) 处理 about → 品牌页；shortcuts 保留（? 键仍可用）
s = s.replace(
  /    case 'about': \{[\s\S]*?\n    \}\n/,
  `    case 'about': {
      openAbout();
      return true;
    }
`,
);

// 3) 引入 openAbout
s = s.replace("import { openShortcuts } from '../features/shortcuts';", "import { openAbout } from '../features/about';\nimport { openShortcuts } from '../features/shortcuts';");

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('me.ts patched:', s.includes('关于基准 · 快捷键'), s.includes('openAbout()'));
