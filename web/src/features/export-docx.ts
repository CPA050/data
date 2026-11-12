import { zipSync, strToU8 } from 'fflate';
import type { Question } from '../core/types';
import { detectType, TYPE_LABEL } from '../core/question-type';
import { formatAnswer } from '../core/format';
import { notify } from '../ui/toast';

/**
 * 生成真正的 .docx（Word 2007+ 的 OOXML 包）。
 *
 * 为什么手写而不是引入 docx 库：一个 docx 本质就是个 zip，
 * 我们已经有 fflate（读 docx 时装的），复用它能省掉 ~200KB 依赖。
 * 这里只写最必要的四五个部件，Word / WPS / 石墨都能正常打开。
 */

const EMU_PER_INCH = 914400;
/** A4 宽度减去左右页边距后，正文可用宽度约 6.5 英寸 */
const MAX_IMG_W = 6.4 * EMU_PER_INCH;
const MAX_IMG_H = 4.2 * EMU_PER_INCH;

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

interface RunOpts {
  bold?: boolean;
  italic?: boolean;
  /** 半磅值：21 = 10.5pt */
  size?: number;
  color?: string;
}

function run(text: string, opts: RunOpts = {}): string {
  const props = [
    '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',
    opts.bold ? '<w:b/>' : '',
    opts.italic ? '<w:i/>' : '',
    `<w:sz w:val="${opts.size ?? 21}"/><w:szCs w:val="${opts.size ?? 21}"/>`,
    opts.color ? `<w:color w:val="${opts.color}"/>` : '',
  ].join('');
  return `<w:r><w:rPr>${props}</w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
}

interface ParaOpts extends RunOpts {
  /** 段前/段后，单位 twip（1/20 pt） */
  before?: number;
  after?: number;
  indent?: number;
  /** 悬挂缩进，用于「A. 选项」这种 */
  hanging?: number;
}

function para(text: string, opts: ParaOpts = {}): string {
  const spacing =
    opts.before || opts.after
      ? `<w:spacing w:before="${opts.before ?? 0}" w:after="${opts.after ?? 0}"/>`
      : '';
  const ind =
    opts.indent || opts.hanging
      ? `<w:ind w:left="${opts.indent ?? 0}" w:hanging="${opts.hanging ?? 0}"/>`
      : '';
  return `<w:p><w:pPr>${spacing}${ind}</w:pPr>${text ? run(text, opts) : ''}</w:p>`;
}

function imageParagraph(relId: string, id: number, cx: number, cy: number): string {
  return (
    `<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing>` +
    `<wp:inline distT="0" distB="0" distL="0" distR="0">` +
    `<wp:extent cx="${Math.round(cx)}" cy="${Math.round(cy)}"/>` +
    `<wp:effectExtent l="0" t="0" r="0" b="0"/>` +
    `<wp:docPr id="${id}" name="Picture ${id}"/>` +
    `<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">` +
    `<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
    `<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
    `<pic:nvPicPr><pic:cNvPr id="${id}" name="image${id}.png"/><pic:cNvPicPr/></pic:nvPicPr>` +
    `<pic:blipFill><a:blip r:embed="${relId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>` +
    `<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(cx)}" cy="${Math.round(cy)}"/></a:xfrm>` +
    `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>` +
    `</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`
  );
}

interface PendingImage {
  relId: string;
  name: string;
  bytes: Uint8Array;
  cx: number;
  cy: number;
  id: number;
}

function loadImageSize(src: string): Promise<{ w: number; h: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth || 640, h: img.naturalHeight || 480 });
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function dataUrlToBytes(src: string): { bytes: Uint8Array; ext: string } | null {
  const m = /^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(src);
  if (!m) return null;
  try {
    const bin = atob(m[2]);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
    const ext = m[1].toLowerCase() === 'jpeg' ? 'jpeg' : m[1].toLowerCase();
    return { bytes, ext };
  } catch {
    return null;
  }
}

/** 把题干 HTML 拆成「文字段 / 图片段 / 换行」，公式取 MathML 的纯文本 */
function segmentsOf(html: string): Array<{ kind: 'text' | 'img' | 'br'; value: string }> {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const out: Array<{ kind: 'text' | 'img' | 'br'; value: string }> = [];
  const walk = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = node.textContent ?? '';
      if (t.trim()) out.push({ kind: 'text', value: t.replace(/\s+/g, ' ') });
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    if (el.tagName === 'IMG') {
      out.push({ kind: 'img', value: el.getAttribute('src') ?? '' });
      return;
    }
    if (el.tagName === 'BR') {
      out.push({ kind: 'br', value: '' });
      return;
    }
    el.childNodes.forEach(walk);
  };
  doc.body.firstElementChild?.childNodes.forEach(walk);
  return out;
}

export interface DocxOptions {
  title?: string;
  subtitle?: string;
  /** 是否附「参考答案」一页 */
  withAnswers?: boolean;
}

async function buildDocx(rows: Question[], options: DocxOptions): Promise<Blob> {
  const body: string[] = [];
  const images: PendingImage[] = [];
  let imgSeq = 0;

  body.push(
    para(options.title ?? '题库练习卷', { size: 32, bold: true, after: 80 }),
  );
  const meta = [options.subtitle ?? '', `${rows.length} 题`, '姓名 ________', '得分 ________']
    .filter(Boolean)
    .join('　　');
  body.push(para(meta, { size: 18, color: '666666', after: 200 }));

  for (let i = 0; i < rows.length; i += 1) {
    const q = rows[i];
    const type = detectType(q);
    const no = String(i + 1).padStart(2, '0');
    body.push(para(`${no}　${TYPE_LABEL[type]}${q.chapter ? '　·　' + q.chapter : ''}`, {
      size: 18,
      bold: true,
      color: '1440FF',
      before: 200,
      after: 60,
    }));

    // 题干：文字与图片混排
    const segs = segmentsOf(q.q);
    let buffer = '';
    const flush = (): void => {
      if (buffer.trim()) body.push(para(buffer.trim(), { after: 60 }));
      buffer = '';
    };
    for (const seg of segs) {
      if (seg.kind === 'text') {
        buffer += seg.value;
      } else if (seg.kind === 'br') {
        flush();
      } else {
        flush();
        const parsed = dataUrlToBytes(seg.value);
        if (!parsed) continue;
        const size = await loadImageSize(seg.value);
        const natural = size ?? { w: 640, h: 480 };
        let cx = natural.w * 9525; // 1px = 9525 EMU（96dpi）
        let cy = natural.h * 9525;
        const scale = Math.min(MAX_IMG_W / cx, MAX_IMG_H / cy, 1);
        cx *= scale;
        cy *= scale;
        imgSeq += 1;
        const relId = `rId${100 + imgSeq}`;
        const name = `image${imgSeq}.${parsed.ext}`;
        images.push({ relId, name, bytes: parsed.bytes, cx, cy, id: imgSeq });
        body.push(imageParagraph(relId, imgSeq, cx, cy));
      }
    }
    flush();

    if (Array.isArray(q.opts) && q.opts.length) {
      q.opts.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const text = String(opt).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/, '');
        body.push(para(`${letter}. ${text}`, { size: 20, hanging: 280, indent: 280, after: 20 }));
      });
    } else if (type === 'blank') {
      body.push(para('答：________________________________', { after: 40 }));
    } else if (type === 'essay') {
      for (let k = 0; k < 3; k += 1) body.push(para('　', { after: 60 }));
      body.push(para('（请在答题纸上作答）', { size: 18, color: '999999', after: 40 }));
    }
  }

  if (options.withAnswers !== false) {
    body.push(
      `<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${run('参考答案', { size: 28, bold: true })}</w:p>`,
    );
    rows.forEach((q, i) => {
      const no = String(i + 1).padStart(2, '0');
      body.push(
        para(`${no}　${formatAnswer(q.a, q.opts) || '（无）'}`, { size: 20, after: 40 }),
      );
    });
  }

  const documentXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ` +
    `xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ` +
    `xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">` +
    `<w:body>${body.join('')}` +
    `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>` +
    `<w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/>` +
    `</w:sectPr></w:body></w:document>`;

  const contentTypes =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Default Extension="png" ContentType="image/png"/>` +
    `<Default Extension="jpeg" ContentType="image/jpeg"/>` +
    `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
    `</Types>`;

  const rootRels =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>` +
    `</Relationships>`;

  const docRels =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    images
      .map(
        (im) =>
          `<Relationship Id="${im.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${im.name}"/>`,
      )
      .join('') +
    `</Relationships>`;

  const files: Record<string, Uint8Array> = {
    '[Content_Types].xml': strToU8(contentTypes),
    '_rels/.rels': strToU8(rootRels),
    'word/document.xml': strToU8(documentXml),
    'word/_rels/document.xml.rels': strToU8(docRels),
  };
  for (const im of images) files[`word/media/${im.name}`] = im.bytes;

  const zipped = zipSync(files, { level: 6 });
  return new Blob([zipped as BlobPart], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

export async function exportDocx(rows: Question[], options: DocxOptions = {}): Promise<void> {
  if (!rows.length) {
    notify.error('没有可导出的题目');
    return;
  }
  try {
    const blob = await buildDocx(rows, options);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `${(options.title ?? '题库试卷').replace(/[\\/:*?"<>|]/g, '-')}-${stamp}.docx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    notify.ok(`已导出 ${rows.length} 题的 Word 文档`);
  } catch (error) {
    notify.error(error instanceof Error ? `导出失败：${error.message}` : '导出失败');
  }
}
