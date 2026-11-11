import fs from 'node:fs';

const p = 'web/src/styles/atelier.css';
let c = fs.readFileSync(p, 'utf8');
c += `
/* 页面标题：衬线，和首屏同一语气 */
.page-title {
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.2;
}

/* 实心主按钮即使在卡片里也要是实心的 */
.btn-block.btn-primary {
  justify-content: center;
  padding: 13px 16px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: var(--accent-grad);
  color: #f7f5ee;
}

.btn-block.btn-primary::after {
  content: none;
}

.btn-block.btn-primary:hover {
  filter: brightness(1.06);
}

[data-theme='dark'] .btn-block.btn-primary {
  color: #10130f;
}

/* 小按钮：发丝边、无阴影 */
.btn-sm {
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 12.5px;
  letter-spacing: 0.02em;
}

.btn-ghost.btn-sm {
  background: transparent;
  border: 1px solid var(--border);
}
`;
fs.writeFileSync(p, c, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('ok');
