import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

if (!/import \{[^}]*openModal/.test(s)) {
  s = s.replace(
    "import { confirm",
    "import { confirm, openModal",
  );
}

s = s.replace(
  `    case 'search':
      return true;`,
  `    case 'type': {
    const next = el.dataset.type as TypeFilter | undefined;
    if (next) {
      ui.type = next;
      ui.page = 0;
    }
    return true;
  }
    case 'peek': {
      const id = Number(el.dataset.id);
      const q = bank().find((item) => item.id === id);
      if (!q) return true;
      await peekQuestion(q);
      return true;
    }
    case 'search':
      return true;`,
);

s = s.replace(
  `export function onBankInput(el: HTMLElement): boolean {`,
  `/** 只读预览：不打断复习节奏，扫一眼题干和答案就够了 */
async function peekQuestion(q: Question): Promise<void> {
  const type = detectType(q);
  const body = document.createElement('div');
  body.className = 'peek';
  body.innerHTML = \`
    <div class="peek-meta">
      <span class="tag tag-type">\${TYPE_LABEL[type]}</span>
      \${q.subject ? \`<span class="tag">\${escapeHtml(q.subject)}</span>\` : ''}
      \${q.chapter ? \`<span class="tag">\${escapeHtml(q.chapter)}</span>\` : ''}
    </div>
    <div class="peek-q q-text">\${renderRich(q.q)}</div>
    \${
      q.opts.length
        ? \`<ul class="peek-opts">\${q.opts
            .map((o, i) => {
              const hit = Array.isArray(q.a) ? q.a.includes(i) : q.a === i;
              return \`<li class="\${hit ? 'is-hit' : ''}"><b>\${String.fromCharCode(65 + i)}</b>\${renderRich(
                String(o).replace(/^\\s*[A-Ha-h]\\s*[.、．)：:]\\s*/, ''),
              )}</li>\`;
            })
            .join('')}</ul>\`
        : ''
    }
    <div class="peek-ans"><span class="muted">答案</span> \${escapeHtml(formatAnswer(q.a, q.opts) || '（无）')}</div>\`;

  const action = await openModal<'edit' | 'close'>({
    title: '题目预览',
    body,
    actions: [
      { label: '关闭', value: 'close' },
      { label: '编辑这题', value: 'edit', variant: 'primary' },
    ],
  });
  if (action === 'edit') await openEditor(q);
}

export function onBankInput(el: HTMLElement): boolean {`,
  );

if (!/formatAnswer/.test(s.split('\n').slice(0, 20).join('\n'))) {
  s = s.replace(
    "import { detectType, TYPE_LABEL } from '../core/question-type';",
    "import { detectType, TYPE_LABEL } from '../core/question-type';\nimport { formatAnswer } from '../core/format';",
  );
}

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('peek + type case added');
