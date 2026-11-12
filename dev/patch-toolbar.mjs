import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

const before = `    <div class="row" style="margin-bottom:12px">
      <div class="search-box grow">
        <span class="ico">⌕</span>
        <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="\${escapeHtml(ui.search)}" enterkeyhint="search">
      </div>
      <button class="icon-btn" data-act="import" aria-label="导入题库" title="导入题库">⇪</button>
      <button class="icon-btn" data-act="add" aria-label="添加题目" title="添加题目">＋</button>
      <button class="icon-btn" data-act="print" aria-label="导出试卷" title="导出试卷（打印 / 存 PDF）">⎙</button>
      <button class="icon-btn" data-act="docx" aria-label="导出 Word" title="导出 Word（.docx）">⤓</button>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理" title="批量管理">\${ui.edit ? '✓' : '☰'}</button>
    </div>`;

const after = `    <div class="search-box">
      <span class="ico">⌕</span>
      <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="\${escapeHtml(ui.search)}" enterkeyhint="search">
    </div>
    <div class="tool-row">
      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>
      <button class="tool-btn" data-act="add" title="添加题目">＋<span>新建</span></button>
      <button class="tool-btn" data-act="print" title="导出试卷（打印 / 存 PDF）">⎙<span>试卷</span></button>
      <button class="tool-btn" data-act="docx" title="导出 Word（.docx）">⤓<span>Word</span></button>
      <button class="tool-btn" data-act="toggle-edit" title="批量管理">\${ui.edit ? '✓' : '☰'}<span>批量</span></button>
    </div>`;

if (!s.includes('tool-row')) {
  s = s.replace(before, after);
}

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));

const css = 'web/src/styles/grid.css';
let c = fs.readFileSync(css, 'utf8');
if (!c.includes('.tool-row')) {
  c += `
/* 题库工具栏：单独一行，五个动作带小字标签 */
.tool-row {
  display: flex;
  gap: 2px;
  margin: 10px 0 12px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.tool-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 9px 2px 8px;
  border: 0;
  background: none;
  color: var(--text);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}

.tool-btn span {
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.tool-btn:hover {
  background: color-mix(in srgb, var(--text) 5%, transparent);
}

.tool-btn:hover span {
  color: var(--text);
}
`;
  fs.writeFileSync(css, c, 'utf8');
}
console.log('toolbar row done');
