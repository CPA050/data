import fs from 'node:fs';

const p = 'web/src/styles/grid.css';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  `.q-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}`,
  `.q-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 13.5px;
}`,
);

s = s.replace(
  `.c-type,
.c-chapter,
.c-ans {
  white-space: nowrap;
  width: 1%;
}`,
  `.c-type {
  width: 62px;
  white-space: nowrap;
}

.c-chapter {
  width: 92px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.c-ans {
  width: 76px;
  white-space: nowrap;
}`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('table widths fixed');
