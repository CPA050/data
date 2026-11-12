import { formatAnswer } from '../core/format';
import { renderRich } from '../core/format';
import { detectType, TYPE_LABEL } from '../core/question-type';
import type { Question } from '../core/types';
import { notify } from '../ui/toast';

export interface SheetOptions {
  title?: string;
  /** 是否把答案附在最后 */
  answers?: boolean;
  /** 每页题量提示（仅打印分页用） */
  subtitle?: string;
}

const PAGE_CSS = `
  @page { size: A4; margin: 18mm 16mm 16mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    color: #111;
    background: #fff;
    font: 15px/1.75 "Songti SC", "SimSun", "Noto Serif SC", serif;
  }
  .sheet-head { border-bottom: 2px solid #111; padding-bottom: 10px; margin-bottom: 22px; }
  .sheet-kicker { font: 600 10px/1.4 system-ui, sans-serif; letter-spacing: .22em; color: #555; text-transform: uppercase; }
  .sheet-title { font-size: 26px; font-weight: 700; margin: 6px 0 4px; letter-spacing: .02em; }
  .sheet-meta { font: 12px/1.6 system-ui, sans-serif; color: #666; }
  .q { margin: 0 0 20px; page-break-inside: avoid; }
  .q-no { font: 600 12px/1 system-ui, sans-serif; color: #888; letter-spacing: .1em; margin-bottom: 6px; }
  .q-body { font-size: 15px; }
  .q-body img { max-width: 100%; max-height: 260px; object-fit: contain; display: block; margin: 8px 0; }
  .q-opts { margin: 8px 0 0; padding: 0; list-style: none; }
  .q-opts li { margin: 3px 0 3px 4px; }
  .q-opts .k { display: inline-block; width: 1.6em; color: #111; font-weight: 600; }
  .q-tag { font: 500 10px/1 system-ui, sans-serif; color: #666; letter-spacing: .08em; }
  .answer-key { page-break-before: always; }
  .answer-key h2 { font-size: 18px; border-bottom: 1px solid #111; padding-bottom: 8px; margin: 0 0 14px; }
  .answer-key li { margin: 4px 0; font-size: 13px; }
  .answer-key .k { display: inline-block; width: 3em; color: #888; }
  .tips { margin-top: 26px; font: 11px/1.6 system-ui, sans-serif; color: #999; }
  mark.hl { background: #ffe58a; }
`;

function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch] ?? ch);
}

/** 打开一个可打印的试卷页（在打印对话框里选「另存为 PDF」） */
export function exportSheet(rows: Question[], options: SheetOptions = {}): void {
  if (!rows.length) {
    notify.info('没有可导出的题目');
    return;
  }
  const title = options.title || '练习试卷';
  const date = new Date().toLocaleDateString('zh-CN');
  const withAnswers = options.answers !== false;

  const questions = rows
    .map((q, index) => {
      const type = detectType(q);
      const opts = (q.opts ?? [])
        .map((opt, i) => {
          const text = opt.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/, '');
          return `<li><span class="k">${String.fromCharCode(65 + i)}</span>${renderRich(text)}</li>`;
        })
        .join('');
      return `<article class="q">
        <div class="q-no">${String(index + 1).padStart(2, '0')} · ${TYPE_LABEL[type]}${
          q.chapter ? ` · ${esc(q.chapter)}` : ''
        }</div>
        <div class="q-body">${renderRich(q.q)}</div>
        ${opts ? `<ul class="q-opts">${opts}</ul>` : '<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`;
    })
    .join('');

  const keys = withAnswers
    ? `<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${rows
          .map(
            (q, index) =>
              `<li><span class="k">${String(index + 1).padStart(2, '0')}</span>${esc(
                formatAnswer(q.a, q.opts ?? []),
              )}</li>`,
          )
          .join('')}</ol>
      </section>`
    : '';

  const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${esc(title)} · ${date}</title>
<style>${PAGE_CSS}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">Origin Quiz / Practice Sheet</div>
    <h1 class="sheet-title">${esc(title)}</h1>
    <div class="sheet-meta">${date} · 共 ${rows.length} 题${options.subtitle ? ' · ' + esc(options.subtitle) : ''} · 姓名 __________ 得分 ______</div>
  </header>
  ${questions}
  ${keys}
  <p class="tips">由「原点 · Origin」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`;

  const win = window.open('', '_blank');
  if (!win) {
    notify.error('浏览器拦住了新窗口，请允许弹出窗口后重试');
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
  win.focus();
  notify.ok(`已生成 ${rows.length} 题的打印版，在打印里选「另存为 PDF」`);
}
