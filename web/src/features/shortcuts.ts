// web/src/features/shortcuts.ts —— 键盘快捷键（答题 / 导航 / 帮助面板）
import { go } from '../core/app';
import { openModal } from '../ui/modal';
import { openSearch } from './search';

export const SHORTCUTS: { keys: string; desc: string; scope: string }[] = [
  { keys: '1–4 / A–D', desc: '选择对应选项', scope: '答题中' },
  { keys: 'Enter', desc: '提交答案 / 下一题', scope: '答题中' },
  { keys: '← →', desc: '上一题 / 下一题', scope: '答题中' },
  { keys: 'S', desc: '收藏这道题', scope: '答题中' },
  { keys: 'N', desc: '打开笔记', scope: '答题中' },
  { keys: 'E', desc: 'AI 深度解析', scope: '答题中' },
  { keys: 'G', desc: 'AI 阅卷（简答题）', scope: '答题中' },
  { keys: 'Esc', desc: '关闭弹窗 / 结束练习', scope: '全局' },
  { keys: '1–5', desc: '切换 首页 / 题库 / 错题 / 收藏 / 我的', scope: '非答题时' },
  { keys: '/ 或 Ctrl+K', desc: '全局搜索（题库 / 错题 / 收藏）', scope: '全局' },
  { keys: '?', desc: '打开这份快捷键说明', scope: '全局' },
];

export function openShortcuts(): void {
  const rows = SHORTCUTS.map(
    (s) => `<div class="kbd-row">
      <kbd class="kbd">${s.keys}</kbd>
      <span class="kbd-desc">${s.desc}</span>
      <span class="kbd-scope">${s.scope}</span>
    </div>`,
  ).join('');
  void openModal({
    title: '键盘快捷键',
    body: `<div class="kbd-list">${rows}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,
    actions: [{ label: '知道了', value: 'ok', variant: 'primary' }],
  });
}

const TABS = ['home', 'bank', 'wrong', 'fav', 'me'] as const;

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}

/**
 * 装全局快捷键。答题层的快捷键由 quiz.ts 自己处理，这里只处理「不在答题中」的场景。
 */
export function installShortcuts(): void {
  document.addEventListener('keydown', (ev) => {
    const cmdK = (ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k';
    if (cmdK) {
      if (document.querySelector('.quiz')) return;
      ev.preventDefault();
      openSearch();
      return;
    }
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    if (document.querySelector('.quiz')) return;
    if (isTyping(ev.target)) return;
    if (document.querySelector('.modal-layer')) return;

    if (ev.key === '?') {
      ev.preventDefault();
      openShortcuts();
      return;
    }
    if (ev.key === '/') {
      ev.preventDefault();
      openSearch();
      return;
    }
    const n = Number(ev.key);
    if (n >= 1 && n <= 5) {
      ev.preventDefault();
      go(TABS[n - 1]);
    }
  });
}
