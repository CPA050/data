import { describe, expect, it, vi } from 'vitest';

const QUESTIONS = [
  { id: 1, q: '混凝土养护时间不应少于多少天？', opts: ['3 天', '7 天', '14 天'], a: 1, chapter: '第三章', subject: '土木' },
  { id: 2, q: '他说："混凝土"养护要注意什么？', opts: [], a: '控温、保湿', chapter: '第三章', subject: '土木' },
];

const WRONG = [
  {
    id: 9,
    q: '大体积混凝土应选用哪种水泥？',
    opts: ['普通硅酸盐水泥', '低水化热水泥'],
    a: 1,
    answer: 'B. 低水化热水泥',
    user_choice: '0',
    user_choice_text: 'A. 普通硅酸盐水泥',
    chapter: '第三章',
    subject: '土木',
  },
];

function json(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ 'content-type': 'application/json; charset=utf-8' }),
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function installFetch(): ReturnType<typeof vi.fn> {
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  const mock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const body = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : {};
    calls.push({ url, body });

    if (url.startsWith('/api/auth')) {
      if (body.action === 'check') return json({ ok: true, hasPassword: true });
      if (body.action === 'login') return json({ ok: true, token: 'test-token', user: 'alice' });
      return json({ ok: true });
    }
    if (url.startsWith('/api/questions?')) return json(QUESTIONS);
    if (url.startsWith('/api/wrong?')) return json(WRONG);
    if (url.startsWith('/api/favorites?')) return json([]);
    if (url.startsWith('/api/wrong-delete')) return json({ ok: true, deleted: 1 });
    return json({ ok: false, error: '未知接口' }, 404);
  });
  (mock as unknown as { calls: unknown }).calls = calls;
  vi.stubGlobal('fetch', mock);
  return mock;
}

async function flush(times = 4): Promise<void> {
  for (let i = 0; i < times; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

const text = (): string => document.body.textContent ?? '';

describe('前端整体流程', () => {
  it('登录 → 首页 → 各 tab → 答题 → 主题切换', async () => {
    const fetchMock = installFetch();
    const { boot } = await import('./core/router');
    const { state } = await import('./core/app');

    boot();
    expect(text()).toContain('基准');

    // 1. 输入用户名
    const nameForm = document.querySelector<HTMLFormElement>('form[data-form="name"]')!;
    nameForm.querySelector<HTMLInputElement>('input[name="username"]')!.value = 'alice';
    nameForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush();
    expect(text()).toContain('欢迎回来');

    // 2. 输入密码并登录
    const loginForm = document.querySelector<HTMLFormElement>('form[data-form="login"]')!;
    loginForm.querySelector<HTMLInputElement>('input[name="password"]')!.value = '123456';
    loginForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(8);

    expect(state.authed).toBe(true);
    expect(text()).toContain('开始练习');
    expect(text()).toContain('题库');

    const authHeader = (fetchMock.mock.calls.find(([url]) => String(url).startsWith('/api/questions?'))?.[1] as RequestInit)
      ?.headers as Headers;
    expect(authHeader.get('Authorization')).toBe('Bearer test-token');

    // 3. 题库页
    document.querySelector<HTMLElement>('[data-tab="bank"]')!.click();
    await flush();
    expect(text()).toContain('混凝土养护时间不应少于多少天');

    // 4. 错题页显示了「你的选择」与「正确答案」
    document.querySelector<HTMLElement>('[data-tab="wrong"]')!.click();
    await flush();
    expect(text()).toContain('你的选择：A. 普通硅酸盐水泥');
    expect(text()).toContain('正确答案：B. 低水化热水泥');

    // 5. 首页开始随机练习并答对
    document.querySelector<HTMLElement>('[data-tab="home"]')!.click();
    await flush();
    // 顺序练习从第 1 题开始，选项固定，便于断言
    document.querySelector<HTMLElement>('[data-act="sequential"]')!.click();
    await flush(8);
    const quiz = document.querySelector('.quiz');
    expect(quiz).not.toBeNull();
    const opts = quiz!.querySelectorAll<HTMLElement>('[data-act="pick"]');
    expect(opts.length).toBeGreaterThan(0);
    opts[1].click();
    await flush(6);
    expect(quiz!.textContent).toContain('回答正确');

    // 6. 退出练习，回「我的」切主题
    quiz!.querySelector<HTMLElement>('[data-act="exit"]')!.click();
    await flush(6);
    document.querySelector<HTMLElement>('[data-tab="me"]')!.click();
    await flush();
    document.querySelector<HTMLElement>('[data-act="theme"][data-value="dark"]')!.click();
    await flush();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
