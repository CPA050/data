import fs from 'node:fs';

const p = 'web/src/features/session.ts';
let s = fs.readFileSync(p, 'utf8');

// practiceBank：进入前先选科目
s = s.replace(
  `export async function practiceBank(mode: 'random' | 'sequential' | 'chapter' = 'random'): Promise<void> {
  const bank = state.bank ?? [];
  if (!bank.length) {
    notify.info('题库还是空的，先去添加题目吧');
    return;
  }
`,
  `export async function practiceBank(mode: 'random' | 'sequential' | 'chapter' = 'random'): Promise<void> {
  const all = state.bank ?? [];
  if (!all.length) {
    notify.info('题库还是空的，先去添加题目吧');
    return;
  }

  const subject = await askSubject(all);
  if (subject === null) return;
  const bank = subject ? all.filter((q) => (q.subject?.trim() || '默认题库') === subject) : all;
`,
);

// 乱序练习：也先选科目
s = s.replace(
  `export function practiceShuffle(): void {
  const bank = state.bank ?? [];
  if (!bank.length) {
    notify.info('题库还是空的，先去添加题目吧');
    return;
  }
  startQuiz({
    questions: shuffle(bank),
    source: 'all',
    title: \`乱序练习 · \${bank.length} 题\`,
  });
}`,
  `export async function practiceShuffle(): Promise<void> {
  const all = state.bank ?? [];
  if (!all.length) {
    notify.info('题库还是空的，先去添加题目吧');
    return;
  }
  const subject = await askSubject(all);
  if (subject === null) return;
  const bank = subject ? all.filter((q) => (q.subject?.trim() || '默认题库') === subject) : all;
  startQuiz({
    questions: shuffle(bank),
    source: 'all',
    title: \`乱序练习 · \${bank.length} 题\${subject ? \` · \${subject}\` : ''}\`,
  });
}`,
);

fs.writeFileSync(p, s, 'utf8');

// home.ts：shuffle 现在是 async
const h = 'web/src/views/home.ts';
let t = fs.readFileSync(h, 'utf8');
t = t.replace("    case 'shuffle':\n      practiceShuffle();", "    case 'shuffle':\n      await practiceShuffle();");
fs.writeFileSync(h, t, 'utf8');

for (const f of [p, h]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('subject picker wired');
