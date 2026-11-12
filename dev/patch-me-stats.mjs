import fs from 'node:fs';

const p = 'web/src/views/me.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 引入统计与题型名
s = s.replace(
  "import { escapeHtml } from '../core/format';",
  "import { escapeHtml } from '../core/format';\nimport { TYPE_LABEL } from '../core/question-type';\nimport { summary as statsSummary } from '../core/stats';",
);

// 2) 计算统计
s = s.replace(
  "  return `\n    <div class=\"profile\">",
  `  const stats = statsSummary();
  const pct = (v: number) => (v > 0 ? \`\${Math.round(v * 100)}%\` : '—');
  const maxDay = Math.max(1, ...stats.days7.map((d) => d.n));

  return \`
    <div class="profile">`,
);

// 3) 插入练习记录卡片
s = s.replace(
  `    <div class="section-title">外观</div>`,
  `    <div class="section-title">练习记录</div>
    <div class="card card-pad">
      <div class="stat-grid">
        <div class="stat-cell">
          <span class="stat-big">\${stats.today.n}</span>
          <span class="stat-cap">今日答题</span>
        </div>
        <div class="stat-cell">
          <span class="stat-big">\${stats.total}</span>
          <span class="stat-cap">累计答题</span>
        </div>
        <div class="stat-cell">
          <span class="stat-big">\${pct(stats.rate)}</span>
          <span class="stat-cap">总正确率</span>
        </div>
      </div>

      \${
        stats.byType.length
          ? `<div class="type-stats">\${stats.byType
              .map(
                (t) => `
            <div class="type-row">
              <span class="type-name">\${TYPE_LABEL[t.type]}</span>
              <span class="type-bar"><i style="width:\${Math.round(t.rate * 100)}%"></i></span>
              <span class="type-val">\${t.ok}/\${t.n}</span>
            </div>`,
              )
              .join('')}</div>`
          : `<p class="muted small" style="margin:10px 0 0">还没有练习记录，去刷几题吧</p>`
      }

      \${
        stats.days7.length
          ? `<div class="days">
              \${stats.days7
                .map(
                  (d) =>
                    `<div class="day"><i style="height:\${Math.max(6, Math.round((d.n / maxDay) * 46))}px"></i><span>\${d.label}</span></div>`,
                )
                .join('')}
            </div>`
          : ''
      }

      <div class="row between" style="margin-top:14px">
        <span class="muted small">只统计本机练习；换设备不同步</span>
        <button class="btn btn-sm btn-ghost" data-act="clear-stats">清空记录</button>
      </div>
    </div>

    <div class="section-title">外观</div>`,
);

// 4) 清空记录动作
s = s.replace(
  "    case 'reset-bg':",
  `    case 'clear-stats': {
      const ok = await confirm({ title: '清空练习记录', message: '本机的答题统计会被清除，题库不受影响。', okText: '清空', danger: true });
      if (!ok) return true;
      clearStats();
      emit('render');
      notify.ok('练习记录已清空');
      return true;
    }
    case 'reset-bg':`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('me records card inserted:', s.includes('练习记录'));
