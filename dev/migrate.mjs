// dev/migrate.mjs —— 把 migrations/*.sql 按顺序应用到本地 SQLite（D1 本地开发用）
// 与 `wrangler d1 migrations apply` 行为一致：已应用的文件记录在 d1_migrations 表里，不会重复执行。
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS = path.resolve(HERE, '..', 'migrations');

export async function migrate(db, dir = MIGRATIONS, { quiet = false } = {}) {
  await db.exec(`CREATE TABLE IF NOT EXISTS d1_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  );`);

  const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort();
  const applied = new Set(
    (await db.prepare('SELECT name FROM d1_migrations').all()).results.map((r) => r.name),
  );

  const done = [];
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await readFile(path.join(dir, file), 'utf8');
    await db.exec('BEGIN');
    try {
      await db.exec(sql);
      await db.prepare('INSERT INTO d1_migrations (name) VALUES (?)').bind(file).run();
      await db.exec('COMMIT');
      done.push(file);
    } catch (error) {
      // 0003 这类「给老库补列」的迁移，在新库上会 duplicate column：视为已应用
      if (/duplicate column name/i.test(String(error.message))) {
        await db.exec('ROLLBACK');
        await db.prepare('INSERT OR IGNORE INTO d1_migrations (name) VALUES (?)').bind(file).run();
        done.push(file + '（列已存在，跳过）');
        continue;
      }
      await db.exec('ROLLBACK');
      throw new Error(`迁移 ${file} 失败：${error.message}`);
    }
  }

  if (!quiet) {
    console.log(done.length ? `已应用 ${done.length} 个迁移：${done.join(', ')}` : '数据库已是最新，无需迁移');
  }
  return done;
}

// 直接运行：node dev/migrate.mjs [db 文件路径]
if (process.argv[1] && process.argv[1].endsWith('migrate.mjs')) {
  const { DatabaseSync } = await import('node:sqlite');
  const file = process.argv[2] || process.env.DB_FILE || ':memory:';
  const db = new DatabaseSync(file);
  await migrate(db);
  db.close();
}
