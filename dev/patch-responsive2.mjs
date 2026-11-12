import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');

s += `
/* 顶栏内容与正文同宽，避免大屏上品牌贴左、内容居中 */
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  max-width: 760px;
  margin-inline: auto;
}

/* 提示条：居中、不压底栏、不被裁 */
.toast-host {
  left: 50% !important;
  right: auto !important;
  transform: translateX(-50%) !important;
  width: min(420px, calc(100% - 24px)) !important;
  display: grid;
  gap: 8px;
  align-items: stretch;
}

.toast {
  width: 100%;
  max-width: none;
  margin: 0;
}

@media (min-width: 720px) {
  .header-inner {
    max-width: 100%;
  }
}

@media (min-width: 1080px) {
  .header-inner {
    max-width: 980px;
  }
}
`;

// 桌面正文加宽到 980，和顶栏对齐
s = s.replace(
  `  .view-inner {
    padding: 36px 44px 28px;
  }`,
  `  .view {
    width: min(980px, 100%);
  }

  .view-inner {
    padding: 36px 44px 28px;
  }`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('header/toast/view width patched');
