-- migrations/legacy-upgrade.sql
-- 老库（users.password 明文、无 rate_limits 表）升级到 fixed 版结构。
-- 用法：wrangler d1 execute exam_db --remote --file=./migrations/legacy-upgrade.sql
-- 说明：ALTER TABLE RENAME COLUMN 需要 SQLite 3.25+，D1 已支持。
--      升级后老密码仍是明文，但登录时会自动校验并就地升级为 PBKDF2，无需用户改密。

-- 1) users: password -> password_hash
ALTER TABLE users RENAME COLUMN password TO password_hash;

-- 2) 限流表
CREATE TABLE IF NOT EXISTS rate_limits (
  bucket       TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  count        INTEGER NOT NULL DEFAULT 0
);

-- 3) 索引
CREATE INDEX IF NOT EXISTS idx_questions_user ON questions(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_wrong_user ON wrong_questions(user_id, created_at);

-- 4) 兜底：把历史上可能为 NULL 的 JSON 字段补成合法值，避免前端 JSON.parse 崩溃
UPDATE questions SET opts = '[]' WHERE opts IS NULL OR trim(opts) = '';
UPDATE questions SET a = '""' WHERE a IS NULL;
UPDATE wrong_questions SET opts = '[]' WHERE opts IS NULL OR trim(opts) = '';
UPDATE wrong_questions SET a = '""' WHERE a IS NULL;
UPDATE wrong_questions SET user_choice = '' WHERE user_choice IS NULL;

-- 注意：过去 questions-update.js 会把纯文本答案裸写进 a 列（没有 JSON.stringify），
-- 这些行用 SQL 无法安全批量修复（可能是 "1. 低水化热水泥" 这种带数字的文本）。
-- 修复版后端 normalizeAnswer() 已能兼容读取这类脏数据，无需手工处理。
