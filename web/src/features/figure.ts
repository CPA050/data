/**
 * 让 AI 出题能"配图"：不让模型生成图片（没有画图模型、也不稳），
 * 而是让它输出一个结构化的 figure 描述，我们本地用 SVG 画出来。
 * 只支持几类工程上最常见的示意图，画不准的宁可不画。
 */

export type FigureKind = 'beam' | 'section' | 'flow';

export interface FigureSpec {
  kind: FigureKind;
  caption?: string;
  /** beam：跨度 m；section：宽/高 mm；flow：工序列表 */
  span?: number;
  load?: 'uniform' | 'point';
  value?: number;
  width?: number;
  height?: number;
  steps?: { name: string; start: number; duration: number }[];
}

const INK = '#0a0c0f';
const SOFT = '#8b9099';
const PAPER = '#ffffff';
const ACCENT = '#1440ff';

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function shell(w: number, h: number, body: string, caption?: string): string {
  const cap = caption
    ? `<text x="${w / 2}" y="${h - 12}" text-anchor="middle" font-size="12.5" fill="${SOFT}" stroke="none">${esc(caption)}</text>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  <rect width="${w}" height="${h}" fill="${PAPER}"/>
  <g stroke="${INK}" stroke-width="1.6" stroke-linecap="square" color="${INK}" font-family="system-ui,-apple-system,'Segoe UI',sans-serif">
  ${body}
  ${cap}
  </g>
</svg>`;
}

function beamFigure(spec: FigureSpec): string {
  const w = 360;
  const h = spec.caption ? 210 : 186;
  const span = Number(spec.span) > 0 ? Number(spec.span) : 6;
  const value = Number(spec.value) > 0 ? Number(spec.value) : 20;
  const x1 = 44;
  const x2 = w - 44;
  const y = 96;
  const mid = (x1 + x2) / 2;
  const unit = spec.load === 'point' ? 'kN' : 'kN/m';
  const label = spec.load === 'point' ? `P = ${value} ${unit}` : `q = ${value} ${unit}`;

  const arrows: string[] = [];
  if (spec.load === 'point') {
    arrows.push(
      `<path d="M${mid} 44 V${y - 6}"/><path d="M${mid - 5} ${y - 14} L${mid} ${y - 4} L${mid + 5} ${y - 14}"/>`,
    );
  } else {
    for (let i = 0; i <= 8; i += 1) {
      const x = x1 + ((x2 - x1) * i) / 8;
      arrows.push(`<path d="M${x} 56 V${y - 10}"/><path d="M${x - 4} ${y - 18} L${x} ${y - 9} L${x + 4} ${y - 18}"/>`);
    }
    arrows.push(`<path d="M${x1} 56 H${x2}"/>`);
  }

  return shell(
    w,
    h,
    `${arrows.join('')}
  <path d="M${x1} ${y} H${x2}"/>
  <path d="M${x1} ${y} l-9 15 h18 z"/>
  <path d="M${x2} ${y} l-9 15 h18 z">
  </path>
  <path d="M${x1} ${y + 15} H${x2}" stroke="${SOFT}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${mid}" y="46" text-anchor="middle" font-size="12" fill="${ACCENT}" stroke="none">${esc(label)}</text>
  <text x="${mid}" y="${y + 34}" text-anchor="middle" font-size="12" fill="${SOFT}" stroke="none">L = ${span} m</text>`,
    spec.caption,
  );
}

function sectionFigure(spec: FigureSpec): string {
  const w = 300;
  const h = spec.caption ? 220 : 196;
  const bw = Number(spec.width) > 0 ? Number(spec.width) : 300;
  const bh = Number(spec.height) > 0 ? Number(spec.height) : 500;
  const boxW = 132;
  const boxH = 92;
  const x = (w - boxW) / 2;
  const y = 62;

  return shell(
    w,
    h,
    `<text x="${w / 2}" y="40" text-anchor="middle" font-size="12" fill="${ACCENT}" stroke="none">截面示意图（单位 mm）</text>
  <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}"/>
  <path d="M${x - 12} ${y} H${x - 12} V${y + boxH} H${x - 12}" stroke="${SOFT}" stroke-width="1"/>
  <text x="${x - 18}" y="${y + boxH / 2}" text-anchor="middle" font-size="11" fill="${SOFT}" stroke="none" transform="rotate(-90 ${x - 18} ${y + boxH / 2})">h = ${bh}</text>
  <text x="${w / 2}" y="${y + boxH + 22}" text-anchor="middle" font-size="11" fill="${SOFT}" stroke="none">b = ${bw}</text>`,
    spec.caption,
  );
}

function flowFigure(spec: FigureSpec): string {
  const steps = (spec.steps ?? []).filter((s) => s && s.name).slice(0, 6);
  const w = 360;
  const rows = Math.max(1, steps.length);
  const h = 74 + rows * 30 + (spec.caption ? 22 : 6);
  const maxEnd = Math.max(1, ...steps.map((s) => Number(s.start) + Number(s.duration)));
  const left = 92;
  const right = w - 24;
  const scale = (right - left) / maxEnd;

  const body = steps
    .map((s, i) => {
      const y = 62 + i * 30;
      const bx = left + Number(s.start) * scale;
      const bw = Math.max(6, Number(s.duration) * scale);
      return `<text x="${left - 10}" y="${y + 11}" text-anchor="end" font-size="11" fill="${INK}" stroke="none">${esc(s.name)}</text>
  <rect x="${bx}" y="${y}" width="${bw}" height="14" fill="${ACCENT}" opacity="0.12" stroke="${ACCENT}" stroke-width="1"/>
  <text x="${bx + bw / 2}" y="${y + 11}" text-anchor="middle" font-size="10" fill="${ACCENT}" stroke="none">${s.duration}</text>`;
    })
    .join('\n  ');

  return shell(
    w,
    h,
    `<text x="${left}" y="38" font-size="11" fill="${SOFT}" stroke="none">施工进度（天）→</text>
  <path d="M${left} 48 H${right}" stroke="${SOFT}" stroke-width="1"/>
  ${body}`,
    spec.caption,
  );
}

/** 把 spec 画成 data URL；kind 不认识或参数缺失时返回空字符串 */
export function figureDataUrl(spec: FigureSpec | undefined | null): string {
  if (!spec || !spec.kind) return '';
  let svg = '';
  if (spec.kind === 'beam') svg = beamFigure(spec);
  else if (spec.kind === 'section') svg = sectionFigure(spec);
  else if (spec.kind === 'flow') svg = flowFigure(spec);
  if (!svg) return '';
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** 从 AI 返回的对象里读出 figure，字段名宽容一点 */
export function readFigure(raw: unknown): FigureSpec | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  const kind = String(obj.kind ?? obj.type ?? '').toLowerCase();
  if (kind !== 'beam' && kind !== 'section' && kind !== 'flow') return null;
  const num = (v: unknown): number | undefined => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : undefined;
  };
  const load = String(obj.load ?? '').toLowerCase();
  const steps = Array.isArray(obj.steps)
    ? (obj.steps as Record<string, unknown>[])
        .map((s) => ({
          name: String(s.name ?? s.title ?? ''),
          start: Number(s.start ?? 0),
          duration: Number(s.duration ?? 0),
        }))
        .filter((s) => s.duration > 0)
    : undefined;

  return {
    kind,
    caption: typeof obj.caption === 'string' ? obj.caption.slice(0, 40) : undefined,
    span: num(obj.span),
    load: load === 'point' ? 'point' : load === 'uniform' ? 'uniform' : undefined,
    value: num(obj.value),
    width: num(obj.width),
    height: num(obj.height),
    steps,
  };
}
