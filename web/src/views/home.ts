import { go, greeting, loadBank, loadFavs, loadWrong, state } from '../core/app';
import { escapeHtml } from '../core/format';
import { getProgress, getSession, hasWelcomedToday, markWelcomed } from '../core/storage';
import { DAILY_GOAL, summary as statsSummary } from '../core/stats';
import { practiceBank, practiceShuffle, practiceWrong, resumeSession } from '../features/session';
import { startExam } from '../features/exam';
import { notify } from '../ui/toast';

function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const week = '日一二三四五六'[d.getDay()];
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} · 周${week}`;
}

const pad2 = (n: number) => String(n).padStart(2, '0');

export function renderHome(): string {
  const bank = state.bank;
  const wrong = state.wrong;
  const favs = state.favs;
  const session = getSession();
  const progress = getProgress();

  const empty = Boolean(bank && !bank.length);
  const num = (v: number | undefined) => (v === undefined ? '—' : pad2(v));
  const stats = statsSummary();
  const todayN = stats.today.n;
  const rateText = stats.today.n ? `${Math.round(stats.today.rate * 100)}%` : '—';

  return `
    <section class="masthead">
      <div class="mast-meta">
        <span>${today()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${state.user ? `@${escapeHtml(state.user)}` : '未登录'}</span>
      </div>
      <div class="today">
        <div class="today-head">
          <span class="today-num">${pad2(todayN)}</span>
          <span class="today-unit">题 · 今日已练</span>
          <span class="today-side">${stats.today.n ? `正确率 <b>${rateText}</b>` : '今天还没开始'}</span>
        </div>
        <div class="today-goal">
          <span class="today-ticks">${Array.from({ length: DAILY_GOAL }, (_, i) => `<i class="${i < todayN ? 'on' : ''}"></i>`).join('')}</span>
          <span class="today-goal-cap">${todayN} / ${DAILY_GOAL}${stats.streak > 1 ? ` · 连练 ${stats.streak} 天` : ''}</span>
        </div>
      </div>
      <div class="stat-strip">
        <button class="stat" data-act="goto" data-tab="bank">
          <span class="stat-num">${num(bank?.length)}</span><span class="stat-label">题库</span>
        </button>
        <button class="stat" data-act="goto" data-tab="wrong">
          <span class="stat-num">${num(wrong?.length)}</span><span class="stat-label">错题</span>
        </button>
        <button class="stat" data-act="goto" data-tab="fav">
          <span class="stat-num">${num(favs?.length)}</span><span class="stat-label">收藏</span>
        </button>
      </div>
    </section>

    <div class="primary-row">
      ${
        empty
          ? `<button class="cta cta-compact" data-act="goto" data-tab="bank">
               <span class="cta-kicker">EMPTY / 题库为空</span>
               <span class="cta-title">先导入题库</span>
               <span class="cta-arrow" aria-hidden="true">→</span>
             </button>`
          : `<button class="cta cta-compact" data-act="random" ${bank ? '' : 'disabled'}>
               <span class="cta-kicker">START / 随机抽题</span>
               <span class="cta-title">开始练习</span>
               <span class="cta-arrow" aria-hidden="true">→</span>
             </button>`
      }
      <button class="ghost-card" data-act="exam" ${empty ? 'disabled' : ''}>
        <span class="ghost-kicker">MOCK EXAM</span>
        <span class="ghost-title">模拟考试</span>
        <span class="ghost-arrow" aria-hidden="true">→</span>
      </button>
    </div>

    <div class="tile-grid tile-grid-sm">
      <button class="tile tile-sm" data-act="sequential" ${empty ? 'disabled' : ''}>
        <span class="tile-idx">01</span>
        <span class="tile-name">顺序练习</span>
        <span class="tile-desc">${
          empty ? '题库为空' : progress > 0 ? `停在第 ${progress + 1} 题` : '按顺序推进'
        }</span>
      </button>
      <button class="tile tile-sm" data-act="shuffle" ${empty ? 'disabled' : ''}>
        <span class="tile-idx">02</span>
        <span class="tile-name">乱序练习</span>
        <span class="tile-desc">${empty ? '题库为空' : `打乱全部 ${bank?.length ?? 0} 题`}</span>
      </button>
      <button class="tile tile-sm" data-act="wrong" ${wrong && !wrong.length ? 'disabled' : ''}>
        <span class="tile-idx">03</span>
        <span class="tile-name">错题重练</span>
        <span class="tile-desc">${wrong ? `${wrong.length} 道待消灭` : '暂无错题'}</span>
      </button>
      ${
        session
          ? `<button class="tile tile-sm tile-accent" data-act="resume">
               <span class="tile-idx">04</span>
               <span class="tile-name">继续上次</span>
               <span class="tile-desc">${session.ids.length} 题 · 第 ${session.idx + 1} 题</span>
             </button>`
          : `<button class="tile tile-sm" data-act="goto" data-tab="bank">
               <span class="tile-idx">04</span>
               <span class="tile-name">题库管理</span>
               <span class="tile-desc">导入 / 编辑</span>
             </button>`
      }
    </div>`;
}

export async function mountHome(): Promise<void> {
  // 问候语不进页面（首页不再需要上下滑），改成进站弹一条、2.6 秒自动消失
  if (!hasWelcomedToday()) {
    markWelcomed();
    window.setTimeout(() => notify.info(greeting()), 320);
  }
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
    case 'shuffle':
      await practiceShuffle();
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
