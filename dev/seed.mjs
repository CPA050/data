// dev/seed.mjs —— 演示数据（只在本地开发时使用）
import { hashPassword } from '../functions/_lib/auth.js';

export async function seed(db) {
  const hash = await hashPassword('123456');
  await db.prepare('INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)').bind('alice', hash).run();
  await db.prepare('INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)').bind('bob', hash).run();

  const q = db.prepare('INSERT INTO questions (user_id, q, opts, a, chapter, subject) VALUES (?, ?, ?, ?, ?, ?)');
  const rows = [
    ['alice', '普通硅酸盐水泥的初凝时间不得早于？', JSON.stringify(['A. 45min', 'B. 60min', 'C. 90min', 'D. 30min']), JSON.stringify(0), '建筑材料', '一建建筑'],
    ['alice', '大体积混凝土施工中，下列哪些措施可以降低水化热？', JSON.stringify(['A. 选用低水化热水泥', 'B. 掺加粉煤灰', 'C. 使用冰水拌合', 'D. 提高入模温度']), JSON.stringify([0, 1, 2]), '混凝土工程', '一建建筑'],
    ['alice', '简述大体积混凝土裂缝控制的要点。', JSON.stringify([]), JSON.stringify('1. 选用低水化热水泥；2. 控制入模温度；3. 分层浇筑；4. 加强养护'), '混凝土工程', '一建建筑'],
    ['alice', '施工组织设计应由谁审批？', JSON.stringify(['A. 项目经理', 'B. 企业技术负责人', 'C. 总监理工程师', 'D. 建设单位']), JSON.stringify(3), '施工管理', '一建管理'],
    ['bob', 'bob 的私有题目：不应被 alice 看到', JSON.stringify(['A. 是', 'B. 否']), JSON.stringify(0), '其他', '默认题库']
  ];
  for (const r of rows) await q.bind(...r).run();

  const w = db.prepare('INSERT INTO wrong_questions (user_id, q, opts, a, chapter, subject, user_choice) VALUES (?, ?, ?, ?, ?, ?, ?)');
  await w.bind('alice', rows[0][1], rows[0][2], rows[0][3], rows[0][4], rows[0][5], JSON.stringify(2)).run();
  await w.bind('alice', rows[1][1], rows[1][2], rows[1][3], rows[1][4], rows[1][5], JSON.stringify([1])).run();

  const f = db.prepare('INSERT OR IGNORE INTO favorites (user_id, question_id) VALUES (?, ?)');
  await f.bind('alice', 1).run();
  await f.bind('alice', 2).run();
}
