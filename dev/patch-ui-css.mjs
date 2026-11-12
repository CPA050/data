import fs from 'node:fs';

const p = 'web/src/styles/grid.css';
let s = fs.readFileSync(p, 'utf8');
s += `
/* ---------- 题库：题型筛选 / 行预览 / 导入告警 ---------- */
.chips-type {
  margin-top: -4px;
}

.chip-n {
  font-size: 10px;
  opacity: 0.6;
  margin-left: 3px;
  font-variant-numeric: tabular-nums;
}

.q-row.is-clickable {
  cursor: pointer;
}

.q-row.is-clickable:hover {
  background: color-mix(in srgb, var(--accent) 4%, transparent);
}

.peek-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.peek-q {
  font-size: 15.5px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.peek-opts {
  list-style: none;
  margin: 0 0 14px;
  padding: 0;
  display: grid;
  gap: 6px;
}

.peek-opts li {
  display: flex;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  font-size: 14px;
}

.peek-opts li b {
  width: 16px;
  flex: none;
}

.peek-opts li.is-hit {
  border-color: var(--ok);
  background: color-mix(in srgb, var(--ok) 7%, transparent);
}

.peek-ans {
  padding-top: 12px;
  border-top: 1px solid var(--border);
  font-size: 14.5px;
}

.peek-ans .muted {
  margin-right: 8px;
  font-size: 12px;
}

/* 导入预览里的告警标签 */
.tag-warn {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 6px;
  font-size: 10.5px;
  color: #b4530a;
  border: 1px solid #f0c088;
  background: #fff6e8;
  vertical-align: 1px;
}
`;
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('ui css added');
