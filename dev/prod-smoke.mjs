const BASE = 'https://data-1i1.pages.dev';
const user = 'qa_' + Math.random().toString(36).slice(2, 8);

const post = async (path, body, token) => {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status: res.status, json };
};

const get = async (path, token) => {
  const res = await fetch(BASE + path, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status: res.status, json };
};

const set = await post('/api/auth', { action: 'set', username: user, password: 'test123456' });
console.log('注册:', set.status, JSON.stringify(set.json).slice(0, 120));
const token = set.json && set.json.token;

const add = await post('/api/questions-add', { user_id: user, questions: [{ q: '线上冒烟题', opts: ['aa', 'bb'], a: 'A' }] }, token);
console.log('导入:', add.status, JSON.stringify(add.json).slice(0, 120));

const list = await get('/api/questions?user_id=' + user, token);
console.log('题库:', list.status, JSON.stringify(list.json).slice(0, 160));

const noAuth = await get('/api/questions?user_id=' + user);
console.log('未登录访问:', noAuth.status, JSON.stringify(noAuth.json).slice(0, 120));

const cross = await get('/api/questions?user_id=shlqm', token);
console.log('越权访问他人:', cross.status, JSON.stringify(cross.json).slice(0, 120));

console.log('TEST_USER=' + user);
