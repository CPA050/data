-- 解析字段 + 乐观锁版本号（多端同步冲突提示用）
ALTER TABLE questions ADD COLUMN explain TEXT DEFAULT '';
ALTER TABLE questions ADD COLUMN updated_at TEXT DEFAULT '';

UPDATE questions SET updated_at = COALESCE(NULLIF(updated_at, ''), created_at, datetime('now'));
UPDATE questions SET explain = '' WHERE explain IS NULL;

-- 错题本也带上解析，复习时不必再问 AI
ALTER TABLE wrong_questions ADD COLUMN explain TEXT DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_questions_updated ON questions(user_id, updated_at);
