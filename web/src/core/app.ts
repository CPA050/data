import { api, ApiError } from './api';
import { notify } from '../ui/toast';
import {
  clearSession,
  clearUser,
  getAppearance,
  getUser,
  getToken,
  saveSettings,
  setAppearance as persistAppearance,
  setToken,
  setUser,
  settings,
  setTheme,
} from './storage';
import type { Appearance } from './storage';
import type { Question, ThemeName, WrongItem } from './types';

export type Tab = 'home' | 'bank' | 'wrong' | 'fav' | 'me';

const stroke = 'fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"';

// 线性图标：统一 1.3px 描边，跟着文字颜色走
export const TABS: { id: Tab; label: string; icon: string }[] = [
  {
    id: 'home',
    label: '首页',
    icon: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`,
  },
  {
    id: 'bank',
    label: '题库',
    icon: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`,
  },
  {
    id: 'wrong',
    label: '错题',
    icon: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`,
  },
  {
    id: 'fav',
    label: '收藏',
    icon: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`,
  },
  {
    id: 'me',
    label: '我的',
    icon: `<svg viewBox="0 0 24 24" ${stroke} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`,
  },
];

export const GREETINGS = [
  '保持热爱，奔赴山海',
  '每一次练习，都是成长的伏笔',
  '慢慢来，比较快',
  '你的努力，终将闪闪发光',
  '关关难过关关过，前路漫漫亦灿灿',
  '别怕路长，进一步有进一步的欢喜',
  '在知识的海洋里，做一只快乐的小鲸鱼',
  '走过的每一步，都算数',
];

export interface AppState {
  tab: Tab;
  user: string;
  token: string;
  bank: Question[] | null;
  wrong: WrongItem[] | null;
  favs: Question[] | null;
  loading: Record<'bank' | 'wrong' | 'fav', boolean>;
  favoriteIds: Set<number>;
  authed: boolean;
}

export const state: AppState = {
  tab: 'home',
  user: getUser(),
  token: getToken(),
  bank: null,
  wrong: null,
  favs: null,
  loading: { bank: false, wrong: false, fav: false },
  favoriteIds: new Set(),
  authed: false,
};

type EventName = 'nav' | 'auth' | 'data' | 'render';
const listeners = new Map<EventName, Set<() => void>>();

export function on(event: EventName, fn: () => void): () => void {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event)!.add(fn);
  return () => listeners.get(event)?.delete(fn);
}

export function emit(event: EventName): void {
  listeners.get(event)?.forEach((fn) => fn());
}

export function go(tab: Tab): void {
  if (state.tab === tab) return;
  state.tab = tab;
  emit('nav');
}

/* ---------------- 主题 ---------------- */

const mql = window.matchMedia('(prefers-color-scheme: dark)');

export function resolveTheme(): 'light' | 'dark' | 'eye' {
  if (settings.theme === 'auto') return mql.matches ? 'dark' : 'light';
  return settings.theme;
}

export function applyTheme(): void {
  document.documentElement.dataset.theme = resolveTheme();
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = resolveTheme() === 'dark' ? '#0b0c0f' : '#f4f5f7';
}

export function updateTheme(theme: ThemeName): void {
  setTheme(theme);
  applyTheme();
}

mql.addEventListener('change', () => {
  if (settings.theme === 'auto') applyTheme();
});

/* ---------------- 外观 ---------------- */

export function appearance(): Appearance {
  return getAppearance();
}

export function updateAppearance(patch: Partial<Appearance>): void {
  persistAppearance(patch);
}

export function applyAppearance(): void {
  const { color, image, dim } = getAppearance();
  const body = document.body;
  body.style.backgroundImage = image ? `url("${image}")` : '';
  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
  body.style.backgroundAttachment = 'fixed';
  body.dataset.dim = String(dim);
  if (color && !image) body.style.backgroundColor = color;
  else body.style.backgroundColor = '';
}

/* ---------------- 认证 ---------------- */

export async function login(username: string, password: string): Promise<void> {
  const res = await api.auth.login(username, password);
  setToken(res.token);
  setUser(username);
  state.user = username;
  state.token = res.token;
  state.authed = true;
  invalidate();
  emit('auth');
}

export async function setup(username: string, password: string): Promise<void> {
  const res = await api.auth.set(username, password);
  setToken(res.token);
  setUser(username);
  state.user = username;
  state.token = res.token;
  state.authed = true;
  invalidate();
  emit('auth');
}

export function logout(): void {
  state.user = '';
  state.token = '';
  state.authed = false;
  state.bank = null;
  state.wrong = null;
  state.favs = null;
  state.favoriteIds = new Set();
  clearUser();
  clearSession();
  emit('auth');
}

/* ---------------- 数据 ---------------- */

const TTL = 5 * 60 * 1000;
const loadedAt: Record<'bank' | 'wrong' | 'fav', number> = { bank: 0, wrong: 0, fav: 0 };
const inflight = new Map<string, Promise<unknown>>();

export function invalidate(kind?: 'bank' | 'wrong' | 'fav'): void {
  if (kind) {
    loadedAt[kind] = 0;
    if (kind === 'bank') state.bank = null;
    if (kind === 'wrong') state.wrong = null;
    if (kind === 'fav') state.favs = null;
  } else {
    loadedAt.bank = loadedAt.wrong = loadedAt.fav = 0;
    state.bank = null;
    state.wrong = null;
    state.favs = null;
  }
}

function dedupe<T>(key: string, run: () => Promise<T>): Promise<T> {
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;
  const task = run().finally(() => inflight.delete(key));
  inflight.set(key, task);
  return task;
}

async function load<T>(kind: 'bank' | 'wrong' | 'fav', force: boolean, fetcher: () => Promise<T>, assign: (value: T) => void): Promise<T> {
  if (!state.user) return [] as unknown as T;
  const running = inflight.get(kind) as Promise<T> | undefined;
  // 已有请求在飞：直接复用，别重复 emit（否则渲染→mount→load 会形成微任务死循环）
  if (running) return running;
  const fresh = Date.now() - loadedAt[kind] < TTL;
  if (!force && fresh) return [] as unknown as T;
  state.loading[kind] = true;
  emit('data');
  try {
    const value = await dedupe(kind, fetcher);
    assign(value);
    loadedAt[kind] = Date.now();
    return value;
  } catch (error) {
    if (error instanceof ApiError && error.status !== 401) notify.error(error.message);
    throw error;
  } finally {
    state.loading[kind] = false;
    emit('data');
  }
}

export async function loadBank(force = false): Promise<Question[]> {
  try {
    await load('bank', force, () => api.questions.list(), (rows) => {
      state.bank = rows;
    });
  } catch {
    /* 已在 load 内提示 */
  }
  return state.bank ?? [];
}

export async function loadWrong(force = false): Promise<WrongItem[]> {
  try {
    await load('wrong', force, () => api.wrong.list(), (rows) => {
      state.wrong = rows;
    });
  } catch {
    /* noop */
  }
  return state.wrong ?? [];
}

export async function loadFavs(force = false): Promise<Question[]> {
  try {
    await load('fav', force, () => api.favorites.list(), (rows) => {
      state.favs = rows;
      state.favoriteIds = new Set(rows.map((r) => r.id));
    });
  } catch {
    /* noop */
  }
  return state.favs ?? [];
}

export function isFavorite(id: number): boolean {
  return state.favoriteIds.has(id);
}

export async function toggleFavorite(id: number): Promise<boolean> {
  const next = !isFavorite(id);
  try {
    if (next) await api.favorites.add(id);
    else await api.favorites.remove(id);
    if (next) state.favoriteIds.add(id);
    else state.favoriteIds.delete(id);
    state.favs = null;
    loadedAt.fav = 0;
    notify.ok(next ? '已加入收藏' : '已取消收藏');
    emit('data');
    return next;
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '操作失败');
    return isFavorite(id);
  }
}

export function greeting(): string {
  const hour = new Date().getHours();
  const prefix = hour < 6 ? '夜深了' : hour < 11 ? '早上好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
  return `${prefix}，${GREETINGS[Math.floor(Math.random() * GREETINGS.length)]}`;
}

export function saveAppearance(patch: Partial<Appearance>): void {
  updateAppearance(patch);
  applyAppearance();
}

export { settings, saveSettings };
