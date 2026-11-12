import type { Answer, Question } from './types';

export type QuestionType = 'single' | 'multi' | 'judge' | 'blank' | 'essay' | 'calc';

export const TYPE_LABEL: Record<QuestionType, string> = {
  single: '单选',
  multi: '多选',
  judge: '判断',
  blank: '填空',
  essay: '简答',
  calc: '计算',
};

export const TYPE_OPTIONS: { value: '' | QuestionType; label: string }[] = [
  { value: '', label: '自动识别' },
  { value: 'single', label: '单项选择' },
  { value: 'multi', label: '多项选择' },
  { value: 'judge', label: '判断题' },
  { value: 'blank', label: '填空题' },
  { value: 'essay', label: '简答题' },
  { value: 'calc', label: '计算题' },
];

const KNOWN: QuestionType[] = ['single', 'multi', 'judge', 'blank', 'essay', 'calc'];

/** 题型识别：作者标注优先，其次看选项数量 + 答案形态 + 题干里的填空标记 */
export function detectType(
  q: Pick<Question, 'q' | 'opts'> & { a: Answer; type?: string },
): QuestionType {
  const declared = (q.type ?? '') as QuestionType;
  if (declared && KNOWN.includes(declared)) return declared;

  const opts = q.opts ?? [];
  const text = String(q.q ?? '');

  if (!opts.length) {
    // 没有选项：题干里带"计算/求/解"多半是计算题；有下划线/括号占位是填空；否则简答
    if (/(计算|求|试算|解：|画出|绘制)/.test(text)) return 'calc';
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

/** 主观题（需要文字作答） */
export function isTextAnswer(type: QuestionType): boolean {
  return type === 'essay' || type === 'calc' || type === 'blank';
}

/** 一行说明，给表格与卡片用 */
export function typeHint(type: QuestionType, a: Answer): string {
  if (type === 'multi' && Array.isArray(a)) return `多选 · ${a.length} 个答案`;
  return TYPE_LABEL[type];
}
