import fs from 'node:fs';

const p = 'web/src/features/import-dialog.ts';
let s = fs.readFileSync(p, 'utf8');

const before = `  const head = drafts.slice(0, 4);
  const rows = head
    .map(
      (d, i) => \`<li><b>\${i + 1}.</b> \${escapeHtml(d.q).slice(0, 90)}\${(d.opts ?? []).length ? \`<span class="muted"> · \${(d.opts ?? []).length} 个选项</span>\` : '<span class="muted"> · 简答</span>'}</li>\`,
    )
    .join('');
  const more = drafts.length > head.length ? \`<li class="muted">…还有 \${drafts.length - head.length} 道</li>\` : '';`;

const after = `  const head = drafts.slice(0, 4);
  const rows = head
    .map((d, i) => {
      const opts = (d.opts ?? []).length;
      const warn = problemOf(d);
      return \`<li><b>\${i + 1}.</b> \${escapeHtml(d.q).slice(0, 90)}\${
        opts ? \`<span class="muted"> · \${opts} 个选项</span>\` : '<span class="muted"> · 简答</span>'
      }\${warn ? \`<span class="tag-warn">\${warn}</span>\` : ''}</li>\`;
    })
    .join('');
  const more = drafts.length > head.length ? \`<li class="muted">…还有 \${drafts.length - head.length} 道</li>\` : '';
  const problems = drafts.map(problemOf).filter(Boolean).length;`;

if (!s.includes('function problemOf')) {
  s = s.replace(before, after);
  s = s.replace(
    `  return \`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 \${drafts.length} 道题</span>`,
    `  return \`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 \${drafts.length} 道题</span>
      \${problems ? \`<span class="tag tag-warn">\${problems} 道待确认</span>\` : ''}`,
  );
  s = s.replace(
    `function parseByKind(kind: string, text: string): QuestionDraft[] {`,
    `/** 一眼就能发现的问题：没答案、单选题选项不足 */
function problemOf(d: QuestionDraft): string {
  const opts = (d.opts ?? []).length;
  const a = d.a;
  const hasAnswer = Array.isArray(a) ? a.length > 0 : a !== '' && a !== null && a !== undefined;
  if (!hasAnswer) return '没识别到答案';
  if (opts === 1) return '只有 1 个选项';
  if (opts >= 2 && typeof a === 'number' && (a < 0 || a >= opts)) return '答案越界';
  return '';
}

function parseByKind(kind: string, text: string): QuestionDraft[] {`,
  );
}

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('preview warnings added');
