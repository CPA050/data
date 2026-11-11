import { escapeHtml } from '../core/format';

let host: HTMLElement | null = null;

function ensureHost(): HTMLElement {
  if (host && document.body.contains(host)) return host;
  host = document.createElement('div');
  host.className = 'toast-host';
  host.setAttribute('role', 'status');
  host.setAttribute('aria-live', 'polite');
  document.body.appendChild(host);
  return host;
}

type Variant = 'info' | 'success' | 'error';

export function toast(message: string, variant: Variant = 'info', duration = 2600): void {
  if (!message) return;
  const node = document.createElement('div');
  node.className = `toast toast-${variant}`;
  node.innerHTML = `<span class="toast-dot"></span><span class="toast-text">${escapeHtml(message)}</span>`;
  ensureHost().appendChild(node);
  requestAnimationFrame(() => node.classList.add('in'));
  window.setTimeout(() => {
    node.classList.remove('in');
    window.setTimeout(() => node.remove(), 220);
  }, duration);
}

export const notify = {
  info: (m: string) => toast(m, 'info'),
  ok: (m: string) => toast(m, 'success'),
  error: (m: string) => toast(m, 'error', 3200),
};
