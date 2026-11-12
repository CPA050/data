import { api, ApiError } from '../core/api';
import { invalidate, loadBank, state } from '../core/app';
import { escapeHtml } from '../core/format';
import { parseJsonQuestions } from './import';
import type { QuestionDraft } from '../core/types';
import { openModal } from '../ui/modal';
import { notify } from '../ui/toast';

/**
 * AI 出题：给学科/章节/数量/难度，让模型按题库格式吐 JSON，
 * 先给用户看一眼再落库——避免一键灌进 20 道不能用的题。
 */

const LEVELS = ['基础', '进阶', '冲刺'] as const;
const COUNTS = [5, 10, 20] as const;

export async function openGenerate(): Promise<void> {
  const subjects = [...new Set((state.bank ?? []).map((q) => q.subject).filter(Boolean))];
  const subject = subjects[0] ?? '默认题库';

  const body = document.createElement('div');
  body.innerHTML = `
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${escapeHtml(subject)}" placeholder="如 一建建筑">
      </label>
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="" placeholder="可留空">
      </label>
    </div>
    <div class="row" style="gap:10px;margin-top:10px">
      <label class="field grow">
        <span class="field-label">题量</span>
        <select class="input" data-role="count">
          ${COUNTS.map((n) => `<option value="${n}">${n} 道</option>`).join('')}
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
    <p class="muted small" style="margin:10px 0 0">生成后会先预览，确认了才写进题库。每天最多生成 10 次。</p>`;

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
  const count = Number(val('count')) || 5;
  const level = val('level') || '基础';
  const hint = val('hint');

  const prompt = [
    `题库：${subjectVal}`,
    chapterVal ? `章节：${chapterVal}` : '',
    `数量：${count} 道`,
    `难度：${level}`,
    hint ? `考点提示：${hint}` : '',
    '要求：贴近真实考试题型，四个选项，答案唯一，附一句解析。',
  ]
    .filter(Boolean)
    .join('\n');

  notify.info('正在生成，大约 10–20 秒…');
  let drafts: QuestionDraft[] = [];
  try {
    const res = await api.ai.generate(prompt);
    drafts = parseJsonQuestions(res.result ?? '');
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '生成失败，稍后再试');
    return;
  }

  if (!drafts.length) {
    notify.error('AI 返回的内容没法解析成题目，换个提示再试');
    return;
  }

  const preview = document.createElement('div');
  preview.innerHTML = `
    <div class="muted small" style="margin-bottom:8px">共 ${drafts.length} 道，确认后写入「${escapeHtml(subjectVal)}」</div>
    <div class="import-list">
      ${drafts
        .slice(0, 20)
        .map(
          (d, i) =>
            `<div class="import-item"><b>${i + 1}.</b> ${escapeHtml(String(d.q ?? '').slice(0, 70))}${
              Array.isArray(d.opts) && d.opts.length ? ` <span class="muted">· ${d.opts.length} 选项</span>` : ''
            }</div>`,
        )
        .join('')}
    </div>`;

  const ok = await openModal<boolean>({
    title: '预览生成的题目',
    body: preview,
    actions: [
      { label: '不要了', value: false },
      { label: `导入 ${drafts.length} 道`, value: true, variant: 'primary' },
    ],
  });
  if (!ok) return;

  try {
    const rows = drafts.map((d) => ({
      ...d,
      subject: subjectVal,
      chapter: d.chapter || chapterVal,
    }));
    await api.questions.add(rows);
    invalidate('bank');
    await loadBank(true);
    notify.ok(`已生成并导入 ${rows.length} 道题`);
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '导入失败');
  }
}
