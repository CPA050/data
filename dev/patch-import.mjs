import fs from 'node:fs';

const p = 'web/src/features/import-dialog.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 文件选择框支持多选
s = s.replace(
  `      <input type="file" hidden data-role="file"
             accept=".json,.txt,.md,.csv,.tsv,.docx,image/png,image/jpeg,image/webp,image/gif,image/bmp">`,
  `      <input type="file" hidden multiple data-role="file"
             accept=".json,.txt,.md,.csv,.tsv,.docx,image/png,image/jpeg,image/webp,image/gif,image/bmp">`,
);
s = s.replace(
  '<span class="dz-hint">支持 .json / .txt / .md / .csv / .docx / 图片（png、jpg、webp）</span>',
  '<span class="dz-hint">支持 .json / .txt / .md / .csv / .docx / 图片，可一次选多个；也能直接 Ctrl+V 粘贴截图</span>',
);

// 2) 多文件：逐个解析后合并
s = s.replace(
  `  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (file) void handleFile(file);
  });`,
  `  const handleFiles = async (files: File[]): Promise<void> => {
    if (!files.length) return;
    if (files.length === 1) {
      await handleFile(files[0]);
      return;
    }
    const merged: QuestionDraft[] = [];
    const notes: string[] = [];
    for (const file of files) {
      try {
        const kind = detectKind(file);
        if (kind === 'image') {
          const dataUrl = await readAsDataUrl(file);
          const res = await api.ai.extract({ imageBase64: dataUrl });
          merged.push(...parseAnyQuestions(res.result ?? ''));
          notes.push(file.name);
          continue;
        }
        if (kind === 'docx') {
          merged.push(...parseByKind('docx', docxToText(await readAsBuffer(file))));
          notes.push(file.name);
          continue;
        }
        merged.push(...parseByKind(kind, await readAsText(file)));
        notes.push(file.name);
      } catch (error) {
        notify.error(\`\${file.name} 没读出来：\${error instanceof Error ? error.message : '格式不对'}\`);
      }
    }
    drafts = merged;
    imagePayload = '';
    sourceName = \`\${files.length} 个文件（\${notes.join('、')}）\`;
    textArea.value = '';
    refresh();
  };

  fileInput.addEventListener('change', () => {
    void handleFiles([...(fileInput.files ?? [])]);
  });`,
);

// 3) 拖拽也支持多文件
s = s.replace(
  `  drop.addEventListener('drop', (e) => {
    const file = (e as DragEvent).dataTransfer?.files?.[0];
    if (file) void handleFile(file);
  });`,
  `  drop.addEventListener('drop', (e) => {
    const files = [...((e as DragEvent).dataTransfer?.files ?? [])];
    void handleFiles(files);
  });`,
);

// 4) 粘贴板里的图片（截图直接贴）
s = s.replace(
  `  let timer = 0;
  textArea.addEventListener('input', () => {`,
  `  textArea.addEventListener('paste', (e) => {
    const items = [...((e as ClipboardEvent).clipboardData?.items ?? [])];
    const imgItem = items.find((it) => it.kind === 'file' && it.type.startsWith('image/'));
    if (!imgItem) return;
    const file = imgItem.getAsFile();
    if (!file) return;
    e.preventDefault();
    void handleFile(file);
  });

  let timer = 0;
  textArea.addEventListener('input', () => {`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('import dialog upgraded');

// preview 里给「缺答案 / 选项太少」加提示
const pv = 'web/src/features/import-dialog.ts';
let v = fs.readFileSync(pv, 'utf8');
console.log('previewHtml present:', v.includes('function previewHtml'));
