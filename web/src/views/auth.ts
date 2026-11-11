import { api, ApiError } from '../core/api';
import { login, setup, state } from '../core/app';
import { escapeHtml } from '../core/format';
import { notify } from '../ui/toast';

type Step = 'name' | 'password' | 'create';

interface AuthLocal {
  step: Step;
  username: string;
  busy: boolean;
  error: string;
}

const local: AuthLocal = { step: 'name', username: '', busy: false, error: '' };

export function resetAuth(): void {
  local.step = 'name';
  local.username = '';
  local.busy = false;
  local.error = '';
}

export function renderAuth(): string {
  const brand = `
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`;

  const errorBlock = local.error ? `<div class="auth-error" role="alert">${escapeHtml(local.error)}</div>` : '';

  if (local.step === 'name') {
    return `
      <div class="auth-screen">
        <div class="auth-card">
          ${brand}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${escapeHtml(local.username)}" required>
            </label>
            ${errorBlock}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${local.busy ? 'disabled' : ''}>
              ${local.busy ? '检查中…' : '继续'}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;
  }

  const isCreate = local.step === 'create';
  return `
    <div class="auth-screen">
      <div class="auth-card">
        ${brand}
        <p class="auth-hint">${isCreate ? '为' : '欢迎回来，'} <strong>${escapeHtml(local.username)}</strong>${isCreate ? ' 设置一个密码' : ''}</p>
        <form class="stack" data-form="${isCreate ? 'create' : 'login'}">
          <label class="field">
            <span class="field-label">密码</span>
            <input class="input" name="password" type="password" autocomplete="${isCreate ? 'new-password' : 'current-password'}"
                   placeholder="至少 6 位" minlength="6" required>
          </label>
          ${
            isCreate
              ? `<label class="field">
                   <span class="field-label">再输一次</span>
                   <input class="input" name="confirm" type="password" autocomplete="new-password" placeholder="确认密码" minlength="6" required>
                 </label>`
              : ''
          }
          ${errorBlock}
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${local.busy ? 'disabled' : ''}>
            ${local.busy ? '请稍候…' : isCreate ? '创建并进入' : '登录'}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${local.busy ? 'disabled' : ''}>换个账号</button>
        </form>
      </div>
    </div>`;
}

export async function handleAuth(action: string, el: HTMLElement): Promise<boolean> {
  if (action === 'back') {
    local.step = 'name';
    local.error = '';
    return true;
  }
  if (action === 'submit') {
    const form = el as HTMLFormElement;
    const data = new FormData(form);
    if (local.step === 'name') {
      const username = String(data.get('username') ?? '').trim();
      if (!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(username)) {
        local.error = '用户名需 2–32 位，可用中英文、数字、. _ - @';
        return true;
      }
      local.busy = true;
      local.error = '';
      try {
        const { hasPassword } = await api.auth.check(username);
        local.username = username;
        local.step = hasPassword ? 'password' : 'create';
      } catch (error) {
        local.error = error instanceof ApiError ? error.message : '网络异常，请重试';
      } finally {
        local.busy = false;
      }
      return true;
    }

    if (local.busy) return true;
    const password = String(data.get('password') ?? '');
    if (local.step === 'create') {
      const again = String(data.get('confirm') ?? '');
      if (password !== again) {
        local.error = '两次输入的密码不一致';
        return true;
      }
    }
    if (password.length < 6) {
      local.error = '密码至少 6 位';
      return true;
    }
    local.busy = true;
    local.error = '';
    try {
      if (local.step === 'create') await setup(local.username, password);
      else await login(local.username, password);
      notify.ok(local.step === 'create' ? '账号已创建，开始刷题吧' : `欢迎回来，${state.user}`);
      resetAuth();
    } catch (error) {
      local.error = error instanceof ApiError ? error.message : '登录失败，请重试';
    } finally {
      local.busy = false;
    }
    return true;
  }
  return false;
}
