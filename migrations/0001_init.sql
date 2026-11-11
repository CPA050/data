-- 0001_init.sql —— 初始结构（与 schema.sql 等价，供 wrangler d1 migrations apply 使用）
-- 全部 IF NOT EXISTS：对已经手工建过表的老库重复执行也安全。

CREATE TABLE IF NOT EXISTS users (
  username      TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS questions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    TEXT NOT NULL,
  q          TEXT NOT NULL,
  opts       TEXT NOT NULL DEFAULT '[]',
  a          TEXT NOT NULL DEFAULT '""',
  chapter    TEXT NOT NULL DEFAULT '',
  subject    TEXT NOT NULL DEFAULT '默认题库',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_questions_user ON questions(user_id, subject);

CREATE TABLE IF NOT EXISTS wrong_questions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     TEXT NOT NULL,
  q           TEXT NOT NULL,
  opts        TEXT NOT NULL DEFAULT '[]',
  a           TEXT NOT NULL DEFAULT '""',
  chapter     TEXT NOT NULL DEFAULT '',
  subject     TEXT NOT NULL DEFAULT '默认题库',
  user_choice TEXT NOT NULL DEFAULT '',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_wrong_user ON wrong_questions(user_id, created_at);

CREATE TABLE IF NOT EXISTS favorites (
  user_id     TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, question_id)
);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket       TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  count        INTEGER NOT NULL DEFAULT 0
);
