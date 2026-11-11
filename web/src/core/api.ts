import { getUser, getToken } from './storage';
import { parseAnswer } from './format';
import type { AiResult, Answer, Question, QuestionDraft, WrongItem } from './types';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

let unauthorizedHandler: (() => void) | null = null;
export function onUnauthorized(fn: () => void): void {
  unauthorizedHandler = fn;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  headers.set('Accept', 'application/json');

  let res: Response;
  try {
    res = await fetch(path, { ...init, headers });
  } catch {
    throw new ApiError(0, '网络连接失败，请检查网络后重试');
  }

  const contentType = res.headers.get('content-type') ?? '';
  let payload: unknown = null;
  if (contentType.includes('application/json')) {
    payload = await res.json().catch(() => null);
  } else {
    payload = await res.text().catch(() => '');
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  if (res.status === 401) {
    unauthorizedHandler?.();
    throw new ApiError(401, typeof body.error === 'string' ? body.error : '登录已过期，请重新登录');
  }
  if (!res.ok || body.ok === false) {
    const message = typeof body.error === 'string' && body.error ? body.error : `请求失败（HTTP ${res.status}）`;
    throw new ApiError(res.status, message);
  }
  return payload as T;
}

const get = <T>(path: string): Promise<T> => request<T>(path);
const post = <T>(path: string, body: unknown): Promise<T> =>
  request<T>(path, { method: 'POST', body: JSON.stringify(body) });

/* ---------- 数据归一化 ---------- */

function normalizeQuestion(raw: Record<string, unknown>): Question {
  return {
    id: Number(raw.id),
    q: String(raw.q ?? ''),
    opts: Array.isArray(raw.opts) ? (raw.opts as unknown[]).map(String) : [],
    a: parseAnswer(raw.a),
    chapter: String(raw.chapter ?? ''),
    subject: String(raw.subject ?? '默认题库'),
    created_at: typeof raw.created_at === 'string' ? raw.created_at : undefined,
  };
}

function normalizeWrong(raw: Record<string, unknown>): WrongItem {
  const base = normalizeQuestion(raw);
  return {
    ...base,
    answer: String(raw.answer ?? ''),
    user_choice: String(raw.user_choice ?? ''),
    user_choice_text: String(raw.user_choice_text ?? ''),
  };
}

/* ---------- 接口 ---------- */

export const api = {
  auth: {
    check: (username: string) =>
      post<{ ok: boolean; hasPassword: boolean }>('/api/auth', { action: 'check', username }),
    set: (username: string, password: string) =>
      post<{ ok: boolean; token: string; user: string }>('/api/auth', { action: 'set', username, password }),
    login: (username: string, password: string) =>
      post<{ ok: boolean; token: string; user: string }>('/api/auth', { action: 'login', username, password }),
    change: (oldPassword: string, newPassword: string) =>
      post<{ ok: boolean }>('/api/auth', {
        action: 'change',
        username: getUser(),
        oldPassword,
        newPassword,
      }),
  },

  questions: {
    async list(): Promise<Question[]> {
      const user = getUser();
      if (!user) return [];
      const data = await get<unknown>(`/api/questions?user_id=${encodeURIComponent(user)}`);
      const rows = Array.isArray(data) ? data : ((data as { questions?: unknown[] }).questions ?? []);
      return rows.map((row) => normalizeQuestion(row as Record<string, unknown>));
    },
    add: (questions: QuestionDraft[]) =>
      post<{ ok: boolean; added: number }>('/api/questions-add', { user_id: getUser(), questions }),
    update: (id: number, draft: QuestionDraft) =>
      post<{ ok: boolean }>('/api/questions-update', { id, user_id: getUser(), ...draft }),
    remove: (ids: number[]) =>
      post<{ ok: boolean; deleted: number }>('/api/questions-delete', { ids, user_id: getUser() }),
  },

  wrong: {
    async list(): Promise<WrongItem[]> {
      const user = getUser();
      if (!user) return [];
      const data = await get<unknown>(`/api/wrong?user_id=${encodeURIComponent(user)}`);
      const rows = Array.isArray(data) ? data : ((data as { questions?: unknown[] }).questions ?? []);
      return rows.map((row) => normalizeWrong(row as Record<string, unknown>));
    },
    add: (item: { q: string; opts: string[]; a: Answer; chapter?: string; subject?: string; user_choice?: number[] | string }) =>
      post<{ ok: boolean }>('/api/wrong-add', {
        user_id: getUser(),
        q: item.q,
        opts: item.opts,
        a: item.a,
        chapter: item.chapter ?? '',
        subject: item.subject ?? '默认题库',
        user_choice: item.user_choice ?? '',
      }),
    remove: (ids: number[]) =>
      post<{ ok: boolean; deleted: number }>('/api/wrong-delete', { ids, user_id: getUser() }),
  },

  favorites: {
    async list(): Promise<Question[]> {
      const user = getUser();
      if (!user) return [];
      const data = await get<unknown>(`/api/favorites?user_id=${encodeURIComponent(user)}`);
      const rows = Array.isArray(data) ? data : ((data as { questions?: unknown[] }).questions ?? []);
      return rows.map((row) => normalizeQuestion(row as Record<string, unknown>));
    },
    add: (questionId: number) =>
      post<{ ok: boolean }>('/api/favorites-add', { user_id: getUser(), question_id: questionId }),
    remove: (questionId: number) =>
      post<{ ok: boolean }>('/api/favorites-remove', { user_id: getUser(), question_id: questionId }),
  },

  ai: {
    explain: (prompt: string) => post<AiResult>('/api/ai', { action: 'explain', prompt }),
    grade: (prompt: string) => post<AiResult>('/api/ai', { action: 'grade', prompt }),
    extract: (payload: { prompt?: string; image?: string }) =>
      post<AiResult>('/api/ai', { action: 'extract', ...payload }),
  },
};
