import fs from 'node:fs';

const p = 'web/src/features/generate.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 引入 figure
s = s.replace(
  "import { parseJsonQuestions } from './import';",
  "import { parseJsonQuestions } from './import';\nimport { figureDataUrl, readFigure } from './figure';",
);

// 2) 生成后把 figure 画成图，塞进题干
s = s.replace(
  `  if (drafts.length) {`,
  `  if (drafts.length) {`,
);

const oldPreview = `  const preview = document.createElement('div');
  preview.innerHTML = \`
    <div class="muted small" style="margin-bottom:8px">共 \${drafts.length} 道，确认后写入「\${escapeHtml(subjectVal)}」</div>
    <div class="import-list">
      \${drafts
        .slice(0, 20)
        .map(
          (d, i) =>
            \`<div class="import-item"><b>\${i + 1}.</b> \${escapeHtml(String(d.q ?? '').slice(0, 70))}\${
              Array.isArray(d.opts) && d.opts.length ? \` <span class="muted">· \${d.opts.length} 选项</span>\` : ''
            }</div>\`,
        )
        .join('')}
    </div>\`;`;

const newPreview = `  // 把 AI 给的 figure 描述画成本地 SVG，贴进题干；画不出来的就丢弃 figure
  let figures = 0;
  const withFigures = drafts.map((d) => {
    const spec = readFigure((d as unknown as Record<string, unknown>).figure);
    const url = figureDataUrl(spec);
    if (!url) return d;
    figures += 1;
    const caption = (spec?.caption ?? '示意图').replace(/"/g, '');
    return { ...d, q: \`\${d.q}\\n<img src="\${url}" alt="\${caption}">\` };
  });
  drafts = withFigures;

  const preview = document.createElement('div');
  preview.innerHTML = \`
    <div class="muted small" style="margin-bottom:8px">共 \${drafts.length} 道\${
      figures ? \`（\${figures} 道带示意图）\` : ''
    }，确认后写入「\${escapeHtml(subjectVal)}」</div>
    <div class="import-list">
      \${drafts
        .slice(0, 20)
        .map((d, i) => {
          const img = /<img\\b[^>]*src="([^"]+)"/i.exec(String(d.q ?? ''));
          const thumb = img ? \`<img class="gen-thumb" src="\${img[1]}" alt="示意图">\` : '';
          const text = String(d.q ?? '')
            .replace(/<img\\b[^>]*>/gi, ' ')
            .replace(/\\s+/g, ' ')
            .trim();
          return \`<div class="import-item gen-item"><div class="gen-row"><b>\${i + 1}.</b> \${escapeHtml(
            text.slice(0, 64),
          )}\${Array.isArray(d.opts) && d.opts.length ? \` <span class="muted">· \${d.opts.length} 选项</span>\` : ''}</div>\${thumb}</div>\`;
        })
        .join('')}
    </div>\`;`;

if (!s.includes('gen-thumb')) {
  s = s.replace(oldPreview, newPreview);
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('generate preview with figures');
