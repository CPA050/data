import { notify } from '../ui/toast';

export interface QueuedCall {
  id: string;
  path: string;
  body: unknown;
  label: string;
  at: number;
}

const KEY = 'oq:queue';
const MAX = 200;

function readAll(): QueuedCall[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as QueuedCall[]) : [];
    return Array.isArray(list) ? list.filter((item) => item && item.path) : [];
  } catch {
    return [];
  }
}

function writeAll(list: QueuedCall[]): void {
  try {
    if (!list.length) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX)));
  } catch {
    /* 存储满时静默失败，不影响主流程 */
  }
}

export function queuedCount(): number {
  return readAll().length;
}

export function enqueue(path: string, body: unknown, label: string): void {
  const list = readAll();
  list.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    path,
    body,
    label,
    at: Date.now(),
  });
  writeAll(list);
}

let flushing = false;

/** 把排队里的写操作补发给服务器；返回成功条数 */
export async function flushQueue(): Promise<number> {
  if (flushing) return 0;
  const list = readAll();
  if (!list.length) return 0;
  flushing = true;
  let done = 0;
  const left: QueuedCall[] = [];

  for (const item of list) {
    try {
      const res = await fetch(item.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(item.body),
        // 队列里保存的就是完整 body，token 由调用方在入队前已写入 body？不需要：走 cookie-less Bearer
        ...(tokenHeader() ? { headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...tokenHeader() } } : {}),
      });
      if (res.ok || (res.status >= 400 && res.status < 500)) {
        // 4xx 说明这条本来就不合法（例如题目已删），丢掉避免死循环
        if (res.ok) done += 1;
        continue;
      }
      left.push(item);
    } catch {
      left.push(item);
      break; // 还是断网，剩下的留到下次
    }
  }

  flushing = false;
  writeAll([...left, ...list.slice(list.length)]);
  if (done) notify.ok(`已补传 ${done} 条离线操作`);
  return done;
}

function tokenHeader(): Record<string, string> {
  try {
    const raw = localStorage.getItem('oq:oq:token') || localStorage.getItem('oq:token') || '';
    const token = raw.replace(/^"|"$/g, '');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

/** 启动时挂上网监听：一恢复联网就补传 */
export function installOfflineQueue(): void {
  window.addEventListener('online', () => {
    void flushQueue();
  });
  if (navigator.onLine) {
    const pending = queuedCount();
    if (pending) setTimeout(() => void flushQueue(), 1500);
  }
}
