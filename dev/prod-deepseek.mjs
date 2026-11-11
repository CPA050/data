const BASE = 'https://data-1i1.pages.dev';
const user = 'zz_ds_' + Date.now().toString(36).slice(-5);
const password = '123456';

const post = async (path, body, token) => {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(token ? { authorization: 'Bearer ' + token } : {}) },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 200) };
  }
  return { status: res.status, json };
};

const reg = await post('/api/auth', { action: 'set', username: user, password });
console.log('注册', reg.status, reg.json.ok);
const token = reg.json.token;

const created = await post(
  '/api/questions-add',
  { user_id: user, questions: [{ q: '普通硅酸盐水泥的初凝时间不得早于？', opts: ['45min', '60min', '90min', '30min'], a: 0, chapter: '建筑材料', subject: '一建建筑' }] },
  token,
);
console.log('建题', created.status, JSON.stringify(created.json).slice(0, 60));

const explain = await post(
  '/api/ai',
  { action: 'explain', prompt: '普通硅酸盐水泥的初凝时间不得早于？\nA. 45min\nB. 60min\nC. 90min\nD. 30min\n正确答案：A' },
  token,
);
console.log('解析', explain.status, JSON.stringify({ provider: explain.json.provider, model: explain.json.model, cached: explain.json.cached, remaining: explain.json.remaining }));
console.log('内容', String(explain.json.result || '').replace(/\s+/g, ' ').slice(0, 90));

const explain2 = await post('/api/ai', { action: 'explain', prompt: '普通硅酸盐水泥的初凝时间不得早于？\nA. 45min\nB. 60min\nC. 90min\nD. 30min\n正确答案：A' }, token);
console.log('二次', explain2.status, JSON.stringify({ cached: explain2.json.cached, provider: explain2.json.provider }));

const grade = await post('/api/ai', { action: 'grade', prompt: '题目：简述大体积混凝土裂缝控制要点\n参考答案：1. 低水化热水泥 2. 控制入模温度 3. 分层浇筑 4. 加强养护\n学生答案：选低水化热水泥、控制入模温度、分层浇筑、加强养护' }, token);
console.log('阅卷', grade.status, JSON.stringify({ provider: grade.json.provider, model: grade.json.model }));
console.log('判语', String(grade.json.result || '').replace(/\s+/g, ' ').slice(0, 80));

const anon = await post('/api/ai', { action: 'explain', prompt: 'hi' });
console.log('匿名', anon.status, JSON.stringify(anon.json).slice(0, 60));

console.log('USER', user);
