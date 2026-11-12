import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  "import { detectType, TYPE_LABEL } from '../core/question-type';",
  "import { detectType, TYPE_LABEL, TYPE_OPTIONS } from '../core/question-type';",
);

// 删掉误插到别处的那一行
s = s.replace("  const typeEl = card.querySelector<HTMLSelectElement>('[data-role=\"type\"]');\n", '');

// 在构造 draft 之前拿到 select
s = s.replace(
  '  const draft: QuestionDraft = {',
  "  const typeEl = card.querySelector<HTMLSelectElement>('[data-role=\"type\"]');\n\n  const draft: QuestionDraft = {",
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('fixed');
