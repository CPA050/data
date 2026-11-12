import fs from 'node:fs';

// 登录成功不再弹"欢迎回来"，交给首页的进站问候，避免两条 toast 叠在一起
const a = 'web/src/views/auth.ts';
let s = fs.readFileSync(a, 'utf8');
s = s.replace(
  "  notify.ok(local.step === 'create' ? '账号已创建，开始刷题吧' : `欢迎回来，${state.user}`);",
  "  if (local.step === 'create') notify.ok('账号已创建，开始刷题吧');",
);
fs.writeFileSync(a, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(a));

// 首页纵向节奏收紧一点，少留空
const c = 'web/src/styles/responsive.css';
let t = fs.readFileSync(c, 'utf8');
t += `
/* 首页节奏：少留空，一屏看完 */
.masthead {
  margin-bottom: 0;
}

.stat-strip {
  margin-top: 12px;
}

.primary-row {
  margin-top: 14px;
}

.tile-grid-sm {
  margin-top: 8px;
}
`;
fs.writeFileSync(c, t, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(c));
console.log('auth toast + spacing ok');
