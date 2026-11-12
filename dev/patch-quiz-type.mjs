import fs from 'node:fs';

const p = 'web/src/views/quiz.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 导入题型与统计
s = s.replace(
  "import { isEssay,",
  "import { detectType, isTextAnswer, record as recordStat } from '../core/question-type';\nimport { isEssay,",
);

// 2) 判分：填空题自动比对，主观题交给 AI
s = s.replace(
  `  if (isEssay(q.a)) {
    rec.correct = null;
  } else {`,
  `  const qtype = detectType(q);
  if (isTextAnswer(qtype)) {
    if (qtype === 'blank') {
      // 填空题：去掉空白与标点后比对，答对直接判对
      const norm = (v: string) => String(v).replace(/[\\s，。、；：""''（）()【】\\[\\]]/g, '').toLowerCase();
      rec.correct = norm(rec.text ?? '') !== '' && norm(rec.text ?? '') === norm(String(q.a ?? ''));
    } else {
      rec.correct = null;
    }
  } else {`,
);

// 3) 判分后记一笔（选择题）
s = s.replace(
  `  paint();
  if (rec.correct && rt.options.questions.length > rt.idx + 1) {`,
  `  note(q, rec);
  paint();
  if (rec.correct && rt.options.questions.length > rt.idx + 1) {`,
);

// 4) 手标也记一笔
s = s.replace(
  `function markEssay(q: Question, rec: RecordItem, ok: boolean): void {
  rec.correct = ok;`,
  `function markEssay(q: Question, rec: RecordItem, ok: boolean): void {
  rec.correct = ok;
  rec.submitted = true;
  note(q, rec);`,
);

// 5) AI 阅卷成功也记一笔
s = s.replace(
  `  rec.correct = ok;
  rec.submitted = true;`,
  `  rec.correct = ok;
  rec.submitted = true;
  note(q, rec);`,
);

// 6) 统计函数
s = s.replace(
  `function correctStreak(): number {`,
  `/** 每道题只统计一次，用于「练习记录」 */
function note(q: Question, rec: RecordItem): void {
  if (!rec.submitted || rec.correct === null || rec.correct === undefined) return;
  const key = rec as RecordItem & { counted?: boolean };
  if (key.counted) return;
  key.counted = true;
  recordStat(detectType(q), rec.correct === true);
}

function correctStreak(): number {`,
);

// 7) 标签用统一题型名
s = s.replace(
  `<span>\${multi ? '多选' : isEssay(q.a) ? '简答' : '单选'}</span>`,
  `<span>\${TYPE_LABEL[detectType(q)]}</span>`,
);
s = s.replace(
  "import { detectType, isTextAnswer, record as recordStat } from '../core/question-type';",
  "import { detectType, isTextAnswer, TYPE_LABEL, record as recordStat } from '../core/question-type';",
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('quiz patched:', s.includes('recordStat') && s.includes('TYPE_LABEL[detectType(q)]'));
