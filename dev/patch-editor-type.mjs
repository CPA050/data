import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 题型选择器（放在答案之前）
if (!s.includes('data-role="type"')) {
  s = s.replace(
    `    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>`,
    `    <label class="field">
      <span class="field-label">题型 <span class="muted small">（自动识别不准时手动指定）</span></span>
      <select class="input" data-role="type">
        \${TYPE_OPTIONS.map(
          (t) =>
            \`<option value="\${t.value}"\${((question?.type ?? '') === t.value) ? ' selected' : ''}>\${t.label}</option>\`,
        ).join('')}
      </select>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>`,
  );
}

// 2) 导入题型选项
if (!s.includes('TYPE_OPTIONS')) {
  s = s.replace(
    "import { detectType, TYPE_LABEL, typeHint } from '../core/question-type';",
    "import { detectType, TYPE_LABEL, TYPE_OPTIONS, typeHint } from '../core/question-type';",
  );
}

// 3) 读取并提交 type
if (!s.includes("data-role=\"type\")")) {
  s = s.replace(
    "  const chapterEl = card.querySelector<HTMLInputElement>('[data-role=\"chapter\"]');",
    "  const chapterEl = card.querySelector<HTMLInputElement>('[data-role=\"chapter\"]');\n  const typeEl = card.querySelector<HTMLSelectElement>('[data-role=\"type\"]');",
  );
}

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('editor type select:', s.includes('data-role="type"'), '| opts import:', s.includes('TYPE_OPTIONS'));
