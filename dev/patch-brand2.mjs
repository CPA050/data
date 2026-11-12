import fs from 'node:fs';

const a = 'web/src/views/auth.ts';
let s = fs.readFileSync(a, 'utf8');

const mark = `<div class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 100 100" width="20" height="20" focusable="false">
          <rect x="19" y="19" width="62" height="62" fill="none" stroke="currentColor" stroke-width="11.5" />
          <circle cx="50" cy="50" r="14.5" fill="currentColor" />
        </svg>
      </div>`;

s = s.replace('<div class="brand-mark">原</div>', mark);
fs.writeFileSync(a, s, 'utf8');

const c = 'web/src/styles/responsive.css';
let t = fs.readFileSync(c, 'utf8');
t = t.replace(
  `.brand-mark {
  border-radius: 2px;
  background: #0a0c0f;
  color: #fff;
  font-weight: 700;
}`,
  `.brand-mark {
  border-radius: 2px;
  background: #0a0c0f;
  color: #fff;
  display: grid;
  place-items: center;
  flex: none;
}

.brand-mark svg {
  display: block;
}`,
);
fs.writeFileSync(c, t, 'utf8');

for (const f of [a, c]) new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(f));
console.log('brand mark -> framedot', s.includes('stroke-width="11.5"'));
