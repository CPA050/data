import './styles/tokens.css';
import './styles/app.css';
import './styles/glass.css';
import './styles/grid.css';
import './styles/responsive.css';
import './styles/liquid.css';
import { boot } from './core/router';
import { installOfflineQueue } from './core/offline';

/** 线上最新构建 vs 当前页面构建：不一致就提示更新，干掉"我还停在旧版"的问题 */
async function checkVersion(): Promise<void> {
  try {
    const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return;
    const info = (await res.json()) as { build?: string };
    if (!info.build || info.build === __BUILD__) return;
    showUpdateBar(info.build);
  } catch {
    /* 离线时忽略 */
  }
}

function showUpdateBar(build: string): void {
  if (document.querySelector('.update-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'update-bar';
  bar.innerHTML = '<span>有新版本可用</span><button type="button">立即更新</button>';
  bar.querySelector('button')?.addEventListener('click', async () => {
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
    } catch {
      /* 清缓存失败也照样刷新 */
    }
    location.replace(`${location.pathname}?v=${encodeURIComponent(build)}`);
  });
  document.body.appendChild(bar);
}

function start(): void {
  try {
    boot();
    installOfflineQueue();
    window.setTimeout(() => void checkVersion(), 1200);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') window.setTimeout(() => void checkVersion(), 400);
    });
  } catch (error) {
    console.error('[datum] 启动失败', error);
    const root = document.getElementById('app-root');
    if (root) {
      root.innerHTML = `<div class="fatal"><h1>页面加载失败</h1><p>${String(
        error instanceof Error ? error.message : error,
      )}</p><button onclick="location.reload()">刷新重试</button></div>`;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
