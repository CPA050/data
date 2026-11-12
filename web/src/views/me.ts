import { api, ApiError } from '../core/api';
import { applyAppearance, emit, logout, saveAppearance, saveSettings, settings, state, updateTheme } from '../core/app';
import { escapeHtml } from '../core/format';
import { TYPE_LABEL } from '../core/question-type';
import { clearLog as clearStats, summary as statsSummary } from '../core/stats';
import { openShortcuts } from '../features/shortcuts';
import { confirm, openModal } from '../ui/modal';
import { notify } from '../ui/toast';
import type { ThemeName } from '../core/types';

const THEMES: { value: ThemeName; label: string }[] = [
  { value: 'auto', label: '跟随系统' },
  { value: 'light', label: '明亮' },
  { value: 'dark', label: '深色' },
  { value: 'eye', label: '护眼' },
];

const DELAYS = [
  { value: 0, label: '立即' },
  { value: 300, label: '0.3 秒' },
  { value: 600, label: '0.6 秒' },
  { value: 1200, label: '1.2 秒' },
];

function seg(values: { value: string | number; label: string }[], active: string | number, act: string): string {
  return `<div class="segmented">${values
    .map(
      (v) =>
        `<button class="seg" data-act="${act}" data-value="${v.value}" aria-pressed="${String(v.value) === String(active)}">${v.label}</button>`,
    )
    .join('')}</div>`;
}

function download(name: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

async function changePassword(): Promise<void> {
  const body = document.createElement('div');
  body.innerHTML = `
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`;
  const ok = await openModal<boolean>({
    title: '修改密码',
    body,
    actions: [
      { label: '取消', value: false },
      { label: '确认修改', value: true, variant: 'primary' },
    ],
  });
  if (!ok) return;
  const oldPassword = body.querySelector<HTMLInputElement>('[data-role="old"]')!.value;
  const newPassword = body.querySelector<HTMLInputElement>('[data-role="next"]')!.value;
  if (newPassword.length < 6) {
    notify.error('新密码至少 6 位');
    return;
  }
  try {
    await api.auth.change(oldPassword, newPassword);
    notify.ok('密码已更新');
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '修改失败');
  }
}

export function renderMe(): string {
  const user = state.user;
  const initial = escapeHtml((user || '?').slice(0, 1).toUpperCase());
  const app = (() => {
    try {
      return JSON.parse(localStorage.getItem('oq:appearance') ?? '{}') as { color?: string; image?: string; dim?: number };
    } catch {
      return {};
    }
  })();

  const stats = statsSummary();
  const pct = (v: number) => (v > 0 ? `${Math.round(v * 100)}%` : '—');
  const maxDay = Math.max(1, ...stats.days7.map((d) => d.n));

  return `
    <div class="profile">
      <div class="profile-avatar">${initial}</div>
      <div class="profile-body">
        <div class="profile-name">${escapeHtml(user)}</div>
        <div class="profile-desc">${state.bank?.length ?? 0} 道题 · ${state.wrong?.length ?? 0} 道错题 · ${state.favs?.length ?? 0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">练习记录</div>
    <div class="card card-pad">
      <div class="stat-grid">
        <div class="stat-cell">
          <span class="stat-big">${stats.today.n}</span>
          <span class="stat-cap">今日答题</span>
        </div>
        <div class="stat-cell">
          <span class="stat-big">${stats.total}</span>
          <span class="stat-cap">累计答题</span>
        </div>
        <div class="stat-cell">
          <span class="stat-big">${pct(stats.rate)}</span>
          <span class="stat-cap">总正确率</span>
        </div>
      </div>

      ${
        stats.byType.length
          ? `<div class="type-stats">${stats.byType
              .map(
                (t) => `
            <div class="type-row">
              <span class="type-name">${TYPE_LABEL[t.type]}</span>
              <span class="type-bar"><i style="width:${Math.round(t.rate * 100)}%"></i></span>
              <span class="type-val">${t.ok}/${t.n}</span>
            </div>`,
              )
              .join('')}</div>`
          : `<p class="muted small" style="margin:10px 0 0">还没有练习记录，去刷几题吧</p>`
      }

      ${
        stats.days7.length
          ? `<div class="days">${stats.days7
              .map(
                (d) =>
                  `<div class="day"><i style="height:${Math.max(6, Math.round((d.n / maxDay) * 46))}px"></i><span>${d.label}</span></div>`,
              )
              .join('')}</div>`
          : ''
      }

      <div class="row between" style="margin-top:14px">
        <span class="muted small">只统计本机练习；换设备不同步</span>
        <button class="btn btn-sm btn-ghost" data-act="clear-stats">清空记录</button>
      </div>
    </div>

    <div class="section-title">外观</div>

    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${seg(THEMES, settings.theme, 'theme')}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${escapeHtml(app.color || '#f4f5f7')}" data-act="pick-color" aria-label="背景色">
      </div>
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景图</div><div class="setting-desc">选一张图当首页背景，会自动压缩</div></div>
        <div class="row-actions">
          <button class="btn btn-sm" data-act="pick-bg">选择图片</button>
          ${app.image ? '<button class="btn btn-sm btn-ghost" data-act="clear-bg">移除</button>' : ''}
        </div>
      </div>
      ${
        app.image
          ? `<label class="setting-row dim-row">
              <div><div class="setting-title">背景暗化</div><div class="setting-desc">让文字更清楚一点</div></div>
              <input class="range" type="range" min="0" max="0.85" step="0.05" value="${(app.dim ?? 0.35).toFixed(2)}" data-act="dim" aria-label="背景暗化程度">
            </label>`
          : ''
      }
      <button class="btn btn-sm btn-ghost" data-act="reset-bg">恢复默认背景</button>
    </div>

    <div class="section-title">帮助</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="shortcuts">键盘快捷键</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block" data-act="about">关于这个题库</button>
    </div>

    <div class="section-title">练习</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">答对后自动跳题</div><div class="setting-desc">答对稍作停留就去下一题</div></div>
      </div>
      ${seg(DELAYS, settings.autoDelay, 'delay')}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${settings.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${settings.streakAlert}"><i></i></span>
      </label>
    </div>

    <div class="section-title">数据</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="export-bank">导出题库（JSON）</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block" data-act="export-wrong">导出错题（JSON）</button>
    </div>

    <div class="section-title">账号</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="change-password">修改密码</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block danger-text" data-act="logout">退出登录</button>
    </div>

    <p class="muted small" style="text-align:center;margin:22px 0 6px">DATUM v2.0.0</p>
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`;
}

async function pickBackground(): Promise<void> {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      notify.error('图片太大了（最多 8MB）');
      return;
    }
    try {
      const dataUrl = await shrinkImage(file);
      saveAppearance({ image: dataUrl, color: '' });
      notify.ok('背景已更新');
      emit('render');
    } catch {
      notify.error('这张图片读不出来，换一张试试');
    }
  };
  input.click();
}

/** 压到最长边 1600px 的 JPEG，避免撑爆 localStorage */
function shrinkImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('canvas unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('image load failed'));
    };
    img.src = url;
  });
}

export function mountMe(): void {
  applyAppearance();
}

export async function handleMe(action: string, el: HTMLElement): Promise<boolean> {
  switch (action) {
    case 'theme':
      updateTheme(el.dataset.value as ThemeName);
      emit('render');
      return true;
    case 'delay':
      saveSettings({ autoDelay: Number(el.dataset.value) });
      emit('render');
      return true;
    case 'toggle-vibration':
      saveSettings({ vibration: !settings.vibration });
      emit('render');
      return true;
    case 'toggle-streak':
      saveSettings({ streakAlert: !settings.streakAlert });
      emit('render');
      return true;
    case 'pick-color':
      saveAppearance({ color: (el as HTMLInputElement).value, image: '' });
      return true;
    case 'pick-bg':
      await pickBackground();
      return true;
    case 'clear-bg':
      saveAppearance({ image: '' });
      emit('render');
      return true;
    case 'dim':
      saveAppearance({ dim: Number((el as HTMLInputElement).value) });
      return true;
    case 'shortcuts':
      openShortcuts();
      return true;
    case 'about': {
      void openModal({
        title: '关于',
        body: `<p class="muted small" style="margin:0 0 10px">基准 —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${state.bank?.length ?? 0} 题 · 错题 ${state.wrong?.length ?? 0} 道 · 收藏 ${state.favs?.length ?? 0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,
        actions: [{ label: '知道了', value: 'ok', variant: 'primary' }],
      });
      return true;
    }
    case 'clear-stats': {
      const okClear = await confirm({
        title: '清空练习记录',
        message: '本机的答题统计会被清除，题库不受影响。',
        okText: '清空',
        danger: true,
      });
      if (!okClear) return true;
      clearStats();
      emit('render');
      notify.ok('练习记录已清空');
      return true;
    }
    case 'reset-bg':
      saveAppearance({ color: '', image: '', dim: 0.35 });
      notify.ok('背景已恢复');
      emit('render');
      return true;
    case 'export-bank':
      if (!state.bank?.length) {
        notify.info('题库是空的');
        return true;
      }
      download(`题库-${state.user}.json`, state.bank);
      notify.ok('已导出');
      return true;
    case 'export-wrong':
      if (!state.wrong?.length) {
        notify.info('没有错题');
        return true;
      }
      download(`错题-${state.user}.json`, state.wrong);
      notify.ok('已导出');
      return true;
    case 'change-password':
      await changePassword();
      return true;
    case 'logout': {
      if (!(await confirm({ title: '退出登录', message: '退出后需要重新输入密码，确定吗？', okText: '退出', danger: true }))) {
        return true;
      }
      logout();
      notify.info('已退出登录');
      return true;
    }
    default:
      return false;
  }
}
