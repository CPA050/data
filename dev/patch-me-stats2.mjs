import fs from 'node:fs';

const p = 'web/src/views/me.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 引入统计与题型名
if (!s.includes("from '../core/stats'")) {
  s = s.replace(
    "import { escapeHtml } from '../core/format';",
    "import { escapeHtml } from '../core/format';\nimport { TYPE_LABEL } from '../core/question-type';\nimport { clearLog as clearStats, summary as statsSummary } from '../core/stats';",
  );
}

// 2) 计算统计（放在 return 之前）
if (!s.includes('const stats = statsSummary();')) {
  s = s.replace(
    '  return `\n    <div class="profile">',
    [
      '  const stats = statsSummary();',
      "  const pct = (v: number) => (v > 0 ? `${Math.round(v * 100)}%` : '—');",
      '  const maxDay = Math.max(1, ...stats.days7.map((d) => d.n));',
      '',
      '  return `',
      '    <div class="profile">',
    ].join('\n'),
  );
}

// 3) 插入练习记录卡片
const block = fs.readFileSync('dev/me-stats-block.txt', 'utf8');
if (!s.includes('class="stat-grid"')) {
  s = s.replace('    <div class="section-title">外观</div>', block);
}

// 4) 清空记录
if (!s.includes("case 'clear-stats'")) {
  s = s.replace(
    "    case 'reset-bg':",
    [
      "    case 'clear-stats': {",
      "      const okClear = await confirm({",
      "        title: '清空练习记录',",
      "        message: '本机的答题统计会被清除，题库不受影响。',",
      "        okText: '清空',",
      '        danger: true,',
      '      });',
      '      if (!okClear) return true;',
      '      clearStats();',
      "      emit('render');",
      "      notify.ok('练习记录已清空');",
      '      return true;',
      '    }',
      "    case 'reset-bg':",
    ].join('\n'),
  );
}

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('me card:', s.includes('class="stat-grid"'), '| clear:', s.includes("case 'clear-stats'"));
