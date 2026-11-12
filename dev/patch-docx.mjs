import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

if (!s.includes("from '../features/export-docx'")) {
  s = s.replace(
    "import { exportSheet } from '../features/export-sheet';",
    "import { exportSheet } from '../features/export-sheet';\nimport { exportDocx } from '../features/export-docx';",
  );
}

s = s.replace(
  `      <button class="icon-btn" data-act="print" aria-label="导出试卷" title="导出试卷（打印 / 存 PDF）">⎙</button>`,
  `      <button class="icon-btn" data-act="print" aria-label="导出试卷" title="导出试卷（打印 / 存 PDF）">⎙</button>
      <button class="icon-btn" data-act="docx" aria-label="导出 Word" title="导出 Word（.docx）">⤓</button>`,
);

s = s.replace(
  `    case 'print-selected':`,
  `    case 'docx':
      await exportDocx(filtered(), {
        title: \`题库 · \${ui.subject === 'all' ? '全部' : ui.subject}\`,
        subtitle: '原点 · Origin',
      });
      return true;
    case 'docx-selected':
      await exportDocx(bank().filter((q) => ui.selected.has(q.id)), {
        title: '选中题目 · 试卷',
        subtitle: '原点 · Origin',
      });
      return true;
    case 'print-selected':`,
);

s = s.replace(
  `          <button class="btn btn-sm" data-act="print-selected" \${ui.selected.size ? '' : 'disabled'}>导出试卷</button>`,
  `          <button class="btn btn-sm" data-act="print-selected" \${ui.selected.size ? '' : 'disabled'}>导出试卷</button>
          <button class="btn btn-sm" data-act="docx-selected" \${ui.selected.size ? '' : 'disabled'}>导出 Word</button>`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('bank docx wired');
