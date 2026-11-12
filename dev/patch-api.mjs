import fs from 'node:fs';

const p = 'web/src/core/api.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 引入离线队列
s = s.replace(
  /^import /m,
  `import { enqueue } from './offline';\nimport `,
);

// 2) 在 api 导出前插入离线写操作助手
s = s.replace(
  'export const api = {',
  `/**
 * 写操作：断网（fetch 抛错，status=0）时进本地队列，联网后自动补传。
 * 返回形状与在线一致，调用方不必区分。
 */
async function mutate<T extends { ok?: boolean }>(path: string, body: unknown, label: string): Promise<T> {
  try {
    return await post<T>(path, body);
  } catch (error) {
    if (error instanceof ApiError && error.status === 0) {
      enqueue(path, body, label);
      return { ok: true, queued: true, offline: true } as unknown as T;
    }
    throw error;
  }
}

export const api = {`,
);

// 3) 写操作改用 mutate
s = s.replace(
  "    add: (questions: QuestionDraft[]) =>\n      post<{ ok: boolean; added: number }>('/api/questions-add', { user_id: getUser(), questions }),",
  "    add: (questions: QuestionDraft[]) =>\n      mutate<{ ok: boolean; added: number }>('/api/questions-add', { user_id: getUser(), questions }, `导入 ${questions.length} 道题`),",
);
s = s.replace(
  "    update: (id: number, draft: QuestionDraft) =>\n      post<{ ok: boolean }>('/api/questions-update', { id, user_id: getUser(), ...draft }),",
  "    update: (id: number, draft: QuestionDraft) =>\n      mutate<{ ok: boolean }>('/api/questions-update', { id, user_id: getUser(), ...draft }, '保存题目'),",
);
s = s.replace(
  "    remove: (ids: number[]) =>\n      post<{ ok: boolean; deleted: number }>('/api/questions-delete', { ids, user_id: getUser() }),",
  "    remove: (ids: number[]) =>\n      mutate<{ ok: boolean; deleted: number }>('/api/questions-delete', { ids, user_id: getUser() }, `删除 ${ids.length} 道题`),",
);

s = s.replace(
  "    add: (item: { q: string; opts: string[]; a: Answer; chapter?: string; subject?: string; user_choice?: number[] | string }) =>\n      post<{ ok: boolean }>('/api/wrong-add', {",
  "    add: (item: { q: string; opts: string[]; a: Answer; chapter?: string; subject?: string; user_choice?: number[] | string }) =>\n      mutate<{ ok: boolean }>('/api/wrong-add', {",
);
s = s.replace(
  "        user_choice: item.user_choice ?? '',\n      }),",
  "        user_choice: item.user_choice ?? '',\n      }, '记录错题'),",
);
s = s.replace(
  "    remove: (ids: number[]) =>\n      post<{ ok: boolean; deleted: number }>('/api/wrong-delete', { ids, user_id: getUser() }),",
  "    remove: (ids: number[]) =>\n      mutate<{ ok: boolean; deleted: number }>('/api/wrong-delete', { ids, user_id: getUser() }, '移除错题'),",
);
s = s.replace(
  "    add: (questionId: number) =>\n      post<{ ok: boolean }>('/api/favorites-add', { user_id: getUser(), question_id: questionId }),",
  "    add: (questionId: number) =>\n      mutate<{ ok: boolean }>('/api/favorites-add', { user_id: getUser(), question_id: questionId }, '收藏题目'),",
);
s = s.replace(
  "    remove: (questionId: number) =>\n      post<{ ok: boolean }>('/api/favorites-remove', { user_id: getUser(), question_id: questionId }),",
  "    remove: (questionId: number) =>\n      mutate<{ ok: boolean }>('/api/favorites-remove', { user_id: getUser(), question_id: questionId }, '取消收藏'),",
);

fs.writeFileSync(p, s, 'utf8');
const count = (s.match(/mutate</g) || []).length;
console.log('api.ts patched, mutate calls =', count);
