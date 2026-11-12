import {
  applyAppearance,
  applyTheme,
  emit,
  go,
  loadBank,
  loadFavs,
  loadWrong,
  logout,
  on,
  state,
  TABS,
} from './app';
import { onUnauthorized } from './api';
import { handleAuth, renderAuth } from '../views/auth';
import { handleBank, mountBank, onBankInput, renderBank, resetBank } from '../views/bank';
import { handleFav, mountFav, renderFav, resetFav } from '../views/fav';
import { handleHome, mountHome, renderHome } from '../views/home';
import { handleMe, mountMe, renderMe } from '../views/me';
import { handleQuiz } from '../views/quiz';
import { handleWrong, mountWrong, renderWrong, resetWrong } from '../views/wrong';
import { quizActive } from '../features/session';
import { examActive, handleExam } from '../features/exam';
import { installShortcuts } from '../features/shortcuts';
import { notify } from '../ui/toast';

interface View {
  render: () => string;
  mount?: () => void | Promise<void>;
  handle?: (action: string, el: HTMLElement) => boolean | Promise<boolean>;
  onInput?: (el: HTMLElement) => boolean;
  reset?: () => void;
}

const VIEWS: Record<string, View> = {
  home: { render: renderHome, mount: mountHome, handle: handleHome },
  bank: { render: renderBank, mount: mountBank, handle: handleBank, onInput: onBankInput, reset: resetBank },
  wrong: { render: renderWrong, mount: mountWrong, handle: handleWrong, reset: resetWrong },
  fav: { render: renderFav, mount: mountFav, handle: handleFav, reset: resetFav },
  me: { render: renderMe, mount: mountMe, handle: handleMe },
};

let shellMounted = false;
let authMode = false;
let rendering = false;
let pending = false;

function appRoot(): HTMLElement {
  return document.getElementById('app-root')!;
}

function mountShell(): void {
  authMode = false;
  appRoot().innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" aria-label="主导航">
        <div class="sidebar-brand">基准</div>
        <nav class="sidebar-nav">
          ${TABS.map(
            (tab) =>
              `<button class="side-btn" data-act="tab" data-tab="${tab.id}" aria-label="${tab.label}">
                 <span class="side-ico">${tab.icon}</span><span class="side-label">${tab.label}</span>
               </button>`,
          ).join('')}
        </nav>
        <div class="sidebar-foot">
          <span class="side-user">${state.user ? `@${state.user}` : '未登录'}</span>
          <span class="side-ver">v2.0</span>
        </div>
      </aside>
      <header class="app-header">
        <div class="header-inner">
          <div class="brand">
            <span class="brand-dot"></span>
            <span class="brand-name">基准</span>
          </div>
          <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(state.user || '?')
            .slice(0, 1)
            .toUpperCase()}</button>
        </div>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${TABS.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${TABS.map(
          (tab) =>
            `<button class="tab-btn" role="tab" data-act="tab" data-tab="${tab.id}" aria-label="${tab.label}">
               <span class="tab-ico">${tab.icon}</span><span class="tab-label">${tab.label}</span>
             </button>`,
        ).join('')}
      </nav>
    </div>`;
  shellMounted = true;
}

function syncTabs(): void {
  document.querySelectorAll<HTMLElement>('.tab-btn').forEach((btn) => {
    const active = btn.dataset.tab === state.tab;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll<HTMLElement>('.side-btn').forEach((btn) => {
    const active = btn.dataset.tab === state.tab;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-current', active ? 'page' : 'false');
  });
  // 滑动光晕跟着当前 tab 走
  const nav = document.querySelector<HTMLElement>('.tabbar');
  if (nav) {
    const index = Math.max(
      0,
      TABS.findIndex((tab) => tab.id === state.tab),
    );
    nav.style.setProperty('--tab-index', String(index));
  }
}

function renderView(): void {
  const view = document.getElementById('view');
  if (!view) return;

  const active = document.activeElement as HTMLElement | null;
  const keep = Boolean(active && view.contains(active) && /^(INPUT|TEXTAREA)$/.test(active.tagName));
  const role = keep ? active!.getAttribute('data-role') : null;
  const selection = keep && active instanceof HTMLInputElement ? active.selectionStart : null;

  const entry = VIEWS[state.tab] ?? VIEWS.home;
  view.innerHTML = `<div class="view-inner">${entry.render()}</div>`;
  syncTabs();

  if (keep && role) {
    const next = view.querySelector<HTMLInputElement>(`[data-role="${role}"]`);
    if (next) {
      next.focus();
      if (selection !== null && next.setSelectionRange) next.setSelectionRange(selection, selection);
    }
  }

  void entry.mount?.();
}

function rerender(): void {
  if (rendering) {
    pending = true;
    return;
  }
  rendering = true;
  try {
    if (!state.authed && !state.token) {
      authMode = true;
      shellMounted = false;
      appRoot().innerHTML = renderAuth();
      return;
    }
    if (!shellMounted) mountShell();
    renderView();
  } finally {
    rendering = false;
    if (pending) {
      pending = false;
      queueMicrotask(rerender);
    }
  }
}

/** 合并高频重绘：用宏任务而不是微任务，避免渲染→mount→请求→渲染的微任务死循环 */
let scheduledRender = false;
function scheduleRender(): void {
  if (scheduledRender) return;
  scheduledRender = true;
  requestAnimationFrame(() => {
    scheduledRender = false;
    rerender();
  });
}

async function runAuth(handler: () => Promise<boolean>): Promise<void> {
  await handler();
  if (authMode) rerender();
}

/* ---------------- 事件委托 ---------------- */

function dispatch(el: HTMLElement): void {
  const action = el.dataset.act ?? '';

  if (examActive() && el.closest('.exam')) {
    if (handleExam(el.dataset.ex ?? '', el)) return;
  }

  if (quizActive() && el.closest('.quiz')) {
    void handleQuiz(action, el).then((handled) => {
      if (!handled) emit('render');
    });
    return;
  }

  if (action === 'tab') {
    go((el.dataset.tab as typeof state.tab) ?? 'home');
    return;
  }

  if (authMode) {
    void runAuth(() => handleAuth(action, el));
    return;
  }

  const entry = VIEWS[state.tab] ?? VIEWS.home;
  if (!entry.handle) return;
  void Promise.resolve(entry.handle(action, el)).then((handled) => {
    if (handled) rerender();
  });
}

function handleClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  // 考试层用 data-ex，不进 data-act 的分发链
  const examEl = target.closest<HTMLElement>('[data-ex]');
  if (examEl && examActive() && examEl.closest('.exam')) {
    handleExam(examEl.dataset.ex ?? '', examEl);
    return;
  }

  const el = target.closest<HTMLElement>('[data-act]');
  if (!el) return;
  if (el.closest('.modal-layer')) return; // 弹窗按钮由 openModal 自行处理
  dispatch(el);
}

function handleChangeOrInput(event: Event): void {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  if (target.matches('[data-act]') && (target as HTMLInputElement).type === 'color') {
    dispatch(target as HTMLElement);
    return;
  }

  if (authMode) return;
  const view = document.getElementById('view');
  if (!view || !view.contains(target)) return;
  const entry = VIEWS[state.tab] ?? VIEWS.home;
  if (entry.onInput?.(target)) {
    if (target.getAttribute('data-role') === 'search') rerender();
  }
}

function handleSubmit(event: Event): void {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.matches('[data-form]')) return;
  event.preventDefault();
  if (!authMode) return;
  void runAuth(() => handleAuth('submit', form));
}

/* ---------------- 启动 ---------------- */

export function boot(): void {
  applyTheme();
  applyAppearance();

  onUnauthorized(() => {
    logout();
    shellMounted = false;
    authMode = false;
    notify.error('登录已过期，请重新登录');
    emit('auth');
  });

  on('nav', () => {
    Object.entries(VIEWS).forEach(([key, view]) => {
      if (key !== state.tab) view.reset?.();
    });
    rerender();
  });

  on('auth', () => {
    shellMounted = false;
    authMode = false;
    if (state.authed) {
      resetBank();
      rerender();
      void Promise.allSettled([loadBank(true), loadWrong(true), loadFavs(true)]);
    } else {
      rerender();
    }
  });

  on('render', scheduleRender);
  on('data', scheduleRender);

  document.addEventListener('click', handleClick);
  document.addEventListener('change', handleChangeOrInput);
  document.addEventListener('input', handleChangeOrInput);
  document.addEventListener('submit', handleSubmit);
  installShortcuts();

  if (state.token) state.authed = true;
  rerender();
  if (state.token) void Promise.allSettled([loadBank(), loadWrong(), loadFavs()]);
}
