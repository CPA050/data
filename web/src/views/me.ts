import { api, ApiError } from '../core/api';
import { applyAppearance, emit, logout, saveAppearance, saveSettings, settings, state, updateTheme } from '../core/app';
import { escapeHtml } from '../core/format';
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
      return JSON.parse(localStorage.getItem('oq:appearance') ?? '{}') as { color?: string };
    } catch {
      return {};
    }
  })();

  return `
    <div class="profile">
      <div class="profile-avatar">${initial}</div>
      <div class="profile-body">
        <div class="profile-name">${escapeHtml(user)}</div>
        <div class="profile-desc">${state.bank?.length ?? 0} 道题 · ${state.wrong?.length ?? 0} 道错题 · ${state.favs?.length ?? 0} 条收藏</div>
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
      <button class="btn btn-sm btn-ghost" data-act="reset-bg">恢复默认背景</button>
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
      <button class="btn btn-ghost btn-block" data-act="export-bank" style="justify-content:flex-start">导出题库（JSON）</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block" data-act="export-wrong" style="justify-content:flex-start">导出错题（JSON）</button>
    </div>

    <div class="section-title">账号</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="change-password" style="justify-content:flex-start">修改密码</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block danger-text" data-act="logout" style="justify-content:flex-start">退出登录</button>
    </div>

    <p class="muted small" style="text-align:center;margin:22px 0 6px">origin-quiz v2.0.0</p>
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`;
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
    case 'reset-bg':
      saveAppearance({ color: '', image: '', dim: 0.35 });
      notify.ok('背景已恢复');
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
