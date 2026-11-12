// web/src/features/about.ts —— 「关于」品牌页：标记 / 名称 / 版本 / 快捷键
import { state } from '../core/app';
import { openModal } from '../ui/modal';
import { SHORTCUTS } from './shortcuts';

const MARK = `<svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true" focusable="false">
  <rect x="18.5" y="18.5" width="63" height="63" fill="none" stroke="currentColor" stroke-width="4.2" />
  <circle cx="50" cy="50" r="10" fill="currentColor" />
</svg>`;

export const VERSION = '2.0.0';

/** 一个极简的品牌页：左边标记，右边名字，下面是数据与快捷键 */
export function openAbout(): void {
  const bank = state.bank?.length ?? 0;
  const wrong = state.wrong?.length ?? 0;
  const favs = state.favs?.length ?? 0;

  const rows = SHORTCUTS.map(
    (s) => `<div class="kbd-row">
      <kbd class="kbd">${s.keys}</kbd>
      <span class="kbd-desc">${s.desc}</span>
      <span class="kbd-scope">${s.scope}</span>
    </div>`,
  ).join('');

  void openModal({
    body: `<div class="about">
      <div class="about-head">
        <span class="about-mark">${MARK}</span>
        <span class="about-txt">
          <span class="about-name">基准</span>
          <span class="about-latin">DATUM</span>
        </span>
        <span class="about-ver">v${VERSION}</span>
      </div>

      <p class="about-line">一建刷题、错题本、收藏夹。数据存在你自己的 Cloudflare D1，别人看不到。</p>

      <div class="about-stats">
        <div class="about-stat"><b>${bank}</b><span>题库</span></div>
        <div class="about-stat"><b>${wrong}</b><span>错题</span></div>
        <div class="about-stat"><b>${favs}</b><span>收藏</span></div>
      </div>

      <div class="about-sec">键盘快捷键</div>
      <div class="kbd-list">${rows}</div>

      <p class="about-foot">本地优先 · 可离线打开 · AI 解析与出题由 DeepSeek 提供</p>
    </div>`,
    actions: [{ label: '关闭', value: 'ok', variant: 'primary' }],
  });
}
