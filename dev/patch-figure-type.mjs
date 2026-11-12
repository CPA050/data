import fs from 'node:fs';

// types: QuestionDraft 增加 figure（AI 出题用，落库前会被转成 <img>）
const tp = 'web/src/core/types.ts';
let t = fs.readFileSync(tp, 'utf8');
if (!t.includes('figure?: unknown')) {
  t = t.replace(
    `  subject?: string;
  explain?: string;
}`,
    `  subject?: string;
  explain?: string;
  /** AI 出题返回的结构化配图描述，落库前由 figure.ts 画成 <img> */
  figure?: unknown;
}`,
  );
  fs.writeFileSync(tp, t, 'utf8');
}

// import.ts: normalizeDraft 透传 figure
const ip = 'web/src/features/import.ts';
let s = fs.readFileSync(ip, 'utf8');
if (!s.includes('figure: raw.figure')) {
  s = s.replace(
    `  return {
    q,
    opts,
    a,`,
    `  return {
    q,
    opts,
    a,
    ...(raw.figure ? { figure: raw.figure } : {}),`,
  );
  fs.writeFileSync(ip, s, 'utf8');
}

console.log('figure passthrough');
