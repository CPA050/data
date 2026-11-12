import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
if (!s.includes('.today-num')) {
  s += `
/* ---------------- 今日进度（首页） ---------------- */

.today {
  margin-top: 8px;
}

.today-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.today-num {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.045em;
  font-variant-numeric: tabular-nums;
}

.today-cap {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 14px;
  color: var(--text-2);
}

.today-cap small {
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--muted);
}

.today-side {
  margin-left: auto;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
  white-space: nowrap;
}

.today-side b {
  color: var(--text);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.today-goal {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}

.today-bar {
  position: relative;
  flex: 1;
  height: 3px;
  background: color-mix(in srgb, var(--text) 12%, transparent);
  overflow: hidden;
}

.today-bar i {
  display: block;
  height: 100%;
  background: var(--text);
  transition: width 0.5s cubic-bezier(0.2, 0.7, 0.3, 1);
}

.today-goal-cap {
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--muted);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

@media (min-width: 720px) {
  .today-num {
    font-size: 64px;
  }
}
`;
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('today css ok');
