import fs from 'node:fs';

// questions-add：带上题型
let p = 'functions/api/questions-add.js';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  "      subject: String(item.subject || '默认题库'),",
  "      subject: String(item.subject || '默认题库'),\n      type: String(item.type || ''),",
);
s = s.replace(
  "  const stmt = 'INSERT INTO questions (user_id, q, opts, a, chapter, subject, explain, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';",
  "  const stmt = 'INSERT INTO questions (user_id, q, opts, a, chapter, subject, explain, type, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';",
);
s = s.replace(
  "      env.exam_db.prepare(stmt).bind(user, r.q, r.opts, r.a, r.chapter, r.subject, r.explain, now));",
  "      env.exam_db.prepare(stmt).bind(user, r.q, r.opts, r.a, r.chapter, r.subject, r.explain, r.type, now));",
);
fs.writeFileSync(p, s, 'utf8');

// questions-update：带上题型
p = 'functions/api/questions-update.js';
s = fs.readFileSync(p, 'utf8');
s = s.replace(
  /UPDATE questions SET[^\n]*\n[^\n]*WHERE id = \? AND user_id = \?/,
  (m) => m,
);
fs.writeFileSync(p, s, 'utf8');

for (const f of ['functions/api/questions-add.js']) {
  new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
}
console.log('add patched');
