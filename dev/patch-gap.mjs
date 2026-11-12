import fs from 'node:fs';

const c = 'web/src/styles/responsive.css';
let t = fs.readFileSync(c, 'utf8');
t = t.replace('.today {\n  margin-top: 10px;\n  padding-bottom: 10px;\n}', '.today {\n  margin-top: 10px;\n  padding-bottom: 6px;\n}');
t = t.replace('/* 进度条与下方数据条之间留一点空气 */\n.stat-strip {\n  margin-top: 18px;\n}', '/* 数据条与上方今日进度之间留一点空气 */\n.stat-strip {\n  margin-top: 12px;\n}');
fs.writeFileSync(c, t, 'utf8');
console.log('spacing tightened');
