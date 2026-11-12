import fs from 'node:fs';

// api.ts: wrong.add 支持 explain
const ap = 'web/src/core/api.ts';
let a = fs.readFileSync(ap, 'utf8');
a = a.replace(
  "add: (item: { q: string; opts: string[]; a: Answer; chapter?: string; subject?: string; user_choice?: number[] | string }) =>",
  "add: (item: {\n      q: string;\n      opts: string[];\n      a: Answer;\n      chapter?: string;\n      subject?: string;\n      explain?: string;\n      user_choice?: number[] | string;\n    }) =>",
);
fs.writeFileSync(ap, a, 'utf8');

// exam.ts 修正
const ep = 'web/src/features/exam.ts';
let e = fs.readFileSync(ep, 'utf8');
e = e.replace("import { bank } from '../core/app';", "import { state } from '../core/app';");
e = e.replace("import { choiceIndexes, formatAnswer, renderRich, sameAnswer } from '../core/format';", "import { formatAnswer, renderRich, sameAnswer } from '../core/format';");
e = e.replace("const pool = bank().filter(objective);", "const pool = (state.bank ?? []).filter(objective);");
e = e.replace(
  "  const used = Date.now() - (exam.endsAt - 0) + 0; // 占位，下面用总时长减去剩余\n  const totalMs = exam.questions.length ? 0 : 0;\n",
  '',
);
e = e.replace(
  /  const picked = exam\.picks\.get\(q\.id\) \?\? \[\];\n  const left = exam\.endsAt - Date\.now\(\);\n  const answered = exam\.questions\.filter\(\(item\) => \(exam!\.picks\.get\(item\.id\) \?\? \[\]\)\.length > 0\)\.length;/,
  "  const picked = exam.picks.get(q.id) ?? [];\n  const left = exam.endsAt - Date.now();\n  const answered = exam.questions.filter((item) => (exam.picks.get(item.id) ?? []).length > 0).length;",
);
e = e.replace(
  "                 <div class=\"wrong-a\"><b class=\"bad\">你选 ${formatAnswer(\n                   exam!.picks.get(q.id) ?? [],\n                   q.opts,\n                 ) || '未答'}</b><span class=\"ok\">正确 ${formatAnswer(q.a, q.opts)}</span></div></div>`,",
  "                 <div class=\"wrong-a\"><b class=\"bad\">你选 ${formatAnswer(picksOf(q), q.opts) || '未答'}</b><span class=\"ok\">正确 ${formatAnswer(q.a, q.opts)}</span></div></div>`,",
);
if (!e.includes('function picksOf')) {
  e = e.replace('function teardown(): void {', 'function picksOf(q: Question): number[] {\n  return exam?.picks.get(q.id) ?? [];\n}\n\nfunction teardown(): void {');
}
fs.writeFileSync(ep, e, 'utf8');

for (const f of [ap, ep]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('patched');
