import { escapeHtml } from '../core/format';

export interface ModalAction<T = string> {
  label: string;
  value: T;
  variant?: 'primary' | 'ghost' | 'danger';
  keepOpen?: boolean;
}

export interface ModalOptions<T = string> {
  title?: string;
  description?: string;
  /** HTML 片段（调用方负责转义）或已构建的节点 */
  body?: string | Node;
  actions?: ModalAction<T>[];
  dismissible?: boolean;
  onMount?: (card: HTMLElement) => void;
}

let root: HTMLElement | null = null;
let openCount = 0;

function ensureRoot(): HTMLElement {
  if (root && document.body.contains(root)) return root;
  root = document.createElement('div');
  root.className = 'modal-root';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  document.body.appendChild(root);
  return root;
}

function lockBody(): void {
  openCount += 1;
  document.body.classList.add('is-locked');
}

function unlockBody(): void {
  openCount = Math.max(0, openCount - 1);
  if (openCount === 0) document.body.classList.remove('is-locked');
}

export function closeAllModals(): void {
  ensureRoot().innerHTML = '';
  openCount = 0;
  document.body.classList.remove('is-locked');
}

export function openModal<T = string>(options: ModalOptions<T>): Promise<T | null> {
  const host = ensureRoot();
  const dismissible = options.dismissible !== false;

  return new Promise<T | null>((resolve) => {
    let settled = false;
    const finish = (value: T | null) => {
      if (settled) return;
      settled = true;
      cleanup();
      container.classList.remove('open');
      // 立刻让遮罩不再拦截点击，动画只是视觉残留，不再"卡一下"
      container.style.pointerEvents = 'none';
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        container.remove();
        unlockBody();
      } else {
        window.setTimeout(() => {
          container.remove();
          unlockBody();
        }, 80);
      }
      resolve(value);
    };

    const container = document.createElement('div');
    container.className = 'modal-layer';
    container.style.position = 'absolute';
    container.style.inset = '0';
    container.style.display = 'grid';
    container.style.placeItems = 'center';
    container.style.padding = 'var(--space-4)';
    container.innerHTML = `
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${dismissible ? '<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>' : ''}
        ${options.title ? `<h2 class="modal-title">${escapeHtml(options.title)}</h2>` : ''}
        ${options.description ? `<p class="modal-desc">${escapeHtml(options.description)}</p>` : ''}
        <div class="modal-body"></div>
        ${
          options.actions?.length
            ? `<div class="modal-actions">${options.actions
                .map(
                  (a, i) =>
                    `<button class="btn btn-${a.variant ?? 'ghost'}" data-idx="${i}">${escapeHtml(a.label)}</button>`,
                )
                .join('')}</div>`
            : ''
        }
      </div>`;

    const card = container.querySelector<HTMLElement>('.modal-card')!;
    const bodySlot = card.querySelector<HTMLElement>('.modal-body')!;
    if (typeof options.body === 'string') bodySlot.innerHTML = options.body;
    else if (options.body) bodySlot.appendChild(options.body);

    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && dismissible) {
        ev.stopPropagation();
        finish(null);
      }
    };

    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      if (target.closest('[data-close]') && dismissible) {
        finish(null);
        return;
      }
      const btn = target.closest<HTMLElement>('[data-idx]');
      if (!btn) return;
      const action = options.actions?.[Number(btn.dataset.idx)];
      if (!action) return;
      if (action.keepOpen) return;
      finish(action.value);
    };

    const cleanup = () => {
      document.removeEventListener('keydown', onKey, true);
      container.removeEventListener('click', onClick);
      if (root && root.children.length === 0) root.classList.remove('open');
    };

    container.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey, true);

    host.appendChild(container);
    host.classList.add('open');
    lockBody();
    options.onMount?.(card);

    requestAnimationFrame(() => {
      container.classList.add('open');
      const focusable = card.querySelector<HTMLElement>('input, textarea, button.btn-primary, button');
      if (focusable && window.matchMedia('(pointer: fine)').matches) focusable.focus({ preventScroll: true });
    });
  });
}

export function confirm(options: {
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  danger?: boolean;
}): Promise<boolean> {
  return openModal<boolean>({
    title: options.title ?? '确认',
    description: options.message,
    actions: [
      { label: options.cancelText ?? '取消', value: false },
      { label: options.okText ?? '确定', value: true, variant: options.danger ? 'danger' : 'primary' },
    ],
  }).then((value) => value === true);
}
