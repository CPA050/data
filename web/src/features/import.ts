import { unzipSync, strFromU8, unzlibSync, inflateSync } from 'fflate';
import type { Answer, QuestionDraft } from '@/core/types';

/* ------------------------------------------------------------------ *
 * 导入解析：JSON / 纯文本 / Word(.docx) / PDF / 图片（交给 AI）
 * ------------------------------------------------------------------ */

export type ImportKind = 'json' | 'text' | 'docx' | 'pdf' | 'image' | 'unknown';

export function detectKind(file: File): ImportKind {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  if (name.endsWith('.pdf') || type === 'application/pdf') return 'pdf';
  if (type.startsWith('image/') || /\.(png|jpe?g|webp|gif|bmp|heic)$/.test(name)) return 'image';
  if (name.endsWith('.docx')) return 'docx';
  if (name.endsWith('.json')) return 'json';
  if (/\.(txt|md|csv|tsv|text)$/.test(name) || type.startsWith('text/')) return 'text';
  return 'unknown';
}

/* ------------------------------ 通用工具 ------------------------------ */

function clean(v: unknown): string {
  return String(v ?? '').replace(/\r\n?/g, '\n').trim();
}

/** 把 "A" / "A,B" / "AB" / "选项文本" 统一成 Answer */
export function answerFrom(raw: unknown, opts: string[]): Answer {
  if (Array.isArray(raw)) {
    const nums = raw
      .map((v) => (typeof v === 'number' ? v : letterIndex(String(v), opts.length)))
      .filter((n): n is number => n !== null);
    if (nums.length) return nums.length === 1 ? nums[0] : [...new Set(nums)].sort((a, b) => a - b);
    return raw.map(String).join('、');
  }
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  const text = clean(raw);
  if (!text) return '';
  // 纯字母：A / A,B / AB / 选A
  const onlyLetters = /^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(text) ? text : '';
  const source = onlyLetters || (/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(text) ? text : '');
  if (source) {
    const nums = [...new Set(source.toUpperCase().split('').map((ch) => ch.charCodeAt(0) - 65))].filter(
      (n) => n >= 0 && n < opts.length,
    );
    if (nums.length) return nums.length === 1 ? nums[0] : nums.sort((a, b) => a - b);
  }
  // 字母 + 选项文本混写："A. 45min" / "A 45min"
  const m = /^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(text);
  if (m && opts.length) {
    const idx = m[1].charCodeAt(0) - 65;
    if (idx >= 0 && idx < opts.length) {
      const rest = m[2].trim();
      // 文本和选项能对上就认字母，否则当作自定义答案
      const hit = opts.findIndex((o) => o.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/, '').trim() === rest);
      return hit >= 0 || rest ? idx : idx;
    }
  }
  return text;
}

function letterIndex(ch: string, max: number): number | null {
  const t = ch.trim().toUpperCase();
  if (!/^[A-H]$/.test(t)) return null;
  const n = t.charCodeAt(0) - 65;
  return n < max ? n : null;
}

function guessKindOfQuestion(opts: string[], a: unknown): 'single' | 'multi' | 'essay' {
  if (!opts.length) return 'essay';
  if (Array.isArray(a) && a.length > 1) return 'multi';
  if (typeof a === 'string' && /[,，、/\s]/.test(a.trim()) && /^[A-Ha-h\s,，、/]+$/.test(a.trim())) return 'multi';
  if (typeof a === 'string' && a.trim() && !/^[A-Ha-h]$/.test(a.trim())) return 'essay';
  return 'single';
}

export function normalizeDraft(raw: Record<string, unknown>): QuestionDraft | null {
  const q = clean(raw.q ?? raw.question ?? raw.title ?? raw.题目 ?? raw.题干);
  if (!q) return null;
  const rawOpts = raw.opts ?? raw.options ?? raw.choices ?? raw.选项;
  let opts: string[] = [];
  if (Array.isArray(rawOpts)) {
    opts = rawOpts.map((o) => clean(o)).filter(Boolean);
  } else if (typeof rawOpts === 'string') {
    opts = splitOptions(rawOpts);
  }
  const rawA = raw.a ?? raw.answer ?? raw.correct ?? raw.答案 ?? raw.正确答案;
  const a = opts.length ? answerFrom(rawA, opts) : clean(rawA);
  return {
    q,
    opts,
    a,
    ...(raw.figure ? { figure: raw.figure } : {}),
    chapter: clean(raw.chapter ?? raw.章节 ?? raw.知识点),
    subject: clean(raw.subject ?? raw.科目 ?? raw.题库) || '默认题库',
  };
}

/* ------------------------------- JSON ------------------------------- */

export function parseJsonQuestions(raw: string): QuestionDraft[] {
  const text = raw.replace(/^\uFEFF/, '').trim();
  const block = /```(?:json)?([\s\S]*?)```/i.exec(text)?.[1] ?? text;
  const startArr = block.indexOf('[');
  const startObj = block.indexOf('{');
  const start = startArr >= 0 && (startObj < 0 || startArr < startObj) ? startArr : startObj;
  if (start < 0) return [];
  const end = Math.max(block.lastIndexOf(']'), block.lastIndexOf('}'));
  if (end <= start) return [];
  let data: unknown;
  try {
    data = JSON.parse(block.slice(start, end + 1));
  } catch {
    return [];
  }
  const list = Array.isArray(data)
    ? data
    : Array.isArray((data as Record<string, unknown>)?.questions)
      ? ((data as Record<string, unknown>).questions as unknown[])
      : Array.isArray((data as Record<string, unknown>)?.data)
        ? ((data as Record<string, unknown>).data as unknown[])
        : [];
  return list
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object')
    .map(normalizeDraft)
    .filter((d): d is QuestionDraft => Boolean(d));
}

/* ------------------------------ 纯文本 ------------------------------ */

const OPTION_RE = /^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/;
const ANSWER_RE = /^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/;
const META_RE = /^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/;
const QUESTION_HEAD_RE = /^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;

function splitOptions(line: string): string[] {
  const parts = line
    .replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/, '')
    .split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts;
}

/** 一行里塞了多个选项时（A. xx B. yy C. zz）拆开 */
function splitInlineOptions(line: string): string[] {
  const marks = [...line.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];
  if (marks.length < 2) return [];
  return marks.map((m, i) => {
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < marks.length ? marks[i + 1].index ?? line.length : line.length;
    return line.slice(start, end).trim();
  });
}

export function parseTextQuestions(raw: string): QuestionDraft[] {
  // 先把 ![图](data:...) 这种 markdown 图片转成 <img>，题干里就能直接显示
  const text = raw
    .replace(/^\uFEFF/, '')
    .replace(/\r\n?/g, '\n')
    .replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g, (_all, src: string) => `<img src="${src}" alt="题图">`);
  const lines = text.split('\n');
  const drafts: QuestionDraft[] = [];

  let q = '';
  let opts: string[] = [];
  let answerRaw = '';
  let chapter = '';
  let subject = '';

  const flush = () => {
    const question = q.trim();
    if (!question) {
      q = '';
      opts = [];
      answerRaw = '';
      return;
    }
    // 文档标题、章节名之类：既没选项也没答案、字数又短，丢弃
    if (!opts.length && !answerRaw.trim() && question.length <= 24) {
      q = '';
      opts = [];
      answerRaw = '';
      return;
    }
    const cleaned = opts.map((o) => o.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/, '').trim());
    const a = cleaned.length ? answerFrom(answerRaw, cleaned) : answerRaw.trim();
    drafts.push({ q: question, opts: cleaned, a, chapter, subject: subject || '默认题库' });
    q = '';
    opts = [];
    answerRaw = '';
    chapter = '';
    subject = '';
  };

  for (const line of lines) {
    if (!line.trim()) continue;

    // 图片单独一行：永远算题干的一部分，别被当成选项续行
    if (/^\s*<img\b/i.test(line)) {
      q = `${q}${q ? '\n' : ''}${line.trim()}`;
      continue;
    }

    const head = QUESTION_HEAD_RE.exec(line);
    const opt = OPTION_RE.exec(line);
    const ans = ANSWER_RE.exec(line);
    const meta = META_RE.exec(line);

    if (head && !opt) {
      flush();
      const inline = splitInlineOptions(head[2]);
      if (inline.length >= 2) {
        q = head[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim();
        opts = inline;
      } else {
        q = head[2].trim();
      }
      continue;
    }
    if (opt && q) {
      opts.push(opt[2].trim());
      continue;
    }
    if (ans && (q || opts.length)) {
      answerRaw = ans[1].trim();
      continue;
    }
    if (meta) {
      const key = meta[0].trim();
      const val = meta[1].trim();
      if (/章节|知识点/.test(key)) chapter = val;
      else if (/科目|题库|分类/.test(key)) subject = val;
      continue;
    }
    if (!q) {
      q = line.replace(/^\s*(?:题目|题干)\s*[:：]\s*/, '').trim();
    } else if (opts.length) {
      // 选项续行
      opts[opts.length - 1] = `${opts[opts.length - 1]} ${line.trim()}`.trim();
    } else {
      q = `${q} ${line.trim()}`.trim();
    }
  }
  flush();
  return drafts.filter((d) => d.q.length > 1);
}

export function parseAnyQuestions(raw: string): QuestionDraft[] {
  const text = raw.trim();
  if (!text) return [];
  if (/^[[{]/.test(text) || /```(?:json)?/i.test(text) || /"(q|question|题目)"\s*:/.test(text)) {
    const json = parseJsonQuestions(text);
    if (json.length) return json;
  }
  return parseTextQuestions(text);
}

/* ------------------------------- PDF ------------------------------- */

/** FlateDecode 通常是 zlib 包装，个别 PDF 用裸 deflate，两种都试 */
function inflatePdf(data: Uint8Array): Uint8Array | null {
  for (const fn of [unzlibSync, inflateSync]) {
    try {
      return fn(data);
    } catch {
      /* 换下一种 */
    }
  }
  return null;
}

/** PDF 文本串转义：\n \r \t \b \f \( \) \\ 与八进制 \ooo */
function decodePdfString(s: string): string {
  return s.replace(/\\(?:([nrtbf()\\])|([0-7]{1,3}))/g, (_all, esc: string | undefined, oct: string | undefined) => {
    if (esc) {
      const map: Record<string, string> = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', '(': '(', ')': ')', '\\': '\\' };
      return map[esc] ?? '';
    }
    return String.fromCharCode(parseInt(oct ?? '0', 8));
  });
}

function hexToText(hex: string): string {
  const cleanHex = hex.replace(/\s+/g, '');
  if (cleanHex.length % 2 || !/^[0-9A-Fa-f]+$/.test(cleanHex)) return '';
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(cleanHex.slice(i * 2, i * 2 + 2), 16);
  try {
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return '';
  }
}

function bytesToLatin(u8: Uint8Array): string {
  let s = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < u8.length; i += CHUNK) s += String.fromCharCode(...u8.subarray(i, i + CHUNK));
  return s;
}

/**
 * 轻量 PDF 文本抽取：只处理内容流里的 (文本) Tj / [..] TJ / ' 与 " 换行操作符。
 * 不支持 Type3 字体与 CMap，扫不出字会抛错让用户走截图/Word 路线。
 */
export function pdfToText(buffer: ArrayBuffer): string {
  const src = new Uint8Array(buffer);
  const latin = bytesToLatin(src);
  const chunks: string[] = [];

  const streamRe = /stream\r?\n([\s\S]*?)endstream/g;
  let m: RegExpExecArray | null;
  while ((m = streamRe.exec(latin))) {
    const dictStart = latin.lastIndexOf('<<', m.index);
    const dict = dictStart >= 0 ? latin.slice(dictStart, m.index) : '';
    const nl = m[0].indexOf('\n');
    const bodyStart = m.index + (nl >= 0 ? nl + 1 : 'stream'.length);
    const bodyEnd = m.index + m[0].length - 'endstream'.length;
    // zlib 解压对尾部垃圾敏感，去掉 stream 与 endstream 之间的换行/空白
    let end = bodyEnd;
    while (end > bodyStart && (src[end - 1] === 0x0a || src[end - 1] === 0x0d || src[end - 1] === 0x20 || src[end - 1] === 0x09)) end--;
    const raw = src.subarray(bodyStart, end);
    if (/FlateDecode/.test(dict)) {
      const inflated = inflatePdf(raw);
      if (inflated) chunks.push(bytesToLatin(inflated));
    } else {
      chunks.push(bytesToLatin(raw));
    }
  }

  const content = chunks.join('\n');
  const lines: string[] = [];

  for (const tm of content.matchAll(/\(((?:\\.|[^()\\])*)\)\s*Tj|<([0-9A-Fa-f\s]+)>\s*Tj/g)) {
    const lit = tm[1] !== undefined ? decodePdfString(tm[1]) : hexToText(tm[2]);
    if (lit.trim()) lines.push(lit);
  }
  for (const tm of content.matchAll(/\[((?:\\.|[^\]])*)\]\s*TJ/g)) {
    let out = '';
    for (const part of tm[1].matchAll(/\(((?:\\.|[^()\\])*)\)|<([0-9A-Fa-f\s]+)>/g)) {
      out += part[1] !== undefined ? decodePdfString(part[1]) : hexToText(part[2]);
    }
    if (out.trim()) lines.push(out);
  }
  for (const tm of content.matchAll(/(?:^|[\r\n])\s*'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"/g)) {
    const lit = tm[1] !== undefined ? decodePdfString(tm[1]) : decodePdfString(tm[2]);
    if (lit.trim()) lines.push(lit);
  }

  const text = fixEncoding(lines.join('\n').replace(/[\r\n]{3,}/g, '\n\n').trim());
  if (!text) {
    throw new Error('这份 PDF 里没有可提取的文字（多半是扫描件），请截图让我识别，或转成 Word / 文本再导入');
  }
  return text;
}

/** 简单 PDF 里中文常以 UTF-8 字节存进 Latin-1 串，把它还原成正常中文 */
function fixEncoding(s: string): string {
  if (!/[\u0080-\u00ff]/.test(s)) return s;
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i) & 0xff;
  const decoded = new TextDecoder('utf-8').decode(bytes);
  return /[\u4e00-\u9fff]/.test(decoded) ? decoded : s;
}

/* ------------------------------- Word ------------------------------- */

export function docxToText(buffer: ArrayBuffer): string {
  const files = unzipSync(new Uint8Array(buffer));
  const xml = files['word/document.xml'];
  if (!xml) throw new Error('这个 docx 里没有正文，另存为 .docx 再试一次');

  // Word 把图片放在 word/media/*，正文里用 r:embed="rIdN" 引用，
  // rId → 文件名的映射在 word/_rels/document.xml.rels 里。
  const relsXml = files['word/_rels/document.xml.rels'];
  const relMap = new Map<string, string>();
  if (relsXml) {
    const rels = strFromU8(relsXml);
    for (const m of rels.matchAll(/<Relationship\b[^>]*>/g)) {
      const tag = m[0];
      const id = /\bId="([^"]+)"/.exec(tag)?.[1];
      const target = /\bTarget="([^"]+)"/.exec(tag)?.[1];
      const type = /\bType="([^"]+)"/.exec(tag)?.[1] ?? '';
      if (!id || !target) continue;
      if (!/image/i.test(type)) continue;
      const path = target.startsWith('/') ? target.slice(1) : `word/${target.replace(/^\.\//, '')}`;
      const bytes = files[path];
      if (!bytes) continue;
      relMap.set(id, `data:${mimeOf(path)};base64,${bytesToBase64(bytes)}`);
    }
  }

  // 先把「含图片的段落」里的 r:embed 换成占位标记，再逐段抽文字
  const withMarkers = strFromU8(xml).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g, (_all, rid: string) => {
    const data = relMap.get(rid);
    return data ? `[[IMG:${data}]]` : '';
  });

  const text = withMarkers
    .replace(/<w:tab\b[^>]*\/>/g, '\t')
    .replace(/<w:br\b[^>]*\/>/g, '\n')
    .replace(/<\/w:p>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  return text
    .replace(/\[\[IMG:([^\]]+)\]\]/g, (_all, data: string) => `\n![docx 图片](${data})\n`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function mimeOf(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() ?? '';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'bmp') return 'image/bmp';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'svg') return 'image/svg+xml';
  return 'image/png';
}

function bytesToBase64(bytes: Uint8Array): string {
  let bin = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

/* ------------------------------ 文件读取 ------------------------------ */

export function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file, 'utf-8');
  });
}

export function readAsBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsArrayBuffer(file);
  });
}

export function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('图片读取失败'));
    reader.readAsDataURL(file);
  });
}

export { guessKindOfQuestion };
