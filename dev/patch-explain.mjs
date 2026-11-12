import fs from 'node:fs';

// ---------- types ----------
const tp = 'web/src/core/types.ts';
let t = fs.readFileSync(tp, 'utf8');
t = t.replace(
  `export interface Question {
  id: number;
  q: string;
  opts: string[];
  a: Answer;
  chapter: string;
  subject: string;
  created_at?: string;
}`,
  `export interface Question {
  id: number;
  q: string;
  opts: string[];
  a: Answer;
  chapter: string;
  subject: string;
  /** 解析：为什么选它 / 其它选项错在哪 */
  explain?: string;
  /** 乐观锁版本号（服务端写入时间），多端编辑冲突检测用 */
  updated_at?: string;
  created_at?: string;
}`,
);
t = t.replace(
  `export interface QuestionDraft {
  q: string;
  opts?: string[];
  a?: Answer;
  chapter?: string;
  subject?: string;
}`,
  `export interface QuestionDraft {
  q: string;
  opts?: string[];
  a?: Answer;
  chapter?: string;
  subject?: string;
  explain?: string;
}`,
);
fs.writeFileSync(tp, t, 'utf8');

// ---------- api ----------
const ap = 'web/src/core/api.ts';
let a = fs.readFileSync(ap, 'utf8');
a = a.replace(
  `    update: (id: number, draft: QuestionDraft) =>
      mutate<{ ok: boolean }>('/api/questions-update', { id, user_id: getUser(), ...draft }, '保存题目'),`,
  `    update: (id: number, draft: QuestionDraft, opts?: { baseUpdatedAt?: string; force?: boolean }) =>
      mutate<{ ok: boolean; conflict?: boolean }>(
        '/api/questions-update',
        {
          id,
          user_id: getUser(),
          ...draft,
          ...(opts?.baseUpdatedAt ? { base_updated_at: opts.baseUpdatedAt } : {}),
          ...(opts?.force ? { force: true } : {}),
        },
        '保存题目',
      ),`,
);
a = a.replace(
  `    classify: (prompt: string) => post<AiResult>('/api/ai', { action: 'classify', prompt }),`,
  `    classify: (prompt: string) => post<AiResult>('/api/ai', { action: 'classify', prompt }),
    generate: (prompt: string) => post<AiResult>('/api/ai', { action: 'generate', prompt }),`,
);
fs.writeFileSync(ap, a, 'utf8');

console.log('types + api patched');
