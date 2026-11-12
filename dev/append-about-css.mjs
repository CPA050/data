import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');
if (!s.includes('.about-head')) {
  s += `
/* ---------- 关于：品牌页 ---------- */
.about {
  margin: -4px 0 2px;
}

.about-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.about-mark {
  width: 44px;
  height: 44px;
  flex: none;
  display: grid;
  place-items: center;
  background: var(--text);
  color: var(--bg);
}

.about-mark svg {
  display: block;
  width: 24px;
  height: 24px;
}

.about-txt {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.about-name {
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.14em;
}

.about-latin {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.34em;
  color: var(--text-3);
}

.about-ver {
  margin-left: auto;
  align-self: flex-start;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--text-3);
  font-variant-numeric: tabular-nums;
}

.about-line {
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.65;
  color: var(--text-2);
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 16px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.about-stat {
  padding: 12px 0 11px;
  text-align: left;
}

.about-stat + .about-stat {
  padding-left: 14px;
  border-left: 1px solid var(--border);
}

.about-stat b {
  display: block;
  font-size: 22px;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.about-stat span {
  display: block;
  margin-top: 5px;
  font-size: 9.5px;
  letter-spacing: 0.18em;
  color: var(--text-3);
}

.about-sec {
  margin: 18px 0 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: var(--text-3);
}

.about .kbd-row {
  padding: 7px 0;
}

.about .kbd {
  min-width: 92px;
}

.about-foot {
  margin: 16px 0 0;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-3);
}
`;
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('about css ok');
