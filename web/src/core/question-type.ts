import type { Answer, Question } from './types';

export type QuestionType = 'single' | 'multi' | 'judge' | 'blank' | 'essay';

export const TYPE_LABEL: Record<QuestionType, string> = {
  single: '单选',
  multi: '多选',
  judge: '判断',
  blank: '填空',
  essay: '简答',
};

/** 题型识别：选项数量 + 答案形态 + 题干里的填空标记 */
export function detectType(q: Pick<Question, 'q' | 'opts'> & { a: Answer }): QuestionType {
  const opts = q.opts ?? [];
  const text = String(q.q ?? '');

  if (!opts.length) {
    // 没有选项：有下划线/括号占位就是填空，否则简答
    return /_{2,}|（\s*）|\(\s*\)|【\s*】/.test(text) ? 'blank' : 'essay';
  }

  if (opts.length === 2) {
    const joined = opts.map((o) => o.replace(/^[A-Za-z][.、)）]\s*/, '').trim()).join('|');
    if (/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(joined) || /正确\|错误|对\|错/.test(joined)) {
      return 'judge';
    }
  }

  return Array.isArray(q.a) ? 'multi' : 'single';
}

/** 一行说明，给表格与卡片用 */
export function typeHint(type: QuestionType, a: Answer): string {
  if (type === 'multi' && Array.isArray(a)) return `多选 · ${a.length} 个答案`;
  return TYPE_LABEL[type];
}
