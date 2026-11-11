const BASE = 'http://127.0.0.1:8788';

const login = await fetch(BASE + '/api/auth', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'login', username: 'alice', password: '123456' }),
});
const session = await login.json();
const q = '测试 $x^2$ <img src="data:image/jpeg;base64,AAAA">';
const res = await fetch(BASE + '/api/questions-add', {
  method: 'POST',
  headers: { 'content-type': 'application/json', authorization: 'Bearer ' + session.token },
  body: JSON.stringify({ questions: [{ q, opts: ['A. 1'], a: 'A' }] }),
});
console.log('add =>', res.status, await res.text());
