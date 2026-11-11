import fs from 'node:fs';

const p = 'web/src/styles/atelier.css';
let s = fs.readFileSync(p, 'utf8');

s += `
/* 动作左侧图标：与底栏同一套线条 */
.action-ico svg {
  width: 14px;
  height: 14px;
  display: block;
}

/* toast：更轻，像纸片上的一行提示 */
.toast {
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 18px 40px -34px rgba(21, 23, 26, 0.9);
  font-size: 12.5px;
  letter-spacing: 0.01em;
  padding: 11px 14px;
}

.toast::before {
  width: 5px;
  height: 5px;
}
`;

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('ok');
