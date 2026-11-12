import fs from 'node:fs';

const p = 'web/src/features/search.ts';
let s = fs.readFileSync(p, 'utf8');

s = s.replace("import { openModal } from '../ui/modal';", "import { closeAllModals, openModal } from '../ui/modal';");
s = s.replace('  const modal = openModal<string>({', '  void openModal<string>({');
s = s.replace(
  `        const hit = all.find((item) => item.id === id && item.tab === tab);
        modal.then(() => undefined);
        // 关弹窗再跳，避免遮罩残留
        document.querySelector('.modal-layer')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        go(tab);`,
  `        const hit = all.find((item) => item.id === id && item.tab === tab);
        closeAllModals();
        go(tab);`,
);

fs.writeFileSync(p, s, 'utf8');
console.log('search.ts fixed');
