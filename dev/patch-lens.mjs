import fs from 'node:fs';

const p = 'web/src/styles/liquid.css';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  `  background: var(--lg-surface-2);
  border: 1px solid var(--lg-edge);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    0 8px 16px -12px rgba(10, 12, 15, 0.5);`,
  `  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    inset 0 1px 0 #ffffff,
    inset 0 -8px 14px -10px rgba(10, 12, 15, 0.22),
    0 10px 20px -14px rgba(10, 12, 15, 0.55);`,
);

s = s.replace(
  `[data-theme='dark'] .tabbar .tab-ind {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
}`,
  `[data-theme='dark'] .tabbar .tab-ind {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 -8px 14px -10px rgba(0, 0, 0, 0.6),
    0 10px 20px -16px rgba(0, 0, 0, 0.8);
}`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('lens strengthened');
