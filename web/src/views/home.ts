import { go, greeting, loadBank, loadFavs, loadWrong, state } from '../core/app';
import { escapeHtml } from '../core/format';
import { getProgress, getRecent, getSession, hasWelcomedToday, markWelcomed } from '../core/storage';
import { practiceBank, practiceWrong, resumeSession } from '../features/session';
import { startExam } from '../features/exam';

let welcome = '';

function hello(): string {
  if (!hasWelcomedToday() || !welcome) {
    welcome = greeting();
    markWelcomed();
  }
  // 冷版式里不需要长句问候，取前半句做提示语
  return welcome;
}

function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const week = '日一二三四五六'[d.getDay()];
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} / 周${week}`;
}

const pad2 = (n: number) => String(n).padStart(2, '0');

export function renderHome(): string {
  const bank = state.bank;
  const wrong = state.wrong;
  const favs = state.favs;
  const loading = state.loading;
  const session = getSession();
  const recent = getRecent().slice(0, 4);
  const progress = getProgress();

  const total = bank ? bank.length : 0;
  const suggestion = Math.min(20, Math.max(5, total || 10));
  const skeleton = `<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>`;

  const num = (v: number | undefined) => (v === undefined ? '—' : String(v).padStart(2, '0'));

  return `
    <section class="masthead">
      <div class="mast-meta">
        <span>${today()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${state.user ? `@${escapeHtml(state.user)}` : '未登录'}</span>
      </div>
      <h1 class="mast-title">
        今天<br />练 <em>${String(suggestion).padStart(2, '0')}</em> 题
      </h1>
      <p class="mast-sub">${escapeHtml(hello())}</p>
    </section>

    <section class="overview" aria-label="数据概览">
      <button class="ov-cell" data-act="goto" data-tab="bank">
        <span class="ov-num">${num(bank?.length)}</span>
        <span class="ov-label">题库</span>
      </button>
      <button class="ov-cell" data-act="goto" data-tab="wrong">
        <span class="ov-num">${num(wrong?.length)}</span>
        <span class="ov-label">错题</span>
      </button>
      <button class="ov-cell" data-act="goto" data-tab="fav">
        <span class="ov-num">${num(favs?.length)}</span>
        <span class="ov-label">收藏</span>
      </button>
    </section>

    ${loading.bank && !bank ? `<div class="card card-pad">${skeleton}</div>` : ''}

    ${
      bank && !bank.length
        ? `<button class="cta" data-act="goto" data-tab="bank">
             <span class="cta-kicker">EMPTY / 题库为空</span>
             <span class="cta-title">先导入题库</span>
             <span class="cta-arrow" aria-hidden="true">→</span>
           </button>`
        : `<button class="cta" data-act="random" ${bank ? '' : 'disabled'}>
             <span class="cta-kicker">START / 随机抽题</span>
             <span class="cta-title">开始练习</span>
             <span class="cta-arrow" aria-hidden="true">→</span>
           </button>`
    }

    <button class="exam-entry" data-act="exam">
      <span class="exam-entry-label">MOCK EXAM</span>
      <span class="exam-entry-title">模拟考试</span>
      <span class="exam-entry-desc">限时 <b>15</b> 分钟 · 交卷才出分 · 错题自动进错题本</span>
      <span class="exam-entry-arrow">→</span>
    </button>

    <div class="tile-grid">
      <button class="tile" data-act="sequential" ${bank && !bank.length ? 'disabled' : ''}>
        <span class="tile-idx">01</span>
        <span class="tile-name">顺序练习</span>
        <span class="tile-desc">${bank && !bank.length ? '题库为空' : progress > 0 ? `停在第 ${progress + 1} 题` : '按顺序推进'}</span>
      </button>
      <button class="tile" data-act="chapter" ${bank && !bank.length ? 'disabled' : ''}>
        <span class="tile-idx">02</span>
        <span class="tile-name">按章节</span>
        <span class="tile-desc">${bank && !bank.length ? '题库为空' : '只练薄弱章节'}</span>
      </button>
      <button class="tile" data-act="wrong" ${wrong && !wrong.length ? 'disabled' : ''}>
        <span class="tile-idx">03</span>
        <span class="tile-name">错题重练</span>
        <span class="tile-desc">${wrong ? `${wrong.length} 道待消灭` : '暂无错题'}</span>
      </button>
      ${
        session
          ? `<button class="tile tile-accent" data-act="resume">
               <span class="tile-idx">04</span>
               <span class="tile-name">继续上次</span>
               <span class="tile-desc">${session.ids.length} 题 · 第 ${session.idx + 1} 题</span>
             </button>`
          : `<button class="tile" data-act="goto" data-tab="bank">
               <span class="tile-idx">04</span>
               <span class="tile-name">题库管理</span>
               <span class="tile-desc">导入 / 编辑</span>
             </button>`
      }
    </div>

    ${
      recent.length
        ? `<section class="recent">
             <div class="section-title">最近练过</div>
             ${recent
               .map(
                 (text, i) =>
                   `<div class="recent-row"><span class="recent-idx">${pad2(i + 1)}</span><span class="recent-text">${escapeHtml(text)}</span></div>`,
               )
               .join('')}
           </section>`
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
    case 'exam':
      await startExam();
      return true;
    default:
      return false;
  }
}
