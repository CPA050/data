/** 单选 = index，多选 = index[]，简答 = 文本 */
export type Answer = number | number[] | string;

export interface Question {
  id: number;
  q: string;
  opts: string[];
  a: Answer;
  chapter: string;
  subject: string;
  created_at?: string;
}

export interface WrongItem extends Question {
  /** 已在服务端格式化好的正确答案文本 */
  answer: string;
  /** 原始作答（JSON 字符串） */
  user_choice: string;
  /** 已格式化的"你的选择" */
  user_choice_text: string;
}

export type ThemeName = 'auto' | 'light' | 'dark' | 'eye';

export interface Settings {
  theme: ThemeName;
  vibration: boolean;
  /** 答对后自动跳下一题的延迟（ms），0 = 不自动跳 */
  autoDelay: number;
  streakAlert: boolean;
}

export interface SessionContext {
  ids: number[];
  idx: number;
  source: QuizSource;
  savedAt: number;
}

export type QuizSource = 'all' | 'wrong' | 'fav' | 'chapter' | 'sequential';

export interface RecordItem {
  id: number;
  picked: number[];
  text: string;
  correct: boolean | null;
  submitted: boolean;
  time: number;
}

export interface QuestionDraft {
  q: string;
  opts?: string[];
  a?: Answer;
  chapter?: string;
  subject?: string;
}

export interface AiResult {
  ok: boolean;
  result: string;
  model?: string;
  remaining?: number;
}
