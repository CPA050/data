import './styles/tokens.css';
import './styles/app.css';
import './styles/glass.css';
import './styles/grid.css';
import { boot } from './core/router';

function start(): void {
  try {
    boot();
  } catch (error) {
    console.error('[origin-quiz] 启动失败', error);
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
