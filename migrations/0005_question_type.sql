-- 0005_question_type.sql —— 题目标注题型（single/multi/judge/blank/essay/calc）
-- 老数据留空，前端用 detectType() 猜；作者在编辑器里显式选过就以 type 为准。
ALTER TABLE questions ADD COLUMN type TEXT DEFAULT '';
ALTER TABLE wrong_questions ADD COLUMN type TEXT DEFAULT '';
