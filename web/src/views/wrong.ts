import { api, ApiError } from '../core/api';
import { invalidate, loadWrong, state } from '../core/app';
import { escapeHtml, renderRich } from '../core/format';
import { practiceWrong } from '../features/session';
import { confirm } from '../ui/modal';
import { notify } from '../ui/toast';
import type { WrongItem } from '../core/types';

const ui = {
  subject: 'all',
  edit: false,
  selected: new Set<number>(),
};

export function resetWrong(): void {
  ui.subject = 'all';
  ui.edit = false;
  ui.selected.clear();
}

function rows(): WrongItem[] {
  const all = state.wrong ?? [];
  return ui.subject === 'all' ? all : all.filter((w) => (w.subject || '默认题库') === ui.subject);
}

function subjects(): string[] {
  return ['all', ...Array.from(new Set((state.wrong ?? []).map((w) => w.subject || '默认题库')))];
}

export function renderWrong(): string {
  const list = rows();
  const total = state.wrong?.length ?? 0;

  const chips = subjects()
    .map(
      (s) =>
        `<button class="chip" data-act="subject" data-subject="${escapeHtml(s)}" aria-pressed="${ui.subject === s}">
          ${s === 'all' ? '全部' : escapeHtml(s)}
        </button>`,
    )
    .join('');

  const body = state.loading.wrong && !state.wrong
    ? `<div class="list">${Array.from({ length: 3 })
        .map(() => `<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>`)
        .join('')}</div>`
    : list.length
      ? `<div class="list">${list
          .map(
            (w) => `
        <div class="item" data-id="${w.id}" data-checked="${ui.selected.has(w.id)}">
          ${ui.edit ? `<span class="checkbox" data-act="select" data-id="${w.id}">✓</span>` : ''}
          <div class="item-q">${renderRich(w.q)}</div>
          <div class="item-meta">
            ${w.subject ? `<span class="tag tag-accent">${escapeHtml(w.subject)}</span>` : ''}
            ${w.chapter ? `<span class="tag">${escapeHtml(w.chapter)}</span>` : ''}
          </div>
          <div class="item-answer">
            ${w.user_choice_text ? `<div class="mine">你的选择：${escapeHtml(w.user_choice_text)}</div>` : ''}
            ${w.answer ? `<div class="right">正确答案：${escapeHtml(w.answer)}</div>` : ''}
          </div>
          ${
            !ui.edit
              ? `<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${w.id}">已掌握</button>
                 </div>`
              : ''
          }
        </div>`,
          )
          .join('')}</div>`
      : `<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${
          total ? '这个题库下没有错题' : '还没有错题'
        }</div><div class="empty-desc">${total ? '切到「全部」看看' : '答错的题会自动收集到这里，方便集中消灭'}</div></div>`;

  return `
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${ui.edit ? '✓' : '☰'}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${total} 道，消灭一题少一题</p>
    ${
      total
        ? `<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${list.length} 题）</button>`
        : ''
    }
    ${chips}
    ${
      ui.edit
        ? `<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${ui.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${ui.selected.size ? '' : 'disabled'}>删除</button>
           </div>`
        : ''
    }
    ${body}`;
}

export async function mountWrong(): Promise<void> {
  await loadWrong();
}

export async function handleWrong(action: string, el: HTMLElement): Promise<boolean> {
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
    case 'practice':
      if (!rows().length) {
        notify.info('没有可练的错题');
        return true;
      }
      await practiceWrong();
      return true;
    case 'remove': {
      const id = Number(el.dataset.id);
      try {
        await api.wrong.remove([id]);
        ui.selected.delete(id);
        invalidate('wrong');
        await loadWrong(true);
        notify.ok('已标记掌握，继续加油');
      } catch (error) {
        notify.error(error instanceof ApiError ? error.message : '操作失败');
      }
      return true;
    }
    case 'remove-selected': {
      const ids = [...ui.selected];
      if (!ids.length) return true;
      if (!(await confirm({ title: '删除错题', message: `确定删除选中的 ${ids.length} 道错题？`, danger: true, okText: '删除' }))) {
        return true;
      }
      try {
        await api.wrong.remove(ids);
        ui.selected.clear();
        invalidate('wrong');
        await loadWrong(true);
        notify.ok('已删除');
      } catch (error) {
        notify.error(error instanceof ApiError ? error.message : '删除失败');
      }
      return true;
    }
    default:
      return false;
  }
}
