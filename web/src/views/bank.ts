import { api, ApiError } from '../core/api';
import { invalidate, loadBank, state } from '../core/app';
import { escapeHtml, plainText, renderRich } from '../core/format';
import { confirm, openModal } from '../ui/modal';
import { notify } from '../ui/toast';
import type { Answer, Question, QuestionDraft } from '../core/types';

const ui = {
  search: '',
  subject: 'all',
  edit: false,
  selected: new Set<number>(),
};

export function resetBank(): void {
  ui.search = '';
  ui.subject = 'all';
  ui.edit = false;
  ui.selected.clear();
}

function bank(): Question[] {
  return state.bank ?? [];
}

function subjects(): string[] {
  return ['all', ...Array.from(new Set(bank().map((q) => q.subject || '默认题库')))];
}

function filtered(): Question[] {
  const keyword = ui.search.trim().toLowerCase();
  return bank().filter((q) => {
    if (ui.subject !== 'all' && (q.subject || '默认题库') !== ui.subject) return false;
    if (!keyword) return true;
    return plainText(q.q).toLowerCase().includes(keyword) || q.opts.some((o) => plainText(o).toLowerCase().includes(keyword));
  });
}

function answerLabel(q: Question): string {
  if (typeof q.a === 'string') return '简答';
  const list = Array.isArray(q.a) ? q.a : [q.a];
  return list.map((i) => String.fromCharCode(65 + i)).join(' / ');
}

export function renderBank(): string {
  const rows = filtered();
  const chips = subjects()
    .map(
      (s) =>
        `<button class="chip" data-act="subject" data-subject="${escapeHtml(s)}" aria-pressed="${ui.subject === s}">
          ${s === 'all' ? '全部' : escapeHtml(s)}
        </button>`,
    )
    .join('');

  const body = state.loading.bank && !state.bank
    ? `<div class="list">${Array.from({ length: 4 })
        .map(
          () =>
            `<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>`,
        )
        .join('')}</div>`
    : rows.length
      ? `<div class="list">${rows
          .map(
            (q) => `
          <div class="item ${ui.edit ? 'selectable' : ''}" data-id="${q.id}" data-checked="${ui.selected.has(q.id)}">
            ${ui.edit ? `<span class="checkbox" data-act="select" data-id="${q.id}">✓</span>` : ''}
            <div class="item-q">${renderRich(q.q)}</div>
            <div class="item-meta">
              ${q.subject ? `<span class="tag tag-accent">${escapeHtml(q.subject)}</span>` : ''}
              ${q.chapter ? `<span class="tag">${escapeHtml(q.chapter)}</span>` : ''}
              <span class="tag tag-ok">答案 ${escapeHtml(answerLabel(q))}</span>
              <span class="grow"></span>
              ${!ui.edit ? `<button class="btn btn-sm btn-ghost" data-act="edit" data-id="${q.id}">编辑</button>` : ''}
            </div>
          </div>`,
          )
          .join('')}</div>`
      : `<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${
          ui.search ? '没有匹配的题目' : '题库还是空的'
        }</div><div class="empty-desc">${ui.search ? '换个关键词试试' : '点右上角「＋」添加，或用 AI 从图片导入'}</div></div>`;

  return `
    <h1 class="page-title">题库</h1>
    <div class="row" style="margin-bottom:12px">
      <div class="search-box grow">
        <span class="ico">⌕</span>
        <input type="search" placeholder="搜索题目或选项" data-role="search" value="${escapeHtml(ui.search)}" enterkeyhint="search">
      </div>
      <button class="icon-btn" data-act="add" aria-label="添加题目">＋</button>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${ui.edit ? '✓' : '☰'}</button>
    </div>
    <div class="chips">${chips}</div>
    ${ui.edit ? `<div class="row between" style="margin-bottom:12px">
        <span class="muted small">已选 ${ui.selected.size} 题</span>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export">导出</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${ui.selected.size ? '' : 'disabled'}>删除</button>
        </div>
      </div>` : ''}
    ${body}
    <p class="muted small" style="margin-top:18px;text-align:center">共 ${bank().length} 题 · 当前显示 ${rows.length} 题</p>`;
}

async function openEditor(question?: Question): Promise<void> {
  const isNew = !question;
  const body = document.createElement('div');
  body.innerHTML = `
    <label class="field">
      <span class="field-label">题干</span>
      <textarea class="textarea" data-role="q" placeholder="支持换行与图片">${escapeHtml(question?.q ?? '')}</textarea>
    </label>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${escapeHtml(
        (question?.opts ?? []).join('\n'),
      )}</textarea>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${escapeHtml(question ? answerLabel(question) : '')}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${escapeHtml(question?.chapter ?? '')}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${escapeHtml(question?.subject ?? '默认题库')}" placeholder="默认题库">
      </label>
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`;

  const ok = await openModal<boolean>({
    title: isNew ? '添加题目' : '编辑题目',
    body,
    actions: [
      { label: '取消', value: false },
      { label: isNew ? '添加' : '保存', value: true, variant: 'primary' },
    ],
    onMount: (card) => {
      const btn = card.querySelector<HTMLButtonElement>('[data-role="classify"]');
      if (!btn) return;
      btn.addEventListener('click', async () => {
        const qText = card.querySelector<HTMLTextAreaElement>('[data-role="q"]')?.value.trim() ?? '';
        if (!qText) {
          notify.error('先写题干，AI 才能判断归类');
          return;
        }
        const optsText = card.querySelector<HTMLTextAreaElement>('[data-role="opts"]')?.value ?? '';
        const label = btn.textContent ?? '';
        btn.disabled = true;
        btn.textContent = '归类中…';
        try {
          const res = await api.ai.classify(`题目：${qText}\n选项：${optsText.split('\n').join('；')}`);
          const parsed = JSON.parse(extractJsonBlock(res.result ?? '{}')) as { subject?: string; chapter?: string };
          const subjectEl = card.querySelector<HTMLInputElement>('[data-role="subject"]');
          const chapterEl = card.querySelector<HTMLInputElement>('[data-role="chapter"]');
          if (parsed.subject && subjectEl) subjectEl.value = String(parsed.subject).slice(0, 24);
          if (parsed.chapter && chapterEl) chapterEl.value = String(parsed.chapter).slice(0, 24);
          notify.ok('已根据题目填入题库与章节');
        } catch {
          notify.error('AI 归类失败，可手动填写');
        } finally {
          btn.disabled = false;
          btn.textContent = label;
        }
      });
    },
  });
  if (!ok) return;

  const get = (role: string) => body.querySelector<HTMLTextAreaElement | HTMLInputElement>(`[data-role="${role}"]`)!.value;
  const q = get('q').trim();
  if (!q) {
    notify.error('题干不能为空');
    return;
  }
  const opts = get('opts')
    .split('\n')
    .map((line) => line.replace(/^[A-Za-z][.、)]\s*/, '').trim())
    .filter(Boolean);
  const rawAnswer = get('a').trim();
  let answer: Answer = '';
  if (opts.length) {
    const letters = rawAnswer
      .toUpperCase()
      .split(/[,，\s/]+/)
      .filter(Boolean);
    const indexes = letters
      .map((ch) => ch.charCodeAt(0) - 65)
      .filter((n) => n >= 0 && n < opts.length);
    if (!indexes.length) {
      notify.error('答案请填选项字母，如 A 或 A,B');
      return;
    }
    answer = indexes.length === 1 ? indexes[0] : indexes;
  } else {
    answer = rawAnswer;
  }

  const draft: QuestionDraft = {
    q,
    opts,
    a: answer,
    chapter: get('chapter').trim(),
    subject: get('subject').trim() || '默认题库',
  };

  try {
    if (isNew) await api.questions.add([draft]);
    else await api.questions.update(question!.id, draft);
    invalidate('bank');
    await loadBank(true);
    notify.ok(isNew ? '题目已添加' : '题目已保存');
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '保存失败');
  }
}

async function importWithAI(): Promise<void> {
  const body = document.createElement('div');
  body.innerHTML = `
    <label class="field">
      <span class="field-label">粘贴题目文本，或上传截图</span>
      <textarea class="textarea" data-role="text" placeholder="把题目文字贴进来…"></textarea>
    </label>
    <label class="btn btn-block" style="cursor:pointer">
      📷 选择图片
      <input type="file" accept="image/*" data-role="file" hidden>
    </label>
    <p class="muted small" style="margin:10px 0 0">AI 会识别题干、选项与答案，导入前可以再改。</p>`;
  const fileInput = body.querySelector<HTMLInputElement>('[data-role="file"]')!;
  const label = fileInput.closest('label')!;
  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (file) label.textContent = `已选择：${file.name}`;
  });

  const ok = await openModal<boolean>({
    title: 'AI 导入题目',
    body,
    actions: [
      { label: '取消', value: false },
      { label: '识别', value: true, variant: 'primary' },
    ],
  });
  if (!ok) return;

  const text = body.querySelector<HTMLTextAreaElement>('[data-role="text"]')!.value.trim();
  const file = fileInput.files?.[0];
  if (!text && !file) {
    notify.info('还没给我内容呢');
    return;
  }
  notify.info('AI 正在识别…');
  try {
    const payload: { prompt?: string; image?: string } = {};
    if (text) payload.prompt = text;
    if (file) payload.image = await fileToBase64(file);
    const res = await api.ai.extract(payload);
    const drafts = parseExtracted(res.result ?? '');
    if (!drafts.length) {
      notify.error('没有识别出题目，换个清晰点的图片试试');
      return;
    }
    await api.questions.add(drafts);
    invalidate('bank');
    await loadBank(true);
    notify.ok(`已导入 ${drafts.length} 道题`);
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '识别失败');
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('图片读取失败'));
    reader.readAsDataURL(file);
  });
}

/** 从 AI 返回里抠出第一个 JSON 对象（可能带 ```json 围栏或前后废话） */
function extractJsonBlock(raw: string): string {
  const text = raw.replace(/```json/gi, '```').trim();
  const block = /```([\s\S]*?)```/.exec(text)?.[1] ?? text;
  const start = block.indexOf('{');
  const end = block.lastIndexOf('}');
  return start === -1 || end <= start ? '{}' : block.slice(start, end + 1);
}

export function parseExtracted(raw: string): QuestionDraft[] {  const text = raw.replace(/```json/gi, '```').trim();
  const block = /```([\s\S]*?)```/.exec(text)?.[1] ?? text;
  const start = block.indexOf('[');
  const end = block.lastIndexOf(']');
  if (start === -1 || end <= start) return [];
  try {
    const arr = JSON.parse(block.slice(start, end + 1)) as Record<string, unknown>[];
    return arr
      .map((item): QuestionDraft | null => {
        const q = String(item.q ?? item.question ?? '').trim();
        if (!q) return null;
        const opts = Array.isArray(item.opts ?? item.options)
          ? ((item.opts ?? item.options) as unknown[]).map(String)
          : [];
        let a: Answer = '';
        const rawA = item.a ?? item.answer;
        if (typeof rawA === 'string') {
          const letters = rawA.toUpperCase().split(/[,，\s/]+/).filter(Boolean);
          const idx = letters.map((ch) => ch.charCodeAt(0) - 65).filter((n) => n >= 0 && n < opts.length);
          a = opts.length ? (idx.length === 1 ? idx[0] : idx) : rawA;
        } else if (typeof rawA === 'number') {
          a = rawA;
        }
        return {
          q,
          opts,
          a,
          chapter: String(item.chapter ?? '').trim(),
          subject: String(item.subject ?? '默认题库').trim() || '默认题库',
        } satisfies QuestionDraft;
      })
      .filter((x): x is QuestionDraft => Boolean(x));
  } catch {
    return [];
  }
}

function exportSelected(): void {
  const rows = bank().filter((q) => ui.selected.has(q.id));
  if (!rows.length) {
    notify.info('先选择要导出的题目');
    return;
  }
  const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `题库-${rows.length}题.json`;
  link.click();
  URL.revokeObjectURL(url);
  notify.ok(`已导出 ${rows.length} 题`);
}

export async function mountBank(): Promise<void> {
  await loadBank();
}

export async function handleBank(action: string, el: HTMLElement): Promise<boolean> {
  switch (action) {
    case 'subject':
      ui.subject = el.dataset.subject ?? 'all';
      return true;
    case 'toggle-edit':
      ui.edit = !ui.edit;
      ui.selected.clear();
      return true;
    case 'select': {
      const id = Number(el.dataset.id);
      if (ui.selected.has(id)) ui.selected.delete(id);
      else ui.selected.add(id);
      return true;
    }
    case 'add':
      await openEditor();
      return true;
    case 'edit': {
      const q = bank().find((item) => item.id === Number(el.dataset.id));
      if (q) await openEditor(q);
      return true;
    }
    case 'delete-selected': {
      const ids = [...ui.selected];
      if (!ids.length) return true;
      if (!(await confirm({ title: '删除题目', message: `确定删除选中的 ${ids.length} 道题？`, danger: true, okText: '删除' }))) {
        return true;
      }
      try {
        await api.questions.remove(ids);
        ui.selected.clear();
        invalidate('bank');
        await loadBank(true);
        notify.ok('已删除');
      } catch (error) {
        notify.error(error instanceof ApiError ? error.message : '删除失败');
      }
      return true;
    }
    case 'export':
      exportSelected();
      return true;
    case 'ai-import':
      await importWithAI();
      return true;
    case 'search':
      return true;
    default:
      return false;
  }
}

export function onBankInput(el: HTMLElement): boolean {
  if (el.dataset.role === 'search') {
    ui.search = (el as HTMLInputElement).value;
    return true;
  }
  return false;
}
