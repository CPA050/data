import fs from 'node:fs';

const p = 'web/src/features/import-dialog.ts';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  `      return \`<li><b>\${i + 1}.</b> \${escapeHtml(d.q).slice(0, 90)}\${`,
  `      const imgs = (d.q.match(/<img\\b/gi) ?? []).length;
      const plain = d.q.replace(/<img\\b[^>]*>/gi, ' ').replace(/\\s+/g, ' ').trim();
      return \`<li><b>\${i + 1}.</b> \${escapeHtml(plain).slice(0, 90)}\${imgs ? \`<span class="muted"> · 含 \${imgs} 张图</span>\` : ''}\${`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('preview strips base64');
