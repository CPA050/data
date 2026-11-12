import { shrinkToDataUrl } from '../core/image';
import { notify } from './toast';

const ALLOWED = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'SUB', 'SUP', 'BR', 'P', 'DIV', 'SPAN', 'IMG', 'CODE']);

/** 只留白名单标签与必要属性，防止粘进来的网页样式污染 */
export function sanitizeRich(html: string): string {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild;
  if (!root) return '';

  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return (node.textContent ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\u00a0/g, ' ');
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const el = node as HTMLElement;
    const tag = el.tagName;
    const inner = Array.from(el.childNodes).map(walk).join('');
    if (!ALLOWED.has(tag)) return inner;
    if (tag === 'IMG') {
      const src = el.getAttribute('src') ?? '';
      if (!/^(https?:|data:image\/|blob:|\/)/i.test(src)) return '';
      const alt = (el.getAttribute('alt') ?? '').replace(/"/g, '&quot;');
      return `<img src="${src.replace(/"/g, '&quot;')}" alt="${alt}">`;
    }
    if (tag === 'BR') return '<br>';
    const name = tag.toLowerCase();
    if (name === 'div' || name === 'p') return inner.trim() ? `${inner}<br>` : '<br>';
    return `<${name}>${inner}</${name}>`;
  };

  return Array.from(root.childNodes)
    .map(walk)
    .join('')
    .replace(/(<br>)+$/g, '')
    .trim();
}

export interface RichEditorOptions {
  value?: string;
  placeholder?: string;
  minHeight?: number;
  /** 是否显示工具条（默认 true） */
  toolbar?: boolean;
}

export interface RichEditor {
  el: HTMLElement;
  getValue(): string;
  setValue(html: string): void;
  focus(): void;
}

const TOOLS: Array<{ cmd: string; label: string; title: string; arg?: string; text?: boolean }> = [
  { cmd: 'bold', label: 'B', title: '加粗（Ctrl/⌘+B）' },
  { cmd: 'italic', label: 'I', title: '斜体（Ctrl/⌘+I）' },
  { cmd: 'underline', label: 'U', title: '下划线（Ctrl/⌘+U）' },
  { cmd: 'superscript', label: 'x²', title: '上标' },
  { cmd: 'subscript', label: 'x₂', title: '下标' },
  { cmd: 'insertUnorderedList', label: '≡', title: '列表' },
];

export function createRichEditor(options: RichEditorOptions = {}): RichEditor {
  const wrap = document.createElement('div');
  wrap.className = 'rt';

  const bar = document.createElement('div');
  bar.className = 'rt-bar';

  const area = document.createElement('div');
  area.className = 'rt-area';
  area.contentEditable = 'true';
  area.spellcheck = false;
  area.dataset.role = 'rich';
  area.style.minHeight = `${options.minHeight ?? 96}px`;
  if (options.placeholder) area.dataset.placeholder = options.placeholder;
  area.innerHTML = sanitizeRich(options.value ?? '');

  const run = (cmd: string, arg?: string) => {
    area.focus();
    document.execCommand(cmd, false, arg);
    syncEmpty();
  };

  if (options.toolbar !== false) {
    for (const tool of TOOLS) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rt-btn';
      btn.title = tool.title;
      btn.textContent = tool.label;
      btn.addEventListener('mousedown', (event) => event.preventDefault());
      btn.addEventListener('click', () => run(tool.cmd, tool.arg));
      bar.appendChild(btn);
    }

    const sep = document.createElement('span');
    sep.className = 'rt-sep';
    bar.appendChild(sep);

    // 公式：把选中内容包成 $…$
    const mathBtn = document.createElement('button');
    mathBtn.type = 'button';
    mathBtn.className = 'rt-btn';
    mathBtn.textContent = '∑';
    mathBtn.title = '公式：选中内容包成 $…$';
    mathBtn.addEventListener('mousedown', (event) => event.preventDefault());
    mathBtn.addEventListener('click', () => {
      const picked = window.getSelection()?.toString() ?? '';
      if (picked) {
        run('insertText', `$${picked}$`);
        return;
      }
      // 没有选中：插入一对 $，光标停在中间，直接打字就是公式
      run('insertText', '$$');
      const sel = window.getSelection();
      if (sel && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        if (typeof (sel as unknown as { modify?: unknown }).modify === 'function') {
          (sel as unknown as { modify: (a: string, b: string, c: string) => void }).modify(
            'move',
            'backward',
            'character',
          );
        } else if (range.startContainer.nodeType === Node.TEXT_NODE) {
          range.setStart(range.startContainer, Math.max(0, range.startOffset - 1));
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    });
    bar.appendChild(mathBtn);

    // 图片
    const imgBtn = document.createElement('button');
    imgBtn.type = 'button';
    imgBtn.className = 'rt-btn';
    imgBtn.textContent = '▣';
    imgBtn.title = '插入图片（自动压缩）';
    imgBtn.addEventListener('mousedown', (event) => event.preventDefault());
    imgBtn.addEventListener('click', () => {
      const picker = document.createElement('input');
      picker.type = 'file';
      picker.accept = 'image/*';
      picker.onchange = async () => {
        const file = picker.files?.[0];
        if (!file) return;
        try {
          imgBtn.textContent = '…';
          const dataUrl = await shrinkToDataUrl(file);
          area.focus();
          document.execCommand(
            'insertHTML',
            false,
            `<img src="${dataUrl}" alt="题图"><br>`,
          );
          syncEmpty();
          notify.ok(`图片已插入（${Math.round((dataUrl.length * 0.75) / 1024)} KB）`);
        } catch {
          notify.error('图片读取失败，换一张试试');
        } finally {
          imgBtn.textContent = '▣';
        }
      };
      picker.click();
    });
    bar.appendChild(imgBtn);

    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'rt-btn rt-clear';
    clear.textContent = '⌫';
    clear.title = '清除格式';
    clear.addEventListener('mousedown', (event) => event.preventDefault());
    clear.addEventListener('click', () => run('removeFormat'));
    bar.appendChild(clear);
  }

  function syncEmpty(): void {
    const hasText = (area.textContent ?? '').trim().length > 0;
    const hasImg = Boolean(area.querySelector('img'));
    area.classList.toggle('is-empty', !hasText && !hasImg);
  }

  area.addEventListener('input', syncEmpty);
  area.addEventListener('blur', syncEmpty);
  area.addEventListener('paste', (event) => {
    const html = event.clipboardData?.getData('text/html');
    if (!html) return; // 纯文本走浏览器默认，保留换行
    event.preventDefault();
    document.execCommand('insertHTML', false, sanitizeRich(html));
  });

  syncEmpty();
  wrap.append(bar, area);

  return {
    el: wrap,
    getValue: () => sanitizeRich(area.innerHTML),
    setValue: (html: string) => {
      area.innerHTML = sanitizeRich(html);
      syncEmpty();
    },
    focus: () => area.focus(),
  };
}
