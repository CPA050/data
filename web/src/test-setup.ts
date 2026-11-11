import { beforeEach } from 'vitest';

class MemoryStorage implements Storage {
  private map = new Map<string, string>();

  get length(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }

  getItem(key: string): string | null {
    return this.map.has(key) ? this.map.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.map.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.map.delete(key);
  }

  setItem(key: string, value: string): void {
    this.map.set(key, String(value));
  }
}

// jsdom 在部分环境里不提供 storage，Node 26 的 globalThis.localStorage 也需要 --localstorage-file
function ensureStorage(): Storage {
  const existing = typeof window !== 'undefined' ? window.localStorage : undefined;
  if (existing) return existing;
  const shim = new MemoryStorage();
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'localStorage', { value: shim, configurable: true });
    Object.defineProperty(window, 'sessionStorage', { value: new MemoryStorage(), configurable: true });
  }
  Object.defineProperty(globalThis, 'localStorage', { value: shim, configurable: true, writable: true });
  return shim;
}

const storage = ensureStorage();

// jsdom 没有实现 matchMedia，app.ts 在模块顶层就会调用它
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  storage.clear();
  document.body.innerHTML = '<div id="app-root"></div>';
  document.documentElement.dataset.theme = '';
});
