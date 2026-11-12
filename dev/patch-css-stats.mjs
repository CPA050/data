import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
s += `
/* ---------------- 练习记录 ---------------- */

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-bottom: 1px solid var(--border);
  padding-bottom: 14px;
}

.stat-cell {
  display: grid;
  gap: 3px;
  border-left: 1px solid var(--border);
  padding-left: 12px;
}

.stat-cell:first-child {
  border-left: 0;
  padding-left: 0;
}

.stat-big {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.stat-cap {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--muted);
}

.type-stats {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}

.type-row {
  display: grid;
  grid-template-columns: 52px 1fr 56px;
  align-items: center;
  gap: 10px;
}

.type-name {
  font-size: 12px;
  color: var(--text-2);
}

.type-bar {
  height: 4px;
  background: color-mix(in srgb, var(--text) 10%, transparent);
  overflow: hidden;
}

.type-bar i {
  display: block;
  height: 100%;
  background: var(--text);
  transition: width 0.4s cubic-bezier(0.2, 0.7, 0.3, 1);
}

.type-val {
  font-size: 11px;
  text-align: right;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.days {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 72px;
  margin-top: 16px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.day {
  flex: 1;
  display: grid;
  align-content: end;
  justify-items: center;
  gap: 6px;
  height: 100%;
}

.day i {
  display: block;
  width: 100%;
  max-width: 18px;
  background: var(--accent);
  opacity: 0.85;
}

.day span {
  font-size: 9px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

/* ---------------- 科目选择 ---------------- */

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  padding: 8px 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  font-size: 13px;
  cursor: pointer;
}

.chip.is-on {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}
`;
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('stats + chips css ok');
