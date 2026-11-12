import { api, ApiError } from '../core/api';
import { invalidate, loadBank } from '../core/app';
import { escapeHtml } from '../core/format';
import { openModal } from '../ui/modal';
import { notify } from '../ui/toast';
import type { QuestionDraft } from '../core/types';
import {
  detectKind,
  docxToText,
  parseAnyQuestions,
  parseJsonQuestions,
  readAsBuffer,
  readAsDataUrl,
  readAsText,
} from '../features/import';

/** 弹窗里预览前几条，避免一次渲染几百行 */
function previewHtml(drafts: QuestionDraft[], sourceName: string): string {
  if (!drafts.length) {
    return `<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>`;
  }
  const head = drafts.slice(0, 4);
  const rows = head
    .map((d, i) => {
      const opts = (d.opts ?? []).length;
      const warn = problemOf(d);
      const imgs = (d.q.match(/<img\b/gi) ?? []).length;
      const plain = d.q.replace(/<img\b[^>]*>/gi, ' ').replace(/\s+/g, ' ').trim();
      return `<li><b>${i + 1}.</b> ${escapeHtml(plain).slice(0, 90)}${imgs ? `<span class="muted"> · 含 ${imgs} 张图</span>` : ''}${
        opts ? `<span class="muted"> · ${opts} 个选项</span>` : '<span class="muted"> · 简答</span>'
      }${warn ? `<span class="tag-warn">${warn}</span>` : ''}</li>`;
    })
    .join('');
  const more = drafts.length > head.length ? `<li class="muted">…还有 ${drafts.length - head.length} 道</li>` : '';
  const problems = drafts.map(problemOf).filter(Boolean).length;
  return `
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${drafts.length} 道题</span>
      ${problems ? `<span class="tag tag-warn">${problems} 道待确认</span>` : ''}
      ${sourceName ? `<span class="muted small">${escapeHtml(sourceName)}</span>` : ''}
    </div>
    <ul class="import-list">${rows}${more}</ul>`;
}

/** 一眼就能发现的问题：没答案、单选题选项不足 */
function problemOf(d: QuestionDraft): string {
  const opts = (d.opts ?? []).length;
  const a = d.a;
  const hasAnswer = Array.isArray(a) ? a.length > 0 : a !== '' && a !== null && a !== undefined;
  if (!hasAnswer) return '没识别到答案';
  if (opts === 1) return '只有 1 个选项';
  if (opts >= 2 && typeof a === 'number' && (a < 0 || a >= opts)) return '答案越界';
  return '';
}

function parseByKind(kind: string, text: string): QuestionDraft[] {
  return kind === 'json' ? parseJsonQuestions(text) : parseAnyQuestions(text);
}

export async function openImport(): Promise<void> {
  const body = document.createElement('div');
  body.className = 'import';
  body.innerHTML = `
    <label class="dropzone" data-role="drop">
      <span class="dz-icon">⇪</span>
      <span class="dz-title">把文件拖进来，或点这里选文件</span>
      <span class="dz-hint">支持 .json / .txt / .md / .csv / .docx / 图片，可一次选多个；也能直接 Ctrl+V 粘贴截图</span>
      <input type="file" hidden multiple data-role="file"
             accept=".json,.txt,.md,.csv,.tsv,.docx,image/png,image/jpeg,image/webp,image/gif,image/bmp">
    </label>
    <div class="import-or"><span>或者直接粘贴文字</span></div>
    <textarea class="textarea import-text" data-role="text" rows="7"
      placeholder="1. 普通硅酸盐水泥的初凝时间不得早于？&#10;A. 45min&#10;B. 60min&#10;C. 90min&#10;D. 30min&#10;答案：A&#10;章节：建筑材料"></textarea>
    <div class="import-preview" data-role="preview"></div>`;

  const drop = body.querySelector<HTMLElement>('[data-role="drop"]')!;
  const fileInput = body.querySelector<HTMLInputElement>('[data-role="file"]')!;
  const textArea = body.querySelector<HTMLTextAreaElement>('[data-role="text"]')!;
  const preview = body.querySelector<HTMLElement>('[data-role="preview"]')!;

  let drafts: QuestionDraft[] = [];
  let imagePayload = '';
  let sourceName = '';
  let imported = false;

  const refresh = () => {
    preview.innerHTML = previewHtml(drafts, sourceName || (imagePayload ? '图片将由 AI 识别' : ''));
    const btn = document.querySelector<HTMLButtonElement>('[data-idx="1"]');
    if (btn) btn.textContent = drafts.length ? `导入 ${drafts.length} 道题` : 'AI 解析并导入';
  };

  const acceptText = (text: string, kind: string, name: string) => {
    textArea.value = text;
    drafts = parseByKind(kind, text);
    sourceName = name;
    refresh();
  };

  // 交给 AI 读一遍：图片直接识别，纯文字在本地解析不出时才兜底
  const runAi = async (): Promise<QuestionDraft[]> => {
    const text = textArea.value.trim();
    if (!text && !imagePayload) return [];
    notify.info(imagePayload ? 'AI 正在识别图片…' : 'AI 正在解析文字…');
    const res = await api.ai.extract({
      ...(text ? { prompt: text } : {}),
      ...(imagePayload ? { imageBase64: imagePayload } : {}),
    });
    return parseAnyQuestions(res.result ?? '');
  };

  const handleFile = async (file: File) => {
    const kind = detectKind(file);
    try {
      if (kind === 'image') {
        imagePayload = await readAsDataUrl(file);
        drafts = [];
        sourceName = `${file.name}（${Math.round(file.size / 1024)}KB，AI 识别）`;
        refresh();
        // 选完图自动识别，不用再点一次按钮
        try {
          drafts = await runAi();
          if (!drafts.length) notify.error('这张图没读出题目，换张更清晰的试试');
        } catch (error) {
          notify.error(error instanceof ApiError ? error.message : 'AI 识别失败');
        }
        refresh();
        return;
      }
      if (kind === 'docx') {
        const buf = await readAsBuffer(file);
        acceptText(docxToText(buf), 'docx', file.name);
        return;
      }
      if (kind === 'unknown') {
        notify.error('暂不支持这种文件，换成 txt / json / docx / 图片试试');
        return;
      }
      const text = await readAsText(file);
      acceptText(text, kind, file.name);
    } catch (error) {
      notify.error(error instanceof Error ? error.message : '文件解析失败');
    }
  };

  const handleFiles = async (files: File[]): Promise<void> => {
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
        notify.error(`${file.name} 没读出来：${error instanceof Error ? error.message : '格式不对'}`);
      }
    }
    drafts = merged;
    imagePayload = '';
    sourceName = `${files.length} 个文件（${notes.join('、')}）`;
    textArea.value = '';
    refresh();
  };

  fileInput.addEventListener('change', () => {
    void handleFiles([...(fileInput.files ?? [])]);
  });

  for (const type of ['dragenter', 'dragover'] as const) {
    drop.addEventListener(type, (e) => {
      e.preventDefault();
      drop.classList.add('is-over');
    });
  }
  for (const type of ['dragleave', 'drop'] as const) {
    drop.addEventListener(type, (e) => {
      e.preventDefault();
      drop.classList.remove('is-over');
    });
  }
  drop.addEventListener('drop', (e) => {
    const files = [...((e as DragEvent).dataTransfer?.files ?? [])];
    void handleFiles(files);
  });

  textArea.addEventListener('paste', (e) => {
    const items = [...((e as ClipboardEvent).clipboardData?.items ?? [])];
    const imgItem = items.find((it) => it.kind === 'file' && it.type.startsWith('image/'));
    if (!imgItem) return;
    const file = imgItem.getAsFile();
    if (!file) return;
    e.preventDefault();
    void handleFile(file);
  });

  let timer = 0;
  textArea.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      drafts = parseAnyQuestions(textArea.value);
      imagePayload = '';
      sourceName = '';
      refresh();
    }, 280);
  });

  const ok = await openModal<boolean>({
    title: '导入题库',
    body,
    actions: [
      { label: '取消', value: false },
      { label: '导入', value: true, variant: 'primary' },
    ],
    onMount: () => refresh(),
  });
  if (!ok || imported) return;

  try {
    const finalDrafts = drafts.length ? drafts : await runAi();
    if (!finalDrafts.length) {
      notify.error('没解析出题目，检查一下格式，或换张更清晰的图');
      return;
    }
    imported = true;
    const res = await api.questions.add(finalDrafts);
    invalidate('bank');
    await loadBank(true);
    notify.ok(`已导入 ${res.added ?? finalDrafts.length} 道题`);
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '导入失败');
  }
}
