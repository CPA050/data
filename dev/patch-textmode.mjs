import fs from 'node:fs';

const p = 'web/src/views/quiz.ts';
let s = fs.readFileSync(p, 'utf8');

// 统一的"文字作答"判定：题型优先（填空/简答/计算），答案形态兜底
const helper = `
function textMode(q: Question): boolean {
  const t = detectType(q);
  return t === 'blank' || t === 'essay' || t === 'calc' || isEssay(q.a);
}
`;

s = s.replace('function renderOptions(q: Question, rec: RecordItem): string {', helper + '\nfunction renderOptions(q: Question, rec: RecordItem): string {');
s = s.replace('function renderOptions(q: Question, rec: RecordItem): string {\n  if (isEssay(q.a)) {', 'function renderOptions(q: Question, rec: RecordItem): string {\n  if (textMode(q)) {');

// 答案展示 / 多选判定 / 按钮文案 / 判分 / 提交 / AI 阅卷入口，全部改用 textMode
s = s.replace('const answerText = isEssay(q.a) ? String(q.a) : formatAnswer(q.a, q.opts);', 'const answerText = textMode(q) ? String(q.a) : formatAnswer(q.a, q.opts);');
s = s.replace('const mine = isEssay(q.a)', 'const mine = textMode(q)');
s = s.replace('if (isEssay(q.a)) {', 'if (textMode(q)) {');
s = s.replace('const multi = choiceIndexes(q.a).length > 1 && !isEssay(q.a);', 'const multi = !textMode(q) && choiceIndexes(q.a).length > 1;');
s = s.replace("${multi || isEssay(q.a) ? '提交答案' : '查看答案'}", "${multi || textMode(q) ? '提交答案' : '查看答案'}");
s = s.replace('`正确答案：${isEssay(q.a) ? q.a : formatAnswer(q.a, q.opts)}`', '`正确答案：${textMode(q) ? q.a : formatAnswer(q.a, q.opts)}`');
s = s.replace('rec.submitted ? `我的作答：${isEssay(q.a) ? rec.text : formatAnswer(rec.picked, q.opts)}` : \'\'', 'rec.submitted ? `我的作答：${textMode(q) ? rec.text : formatAnswer(rec.picked, q.opts)}` : \'\'');
s = s.replace('if (isEssay(q.a)) return true;', 'if (textMode(q)) return true;');
s = s.replace('if (isEssay(q.a)) {', 'if (textMode(q)) {');
s = s.replace('if (!isEssay(q.a) || runtime?.busy) return true;', 'if (!textMode(q) || runtime?.busy) return true;');
s = s.replace('if (!isEssay(q.a)) return true;', 'if (!textMode(q)) return true;');

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('textMode refactor:', (s.match(/textMode\(/g) || []).length);
