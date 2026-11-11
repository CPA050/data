import { go, greeting, loadBank, loadFavs, loadWrong, state } from '../core/app';
import { escapeHtml } from '../core/format';
import { getProgress, getRecent, getSession, hasWelcomedToday, markWelcomed } from '../core/storage';
import { practiceBank, practiceWrong, resumeSession } from '../features/session';

let welcome = '';

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
        <span class="action-ico">⚡</span>
        <span class="action-body">
          <span class="action-title">随机练习</span>
          <span class="action-desc">从题库里随机抽题，查漏补缺</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="sequential" ${bank && !bank.length ? 'disabled' : ''}>
        <span class="action-ico">▤</span>
        <span class="action-body">
          <span class="action-title">顺序练习</span>
          <span class="action-desc">${progress > 0 ? `上次停在第 ${progress + 1} 题` : '按题库顺序，稳稳推进'}</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="chapter" ${bank && !bank.length ? 'disabled' : ''}>
        <span class="action-ico">❖</span>
        <span class="action-body">
          <span class="action-title">按章节练</span>
          <span class="action-desc">只练薄弱的那一章</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="wrong" ${wrong && !wrong.length ? 'disabled' : ''}>
        <span class="action-ico red">⚑</span>
        <span class="action-body">
          <span class="action-title">错题重练</span>
          <span class="action-desc">${wrong ? `${wrong.length} 道错题等着你` : '把错过的都拿回来'}</span>
        </span>
        <span class="chev">›</span>
      </button>
      ${
        session
          ? `<button class="action" data-act="resume">
               <span class="action-ico green">↻</span>
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
