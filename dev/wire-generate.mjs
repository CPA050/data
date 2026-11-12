import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

if (!s.includes("data-act=\"generate\"")) {
  s = s.replace(
    `      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>`,
    `      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>
      <button class="tool-btn" data-act="generate" title="AI 出题">✦<span>出题</span></button>`,
  );
  s = s.replace(
    "import { openImport } from '../features/import-dialog';",
    "import { openImport } from '../features/import-dialog';\nimport { openGenerate } from '../features/generate';",
  );
  s = s.replace(
    `    case 'import':`,
    `    case 'generate':
      await openGenerate();
      return true;
    case 'import':`,
  );
}
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('bank generate button');
