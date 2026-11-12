import fs from 'node:fs';

const p = 'web/src/styles/grid.css';
let s = fs.readFileSync(p, 'utf8');
if (!s.includes('.exam-entry')) {
  s += `
/* ---------- 模拟考试入口 ---------- */
.exam-entry {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'label arrow'
    'title arrow'
    'desc arrow';
  gap: 3px;
  width: 100%;
  margin: 2px 0 14px;
  padding: 16px 18px;
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--text);
  color: var(--text);
  cursor: pointer;
}

.exam-entry:hover {
  background: var(--text);
  color: var(--surface);
}

.exam-entry-label {
  grid-area: label;
  font-size: 9.5px;
  letter-spacing: 0.2em;
  color: var(--muted);
}

.exam-entry-title {
  grid-area: title;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.exam-entry-desc {
  grid-area: desc;
  font-size: 11.5px;
  color: var(--muted);
}

.exam-entry:hover .exam-entry-label,
.exam-entry:hover .exam-entry-desc {
  color: color-mix(in srgb, var(--surface) 72%, transparent);
}

.exam-entry-arrow {
  grid-area: arrow;
  align-self: center;
  font-size: 18px;
}

/* ---------- 模拟考试 ---------- */
.exam {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.exam-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: calc(10px + var(--safe-t)) 14px 10px;
  border-bottom: 1px solid var(--border);
}

.exam-progress {
  flex: 1;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.exam-clock {
  font-size: 17px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

.exam-clock.is-urgent {
  color: var(--bad);
}

.exam-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px 24px;
}

.exam-foot {
  display: flex;
  gap: 8px;
  padding: 10px 14px calc(10px + var(--safe-b));
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.exam-foot .btn {
  flex: 1;
}

/* ---------- 考试结果 ---------- */
.score-big {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.score-big span {
  font-size: 16px;
  font-weight: 600;
  margin-left: 4px;
}

.score-sub {
  margin-top: 6px;
  font-size: 12px;
  color: var(--muted);
}

.wrong-list {
  margin-top: 16px;
  border-top: 1px solid var(--border);
}

.wrong-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.wrong-q {
  font-size: 13.5px;
  line-height: 1.55;
}

.wrong-a {
  display: flex;
  gap: 12px;
  margin-top: 6px;
  font-size: 12px;
}

.wrong-a .bad {
  color: var(--bad);
}

.wrong-a .ok {
  color: var(--ok);
}

.all-right {
  margin-top: 14px;
  font-size: 13px;
  color: var(--ok);
}

/* ---------- 解析 ---------- */
.explain-body {
  margin-top: 6px;
  font-size: 13.5px;
  line-height: 1.7;
}

/* ---------- AI 生成预览 ---------- */
.import-item {
  padding: 9px 0;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  line-height: 1.55;
}
`;
  fs.writeFileSync(p, s, 'utf8');
  new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
}

// 假上游：AI 出题（generate）
const sp = 'dev/server.mjs';
let v = fs.readFileSync(sp, 'utf8');
if (!v.includes('isGenerate')) {
  v = v.replace(
    "const isExtract =",
    "const isGenerate =\n    system.includes('命题老师') || userText.includes('题库：');\n  const isExtract =",
  );
  v = v.replace(
    '    return json({\n      choices: [{ message: { content:',
    '    if (isGenerate) {\n      const body = JSON.stringify([\n        {\n          q: \'【AI 生成】混凝土的强度等级是按什么划分的？\',\n          opts: [\'A. 立方体抗压强度标准值\', \'B. 抗拉强度\', \'C. 弹性模量\', \'D. 坍落度\'],\n          a: 0,\n          explain: \'混凝土强度等级按立方体抗压强度标准值划分。\',\n          chapter: \'混凝土\',\n          subject: \'一建建筑\',\n        },\n      ]);\n      return json({\n        choices: [{ message: { content: body } }],\n        usage: { total_tokens: 42 },\n      });\n    }\n    return json({\n      choices: [{ message: { content:',
  );
  fs.writeFileSync(sp, v, 'utf8');
}
console.log('exam css + fake generate');
