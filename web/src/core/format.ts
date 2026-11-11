import type { Answer } from './types';
import katex from 'katex';

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch] ?? ch);
}

/** 公式：$...$ 行内、$$...$$ 独立成行、\(...\) 与 \[...\] 也认 */
const MATH_RE = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;

function mathHtml(source: string, display: boolean): string {
  try {
    // 用 MathML 输出：不引入 KaTeX 字体与样式表，体积为零，Chromium/Safari 原生渲染
    return katex.renderToString(source, {
      displayMode: display,
      throwOnError: false,
      output: 'mathml',
      strict: false,
      trust: false,
    });
  } catch {
    return escapeHtml(display ? `$$${source}$$` : `$${source}$`);
  }
}

/** 文本 → HTML，顺带把公式渲染掉 */
export function renderMathText(raw: string): string {
  let out = '';
  let last = 0;
  MATH_RE.lastIndex = 0;
  for (let m = MATH_RE.exec(raw); m; m = MATH_RE.exec(raw)) {
    out += escapeHtml(raw.slice(last, m.index)).replace(/\n/g, '<br>');
    const display = Boolean(m[1] || m[2]);
    const source = (m[1] ?? m[2] ?? m[3] ?? m[4] ?? '').trim();
    out += source ? mathHtml(source, display) : escapeHtml(m[0]);
    last = m.index + m[0].length;
  }
  out += escapeHtml(raw.slice(last)).replace(/\n/g, '<br>');
  return out;
}

/** 题干允许少量排版标签（图片、换行、加粗），其余一律转义 */
const ALLOWED_TAGS = new Set(['IMG', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'SUB', 'SUP', 'P', 'DIV', 'SPAN', 'CODE']);

/** 把 `![alt](url)` 这种 Markdown 图片转成标签，AI 导出的题目偶尔会带 */
function markdownImages(text: string): string {
  return text.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img src="$2" alt="$1">');
}

export function renderRich(value: unknown): string {
  const text = markdownImages(String(value ?? ''));
  if (!text) return '';
  if (!/<[a-z][\s\S]*>/i.test(text)) return renderMathText(text);
  const doc = new DOMParser().parseFromString(`<div>${text}</div>`, 'text/html');
  const holder = doc.body.firstElementChild;
  if (!holder) return escapeHtml(text);
  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) return renderMathText(node.textContent ?? '');
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const el = node as HTMLElement;
    const tag = el.tagName;
    const inner = Array.from(el.childNodes).map(walk).join('');
    if (!ALLOWED_TAGS.has(tag)) return inner;
    if (tag === 'IMG') {
      const src = el.getAttribute('src') ?? '';
      if (!/^(https?:|data:image\/|blob:|\/)/i.test(src)) return '';
      const alt = escapeHtml(el.getAttribute('alt') ?? '');
      return `<img src="${escapeHtml(src)}" alt="${alt}" loading="lazy" referrerpolicy="no-referrer">`;
    }
    const name = tag.toLowerCase();
    return `<${name}>${inner}</${name}>`;
  };
  return Array.from(holder.childNodes).map(walk).join('');
}

/** 纯文本（用于搜索、导出、复制、AI prompt） */
export function plainText(value: unknown): string {
  return String(value ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, '');
}

/** 答案里的选项下标，升序去重 */
export function choiceIndexes(answer: Answer): number[] {
  const raw = Array.isArray(answer) ? answer : typeof answer === 'number' ? [answer] : [];
  return Array.from(new Set(raw.filter((n): n is number => Number.isInteger(n)))).sort((a, b) => a - b);
}

export function isEssay(answer: Answer): boolean {
  return typeof answer === 'string';
}

export function formatAnswer(answer: Answer, opts: string[] = []): string {
  if (typeof answer === 'string') return answer;
  return choiceIndexes(answer)
    .map((i) => {
      const letter = String.fromCharCode(65 + i);
      // 选项文本里可能自带 "A. " 前缀，去掉避免出现 "A. A. 45min"
      const text = (opts[i] ?? '').replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/, '');
      return text ? `${letter}. ${text}` : letter;
    })
    .join('、');
}

export function relTime(input?: string | number): string {
  if (!input) return '';
  const ts = typeof input === 'number' ? input : Date.parse(input.replace(' ', 'T') + (String(input).includes('T') ? '' : 'Z'));
  if (!Number.isFinite(ts)) return '';
  const diff = Date.now() - ts;
  if (diff < 0) return '刚刚';
  const min = Math.floor(diff / 60000);
  if (min < 1) return '刚刚';
  if (min < 60) return `${min} 分钟前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} 小时前`;
  const day = Math.floor(hour / 24);
  if (day < 30) return `${day} 天前`;
  return new Date(ts).toLocaleDateString('zh-CN');
}

export function pct(part: number, total: number): number {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 稳定洗牌（Fisher–Yates） */
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** 判断两个答案是否等价（单选 / 多选，顺序无关） */
export function sameAnswer(picked: number[], answer: Answer): boolean {
  const target = choiceIndexes(answer);
  if (!target.length || picked.length !== target.length) return false;
  const sorted = [...new Set(picked)].sort((a, b) => a - b);
  return sorted.length === target.length && sorted.every((value, i) => value === target[i]);
}

/** 宽松解析服务端可能返回的字符串化答案 */
export function parseAnswer(raw: unknown): Answer {
  if (typeof raw === 'number') return raw;
  if (Array.isArray(raw)) return raw.map(Number).filter(Number.isInteger);
  if (typeof raw === 'string') {
    const text = raw.trim();
    if (!text) return '';
    try {
      const parsed = JSON.parse(text) as unknown;
      if (typeof parsed === 'number') return parsed;
      if (Array.isArray(parsed)) return parsed.map(Number).filter(Number.isInteger);
      if (typeof parsed === 'string') return parsed;
    } catch {
      /* 历史脏数据：当作纯文本答案 */
    }
    return text;
  }
  return '';
}
