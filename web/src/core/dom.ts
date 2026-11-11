export function $<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(selector);
}

export function $$<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/** 事件委托：一次绑定，处理动态渲染出来的所有节点 */
export function delegate<K extends keyof HTMLElementEventMap>(
  root: HTMLElement,
  type: K,
  selector: string,
  handler: (el: HTMLElement, ev: HTMLElementEventMap[K]) => void,
): () => void {
  const listener = (event: Event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const hit = target.closest<HTMLElement>(selector);
    if (!hit || !root.contains(hit)) return;
    handler(hit, event as HTMLElementEventMap[K]);
  };
  root.addEventListener(type, listener);
  return () => root.removeEventListener(type, listener);
}

export function debounce<T extends (...args: never[]) => void>(fn: T, wait = 200): T & { cancel(): void } {
  let timer = 0;
  const wrapped = ((...args: Parameters<T>) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  }) as T & { cancel(): void };
  wrapped.cancel = () => window.clearTimeout(timer);
  return wrapped;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

/** 数字滚动动画（结果页正确率） */
export function countUp(node: HTMLElement, to: number, duration = 620, suffix = '%'): void {
  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.innerHTML = `${Math.round(to * eased)}<span>${suffix}</span>`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function focusFirst(container: HTMLElement, selector = 'input, textarea, button'): void {
  const node = container.querySelector<HTMLElement>(selector);
  node?.focus({ preventScroll: true });
}

/** 简易震动反馈 */
import { settings } from './storage';

export function vibrate(pattern: number | number[] = 12): void {
  if (!settings.vibration) return;
  navigator.vibrate?.(pattern);
}
