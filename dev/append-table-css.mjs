import fs from 'node:fs';

const p = 'web/src/styles/grid.css';
const css = `

/* ---------- 题库表格 ---------- */
.table-wrap {
  border-top: 1px solid var(--border);
  overflow-x: auto;
}

.q-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.q-table th {
  text-align: left;
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-3);
  font-weight: 600;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.q-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

.q-row:hover td {
  background: color-mix(in srgb, var(--text) 3%, transparent);
}

.c-no {
  width: 44px;
  color: var(--text-3);
  font-variant-numeric: tabular-nums;
  font-size: 11px;
  letter-spacing: 0.08em;
}

.c-q {
  min-width: 0;
}

.q-cell {
  line-height: 1.65;
  overflow-wrap: anywhere;
}

.q-cell img {
  max-height: 74px;
  max-width: 160px;
  object-fit: contain;
  border: 1px solid var(--border);
  margin: 6px 0 0;
}

.q-sub {
  margin-top: 4px;
  font-size: 11px;
  color: var(--text-3);
}

.c-type,
.c-chapter,
.c-ans {
  white-space: nowrap;
  width: 1%;
}

.tag-type {
  border: 1px solid var(--border);
  color: var(--text-2);
}

.c-act {
  width: 44px;
  text-align: right;
}

.icon-btn.sm {
  width: 28px;
  height: 28px;
  font-size: 12px;
}

/* 分页器 */
.pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 2px 4px;
}

.pager-info {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-3);
  font-variant-numeric: tabular-nums;
}

.table-count {
  padding: 12px 2px 0;
  text-align: left;
}

/* 搜索命中 */
mark.hl {
  background: #ffe27a;
  color: inherit;
  padding: 0 1px;
}

/* ---------- 富文本编辑器 ---------- */
.rt {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 0;
}

.rt-bar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--text) 2.5%, transparent);
  flex-wrap: wrap;
}

.rt-btn {
  width: 30px;
  height: 26px;
  border: 0;
  background: transparent;
  color: var(--text-2);
  font-size: 12.5px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  border-radius: 0;
}

.rt-btn:hover {
  background: color-mix(in srgb, var(--text) 7%, transparent);
  color: var(--text);
}

.rt-sep {
  width: 1px;
  height: 14px;
  background: var(--border);
  margin: 0 4px;
}

.rt-clear {
  margin-left: auto;
  color: var(--text-3);
}

.rt-area {
  padding: 12px 12px 14px;
  font-size: 14px;
  line-height: 1.7;
  outline: none;
  overflow-wrap: anywhere;
}

.rt-area:focus {
  box-shadow: inset 0 0 0 1px var(--accent);
}

.rt-area.is-empty::before {
  content: attr(data-placeholder);
  color: var(--text-3);
  pointer-events: none;
}

.rt-area img {
  max-width: 100%;
  max-height: 220px;
  object-fit: contain;
  display: block;
  margin: 8px 0;
  border: 1px solid var(--border);
}

/* ---------- 全局搜索面板 ---------- */
.search-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 240px;
}

.search-results {
  max-height: 52vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.hit {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 10px 8px;
  border: 0;
  border-bottom: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
  color: var(--text);
  font: inherit;
  border-radius: 0;
}

.hit:hover {
  background: color-mix(in srgb, var(--text) 4%, transparent);
}

.hit-src {
  flex: none;
  min-width: 34px;
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-3);
  padding-top: 3px;
}

.hit-q {
  min-width: 0;
  font-size: 13px;
  line-height: 1.55;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.hit-group {
  padding: 8px 8px 4px;
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-3);
  border-bottom: 1px solid var(--border);
}

.hit-more {
  padding: 8px;
}

.search-foot {
  margin: 0;
}
`;

fs.appendFileSync(p, css, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('grid css appended');
