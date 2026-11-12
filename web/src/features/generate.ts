import { api, ApiError } from '../core/api';
import { invalidate, loadBank, state } from '../core/app';
import { escapeHtml, plainText } from '../core/format';
import { parseJsonQuestions } from './import';
import { figureDataUrl, readFigure } from './figure';
import type { QuestionDraft } from '../core/types';
import { closeAllModals, openModal } from '../ui/modal';
import { notify } from '../ui/toast';

/**
 * AI 出题：支持一次生成几百上千道。
 * 做法是「客户端分批」——每批 20 道调一次模型，本地去重、本地画图、分批落库，
 * 这样单次请求不会超时，中途失败只丢一批，用户也能随时取消。
 */

const LEVELS = ['基础', '进阶', '冲刺'] as const;
const TARGETS = [10, 20, 50, 100, 200, 500, 1000] as const;
const BATCH = 20;
const MAX_TARGET = 1000;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function norm(text: string): string {
  return plainText(text)
    .replace(/^【[^】]*】/, '')
    .replace(/[\s，。、；：？！,.;:?!'"“”‘’()（）\[\]【】]/g, '')
    .slice(0, 40);
}

export async function openGenerate(): Promise<void> {
  const bank = state.bank ?? [];
  const subjects = [...new Set(bank.map((q) => q.subject).filter(Boolean))];
  const chapters = [...new Set(bank.map((q) => q.chapter).filter(Boolean))];
  const subject = subjects[0] ?? '默认题库';

  const body = document.createElement('div');
  body.innerHTML = `
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${escapeHtml(subject)}" placeholder="如 一建建筑">
      </label>
      <label class="field grow">
        <span class="field-label">章节 <span class="muted small">（留空则自动轮换）</span></span>
        <input class="input" data-role="chapter" value="" placeholder="如 混凝土工程">
      </label>
    </div>
    <div class="row" style="gap:10px;margin-top:10px">
      <label class="field grow">
        <span class="field-label">数量</span>
        <select class="input" data-role="count">
          ${TARGETS.map((n) => `<option value="${n}"${n === 50 ? ' selected' : ''}>${n} 道</option>`).join('')}
        </select>
      </label>
      <label class="field grow">
        <span class="field-label">难度</span>
        <select class="input" data-role="level">
          ${LEVELS.map((n) => `<option value="${n}">${n}</option>`).join('')}
        </select>
      </label>
    </div>
    <label class="field" style="margin-top:10px">
      <span class="field-label">考点提示 <span class="muted small">（可选，越具体越好）</span></span>
      <textarea class="textarea" data-role="hint" rows="2" placeholder="如：混凝土养护时间、水化热控制"></textarea>
    </label>
    <p class="muted small" style="margin:10px 0 0">
      按每批 ${BATCH} 道分批生成，边生成边去重；生成完你可以先看前 12 道再决定是否入库。
      数量越多越慢（100 道约 1–2 分钟），中途可取消。
    </p>`;

  const go = await openModal<boolean>({
    title: 'AI 出题',
    body,
    actions: [
      { label: '取消', value: false },
      { label: '开始生成', value: true, variant: 'primary' },
    ],
  });
  if (!go) return;

  const val = (role: string): string =>
    (body.querySelector(`[data-role="${role}"]`) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? '';

  const subjectVal = val('subject') || '默认题库';
  const chapterVal = val('chapter');
  const target = Math.min(MAX_TARGET, Math.max(1, Number(val('count')) || 20));
  const level = val('level') || '基础';
  const hint = val('hint');

  /* ---------------- 生成中：进度面板 ---------------- */

  const progress = document.createElement('div');
  progress.innerHTML = `
    <div class="gen-progress">
      <div class="gen-bar"><i data-role="bar" style="width:0%"></i></div>
      <div class="row" style="justify-content:space-between;margin-top:8px">
        <span class="muted small" data-role="line">准备中…</span>
        <span class="muted small" data-role="pct">0%</span>
      </div>
    </div>
    <div class="import-list gen-scroll" data-role="feed" style="margin-top:12px"></div>`;

  const bar = (): HTMLElement => progress.querySelector('[data-role="bar"]') as HTMLElement;
  const line = (): HTMLElement => progress.querySelector('[data-role="line"]') as HTMLElement;
  const pct = (): HTMLElement => progress.querySelector('[data-role="pct"]') as HTMLElement;
  const feed = (): HTMLElement => progress.querySelector('[data-role="feed"]') as HTMLElement;

  let cancelled = false;
  let stopReason = '';

  const paintProgress = (done: number, total: number, note = ''): void => {
    const p = Math.min(100, Math.round((done / Math.max(1, total)) * 100));
    bar().style.width = `${p}%`;
    pct().textContent = `${p}%`;
    line().textContent = `已生成 ${done} / ${total} 道${note ? ` · ${note}` : ''}`;
  };

  const addFeed = (draft: QuestionDraft): void => {
    const row = document.createElement('div');
    row.className = 'import-item gen-item';
    const text = plainText(draft.q).replace(/\s+/g, ' ').slice(0, 56);
    row.innerHTML = `<div class="gen-row"><span class="gen-text">${escapeHtml(text)}</span></div>`;
    feed().prepend(row);
    while (feed().childElementCount > 12) feed().lastElementChild?.remove();
  };

  void openModal<string>({
    title: '正在生成',
    body: progress,
    dismissible: false,
    onMount: (el) => {
      const cancel = document.createElement('button');
      cancel.className = 'btn btn-block';
      cancel.textContent = '取消生成';
      cancel.addEventListener('click', () => {
        cancelled = true;
        cancel.textContent = '正在停止…';
      });
      (el as HTMLElement).append(cancel);
    },
    actions: [],
  });

  /* ---------------- 分批调用 ---------------- */

  const seen = new Set(bank.map((q) => norm(q.q ?? '')));
  const collected: QuestionDraft[] = [];
  let figures = 0;
  let dupes = 0;
  let failed = 0;
  let emptyStreak = 0;

  const chapterPool = chapterVal ? [chapterVal] : chapters.length ? chapters : [''];


  // 两批并发：单批 10–20 秒，串行 100 道要等 1 分多钟，并行能砍掉一半
  let nextBatch = 0;
  const CONCURRENCY = 2;

  const runBatch = async (batch: number): Promise<void> => {
    if (cancelled || collected.length >= target) return;
    const want = Math.min(BATCH, target - collected.length);
    const chapter = chapterPool[batch % chapterPool.length];
    const recent = [...collected.slice(-6), ...bank.slice(0, 6)].map((q) => `· ${plainText(q.q).slice(0, 40)}`);

    const prompt = [
      `题库：${subjectVal}`,
      chapter ? `章节：${chapter}` : '',
      `数量：${want} 道`,
      `难度：${level}`,
      hint ? `考点提示：${hint}` : '',
      batch ? `这是第 ${batch + 1} 批，请换一批考点，不要重复前面出过的题。` : '',
      recent.length ? `不要与这些题相同或近似：\n${recent.join('\n')}` : '',
      '要求：贴近真实考试题型，四个选项，答案唯一，附一句解析。',
    ]
      .filter(Boolean)
      .join('\n');

    let drafts: QuestionDraft[] = [];
    try {
      const res = await api.ai.generate(prompt);
      drafts = parseJsonQuestions(res.result ?? '');
      failed = 0;
    } catch (error) {
      failed += 1;
      const msg = error instanceof ApiError ? error.message : '网络异常';
      stopReason = msg;
      if (/次数|配额|429/.test(msg)) cancelled = true;
      return;
    }

    if (!drafts.length) {
      failed += 1;
      if (failed >= 3) stopReason = '模型没有返回可用题目，先停在这里';
      return;
    }

    const before = collected.length;
    for (const d of drafts) {
      if (collected.length >= target) break;
      const key = norm(d.q);
      if (!key || seen.has(key)) {
        dupes += 1;
        continue;
      }
      seen.add(key);
      const spec = readFigure((d as unknown as Record<string, unknown>).figure);
      const url = figureDataUrl(spec);
      if (url) {
        figures += 1;
        const caption = (spec?.caption ?? '示意图').replace(/"/g, '');
        collected.push({ ...d, q: `${d.q}\n<img src="${url}" alt="${caption}">` });
      } else {
        collected.push(d);
      }
      addFeed(d);
    }

    emptyStreak = collected.length > before ? 0 : emptyStreak + 1;
    if (emptyStreak >= 3) {
      cancelled = true;
      stopReason = '模型开始重复出同一批题，先停在这里';
    }
    paintProgress(collected.length, target, dupes ? `去重 ${dupes} 道` : '');
  };

  const worker = async (): Promise<void> => {
    while (!cancelled && collected.length < target) {
      const batch = nextBatch;
      nextBatch += 1;
      await runBatch(batch);
      await sleep(60);
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));


  closeAllModals();
  await sleep(180);

  if (!collected.length) {
    notify.error(stopReason || '一道题也没生成出来，换个提示再试');
    return;
  }

  /* ---------------- 汇总与入库 ---------------- */

  const preview = document.createElement('div');
  preview.innerHTML = `
    <div class="muted small" style="margin-bottom:8px">
      共 ${collected.length} 道${figures ? `（${figures} 道带示意图）` : ''}${
        dupes ? `，自动去重 ${dupes} 道` : ''
      }${stopReason ? ` · 提前结束：${escapeHtml(stopReason)}` : ''}，确认后写入「${escapeHtml(subjectVal)}」
    </div>
    <div class="import-list gen-scroll">
      ${collected
        .slice(0, 12)
        .map((d, i) => {
          const img = /<img\b[^>]*src="([^"]+)"/i.exec(String(d.q ?? ''));
          const thumb = img ? `<img class="gen-thumb" src="${img[1]}" alt="示意图">` : '';
          const text = plainText(d.q).replace(/\s+/g, ' ').slice(0, 64);
          return `<div class="import-item gen-item"><div class="gen-row">${thumb}<span class="gen-text"><b>${
            i + 1
          }.</b> ${escapeHtml(text)}${
            Array.isArray(d.opts) && d.opts.length ? ` <span class="muted">· ${d.opts.length} 选项</span>` : ''
          }</span></div></div>`;
        })
        .join('')}
      ${
        collected.length > 12
          ? `<div class="muted small" style="padding:8px 2px">还有 ${collected.length - 12} 道未展示…</div>`
          : ''
      }
    </div>`;

  const ok = await openModal<boolean>({
    title: '确认导入',
    body: preview,
    actions: [
      { label: '不要了', value: false },
      { label: `导入 ${collected.length} 道`, value: true, variant: 'primary' },
    ],
  });
  if (!ok) return;

  const rows = collected.map((d) => ({
    ...d,
    subject: subjectVal,
    chapter: d.chapter || chapterVal,
  }));

  let written = 0;
  try {
    for (let i = 0; i < rows.length; i += 20) {
      const chunk = rows.slice(i, i + 20);
      await api.questions.add(chunk);
      written += chunk.length;
      notify.info(`已写入 ${written} / ${rows.length} 道`);
    }
    invalidate('bank');
    await loadBank(true);
    notify.ok(`已导入 ${written} 道题`);
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : `导入中断，已写入 ${written} 道`);
    invalidate('bank');
  }
}
