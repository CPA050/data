import fs from 'node:fs';

// types.ts：题目带题型标注
const p = 'web/src/core/types.ts';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  `  /** 乐观锁版本号（服务端写入时间），多端编辑冲突检测用 */
  updated_at?: string;`,
  `  /** 作者显式标注的题型（single/multi/judge/blank/essay/calc），空 = 自动识别 */
  type?: string;
  /** 乐观锁版本号（服务端写入时间），多端编辑冲突检测用 */
  updated_at?: string;`,
);
s = s.replace(
  `export interface QuestionDraft {
  q: string;`,
  `export interface QuestionDraft {
  q: string;
  type?: string;`,
);
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('types ok:', s.includes('type?: string;'));
