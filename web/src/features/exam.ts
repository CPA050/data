import { api } from '../core/api';
import { state } from '../core/app';
import { formatAnswer, renderRich, sameAnswer } from '../core/format';
import type { Question } from '../core/types';
import { confirm, openModal } from '../ui/modal';
import { notify } from '../ui/toast';

/**
 * 模拟考试：限时、答题时不给反馈，交卷后统一判分。
 * 只收客观题（单选 / 多选 / 判断），简答题留给练习模式。
 */

interface ExamState {
  questions: Question[];
  picks: Map<number, number[]>;
  idx: number;
  endsAt: number;
  timer: number;
  submitted: boolean;
}

let exam: ExamState | null = null;
let root: HTMLElement | null = null;
let onKey: ((ev: KeyboardEvent) => void) | null = null;

const letter = (i: number): string => String.fromCharCode(65 + i);

const objective = (q: Question): boolean => typeof q.a === 'number' || Array.isArray(q.a);

function clock(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export async function startExam(): Promise<void> {
  const pool = (state.bank ?? []).filter(objective);
  if (pool.length < 3) {
    notify.error('题库里的客观题不足 3 道，先导入或手写几道再考');
    return;
  }

  const body = document.createElement('div');
  body.innerHTML = `
    <div class="row" style="gap:10px;align-items:flex-end">
      <label class="field grow">
        <span class="field-label">题量</span>
        <input class="input" data-role="count" type="number" min="3" max="${pool.length}" value="${Math.min(
          20,
          pool.length,
        )}">
      </label>
      <label class="field grow">
        <span class="field-label">时长 / 分钟</span>
        <input class="input" data-role="min" type="number" min="1" max="180" value="15">
      </label>
    </div>
    <p class="muted small" style="margin:12px 0 0">可选 ${pool.length} 道客观题；考试中不显示对错。</p>`;

  const go = await openModal<boolean>({
    title: '模拟考试',
    body,
    actions: [
      { label: '取消', value: false },
      { label: '开始考试', value: true, variant: 'primary' },
    ],
  });
  if (!go) return;

  const num = (role: string, fallback: number): number => {
    const el = body.querySelector<HTMLInputElement>(`[data-role="${role}"]`);
    const v = Number(el?.value);
    return Number.isFinite(v) && v > 0 ? v : fallback;
  };
  const count = Math.min(pool.length, num('count', Math.min(20, pool.length)));
  const minutes = Math.min(180, num('min', 15));
  const questions = [...pool].sort(() => Math.random() - 0.5).slice(0, count);

  exam = {
    questions,
    picks: new Map(),
    idx: 0,
    endsAt: Date.now() + minutes * 60 * 1000,
    timer: window.setInterval(tick, 1000),
    submitted: false,
  };
  mount();
}

function mount(): void {
  const host = document.getElementById('app-root') ?? document.body;
  const layer = document.createElement('div');
  layer.className = 'exam';
  host.appendChild(layer);
  root = layer;
  paint();
  onKey = (ev: KeyboardEvent) => {
    if (!exam || document.querySelector('.modal-layer')) return;
    if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      move(1);
    } else if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      move(-1);
    } else if (/^[a-h1-8]$/i.test(ev.key)) {
      const i = /^\d$/.test(ev.key) ? Number(ev.key) - 1 : ev.key.toLowerCase().charCodeAt(0) - 97;
      pick(i);
    }
  };
  document.addEventListener('keydown', onKey);
}

function tick(): void {
  const ex = exam;
  if (!ex || ex.submitted) return;
  if (Date.now() >= ex.endsAt) {
    void submit(true);
    return;
  }
  const el = root?.querySelector('.exam-clock');
  if (el) {
    const left = ex.endsAt - Date.now();
    el.textContent = clock(left);
    el.classList.toggle('is-urgent', left <= 60_000);
  }
}

function paint(): void {
  const ex = exam;
  if (!ex || !root) return;
  const q = ex.questions[ex.idx];
  const picked = ex.picks.get(q.id) ?? [];
  const left = ex.endsAt - Date.now();
  const answered = ex.questions.filter((item) => (ex.picks.get(item.id) ?? []).length > 0).length;
  const multi = Array.isArray(q.a) && q.a.length > 1;

  root.innerHTML = `
    <div class="exam-bar">
      <button class="icon-btn" data-ex="exit" aria-label="退出">←</button>
      <div class="exam-progress">${ex.idx + 1} / ${ex.questions.length} · 已答 ${answered}</div>
      <span class="exam-clock ${left <= 60_000 ? 'is-urgent' : ''}">${clock(left)}</span>
      <button class="icon-btn" data-ex="sheet" aria-label="答题卡">▦</button>
    </div>
    <div class="exam-body">
      <article class="q-card">
        <div class="q-head">
          <div class="q-tags">
            ${q.chapter ? `<span class="tag">${q.chapter}</span>` : ''}
            ${q.subject && q.subject !== '默认题库' ? `<span class="tag">${q.subject}</span>` : ''}
          </div>
          <span class="muted small">${multi ? '多选' : '单选'}</span>
        </div>
        <div class="q-text">${renderRich(q.q)}</div>
        <div class="opts">
          ${q.opts
            .map(
              (opt, i) => `<button class="opt ${picked.includes(i) ? 'is-picked' : ''}" data-ex="pick" data-idx="${i}">
                <span class="opt-key">${letter(i)}</span>
                <span class="opt-text">${renderRich(
                  String(opt).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/, ''),
                )}</span>
              </button>`,
            )
            .join('')}
        </div>
      </article>
    </div>
    <div class="exam-foot">
      <button class="btn" data-ex="prev" ${ex.idx === 0 ? 'disabled' : ''}>上一题</button>
      ${
        ex.idx === ex.questions.length - 1
          ? ''
          : '<button class="btn" data-ex="next">下一题</button>'
      }
      <button class="btn btn-primary" data-ex="submit">交卷</button>
    </div>`;
}

function pick(i: number): void {
  const ex = exam;
  if (!ex) return;
  const q = ex.questions[ex.idx];
  if (i < 0 || i >= q.opts.length) return;
  const multi = Array.isArray(q.a) && q.a.length > 1;
  const cur = ex.picks.get(q.id) ?? [];
  if (multi) {
    ex.picks.set(q.id, cur.includes(i) ? cur.filter((n) => n !== i) : [...cur, i]);
  } else {
    ex.picks.set(q.id, [i]);
  }
  paint();
}

function move(delta: number): void {
  const ex = exam;
  if (!ex) return;
  const next = ex.idx + delta;
  if (next < 0 || next >= ex.questions.length) return;
  ex.idx = next;
  paint();
}

function openSheet(): void {
  const ex = exam;
  if (!ex) return;
  const body = document.createElement('div');
  body.className = 'nav-grid';
  body.innerHTML = ex.questions
    .map((q, i) => {
      const done = (ex.picks.get(q.id) ?? []).length > 0;
      return `<button class="nav-cell ${done ? 'is-done' : ''} ${i === ex.idx ? 'is-cur' : ''}" data-idx="${i}">${
        i + 1
      }</button>`;
    })
    .join('');
  body.addEventListener('click', (ev) => {
    const cell = (ev.target as HTMLElement).closest<HTMLElement>('.nav-cell');
    if (!cell || !exam) return;
    const idx = Number(cell.dataset.idx);
    if (!Number.isFinite(idx)) return;
    exam.idx = idx;
    document.querySelector('.modal-layer')?.remove();
    paint();
  });
  void openModal<'close' | 'submit'>({
    title: '答题卡',
    body,
    actions: [
      { label: '继续答题', value: 'close' },
      { label: '交卷', value: 'submit', variant: 'primary' },
    ],
  }).then((value) => {
    if (value === 'submit') void submit(false);
  });
}

async function submit(auto: boolean): Promise<void> {
  const ex = exam;
  if (!ex || ex.submitted) return;
  const unanswered = ex.questions.filter((q) => (ex.picks.get(q.id) ?? []).length === 0).length;
  if (!auto && unanswered > 0) {
    const sure = await confirm({
      title: '还有题没答',
      message: `还有 ${unanswered} 道没答，确定交卷？`,
      okText: '交卷',
    });
    if (!sure) return;
  }

  ex.submitted = true;
  window.clearInterval(ex.timer);

  let correct = 0;
  const wrong: Question[] = [];
  for (const q of ex.questions) {
    const picked = ex.picks.get(q.id) ?? [];
    if (picked.length && sameAnswer(picked, q.a)) correct += 1;
    else wrong.push(q);
  }
  const score = Math.round((correct / ex.questions.length) * 100);

  for (const q of wrong) {
    void api.wrong
      .add({
        q: q.q,
        opts: q.opts,
        a: q.a,
        chapter: q.chapter,
        subject: q.subject,
        explain: q.explain,
        user_choice: ex.picks.get(q.id) ?? [],
      })
      .catch(() => undefined);
  }

  const body = document.createElement('div');
  body.className = 'exam-result';
  body.innerHTML = `
    <div class="score-big">${score}<span>分</span></div>
    <div class="score-sub">答对 ${correct} / ${ex.questions.length} · ${auto ? '时间到自动交卷' : '手动交卷'}</div>
    ${
      wrong.length
        ? `<div class="wrong-list">${wrong
            .slice(0, 8)
            .map(
              (q) => `<div class="wrong-item">
                <div class="wrong-q">${renderRich(q.q)}</div>
                <div class="wrong-a">
                  <b class="bad">你选 ${formatAnswer(ex.picks.get(q.id) ?? [], q.opts) || '未答'}</b>
                  <span class="ok">正确 ${formatAnswer(q.a, q.opts)}</span>
                </div>
              </div>`,
            )
            .join('')}${
            wrong.length > 8 ? `<div class="muted small">…还有 ${wrong.length - 8} 道已进错题本</div>` : ''
          }</div>`
        : '<div class="all-right">全对，厉害</div>'
    }`;

  await openModal<'close'>({
    title: '考试结果',
    body,
    actions: [{ label: '知道了', value: 'close', variant: 'primary' }],
  });

  teardown();
}

function teardown(): void {
  if (exam) window.clearInterval(exam.timer);
  exam = null;
  if (onKey) document.removeEventListener('keydown', onKey);
  onKey = null;
  root?.remove();
  root = null;
}

export function handleExam(action: string, el: HTMLElement): boolean {
  if (!exam) return false;
  switch (action) {
    case 'pick':
      pick(Number(el.dataset.idx));
      return true;
    case 'prev':
      move(-1);
      return true;
    case 'next':
      move(1);
      return true;
    case 'sheet':
      openSheet();
      return true;
    case 'submit':
      void submit(false);
      return true;
    case 'exit':
      void (async () => {
        const quit = await confirm({
          title: '退出考试',
          message: '退出后本次作答不保留，确定吗？',
          danger: true,
          okText: '退出',
        });
        if (quit) teardown();
      })();
      return true;
    default:
      return false;
  }
}

export function examActive(): boolean {
  return Boolean(exam);
}
