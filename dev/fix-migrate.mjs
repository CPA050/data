import fs from 'node:fs';

const p = 'dev/migrate.mjs';
let s = fs.readFileSync(p, 'utf8');

s = s.replace(
  `if (process.argv[1] && process.argv[1].endsWith('migrate.mjs')) {
  const { DatabaseSync } = await import('node:sqlite');
  const file = process.argv[2] || process.env.DB_FILE || ':memory:';
  const db = new DatabaseSync(file);
  await migrate(db);
  db.close();
}`,
  `if (process.argv[1] && process.argv[1].endsWith('migrate.mjs')) {
  const { D1Shim } = await import('./d1.mjs');
  const file = process.argv[2] || process.env.DB_FILE || ':memory:';
  const db = new D1Shim(file);
  await migrate(db);
}`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('migrate cli uses D1Shim');
