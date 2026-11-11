// functions/_lib/db.js —— 数据库字段的读写规范化
// 历史数据里 a 字段有三种形态：
//   1) 合法 JSON：'0' / '[0,1,2]' / '"文本答案"'
//   2) 被写坏的裸文本：'1. 低水化热水泥...'（questions-update.js 没 stringify 造成的）
//   3) 空值 null / ''
// 读的时候全部兜底，避免一处脏数据把整个 /api/questions 打成 500。

export function parseLoose(raw, fallback) {
  if (raw === null || raw === undefined || raw === '') return fallback;
  if (typeof raw !== 'string') return raw;
  try { return JSON.parse(raw); } catch { return raw; }
}

export function normalizeOpts(raw) {
  const v = parseLoose(raw, []);
  return Array.isArray(v) ? v : [];
}

export function normalizeAnswer(raw) {
  const v = parseLoose(raw, '');
  if (typeof v === 'number' || typeof v === 'string' || Array.isArray(v)) return v;
  return String(raw ?? '');
}

export function normalizeRow(row) {
  if (!row) return row;
  return { ...row, opts: normalizeOpts(row.opts), a: normalizeAnswer(row.a) };
}

// 写库统一 JSON.stringify；undefined 会被 D1 拒绝，先兜底成 ''
export function toDbOpts(opts) { return JSON.stringify(Array.isArray(opts) ? opts : []); }
export function toDbAnswer(a) { return JSON.stringify(a === undefined || a === null ? '' : a); }
export function toDbChoice(c) {
  if (c === undefined || c === null || c === '') return '';
  return JSON.stringify(c);
}

// 把选项下标/数组/文本统一转成可读字符串，用于"你的选择/正确答案"展示
export function formatChoice(value, opts = []) {
  if (value === null || value === undefined || value === '') return '';
  const v = parseLoose(value, value);
  if (Array.isArray(v)) return v.map(i => opts[i] ?? String(i)).join('、');
  if (typeof v === 'number') return opts[v] ?? String(v);
  return String(v);
}
