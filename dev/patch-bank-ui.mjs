import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) ui 增加题型筛选
s = s.replace(
  `const ui = {
  search: '',
  subject: 'all',
  edit: false,
  page: 0,
  selected: new Set<number>(),
};`,
  `type TypeFilter = 'all' | 'single' | 'multi' | 'judge' | 'blank' | 'essay';

const ui = {
  search: '',
  subject: 'all',
  type: 'all' as TypeFilter,
  edit: false,
  page: 0,
  selected: new Set<number>(),
};`,
);

s = s.replace(
  `export function resetBank(): void {
  ui.search = '';
  ui.subject = 'all';`,
  `export function resetBank(): void {
  ui.search = '';
  ui.subject = 'all';
  ui.type = 'all';`,
);

// 2) filtered() 加上题型过滤
s = s.replace(
  `    if (ui.subject !== 'all' && (q.subject || '默认题库') !== ui.subject) return false;`,
  `    if (ui.subject !== 'all' && (q.subject || '默认题库') !== ui.subject) return false;
    if (ui.type !== 'all' && detectType(q) !== ui.type) return false;`,
);

// 3) 展示：统计条 + 题型 chips
s = s.replace(
  `  const tableRows = pageRows`,
  `  const all = bank();
  const counts: Record<string, number> = { single: 0, multi: 0, judge: 0, blank: 0, essay: 0 };
  all.forEach((q) => {
    counts[detectType(q)] += 1;
  });
  const typeChips = (
    [
      ['all', '全部', all.length],
      ['single', '单选', counts.single],
      ['multi', '多选', counts.multi],
      ['judge', '判断', counts.judge],
      ['blank', '填空', counts.blank],
      ['essay', '简答', counts.essay],
    ] as Array<[TypeFilter, string, number]>
  )
    .filter(([key, , n]) => key === 'all' || n > 0)
    .map(
      ([key, label, n]) =>
        \`<button class="chip" data-act="type" data-type="\${key}" aria-pressed="\${ui.type === key}">\${label} <span class="chip-n">\${n}</span></button>\`,
    )
    .join('');

  const tableRows = pageRows`,
);

s = s.replace(
  `    <div class="chips">\${chips}</div>`,
  `    <div class="chips">\${chips}</div>
    <div class="chips chips-type">\${typeChips}</div>`,
);

// 4) 行可点：查看题目详情（只在非批量模式）
s = s.replace(
  `      return \`<tr class="q-row \${ui.edit ? 'selectable' : ''}" data-id="\${q.id}">`,
  `      return \`<tr class="q-row \${ui.edit ? 'selectable' : 'is-clickable'}" data-id="\${q.id}" \${
        ui.edit ? '' : 'data-act="peek"'
      }>`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('stats + type filter + row peek markup');
