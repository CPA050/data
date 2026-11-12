import fs from 'node:fs';

// ---------- router: exam 分发 ----------
const rp = 'web/src/core/router.ts';
let r = fs.readFileSync(rp, 'utf8');
if (!r.includes('examActive')) {
  r = r.replace(
    "import { quizActive } from '../features/session';",
    "import { quizActive } from '../features/session';\nimport { examActive, handleExam } from '../features/exam';",
  );
  r = r.replace(
    `  if (quizActive() && el.closest('.quiz')) {`,
    `  if (examActive() && el.closest('.exam')) {
    if (handleExam(el.dataset.ex ?? '', el)) return;
  }

  if (quizActive() && el.closest('.quiz')) {`,
  );
}
fs.writeFileSync(rp, r, 'utf8');

// ---------- home: 模拟考试入口 ----------
const hp = 'web/src/views/home.ts';
let h = fs.readFileSync(hp, 'utf8');
if (!h.includes('data-act="exam"')) {
  h = h.replace(
    `    <div class="tile-grid">`,
    `    <button class="exam-entry" data-act="exam">
      <span class="exam-entry-label">MOCK EXAM</span>
      <span class="exam-entry-title">模拟考试</span>
      <span class="exam-entry-desc">限时 <b>15</b> 分钟 · 交卷才出分 · 错题自动进错题本</span>
      <span class="exam-entry-arrow">→</span>
    </button>

    <div class="tile-grid">`,
  );
  h = h.replace(
    "  if (action === 'goto') {",
    `  if (action === 'exam') {
    void startExam();
    return true;
  }

  if (action === 'goto') {`,
  );
  h = h.replace(
    "import { go } from '../core/app';",
    "import { go } from '../core/app';\nimport { startExam } from '../features/exam';",
  );
}
fs.writeFileSync(hp, h, 'utf8');

for (const f of [rp, hp]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('router + home wired');
