import { go, state } from '../core/app';
import { plainText, renderRich } from '../core/format';
import { highlightHtml } from '../core/highlight';
import { detectType, TYPE_LABEL } from '../core/question-type';
import type { Question } from '../core/types';
import { closeAllModals, openModal } from '../ui/modal';

interface Hit {
  id: number;
  q: Question;
  source: '题库' | '错题' | '收藏';
  tab: 'bank' | 'wrong' | 'fav';
}

const SOURCE_LIMIT = 8;

function collect(): Hit[] {
  const hits: Hit[] = [];
  const push = (rows: Question[] | null | undefined, source: Hit['source'], tab: Hit['tab']) => {
    (rows ?? []).forEach((q) => hits.push({ id: q.id, q, source, tab }));
  };
  push(state.bank, '题库', 'bank');
  push(state.wrong as unknown as Question[], '错题', 'wrong');
  push(state.favs, '收藏', 'fav');
  return hits;
}

function match(hit: Hit, keyword: string): boolean {
  const needle = keyword.toLowerCase();
  if (!needle) return true;
  return (
    plainText(hit.q.q).toLowerCase().includes(needle) ||
    (hit.q.opts ?? []).some((o) => plainText(o).toLowerCase().includes(needle)) ||
    plainText(hit.q.chapter ?? '').toLowerCase().includes(needle) ||
    plainText(hit.q.subject ?? '').toLowerCase().includes(needle)
  );
}

/** 全局搜索：跨题库 / 错题 / 收藏，命中处高亮 */
export function openSearch(initial = ''): void {
  const body = document.createElement('div');
  body.className = 'search-panel';
  body.innerHTML = `
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${initial.replace(/"/g, '&quot;')}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;

  const all = collect();
  const listEl = body.querySelector<HTMLElement>('[data-role="hits"]')!;
  const footEl = body.querySelector<HTMLElement>('[data-role="foot"]')!;
  const input = body.querySelector<HTMLInputElement>('[data-role="kw"]')!;

  const paint = () => {
    const keyword = input.value.trim();
    const rows = all.filter((hit) => match(hit, keyword));

    if (!keyword) {
      // 空关键词：显示最近 12 条题库题，方便直接点
      const recent = rows.filter((hit) => hit.tab === 'bank').slice(0, 12);
      listEl.innerHTML = recent.length
        ? recent
            .map(
              (hit) => `<button class="hit" data-act="open" data-tab="${hit.tab}" data-id="${hit.id}">
                <span class="hit-src">${hit.source}</span>
                <span class="hit-q">${renderRich(hit.q.q)}</span>
              </button>`,
            )
            .join('')
        : `<p class="muted small">题库还是空的，先去导入吧。</p>`;
      footEl.textContent = recent.length ? '输入关键词可以跨题库 / 错题 / 收藏一起搜' : '';
      return;
    }

    const bySource = (source: Hit['source']) => rows.filter((hit) => hit.source === source);
    const parts: string[] = [];
    (['题库', '错题', '收藏'] as const).forEach((source) => {
      const group = bySource(source);
      if (!group.length) return;
      parts.push(`<div class="hit-group">${source} · ${group.length}</div>`);
      parts.push(
        group
          .slice(0, SOURCE_LIMIT)
          .map((hit) => {
            const type = detectType(hit.q);
            return `<button class="hit" data-act="open" data-tab="${hit.tab}" data-id="${hit.id}">
              <span class="hit-src">${TYPE_LABEL[type]}</span>
              <span class="hit-q">${highlightHtml(renderRich(hit.q.q), keyword)}</span>
            </button>`;
          })
          .join(''),
      );
      if (group.length > SOURCE_LIMIT) {
        parts.push(`<div class="hit-more muted small">还有 ${group.length - SOURCE_LIMIT} 条，缩小关键词试试</div>`);
      }
    });

    listEl.innerHTML = parts.length ? parts.join('') : `<p class="muted small">没有找到「${keyword}」</p>`;
    footEl.textContent = `共命中 ${rows.length} 条`;
  };

  input.addEventListener('input', paint);

  void openModal<string>({
    title: '全局搜索',
    body,
    actions: [{ label: '关闭', value: 'close' }],
    onMount: (card) => {
      paint();
      const kw = card.querySelector<HTMLInputElement>('[data-role="kw"]');
      kw?.focus();
      kw?.setSelectionRange(kw.value.length, kw.value.length);
      card.addEventListener('click', (event) => {
        const btn = (event.target as HTMLElement).closest<HTMLElement>('.hit');
        if (!btn) return;
        const tab = (btn.dataset.tab ?? 'bank') as 'bank' | 'wrong' | 'fav';
        const id = Number(btn.dataset.id);
        const hit = all.find((item) => item.id === id && item.tab === tab);
        closeAllModals();
        go(tab);
        if (hit) {
          const needle = plainText(hit.q.q).slice(0, 12);
          if (tab === 'bank') {
            const input2 = document.querySelector<HTMLInputElement>('.view input[data-role="search"]');
            if (input2 && needle) {
              input2.value = needle;
              input2.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
        }
      });
    },
  });
}
