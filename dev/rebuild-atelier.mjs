import fs from 'node:fs';

const p = 'web/src/styles/atelier.css';
let s = fs.readFileSync(p, 'utf8');
const cut = s.indexOf('/* 动作左侧图标');
if (cut > 0) s = s.slice(0, cut).replace(/\s+$/, '');

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

/* 「我的」里的整行按钮：去掉盒子，改成目录行 */
.btn-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 2px;
  background: none;
  border: 0;
  border-bottom: 1px solid var(--border);
  border-radius: 0;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-align: left;
  box-shadow: none;
}

.btn-block:last-child {
  border-bottom: 0;
}

.btn-block::after {
  content: '›';
  color: var(--text-3);
  font-size: 15px;
  transform: translateX(0);
  transition: transform 0.2s var(--ease-out);
}

.btn-block:hover {
  background: none;
  border-color: var(--border);
}

.btn-block:hover::after {
  transform: translateX(3px);
}

.btn-block:active {
  opacity: 0.6;
  transform: none;
}

.btn-block.danger-text {
  color: var(--accent-2);
}

/* 分段控件：淡灰底 + 白色滑块，收小圆角 */
.segmented {
  border-radius: 999px;
  background: color-mix(in srgb, var(--text) 5%, transparent);
  border: 1px solid var(--border);
  padding: 3px;
}

.seg {
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.seg[aria-pressed='true'] {
  background: var(--surface);
  box-shadow: 0 1px 2px rgba(21, 23, 26, 0.08);
  color: var(--text);
}

/* 底栏轴线：贴住上边线内侧 */
.tabbar .tab-ind {
  top: 0;
  height: 1.5px;
}
`;

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('atelier.css rebuilt, bytes =', fs.statSync(p).size);
