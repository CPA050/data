import fs from 'node:fs';

const p = 'dev/server.mjs';
let s = fs.readFileSync(p, 'utf8');

const start = s.indexOf('    if (isGenerate) {');
const endMarker = '    }\n    if (isExtract) {';
const end = s.indexOf(endMarker);
if (start < 0 || end < 0) throw new Error('generate block not found');

const block = `    if (isGenerate) {
      // 按提示里的「数量：N 道」动态造题，并让题面带序号，避免客户端去重把它们吃掉
      const asked = Number(/数量：(\\d+)\\s*道/.exec(sys)?.[1] ?? 2);
      const count = Math.min(20, Math.max(1, asked));
      content = JSON.stringify(
        Array.from({ length: count }, (_, i) => {
          seq += 1;
          const no = seq;
          return {
            q: \`【AI 生成】模拟题 \${no}：第 \${no} 号知识点，下列说法正确的是？\`,
            opts: [\`A. 说法 A-\${no}\`, \`B. 说法 B-\${no}\`, \`C. 说法 C-\${no}\`, \`D. 说法 D-\${no}\`],
            a: no % 4,
            explain: \`解析 \${no}：这是本地假数据。\`,
            chapter: no % 3 === 0 ? '混凝土' : no % 3 === 1 ? '建筑材料' : '施工管理',
            subject: '一建建筑',
            ...(i === 0 && no % 5 === 0
              ? { figure: { kind: 'beam', caption: '简支梁受力图', span: 6, load: 'uniform', value: 20 } }
              : {}),
          };
        }),
      );
    }
    if (isExtract) {`;

s = s.slice(0, start) + block + s.slice(end + endMarker.length);
s = s.replace('const stats = { aiCalls: 0 };', 'const stats = { aiCalls: 0 };\nlet seq = 0;');

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('dynamic generate fixtures ok');
