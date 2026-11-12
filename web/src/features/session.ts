import { loadWrong, state } from '../core/app';
import { escapeHtml, shuffle } from '../core/format';
import { clearSession, getProgress, getSession, saveSession } from '../core/storage';
import { mountQuiz, unmountQuiz, type QuizOptions } from '../views/quiz';
import { openModal } from '../ui/modal';
import { notify } from '../ui/toast';
import type { Question, WrongItem } from '../core/types';

let overlay: HTMLElement | null = null;

export function quizActive(): boolean {
  return Boolean(overlay && document.body.contains(overlay));
}

export function startQuiz(options: QuizOptions): void {
  if (!options.questions.length) {
    notify.info('这里还没有题目');
    return;
  }
  closeQuiz();
  overlay = document.createElement('div');
  overlay.className = 'quiz';
  document.body.appendChild(overlay);
  document.body.classList.add('is-locked');
  mountQuiz(overlay, {
    ...options,
    onExit: () => {
      closeQuiz();
      options.onExit?.();
    },
  });
  saveSession({
    ids: options.questions.map((q) => q.id),
    idx: options.startIndex ?? 0,
    source: options.source,
    savedAt: Date.now(),
  });
}

export function closeQuiz(): void {
  if (!overlay) return;
  unmountQuiz();
  overlay.remove();
  overlay = null;
  document.body.classList.remove('is-locked');
}

/** 从题库开始练习 */
export async function practiceBank(mode: 'random' | 'sequential' | 'chapter' = 'random'): Promise<void> {
  const all = state.bank ?? [];
  if (!all.length) {
    notify.info('题库还是空的，先去添加题目吧');
    return;
  }

  const subject = await askSubject(all);
  if (subject === null) return;
  const bank = subject ? all.filter((q) => (q.subject?.trim() || '默认题库') === subject) : all;

  if (mode === 'chapter') {
    const picked = await askChapters(bank);
    if (!picked?.length) return;
    const pool = bank.filter((q) => picked.includes(q.chapter || '未分类'));
    const limit = await askCount(pool.length);
    if (limit === null) return;
    startQuiz({ questions: pool.slice(0, limit), source: 'chapter', title: '章节练习' });
    return;
  }

  const limit = await askCount(bank.length);
  if (limit === null) return;

  if (mode === 'sequential') {
    const start = Math.min(getProgress(), Math.max(bank.length - 1, 0));
    startQuiz({
      questions: bank.slice(0, limit),
      source: 'sequential',
      title: '顺序练习',
      startIndex: start < limit ? start : 0,
    });
    return;
  }

  startQuiz({ questions: shuffle(bank).slice(0, limit), source: 'all', title: '随机练习' });
}

/** 乱序练习：整库打乱，直接开始，不再弹数量选择 */
export async function practiceShuffle(): Promise<void> {
  const all = state.bank ?? [];
  if (!all.length) {
    notify.info('题库还是空的，先去添加题目吧');
    return;
  }
  const subject = await askSubject(all);
  if (subject === null) return;
  const bank = subject ? all.filter((q) => (q.subject?.trim() || '默认题库') === subject) : all;
  startQuiz({
    questions: shuffle(bank),
    source: 'all',
    title: `乱序练习 · ${bank.length} 题${subject ? ` · ${subject}` : ''}`,
  });
}

/** 错题重练 */
export async function practiceWrong(): Promise<void> {
  const items = state.wrong ?? (await loadWrong(true));
  if (!items.length) {
    notify.info('错题本是空的，先去刷几题吧');
    return;
  }
  const limit = await askCount(items.length);
  if (limit === null) return;
  const questions: Question[] = items.slice(0, limit).map((w: WrongItem) => ({
    id: w.id,
    q: w.q,
    opts: w.opts,
    a: w.a,
    chapter: w.chapter,
    subject: w.subject,
  }));
  startQuiz({ questions, source: 'wrong', title: '错题重练' });
}

/** 收藏练习 */
export function practiceFavorites(questions: Question[]): void {
  if (!questions.length) {
    notify.info('还没有收藏题目');
    return;
  }
  void askCount(questions.length).then((limit) => {
    if (limit === null) return;
    startQuiz({ questions: shuffle(questions).slice(0, limit), source: 'fav', title: '收藏练习' });
  });
}

/** 继续上次：按保存的题号还原，题目被删掉的部分自动跳过 */
export function resumeSession(): boolean {
  const ctx = getSession();
  const bank = state.bank ?? [];
  if (!ctx || !bank.length) {
    notify.info('没有可以继续的练习');
    return false;
  }
  const byId = new Map(bank.map((q) => [q.id, q]));
  const questions = ctx.ids.map((id) => byId.get(id)).filter((q): q is Question => Boolean(q));
  if (!questions.length) {
    clearSession();
    notify.info('上次的题目已经不在了');
    return false;
  }
  startQuiz({
    questions,
    source: ctx.source === 'wrong' || ctx.source === 'fav' ? ctx.source : 'sequential',
    title: '继续上次练习',
    startIndex: Math.min(ctx.idx, questions.length - 1),
  });
  return true;
}

export function askCount(total: number): Promise<number | null> {
  const options = [10, 20, 30].filter((n) => n < total);
  if (!options.length) return Promise.resolve(total);
  const body = document.createElement('div');
  body.innerHTML = `
    <div class="segmented" data-role="count">
      ${options.map((n) => `<button type="button" data-n="${n}">${n} 题</button>`).join('')}
      <button type="button" data-n="${total}" aria-pressed="true">全部 ${total}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${total} 道可用题目</p>`;
  const group = body.querySelector<HTMLElement>('[data-role="count"]')!;
  group.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest<HTMLElement>('button[data-n]');
    if (!btn) return;
    group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
  });

  return openModal<number>({
    title: '练多少题',
    body,
    actions: [
      { label: '取消', value: -1 },
      { label: '开始', value: -2, variant: 'primary' },
    ],
  }).then((value) => {
    if (value === null || value === -1) return null;
    const active = group.querySelector<HTMLElement>('button[aria-pressed="true"]');
    return Number(active?.dataset.n ?? total);
  });
}

export async function askChapters(bank: Question[]): Promise<string[] | null> {
  const counts = new Map<string, number>();
  bank.forEach((q) => {
    const chapter = q.chapter?.trim() || '未分类';
    counts.set(chapter, (counts.get(chapter) ?? 0) + 1);
  });
  const chapters = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  if (!chapters.length) return null;
  const body = document.createElement('div');
  body.innerHTML = `<div class="list">${chapters
    .map(
      ([name, count], i) => `
      <button class="item" data-chapter="${escapeHtml(name)}" data-checked="${i === 0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${escapeHtml(name)}</span><span class="tag">${count} 题</span></div>
      </button>`,
    )
    .join('')}</div>`;
  body.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest<HTMLElement>('[data-chapter]');
    if (!btn) return;
    btn.dataset.checked = btn.dataset.checked === 'true' ? 'false' : 'true';
  });
  const ok = await openModal<boolean>({
    title: '选择章节',
    body,
    actions: [
      { label: '取消', value: false },
      { label: '开始', value: true, variant: 'primary' },
    ],
  });
  if (!ok) return null;
  const picked = Array.from(body.querySelectorAll<HTMLElement>('[data-chapter]'))
    .filter((el) => el.dataset.checked === 'true')
    .map((el) => el.dataset.chapter ?? '');
  return picked.length ? picked : null;
}

/** 选科目：题库里不止一个科目时先问一句，避免"一练就是全部" */
export async function askSubject(bank: Question[]): Promise<string | null> {
  const counts = new Map<string, number>();
  bank.forEach((q) => {
    const subject = q.subject?.trim() || '默认题库';
    counts.set(subject, (counts.get(subject) ?? 0) + 1);
  });
  const list = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  if (list.length < 2) return '';

  const body = document.createElement('div');
  body.innerHTML = `
    <div class="chip-row" data-role="subject">
      <button type="button" class="chip is-on" data-sub="" aria-pressed="true">全部 · ${bank.length}</button>
      ${list
        .map(
          ([name, count]) =>
            `<button type="button" class="chip" data-sub="${escapeHtml(name)}" aria-pressed="false">${escapeHtml(name)} · ${count}</button>`,
        )
        .join('')}
    </div>
    <p class="muted small" style="margin:12px 0 0">选科目后只会练这个科目下的题</p>`;
  const row = body.querySelector<HTMLElement>('[data-role="subject"]')!;
  row.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest<HTMLElement>('button[data-sub]');
    if (!btn) return;
    row.querySelectorAll('button').forEach((b) => {
      b.classList.remove('is-on');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('is-on');
    btn.setAttribute('aria-pressed', 'true');
  });

  const ok = await openModal<boolean>({
    title: '练哪个科目',
    body,
    actions: [
      { label: '取消', value: false },
      { label: '开始', value: true, variant: 'primary' },
    ],
  });
  if (!ok) return null;
  const active = row.querySelector<HTMLElement>('button.is-on');
  return active?.dataset.sub ?? '';
}

export function clearCurrentSession(): void {
  clearSession();
}
