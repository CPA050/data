import { api, ApiError } from '../core/api';
import { invalidate, loadBank, state } from '../core/app';
import { escapeHtml, plainText, renderRich } from '../core/format';
import { highlightHtml } from '../core/highlight';
import { detectType, TYPE_LABEL } from '../core/question-type';
import { formatAnswer } from '../core/format';
import { confirm, openModal } from '../ui/modal';
import { createRichEditor } from '../ui/rich-editor';
import type { RichEditor } from '../ui/rich-editor';
import { notify } from '../ui/toast';
import type { Answer, Question, QuestionDraft } from '../core/types';
import { openImport } from '../features/import-dialog';
import { openGenerate } from '../features/generate';
import { exportSheet } from '../features/export-sheet';
import { exportDocx } from '../features/export-docx';

/** 从 AI 返回里抠出第一个 JSON 对象（可能带 ```json 围栏或前后废话） */
function extractJsonBlock(raw: string): string {
  const text = raw.replace(/```json/gi, '```').trim();
  const block = /```([\s\S]*?)```/.exec(text)?.[1] ?? text;
  const start = block.indexOf('{');
  const end = block.lastIndexOf('}');
  return start === -1 || end <= start ? '{}' : block.slice(start, end + 1);
}

const PAGE_SIZE = 20;

type TypeFilter = 'all' | 'single' | 'multi' | 'judge' | 'blank' | 'essay';

const ui = {
  search: '',
  subject: 'all',
  type: 'all' as TypeFilter,
  edit: false,
  page: 0,
  selected: new Set<number>(),
};

export function resetBank(): void {
  ui.search = '';
  ui.subject = 'all';
  ui.type = 'all';
  ui.edit = false;
  ui.page = 0;
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
    if (ui.type !== 'all' && detectType(q) !== ui.type) return false;
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
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  if (ui.page > pages - 1) ui.page = pages - 1;
  if (ui.page < 0) ui.page = 0;
  const pageRows = rows.slice(ui.page * PAGE_SIZE, ui.page * PAGE_SIZE + PAGE_SIZE);

  const chips = subjects()
    .map(
      (s) =>
        `<button class="chip" data-act="subject" data-subject="${escapeHtml(s)}" aria-pressed="${ui.subject === s}">
          ${s === 'all' ? '全部' : escapeHtml(s)}
        </button>`,
    )
    .join('');

  const all = bank();
  const counts: Record<string, number> = { single: 0, multi: 0, judge: 0, blank: 0, essay: 0 };
  all.forEach((q) => {
    counts[detectType(q)] += 1;
  });
  const typeChips = (
    [
      ['all', '全部', all.length],
      ['single', '单选', counts.single],
      ['multi', '多选', counts.multi],
      ['judge', '判断', counts.judge],
      ['blank', '填空', counts.blank],
      ['essay', '简答', counts.essay],
    ] as Array<[TypeFilter, string, number]>
  )
    .filter(([key, , n]) => key === 'all' || n > 0)
    .map(
      ([key, label, n]) =>
        `<button class="chip" data-act="type" data-type="${key}" aria-pressed="${ui.type === key}">${label} <span class="chip-n">${n}</span></button>`,
    )
    .join('');

  const tableRows = pageRows
    .map((q, i) => {
      const type = detectType(q);
      const no = String(ui.page * PAGE_SIZE + i + 1).padStart(2, '0');
      return `<tr class="q-row ${ui.edit ? 'selectable' : 'is-clickable'}" data-id="${q.id}" ${
        ui.edit ? '' : 'data-act="peek"'
      }>
        <td class="c-no">${
          ui.edit
            ? `<button class="checkbox" data-act="select" data-id="${q.id}" aria-pressed="${ui.selected.has(q.id)}">✓</button>`
            : no
        }</td>
        <td class="c-q">
          <div class="q-cell">${highlightHtml(renderRich(q.q), ui.search)}</div>
          ${q.opts.length ? `<div class="q-sub">${q.opts.length} 个选项</div>` : ''}
        </td>
        <td class="c-type"><span class="tag tag-type">${TYPE_LABEL[type]}</span></td>
        <td class="c-chapter muted">${escapeHtml(q.chapter || '—')}</td>
        <td class="c-ans"><span class="tag tag-ok">${escapeHtml(answerLabel(q))}</span></td>
        <td class="c-act"><button class="icon-btn sm" data-act="edit" data-id="${q.id}" aria-label="编辑">✎</button></td>
      </tr>`;
    })
    .join('');

  const body = state.loading.bank && !state.bank
    ? `<div class="list">${Array.from({ length: 5 })
        .map(() => `<div class="item"><div class="skeleton sk-line w80"></div></div>`)
        .join('')}</div>`
    : rows.length
      ? `<div class="table-wrap">
          <table class="q-table">
            <thead><tr>
              <th class="c-no">NO</th><th class="c-q">题干</th><th class="c-type">题型</th>
              <th class="c-chapter">章节</th><th class="c-ans">答案</th><th class="c-act"></th>
            </tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>
        ${
          pages > 1
            ? `<div class="pager">
                 <button class="btn btn-sm" data-act="page-prev" ${ui.page === 0 ? 'disabled' : ''}>← 上一页</button>
                 <span class="pager-info">${ui.page + 1} / ${pages} 页 · 共 ${rows.length} 题</span>
                 <button class="btn btn-sm" data-act="page-next" ${ui.page >= pages - 1 ? 'disabled' : ''}>下一页 →</button>
               </div>`
            : `<p class="muted small table-count">共 ${rows.length} 题</p>`
        }`
      : `<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${
          ui.search ? '没有匹配的题目' : '题库还是空的'
        }</div><div class="empty-desc">${ui.search ? '换个关键词试试' : '点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写'}</div></div>`;

  return `
    <h1 class="page-title">题库</h1>
    <div class="search-box">
      <span class="ico">⌕</span>
      <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="${escapeHtml(ui.search)}" enterkeyhint="search">
    </div>
    <div class="tool-row">
      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>
      <button class="tool-btn" data-act="generate" title="AI 出题">✦<span>出题</span></button>
      <button class="tool-btn" data-act="add" title="添加题目">＋<span>新建</span></button>
      <button class="tool-btn" data-act="print" title="导出试卷（打印 / 存 PDF）">⎙<span>试卷</span></button>
      <button class="tool-btn" data-act="docx" title="导出 Word（.docx）">⤓<span>Word</span></button>
      <button class="tool-btn" data-act="toggle-edit" title="批量管理">${ui.edit ? '✓' : '☰'}<span>批量</span></button>
    </div>
    <div class="chips">${chips}</div>
    <div class="chips chips-type">${typeChips}</div>
    ${ui.edit ? `<div class="row between" style="margin-bottom:12px">
        <button class="btn btn-sm btn-ghost" data-act="select-all">${ui.selected.size === rows.length && rows.length ? '取消全选' : '全选本页'}</button>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export" ${ui.selected.size ? '' : 'disabled'}>导出 JSON</button>
          <button class="btn btn-sm" data-act="print-selected" ${ui.selected.size ? '' : 'disabled'}>导出试卷</button>
          <button class="btn btn-sm" data-act="docx-selected" ${ui.selected.size ? '' : 'disabled'}>导出 Word</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${ui.selected.size ? '' : 'disabled'}>删除</button>
        </div>
      </div>` : ''}
    ${body}`;
}

async function openEditor(question?: Question): Promise<void> {
  const isNew = !question;
  const holder: { editor: RichEditor | null } = { editor: null };
  const body = document.createElement('div');
  body.innerHTML = `
    <label class="field">
      <span class="field-label">题干</span>
      <div data-role="q-host"></div>
    </label>
    <div class="row" style="gap:8px;margin-top:-8px;flex-wrap:wrap">
      <span class="muted small">粗体 / 上下标 / 列表 / ∑ 公式 / ▣ 图片（自动压缩内联）</span>
    </div>
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
    <label class="field">
      <span class="field-label">解析 <span class="muted small">（错题复习时直接看，不用每次问 AI）</span></span>
      <textarea class="textarea" data-role="explain" rows="3" placeholder="为什么选它、其他选项错在哪">${escapeHtml(
        question?.explain ?? '',
      )}</textarea>
    </label>
    <div class="row" style="justify-content:flex-end;gap:8px;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="gen-explain">✦ 生成解析</button>
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
      const host = card.querySelector<HTMLElement>('[data-role="q-host"]');
      if (host) {
        holder.editor = createRichEditor({
          value: question?.q ?? '',
          placeholder: '输入题干；可用工具栏插图、写公式（$…$）',
          minHeight: 110,
        });
        host.appendChild(holder.editor.el);
      }

      const genBtn = card.querySelector<HTMLButtonElement>('[data-role="gen-explain"]');
      genBtn?.addEventListener('click', async () => {
        const qText = plainText(holder.editor?.getValue() ?? '').trim();
        const optsText = card.querySelector<HTMLTextAreaElement>('[data-role="opts"]')?.value ?? '';
        const aText = card.querySelector<HTMLInputElement>('[data-role="a"]')?.value ?? '';
        if (!qText) {
          notify.error('先写题干，AI 才能写解析');
          return;
        }
        const box = card.querySelector<HTMLTextAreaElement>('[data-role="explain"]');
        const label = genBtn.textContent ?? '';
        genBtn.disabled = true;
        genBtn.textContent = '生成中…';
        try {
          const res = await api.ai.explain(
            `题目：${qText}\n选项：${optsText.split('\n').join('；')}\n正确答案：${aText}`,
          );
          if (box) box.value = (res.result ?? '').trim();
          notify.ok('解析已生成，可再手动润色');
        } catch (error) {
          notify.error(error instanceof ApiError ? error.message : '生成失败');
        } finally {
          genBtn.disabled = false;
          genBtn.textContent = label;
        }
      });

      const btn = card.querySelector<HTMLButtonElement>('[data-role="classify"]');
      if (!btn) return;
      btn.addEventListener('click', async () => {
        const qText = plainText(holder.editor?.getValue() ?? '').trim();
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
  const q = (holder.editor?.getValue() ?? '').trim();
  if (!plainText(q).trim() && !/<img/i.test(q)) {
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
    explain: get('explain').trim(),
  };

  try {
    if (isNew) {
      await api.questions.add([draft]);
    } else {
      try {
        await api.questions.update(question!.id, draft, { baseUpdatedAt: question!.updated_at });
      } catch (error) {
        // 409：另一台设备在这期间改过同一题
        if (error instanceof ApiError && error.status === 409) {
          const overwrite = await confirm({
            title: '这道题在别处被改过',
            message: '另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？',
            okText: '覆盖',
            danger: true,
          });
          if (!overwrite) return;
          await api.questions.update(question!.id, draft, { force: true });
        } else {
          throw error;
        }
      }
    }
    invalidate('bank');
    await loadBank(true);
    notify.ok(isNew ? '题目已添加' : '题目已保存');
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '保存失败');
  }
}

async function importQuestions(): Promise<void> {
  await openImport();
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
    case 'print':
      exportSheet(filtered(), { title: `题库 · ${ui.subject === 'all' ? '全部' : ui.subject}` });
      return true;
    case 'docx':
      await exportDocx(filtered(), {
        title: `题库 · ${ui.subject === 'all' ? '全部' : ui.subject}`,
        subtitle: '原点 · Origin',
      });
      return true;
    case 'docx-selected':
      await exportDocx(bank().filter((q) => ui.selected.has(q.id)), {
        title: '选中题目 · 试卷',
        subtitle: '原点 · Origin',
      });
      return true;
    case 'print-selected':
      exportSheet(
        bank().filter((q) => ui.selected.has(q.id)),
        { title: '选中题目 · 试卷' },
      );
      return true;
    case 'page-prev':
      ui.page = Math.max(0, ui.page - 1);
      return true;
    case 'page-next':
      ui.page += 1;
      return true;
    case 'select-all': {
      const rows = filtered().slice(ui.page * PAGE_SIZE, ui.page * PAGE_SIZE + PAGE_SIZE);
      const all = rows.every((q) => ui.selected.has(q.id));
      rows.forEach((q) => (all ? ui.selected.delete(q.id) : ui.selected.add(q.id)));
      return true;
    }
    case 'generate':
      await openGenerate();
      return true;
    case 'import':
      await importQuestions();
      return true;
    case 'type': {
    const next = el.dataset.type as TypeFilter | undefined;
    if (next) {
      ui.type = next;
      ui.page = 0;
    }
    return true;
  }
    case 'peek': {
      const id = Number(el.dataset.id);
      const q = bank().find((item) => item.id === id);
      if (!q) return true;
      await peekQuestion(q);
      return true;
    }
    case 'search':
      return true;
    default:
      return false;
  }
}

/** 只读预览：不打断复习节奏，扫一眼题干和答案就够了 */
async function peekQuestion(q: Question): Promise<void> {
  const type = detectType(q);
  const body = document.createElement('div');
  body.className = 'peek';
  body.innerHTML = `
    <div class="peek-meta">
      <span class="tag tag-type">${TYPE_LABEL[type]}</span>
      ${q.subject ? `<span class="tag">${escapeHtml(q.subject)}</span>` : ''}
      ${q.chapter ? `<span class="tag">${escapeHtml(q.chapter)}</span>` : ''}
    </div>
    <div class="peek-q q-text">${renderRich(q.q)}</div>
    ${
      q.opts.length
        ? `<ul class="peek-opts">${q.opts
            .map((o, i) => {
              const hit = Array.isArray(q.a) ? q.a.includes(i) : q.a === i;
              return `<li class="${hit ? 'is-hit' : ''}"><b>${String.fromCharCode(65 + i)}</b>${renderRich(
                String(o).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/, ''),
              )}</li>`;
            })
            .join('')}</ul>`
        : ''
    }
    <div class="peek-ans"><span class="muted">答案</span> ${escapeHtml(formatAnswer(q.a, q.opts) || '（无）')}</div>`;

  const action = await openModal<'edit' | 'close'>({
    title: '题目预览',
    body,
    actions: [
      { label: '关闭', value: 'close' },
      { label: '编辑这题', value: 'edit', variant: 'primary' },
    ],
  });
  if (action === 'edit') await openEditor(q);
}

export function onBankInput(el: HTMLElement): boolean {
  if (el.dataset.role === 'search') {
    ui.search = (el as HTMLInputElement).value;
    ui.page = 0;
    return true;
  }
  return false;
}
