import type { Settings, SessionContext, ThemeName } from './types';

const PREFIX = 'oq:';
const USER_KEY = 'oq:user';
const TOKEN_KEY = 'oq:token';

const DEFAULT_SETTINGS: Settings = {
  theme: 'auto',
  vibration: true,
  autoDelay: 600,
  streakAlert: true,
};

export const settings: Settings = { ...DEFAULT_SETTINGS, ...read<Partial<Settings>>('settings', {}) };
if (!['auto', 'light', 'dark', 'eye'].includes(settings.theme)) settings.theme = 'auto';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* 隐私模式下 localStorage 可能不可写，静默降级 */
  }
}

function drop(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    /* noop */
  }
}

export function saveSettings(patch: Partial<Settings>): void {
  Object.assign(settings, patch);
  write('settings', settings);
}

export function setTheme(theme: ThemeName): void {
  saveSettings({ theme });
}

/* ---------- 用户与令牌 ---------- */

export function getUser(): string {
  return read<string>(USER_KEY, '') || '';
}

export function setUser(name: string): void {
  write(USER_KEY, name);
}

export function clearUser(): void {
  drop(USER_KEY);
  drop(TOKEN_KEY);
}

export function getToken(): string {
  return read<string>(TOKEN_KEY, '') || '';
}

export function setToken(token: string): void {
  write(TOKEN_KEY, token);
}

/* ---------- 按用户隔离的数据 ---------- */

function userKey(suffix: string): string {
  return `u:${getUser() || 'anon'}:${suffix}`;
}

export function getNotes(): Record<string, string> {
  return read<Record<string, string>>(userKey('notes'), {});
}

export function saveNote(qid: number, text: string): void {
  const notes = getNotes();
  const key = String(qid);
  if (text.trim()) notes[key] = text;
  else delete notes[key];
  write(userKey('notes'), notes);
}

export function getMastered(): number[] {
  return read<number[]>(userKey('mastered'), []);
}

export function setMastered(ids: number[]): void {
  write(userKey('mastered'), ids);
}

export function getProgress(): number {
  const raw = read<{ sequential_index?: number }>(userKey('progress'), {});
  return Number(raw.sequential_index) || 0;
}

export function setProgress(index: number): void {
  write(userKey('progress'), { sequential_index: index, updatedAt: Date.now() });
}

export function getSession(): SessionContext | null {
  const ctx = read<SessionContext | null>(userKey('session'), null);
  if (!ctx || !Array.isArray(ctx.ids) || !ctx.ids.length) return null;
  if (Date.now() - ctx.savedAt > 24 * 3600 * 1000) return null;
  return ctx;
}

export function saveSession(ctx: SessionContext): void {
  write(userKey('session'), ctx);
}

export function clearSession(): void {
  drop(userKey('session'));
}

export function getRecent(): string[] {
  return read<string[]>(userKey('recent'), []);
}

export function pushRecent(stems: string[]): void {
  const merged = [...stems, ...getRecent()].slice(0, 30);
  write(userKey('recent'), Array.from(new Set(merged)));
}

/* ---------- 外观 ---------- */

export interface Appearance {
  color: string;
  image: string;
  dim: number;
}

export function getAppearance(): Appearance {
  return read<Appearance>('appearance', { color: '', image: '', dim: 0.35 });
}

export function setAppearance(patch: Partial<Appearance>): void {
  write('appearance', { ...getAppearance(), ...patch });
}

export function hasWelcomedToday(): boolean {
  return read<string>('welcomed', '') === new Date().toDateString();
}

export function markWelcomed(): void {
  write('welcomed', new Date().toDateString());
}
