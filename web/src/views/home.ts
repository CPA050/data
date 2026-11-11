import { go, greeting, loadBank, loadFavs, loadWrong, state } from '../core/app';
import { escapeHtml } from '../core/format';
import { getProgress, getRecent, getSession, hasWelcomedToday, markWelcomed } from '../core/storage';
import { practiceBank, practiceWrong, resumeSession } from '../features/session';

let welcome = '';

// 与底栏同一套线条语言：1.3px 描边、14px 尺寸
const ico = (d: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const ICONS = {
  random: ico('<path d="M13 3 5.5 13.4h5L10 21l8-10.6h-5.2z"/>'),
  sequential: ico('<path d="M4 7h11M4 12h16M4 17h8"/><circle cx="19" cy="7" r="1.6"/>'),
  chapter: ico('<path d="M12 3.6 20.4 12 12 20.4 3.6 12z"/><path d="M12 8.4 15.6 12 12 15.6 8.4 12z"/>'),
  wrong: ico('<path d="M6.4 20.4V3.6"/><path d="M6.4 4.6h11l-2.1 3.9 2.1 3.9h-11"/>'),
  resume: ico('<path d="M4.4 12a7.6 7.6 0 1 0 2.5-5.6"/><path d="M4 4.4V9h4.6"/>'),
};

function hello(): string {
  if (!hasWelcomedToday() || !welcome) {
    welcome = greeting();
    markWelcomed();
  }
  return welcome;
}

export function renderHome(): string {
  const bank = state.bank;
  const wrong = state.wrong;
  const favs = state.favs;
  const loading = state.loading;
  const session = getSession();
  const recent = getRecent().slice(0, 4);
  const progress = getProgress();

  const skeleton = `<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>`;

  return `
    <section class="hero">
      <div class="hero-greet">${escapeHtml(hello())}</div>
      <div class="hero-hint">${state.user ? `@${escapeHtml(state.user)} · 今天也要加油` : '轻装上阵，一次一题'}</div>
    </section>

    <div class="stat-grid">
      <div class="stat" data-act="goto" data-tab="bank">
        <div class="stat-num">${bank ? bank.length : '—'}</div>
        <div class="stat-label">题库</div>
      </div>
      <div class="stat" data-act="goto" data-tab="wrong">
        <div class="stat-num">${wrong ? wrong.length : '—'}</div>
        <div class="stat-label">错题</div>
      </div>
      <div class="stat" data-act="goto" data-tab="fav">
        <div class="stat-num">${favs ? favs.length : '—'}</div>
        <div class="stat-label">收藏</div>
      </div>
    </div>

    <div class="section-title">开始练习</div>
    ${loading.bank && !bank ? `<div class="card card-pad">${skeleton}</div>` : ''}
    <div class="action-list">
      <button class="action" data-act="random" ${bank && !bank.length ? 'disabled' : ''}>
        <span class="action-ico">${ICONS.random}</span>
        <span class="action-body">
          <span class="action-title">随机练习</span>
          <span class="action-desc">从题库里随机抽题，查漏补缺</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="sequential" ${bank && !bank.length ? 'disabled' : ''}>
        <span class="action-ico">${ICONS.sequential}</span>
        <span class="action-body">
          <span class="action-title">顺序练习</span>
          <span class="action-desc">${progress > 0 ? `上次停在第 ${progress + 1} 题` : '按题库顺序，稳稳推进'}</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="chapter" ${bank && !bank.length ? 'disabled' : ''}>
        <span class="action-ico">${ICONS.chapter}</span>
        <span class="action-body">
          <span class="action-title">按章节练</span>
          <span class="action-desc">只练薄弱的那一章</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="wrong" ${wrong && !wrong.length ? 'disabled' : ''}>
        <span class="action-ico red">${ICONS.wrong}</span>
        <span class="action-body">
          <span class="action-title">错题重练</span>
          <span class="action-desc">${wrong ? `${wrong.length} 道错题等着你` : '把错过的都拿回来'}</span>
        </span>
        <span class="chev">›</span>
      </button>
      ${
        session
          ? `<button class="action" data-act="resume">
               <span class="action-ico green">${ICONS.resume}</span>
               <span class="action-body">
                 <span class="action-title">继续上次</span>
                 <span class="action-desc">${session.ids.length} 题 · 停在第 ${session.idx + 1} 题</span>
               </span>
               <span class="chev">›</span>
             </button>`
          : ''
      }
    </div>

    ${
      recent.length
        ? `<div class="section-title">最近练过</div>
           <div class="list">${recent
             .map((text) => `<div class="item"><div class="item-q muted">${escapeHtml(text)}</div></div>`)
             .join('')}</div>`
        : ''
    }
  `;
}

export async function mountHome(): Promise<void> {
  await Promise.allSettled([loadBank(), loadWrong(), loadFavs()]);
}

export async function handleHome(action: string, el: HTMLElement): Promise<boolean> {
  switch (action) {
    case 'goto': {
      go((el.dataset.tab as 'bank' | 'wrong' | 'fav') ?? 'bank');
      return true;
    }
    case 'random':
      await practiceBank('random');
      return true;
    case 'sequential':
      await practiceBank('sequential');
      return true;
    case 'chapter':
      await practiceBank('chapter');
      return true;
    case 'wrong':
      await practiceWrong();
      return true;
    case 'resume':
      resumeSession();
      return true;
    default:
      return false;
  }
}
