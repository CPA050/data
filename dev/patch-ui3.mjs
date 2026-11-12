import fs from 'node:fs';

const p = 'web/src/styles/responsive.css';
let s = fs.readFileSync(p, 'utf8');

s += `
/* ---------------- 大屏侧边导航（≥1280） ---------------- */

.sidebar {
  display: none;
}

@media (min-width: 1280px) {
  .app-shell {
    display: grid;
    grid-template-columns: 236px minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    border-inline: 1px solid var(--border);
    max-width: 1440px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 4px;
    grid-row: 1 / -1;
    height: 100dvh;
    position: sticky;
    top: 0;
    padding: 24px 18px 20px;
    border-right: 1px solid var(--border);
    background: var(--bg);
  }

  .sidebar-brand {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 0 12px 18px;
  }

  .sidebar-nav {
    display: grid;
    gap: 2px;
  }

  .side-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 12px;
    border: 1px solid transparent;
    background: none;
    color: var(--text-2);
    font-size: 14px;
    cursor: pointer;
    text-align: left;
  }

  .side-ico {
    width: 18px;
    height: 18px;
    display: grid;
    place-items: center;
    flex: none;
  }

  .side-ico svg {
    width: 16px;
    height: 16px;
  }

  .side-btn:hover {
    border-color: var(--border);
    color: var(--text);
  }

  .side-btn.is-active {
    background: var(--text);
    border-color: var(--text);
    color: var(--bg);
  }

  .sidebar-foot {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
    font-size: 11px;
    letter-spacing: 0.06em;
    color: var(--muted);
  }

  .app-header {
    grid-column: 2;
  }

  .view {
    grid-column: 2;
    width: min(1040px, 100%);
    margin-inline: auto;
  }

  .tabbar {
    display: none !important;
  }

  .toast-host {
    bottom: calc(var(--safe-b) + 26px);
  }
}

/* ---------------- 首页紧凑版 ---------------- */

.mast-title-sm {
  font-size: 40px;
  line-height: 1.05;
}

.mast-title-sm em {
  font-size: 1.35em;
}

.stat-strip {
  display: flex;
  align-items: stretch;
  margin-top: 14px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.stat {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 7px;
  padding: 10px 2px;
  border: 0;
  border-left: 1px solid var(--border);
  background: none;
  color: var(--text);
  cursor: pointer;
  text-align: left;
}

.stat:first-child {
  border-left: 0;
  padding-left: 0;
}

.stat-num {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--muted);
}

.primary-row {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}

.cta-compact {
  padding: 14px 18px 15px;
}

.cta-compact .cta-title {
  font-size: 26px;
}

.ghost-card {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: 'kicker arrow' 'title arrow';
  align-items: center;
  gap: 2px 12px;
  padding: 13px 18px;
  border: 1px solid var(--text);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  text-align: left;
}

.ghost-kicker {
  grid-area: kicker;
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--muted);
}

.ghost-title {
  grid-area: title;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.ghost-arrow {
  grid-area: arrow;
  font-size: 15px;
}

.tile-grid-sm {
  margin-top: 8px;
}

.tile-sm {
  padding: 13px 14px 14px;
}

.tile-sm .tile-name {
  font-size: 15px;
}

.tile-sm .tile-desc {
  font-size: 11px;
}

@media (min-width: 560px) {
  .primary-row {
    grid-template-columns: 1.5fr 1fr;
  }
}

/* ---------------- 交互反馈：按压更细腻 ---------------- */

.btn,
.tool-btn,
.tab-btn,
.side-btn,
.opt,
.tile,
.stat,
.cta,
.ghost-card,
.fab,
.icon-btn,
.seg,
.nav-cell,
.action {
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 0.12s cubic-bezier(0.2, 0.7, 0.3, 1),
    background-color 0.14s linear,
    color 0.14s linear,
    border-color 0.14s linear,
    box-shadow 0.14s linear;
}

.btn:active,
.tool-btn:active,
.side-btn:active,
.opt:not(:disabled):active,
.tile:not(:disabled):active,
.stat:active,
.cta:not(:disabled):active,
.ghost-card:not(:disabled):active,
.fab:active,
.icon-btn:active,
.seg:active,
.nav-cell:active {
  transform: scale(0.985);
  filter: brightness(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .btn:active,
  .tool-btn:active,
  .side-btn:active,
  .opt:not(:disabled):active,
  .tile:not(:disabled):active,
  .stat:active,
  .cta:not(:disabled):active,
  .ghost-card:not(:disabled):active,
  .fab:active,
  .icon-btn:active,
  .seg:active,
  .nav-cell:active {
    transform: none;
    filter: none;
  }
}

/* 切换页更快：缩短入场动画 */
.view {
  animation-duration: 0.16s !important;
}

.modal-card {
  transition-duration: 0.14s !important;
}

.view:disabled,
.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.cta:disabled,
.ghost-card:disabled,
.tile:disabled {
  opacity: 1;
  color: var(--muted);
  border-color: var(--border);
  background: var(--surface);
  cursor: not-allowed;
}
`;

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('sidebar + compact home + press states ok');
