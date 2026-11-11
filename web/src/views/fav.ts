import { api, ApiError } from '../core/api';
import { invalidate, loadFavs, state } from '../core/app';
import { escapeHtml, formatAnswer, renderRich } from '../core/format';
import { practiceFavorites } from '../features/session';
import { notify } from '../ui/toast';
import type { Question } from '../core/types';

const open = new Set<number>();

export function resetFav(): void {
  open.clear();
}

function list(): Question[] {
  return state.favs ?? [];
}

export function renderFav(): string {
  const rows = list();
  const body = state.loading.fav && !state.favs
    ? `<div class="list">${Array.from({ length: 3 })
        .map(() => `<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>`)
        .join('')}</div>`
    : rows.length
      ? `<div class="list">${rows
          .map(
            (q) => `
        <div class="item" data-id="${q.id}">
          <div class="item-q">${renderRich(q.q)}</div>
          <div class="item-meta">
            ${q.subject ? `<span class="tag tag-accent">${escapeHtml(q.subject)}</span>` : ''}
            ${q.chapter ? `<span class="tag">${escapeHtml(q.chapter)}</span>` : ''}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${q.id}">${open.has(q.id) ? '收起' : '看答案'}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${q.id}">取消收藏</button>
          </div>
          ${open.has(q.id) ? `<div class="item-answer"><div class="right">${escapeHtml(formatAnswer(q.a, q.opts))}</div></div>` : ''}
        </div>`,
          )
          .join('')}</div>`
      : `<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>`;

  return `
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${rows.length} 道好题</p>
    ${rows.length ? `<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${rows.length} 题）</button>` : ''}
    ${body}`;
}

export async function mountFav(): Promise<void> {
  await loadFavs();
}

export async function handleFav(action: string, el: HTMLElement): Promise<boolean> {
  switch (action) {
    case 'practice':
      if (!list().length) {
        notify.info('还没有收藏的题');
        return true;
      }
      await practiceFavorites(list());
      return true;
    case 'reveal': {
      const id = Number(el.dataset.id);
      if (open.has(id)) open.delete(id);
      else open.add(id);
      return true;
    }
    case 'remove': {
      const id = Number(el.dataset.id);
      try {
        await api.favorites.remove(id);
        open.delete(id);
        invalidate('fav');
        await loadFavs(true);
        notify.ok('已取消收藏');
      } catch (error) {
        notify.error(error instanceof ApiError ? error.message : '操作失败');
      }
      return true;
    }
    default:
      return false;
  }
}
