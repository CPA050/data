-- 0003: 老库补列（wrong_questions 缺 chapter / user_choice）
-- 新库由 0001_init.sql 直接建全，跑这个迁移会因 "duplicate column" 失败；
-- dev/migrate.mjs 已把该错误视为「已应用」，wrangler 侧只对老库执行一次即可。

ALTER TABLE wrong_questions ADD COLUMN chapter TEXT DEFAULT '';
ALTER TABLE wrong_questions ADD COLUMN user_choice TEXT DEFAULT '';
