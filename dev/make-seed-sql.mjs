// dev/make-seed-sql.mjs —— 生成 wrangler d1 execute 可用的本地演示数据 SQL
// 用法：node dev/make-seed-sql.mjs > dev/seed.local.sql
// 生成的 SQL 幂等（INSERT OR IGNORE / 只在表为空时插题目），可重复执行。
import { hashPassword } from '../functions/_lib/auth.js';

const hash = await hashPassword('123456');
const esc = (s) => String(s).replace(/'/g, "''");

const lines = [];
lines.push('-- 由 dev/make-seed-sql.mjs 生成，请勿手改');
lines.push("INSERT OR IGNORE INTO users (username, password_hash) VALUES ('alice', '" + esc(hash) + "');");
lines.push("INSERT OR IGNORE INTO users (username, password_hash) VALUES ('bob', '" + esc(hash) + "');");

const rows = [
  ['alice', '普通硅酸盐水泥的初凝时间不得早于？', ['A. 45min', 'B. 60min', 'C. 90min', 'D. 30min'], 0, '建筑材料', '一建建筑'],
  ['alice', '大体积混凝土施工中，下列哪些措施可以降低水化热？', ['A. 选用低水化热水泥', 'B. 掺加粉煤灰', 'C. 使用冰水拌合', 'D. 提高入模温度'], [0, 1, 2], '混凝土工程', '一建建筑'],
  ['alice', '简述大体积混凝土裂缝控制的要点。', [], '1. 选用低水化热水泥；2. 控制入模温度；3. 分层浇筑；4. 加强养护', '混凝土工程', '一建建筑'],
  ['alice', '施工组织设计应由谁审批？', ['A. 项目经理', 'B. 企业技术负责人', 'C. 总监理工程师', 'D. 建设单位'], 3, '施工管理', '一建管理'],
  ['bob', 'bob 的私有题目：不应被 alice 看到', ['A. 是', 'B. 否'], 0, '其他', '默认题库'],
];

lines.push('');
lines.push('-- 题目：只在题库为空时插入，避免重复执行后出现多份');
for (const [user, q, opts, a, chapter, subject] of rows) {
  lines.push(
    `INSERT INTO questions (user_id, q, opts, a, chapter, subject) SELECT '${esc(user)}', '${esc(q)}', '${esc(
      JSON.stringify(opts),
    )}', '${esc(JSON.stringify(a))}', '${esc(chapter)}', '${esc(subject)}' WHERE NOT EXISTS (SELECT 1 FROM questions WHERE user_id = '${esc(
      user,
    )}' AND q = '${esc(q)}');`,
  );
}

lines.push('');
lines.push('-- 错题：只在错题本为空时插');
lines.push(
  `INSERT INTO wrong_questions (user_id, q, opts, a, chapter, subject, user_choice) SELECT 'alice', q, opts, a, chapter, subject, '2' FROM questions WHERE user_id = 'alice' AND q LIKE '普通硅酸盐水泥%' AND NOT EXISTS (SELECT 1 FROM wrong_questions WHERE user_id = 'alice');`,
);
lines.push(
  `INSERT INTO wrong_questions (user_id, q, opts, a, chapter, subject, user_choice) SELECT 'alice', q, opts, a, chapter, subject, '[1]' FROM questions WHERE user_id = 'alice' AND q LIKE '大体积混凝土施工中%' AND (SELECT COUNT(*) FROM wrong_questions WHERE user_id = 'alice') = 1;`,
);
lines.push('');
lines.push("INSERT OR IGNORE INTO favorites (user_id, question_id) SELECT 'alice', id FROM questions WHERE user_id = 'alice' ORDER BY id LIMIT 2;");

console.log(lines.join('\n'));
