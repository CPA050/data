// 练习记录：本地聚合，不额外打服务端（刷新/换设备不丢的是题库，stattistics 属于本机行为）
import type { QuestionType } from './question-type';

const KEY = 'oq:log';
const CAP = 4000;

interface Entry {
  ts: number;
  type: QuestionType;
  ok: boolean;
}

function load(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as Entry[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function save(list: Entry[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(-CAP)));
  } catch {
    /* 隐私模式下静默失败 */
  }
}

export function record(type: QuestionType, ok: boolean): void {
  const list = load();
  list.push({ ts: Date.now(), type, ok });
  save(list);
}

export interface TypeStat {
  type: QuestionType;
  n: number;
  ok: number;
  rate: number;
}

export interface DayStat {
  label: string;
  n: number;
  ok: number;
}

/** 每天的目标题量，首页进度条用 */
export const DAILY_GOAL = 20;

export interface StatsSummary {
  total: number;
  ok: number;
  rate: number;
  today: { n: number; ok: number; rate: number };
  byType: TypeStat[];
  days: DayStat[];
  days7: DayStat[];
  /** 连续练习天数（今天没练就从昨天往前数） */
  streak: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function summary(): StatsSummary {
  const list = load();
  const todayKey = new Date().toDateString();
  const buckets = new Map<QuestionType, { n: number; ok: number }>();
  const dayMap = new Map<string, { n: number; ok: number; ts: number }>();

  let total = 0;
  let okTotal = 0;
  let todayN = 0;
  let todayOk = 0;

  for (const e of list) {
    const d = new Date(e.ts);
    total += 1;
    if (e.ok) okTotal += 1;
    if (d.toDateString() === todayKey) {
      todayN += 1;
      if (e.ok) todayOk += 1;
    }
    const b = buckets.get(e.type) ?? { n: 0, ok: 0 };
    b.n += 1;
    if (e.ok) b.ok += 1;
    buckets.set(e.type, b);

    const key = `${d.getMonth() + 1}-${pad(d.getDate())}`;
    const day = dayMap.get(key) ?? { n: 0, ok: 0, ts: d.setHours(0, 0, 0, 0) };
    day.n += 1;
    if (e.ok) day.ok += 1;
    dayMap.set(key, day);
  }

  const byType = [...buckets.entries()]
    .map(([type, v]) => ({ type, n: v.n, ok: v.ok, rate: v.n ? v.ok / v.n : 0 }))
    .sort((a, b) => b.n - a.n);

  const days = [...dayMap.entries()]
    .sort((a, b) => a[1].ts - b[1].ts)
    .map(([label, v]) => ({ label, n: v.n, ok: v.ok }));

  const dayKeys = new Set(list.map((e) => new Date(e.ts).toDateString()));
  let streak = 0;
  const cursor = new Date();
  if (!dayKeys.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
  while (dayKeys.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    total,
    ok: okTotal,
    rate: total ? okTotal / total : 0,
    today: { n: todayN, ok: todayOk, rate: todayN ? todayOk / todayN : 0 },
    byType,
    days,
    days7: days.slice(-7),
    streak,
  };
}

export function clearLog(): void {
  save([]);
}
