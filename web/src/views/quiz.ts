import { api, ApiError } from '../core/api';
import { isFavorite, toggleFavorite } from '../core/app';
import { countUp, sleep, vibrate } from '../core/dom';
import {
  choiceIndexes,
  escapeHtml,
  formatAnswer,
  isEssay,
  plainText,
  renderRich,
  sameAnswer,
} from '../core/format';
import { pushRecent, saveNote, getNotes, setProgress } from '../core/storage';
import { notify } from '../ui/toast';
import { confirm, openModal } from '../ui/modal';
import type { Question, QuizSource, RecordItem } from '../core/types';

export interface QuizOptions {
  questions: Question[];
  source: QuizSource;
  title: string;
  /** 顺序模式：本次从题目的哪个下标开始 */
  startIndex?: number;
  onExit?: () => void;
}

interface QuizRuntime {
  options: QuizOptions;
  idx: number;
  records: Map<number, RecordItem>;
  textDraft: string;
  busy: boolean;
  root: HTMLElement | null;
}

let runtime: QuizRuntime | null = null;
let escapeHandler: ((ev: KeyboardEvent) => void) | null = null;

function current(): Question | null {
  if (!runtime) return null;
  return runtime.options.questions[runtime.idx] ?? null;
}

function recordOf(q: Question): RecordItem {
  const rt = runtime!;
  let rec = rt.records.get(q.id);
  if (!rec) {
    rec = { id: q.id, picked: [], text: '', correct: null, submitted: false, time: Date.now() };
    rt.records.set(q.id, rec);
  }
  return rec;
}

function doneCount(): number {
  const rt = runtime!;
  return rt.options.questions.filter((q) => rt.records.get(q.id)?.submitted).length;
}

function correctCount(): number {
  const rt = runtime!;
  return rt.options.questions.filter((q) => rt.records.get(q.id)?.correct === true).length;
}

/* ---------------- 渲染 ---------------- */

function renderOptions(q: Question, rec: RecordItem): string {
  if (isEssay(q.a)) {
    return `
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${rec.submitted ? 'readonly' : ''}>${escapeHtml(rec.text)}</textarea>
      </div>`;
  }
  const answer = choiceIndexes(q.a);
  const multi = answer.length > 1;
  return `<div class="opts" data-multi="${multi}">${q.opts
    .map((opt, i) => {
      let st = '';
      if (rec.submitted) {
        if (answer.includes(i)) st = 'correct';
        else if (rec.picked.includes(i)) st = 'wrong';
        else st = 'muted';
      } else if (rec.picked.includes(i)) {
        st = 'picked';
      }
      return `<button class="opt" data-act="pick" data-idx="${i}" data-state="${st}" ${
        rec.submitted ? 'disabled' : ''
      }>
        <span class="opt-key">${String.fromCharCode(65 + i)}</span>
        <span class="opt-text">${renderRich(opt.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/, ''))}</span>
      </button>`;
    })
    .join('')}</div>`;
}

function renderAnswerPanel(q: Question, rec: RecordItem): string {
  if (!rec.submitted) return '';
  const answerText = isEssay(q.a) ? String(q.a) : formatAnswer(q.a, q.opts);
  const mine = isEssay(q.a)
    ? plainText(rec.text) || '（空）'
    : formatAnswer(rec.picked.length ? rec.picked : [], q.opts) || '（未选）';
  if (isEssay(q.a)) {
    return `<div class="answer-panel">
      <div class="ai-title">参考答案</div>${escapeHtml(answerText)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${escapeHtml(mine)}
    </div>`;
  }
  return `<div class="answer-panel">
    <div class="ai-title">${rec.correct ? '✅ 回答正确' : '❌ 回答错误'}</div>
    正确答案：${escapeHtml(formatAnswer(q.a, q.opts))}
    ${rec.correct ? '' : `<br>你的选择：${escapeHtml(mine)}`}
  </div>`;
}

function renderShell(): string {
  const rt = runtime!;
  const q = current();
  if (!q) return '';
  const rec = recordOf(q);
  const total = rt.options.questions.length;
  const progress = total ? Math.round(((rt.idx + (rec.submitted ? 1 : 0)) / total) * 100) : 0;
  const multi = choiceIndexes(q.a).length > 1 && !isEssay(q.a);

  return `
    <div class="quiz-top">
      <button class="icon-btn" data-act="exit" aria-label="退出练习">←</button>
      <div class="quiz-count">${rt.idx + 1}<em> / ${total}</em></div>
      <div class="header-spacer"></div>
      <button class="icon-btn" data-act="nav" aria-label="题目导航">▦</button>
    </div>
    <div class="quiz-progress"><i style="width:${progress}%"></i></div>
    <div class="quiz-body">
      <div class="q-card">
        <div class="q-head">
          ${q.subject ? `<span class="tag tag-accent">${escapeHtml(q.subject)}</span>` : ''}
          ${q.chapter ? `<span class="tag">${escapeHtml(q.chapter)}</span>` : ''}
          <span class="grow"></span>
          <span>${multi ? '多选' : isEssay(q.a) ? '简答' : '单选'}</span>
        </div>
        <div class="q-text">${renderRich(q.q)}</div>
        ${renderOptions(q, rec)}
        ${renderAnswerPanel(q, rec)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${isFavorite(q.id)}" aria-label="收藏">${isFavorite(q.id) ? '★' : '☆'}</button>
      <button class="fab" data-act="note" data-on="${Boolean(getNotes()[String(q.id)])}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${rt.idx === 0 ? 'disabled' : ''}>上一题</button>
      ${
        rec.submitted
          ? `<button class="btn btn-primary grow" data-act="next">${rt.idx === total - 1 ? '完成本次' : '下一题'}</button>`
          : `<button class="btn btn-primary grow" data-act="submit">${multi || isEssay(q.a) ? '提交答案' : '查看答案'}</button>`
      }
    </div>`;
}

export function mountQuiz(root: HTMLElement, options: QuizOptions): void {
  runtime = {
    options,
    idx: Math.min(Math.max(options.startIndex ?? 0, 0), Math.max(options.questions.length - 1, 0)),
    records: new Map(),
    textDraft: '',
    busy: false,
    root,
  };
  paint();
  escapeHandler = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape') void askExit();
  };
  document.addEventListener('keydown', escapeHandler);
  root.addEventListener('submit', (ev) => ev.preventDefault());
  root.addEventListener('input', onInput);
}

function paint(): void {
  const rt = runtime;
  if (!rt?.root) return;
  rt.root.innerHTML = renderShell();
}

function onInput(ev: Event): void {
  const target = ev.target as HTMLTextAreaElement;
  if (target?.dataset.role !== 'essay' || !runtime) return;
  runtime.textDraft = target.value;
}

/* ---------------- 行为 ---------------- */

async function grade(q: Question, rec: RecordItem): Promise<void> {
  const rt = runtime!;
  rec.submitted = true;
  if (isEssay(q.a)) {
    rec.correct = null;
  } else {
    rec.correct = sameAnswer(rec.picked, q.a);
    if (rec.correct) {
      vibrate(10);
      const streak = correctStreak();
      if (streak >= 3 && streak % 3 === 0) notify.ok(`连对 ${streak} 题，保持住`);
    } else {
      vibrate([14, 40, 14]);
      void saveWrong(q, rec);
    }
  }
  paint();
  if (rec.correct && rt.options.questions.length > rt.idx + 1) {
    await sleep(600);
    if (runtime && runtime.idx === rt.idx) advance();
  }
}

function correctStreak(): number {
  const rt = runtime!;
  let streak = 0;
  for (let i = rt.idx; i >= 0; i -= 1) {
    const rec = rt.records.get(rt.options.questions[i].id);
    if (!rec?.submitted) continue;
    if (rec.correct === true) streak += 1;
    else break;
  }
  return streak;
}

async function saveWrong(q: Question, rec: RecordItem): Promise<void> {
  try {
    await api.wrong.add({
      q: q.q,
      opts: q.opts,
      a: q.a,
      chapter: q.chapter,
      subject: q.subject,
      user_choice: rec.picked,
    });
  } catch (error) {
    if (error instanceof ApiError && error.status !== 401) notify.error(`错题保存失败：${error.message}`);
  }
}

function advance(): void {
  const rt = runtime!;
  const total = rt.options.questions.length;
  if (rt.idx >= total - 1) {
    void finish();
    return;
  }
  rt.idx += 1;
  rt.textDraft = '';
  paint();
  rt.root?.querySelector('.quiz-body')?.scrollTo({ top: 0 });
}

export function unmountQuiz(): void {
  if (escapeHandler) document.removeEventListener('keydown', escapeHandler);
  escapeHandler = null;
  runtime?.root?.removeEventListener('input', onInput);
  runtime?.root?.replaceChildren();
  runtime = null;
}

async function askExit(): Promise<void> {
  const rt = runtime;
  if (!rt) return;
  const answered = doneCount();
  const ok = await confirm({
    title: '结束本次练习？',
    message: answered ? `已作答 ${answered} 题，退出后进度会保留。` : '还没有开始作答，确定要退出吗？',
    okText: '退出',
    cancelText: '继续答题',
    danger: true,
  });
  if (!ok) return;
  const q = current();
  if (q) saveProgressHint();
  const done = rt.options.onExit;
  unmountQuiz();
  done?.();
}

function saveProgressHint(): void {
  const rt = runtime;
  if (!rt) return;
  if (rt.options.source === 'sequential') setProgress(rt.idx);
  const stems = rt.options.questions.slice(0, 5).map((q) => plainText(q.q).slice(0, 40));
  pushRecent(stems);
}

async function finish(): Promise<void> {
  const rt = runtime!;
  saveProgressHint();
  const total = rt.options.questions.length;
  const done = doneCount();
  const correct = correctCount();
  const wrong = done - correct;
  const acc = done ? Math.round((correct / done) * 100) : 0;

  unmountQuiz();

  const action = await openModal<'home' | 'retry'>({
    title: '本次完成',
    body: `
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${correct}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${wrong}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${done}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${total} 题</p>`,
    actions: [
      { label: '返回首页', value: 'home' },
      { label: '再来一组', value: 'retry', variant: 'primary' },
    ],
    onMount: (card) => {
      const node = card.querySelector<HTMLElement>('[data-role="acc"]');
      if (node) countUp(node, acc);
    },
  });

  if (action === 'retry') {
    rt.options.onExit?.();
    return;
  }
  rt.options.onExit?.();
}

async function openNote(): Promise<void> {
  const q = current();
  if (!q) return;
  const existing = getNotes()[String(q.id)] ?? '';
  const body = document.createElement('div');
  body.innerHTML = `<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${escapeHtml(existing)}</textarea>`;
  const textarea = body.querySelector('textarea')!;
  const ok = await openModal<boolean>({
    title: '我的笔记',
    body,
    actions: [
      { label: '取消', value: false },
      { label: '保存', value: true, variant: 'primary' },
    ],
    onMount: () => textarea.focus(),
  });
  if (ok) {
    saveNote(q.id, textarea.value);
    notify.ok('笔记已保存');
    paint();
  }
}

async function aiExplain(): Promise<void> {
  const q = current();
  if (!q) return;
  const rec = recordOf(q);
  const prompt = [
    `题目：${plainText(q.q)}`,
    q.opts.length ? `选项：${q.opts.map((o, i) => `${String.fromCharCode(65 + i)}. ${plainText(o)}`).join('；')}` : '',
    `正确答案：${isEssay(q.a) ? q.a : formatAnswer(q.a, q.opts)}`,
    rec.submitted ? `我的作答：${isEssay(q.a) ? rec.text : formatAnswer(rec.picked, q.opts)}` : '',
    '请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。',
  ]
    .filter(Boolean)
    .join('\n');

  const body = document.createElement('div');
  body.innerHTML = `<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>`;
  void openModal({
    title: 'AI 深度解析',
    body,
    actions: [{ label: '关闭', value: 'close' }],
  });

  const textNode = body.querySelector<HTMLElement>('[data-role="text"]')!;
  const titleNode = body.querySelector<HTMLElement>('.ai-title')!;
  try {
    // 流式：边收边渲染，首字几百毫秒就出现；服务端不支持时自动降级
    let streamed = '';
    const res = await api.ai.explainStream(prompt, (delta) => {
      streamed += delta;
      textNode.innerHTML = `${escapeHtml(streamed).replace(/\n/g, '<br>')}<span class="cursor"></span>`;
    });
    titleNode.textContent = streamed
      ? `✦ AI 解析${res.cached ? ' · 缓存命中' : ''}`
      : '✦ AI 解析';
    if (!streamed) await typeOutLegacy(textNode, res.text ?? '');
    else textNode.innerHTML = escapeHtml(res.text || streamed).replace(/\n/g, '<br>');
    textNode.classList.remove('cursor');
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'AI 解析失败，请稍后重试';
    notify.error(message);
    titleNode.textContent = '✦ 解析失败';
    textNode.classList.remove('cursor');
    textNode.textContent = message;
  }
}

/** 旧的打字机效果：保留给降级路径 */
async function typeOutLegacy(textNode: HTMLElement, text: string): Promise<void> {
  for (let i = 0; i < text.length; i += 2) {
    textNode.innerHTML = escapeHtml(text.slice(0, i + 2)).replace(/\n/g, '<br>');
    await sleep(12);
  }
}

function openNav(): void {
  const rt = runtime;
  if (!rt) return;
  const cells = rt.options.questions
    .map((q, i) => {
      const rec = rt.records.get(q.id);
      const st = i === rt.idx ? 'current' : rec?.correct === true ? 'done' : rec?.submitted ? 'wrong' : '';
      return `<button class="nav-cell" data-act="jump" data-idx="${i}" data-state="${st}">${i + 1}</button>`;
    })
    .join('');
  void openModal({
    title: '题目导航',
    body: `<div class="nav-grid">${cells}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,
    actions: [
      { label: '结束本次练习', value: 'finish', variant: 'danger' },
      { label: '继续', value: 'close', variant: 'primary' },
    ],
  }).then((value) => {
    if (value === 'finish') void askExit();
  });
}

export async function handleQuiz(action: string, el: HTMLElement): Promise<boolean> {
  const rt = runtime;
  if (!rt) return false;
  const q = current();
  if (!q) return false;
  const rec = recordOf(q);

  switch (action) {
    case 'pick': {
      if (rec.submitted) return true;
      const idx = Number(el.dataset.idx);
      if (isEssay(q.a)) return true;
      const multi = choiceIndexes(q.a).length > 1;
      if (multi) {
        rec.picked = rec.picked.includes(idx) ? rec.picked.filter((n) => n !== idx) : [...rec.picked, idx];
        paint();
      } else {
        rec.picked = [idx];
        await grade(q, rec);
      }
      return true;
    }
    case 'submit': {
      if (isEssay(q.a)) {
        const box = rt.root?.querySelector<HTMLTextAreaElement>('[data-role="essay"]');
        rec.text = box?.value ?? rt.textDraft;
        if (!rec.text.trim()) {
          notify.info('先写点什么再提交吧');
          return true;
        }
        await grade(q, rec);
      } else {
        if (!rec.picked.length) {
          notify.info('请先选择答案');
          return true;
        }
        await grade(q, rec);
      }
      return true;
    }
    case 'next':
      advance();
      return true;
    case 'prev': {
      if (rt.idx > 0) {
        rt.idx -= 1;
        rt.textDraft = '';
        paint();
      }
      return true;
    }
    case 'jump': {
      rt.idx = Number(el.dataset.idx);
      rt.textDraft = '';
      document.querySelector('.modal-root')?.replaceChildren();
      paint();
      return true;
    }
    case 'nav':
      openNav();
      return true;
    case 'exit':
      await askExit();
      return true;
    case 'fav':
      await toggleFavorite(q.id);
      paint();
      return true;
    case 'note':
      await openNote();
      return true;
    case 'ai':
      void aiExplain();
      return true;
    default:
      return false;
  }
}
