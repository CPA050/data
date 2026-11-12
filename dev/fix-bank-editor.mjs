import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  "import { createRichEditor } from '../ui/rich-editor';",
  "import { createRichEditor } from '../ui/rich-editor';\nimport type { RichEditor } from '../ui/rich-editor';",
);
s = s.replace('  let editor: ReturnType<typeof createRichEditor> | null = null;', '  const holder: { editor: RichEditor | null } = { editor: null };');
s = s.replace('        editor = createRichEditor({', '        holder.editor = createRichEditor({');
s = s.replace('        host.appendChild(editor.el);', '        host.appendChild(holder.editor.el);');
s = s.replace("plainText(editor?.getValue() ?? '')", "plainText(holder.editor?.getValue() ?? '')");
s = s.replace("const q = (editor?.getValue() ?? '').trim();", "const q = (holder.editor?.getValue() ?? '').trim();");

fs.writeFileSync(p, s, 'utf8');
console.log('bank editor holder ok');
