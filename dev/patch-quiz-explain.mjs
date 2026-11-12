import fs from 'node:fs';

const p = 'web/src/views/quiz.ts';
let s = fs.readFileSync(p, 'utf8');

// 答案解析：本地有 explain 就直接显示，没有才提示用 AI
s = s.replace(
  `  return \`<div class="answer-panel">
    <div class="ai-title">\${rec.correct ? '✅ 回答正确' : '❌ 回答错误'}</div>
    正确答案：\${escapeHtml(formatAnswer(q.a, q.opts))}
    \${rec.correct ? '' : \`<br>你的选择：\${escapeHtml(mine)}\`}
  </div>\`;`,
  `  const explain = (q.explain ?? '').trim();
  return \`<div class="answer-panel">
    <div class="ai-title">\${rec.correct ? '✅ 回答正确' : '❌ 回答错误'}</div>
    正确答案：\${escapeHtml(formatAnswer(q.a, q.opts))}
    \${rec.correct ? '' : \`<br>你的选择：\${escapeHtml(mine)}\`}
    \${
      explain
        ? \`<div class="divider"></div><div class="ai-title" style="color:var(--text-3)">解析</div><div class="explain-body">\${renderRich(
            explain,
          )}</div>\`
        : ''
    }
  </div>\`;`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('quiz explain panel added');
