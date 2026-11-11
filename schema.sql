-- schema.sql ‚Äî‚Äî Cloudflare D1 Âª∫Ë°®ËÑöÊú¨Ôºàfixed ÁâàÔºâ
-- ‰∏éËÄÅÂ∫ìÁöÑÂ∑ÆÂºÇÔºöusers Áî® password_hash Â≠ò PBKDF2ÔºõÊñ∞Â¢û rate_limits Ë°®ÔºõË°•Á¥¢Âºï„ÄÇ

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
  subject    TEXT NOT NULL DEFAULT 'ÈªòËÆ§È¢òÂ∫ì',
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
  subject     TEXT NOT NULL DEFAULT 'ÈªòËÆ§È¢òÂ∫ì',
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

-- AI Ω·π˚ª∫¥Ê£®”Î migrations/0002_ai_cache.sql µ»º€£¨π©÷ª≈‹ schema.sql µƒ¿œ¡˜≥Ã π”√£©
CREATE TABLE IF NOT EXISTS ai_cache (
  cache_key TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  payload TEXT NOT NULL,
  model TEXT,
  hits INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ai_cache_created ON ai_cache (created_at);
