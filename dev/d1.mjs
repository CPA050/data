// dev/d1.mjs —— 极简 D1 兼容层：用 Node 内置 node:sqlite 模拟 Cloudflare D1
// 支持 prepare/bind/first/all/run/batch，undefined 绑定值会像真 D1 一样报错
import { DatabaseSync } from 'node:sqlite';

function normalize(v, idx) {
  if (v === undefined) throw new Error(`D1_TYPE_ERROR: Type 'undefined' not supported for value [${idx}]`);
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (v === null) return null;
  return v;
}

class Stmt {
  constructor(db, sql, params = []) { this.db = db; this.sql = sql; this.params = params; }
  bind(...params) { return new Stmt(this.db, this.sql, params.map(normalize)); }
  _all() { return this.db.prepare(this.sql).all(...this.params).map(r => ({ ...r })); }
  _run() {
    const info = this.db.prepare(this.sql).run(...this.params);
    return { success: true, meta: { changes: Number(info.changes), last_row_id: Number(info.lastInsertRowid) }, results: [] };
  }
  async first(col) {
    const rows = this._all();
    if (!rows.length) return null;
    return col ? rows[0][col] : rows[0];
  }
  async all() { return { success: true, results: this._all(), meta: {} }; }
  async run() { return this._run(); }
  async raw() { return this._all().map(r => Object.values(r)); }
}

export class D1Shim {
  constructor(file = ':memory:') {
    this.db = new DatabaseSync(file);
    this.db.exec('PRAGMA foreign_keys = ON');
  }
  exec(sql) { this.db.exec(sql); }
  prepare(sql) { return new Stmt(this.db, sql); }
  async batch(stmts) {
    this.db.exec('BEGIN');
    try {
      const out = stmts.map(s => s._run());
      this.db.exec('COMMIT');
      return out;
    } catch (e) { this.db.exec('ROLLBACK'); throw e; }
  }
  async dump(table) { return this.db.prepare(`SELECT * FROM ${table}`).all().map(r => ({ ...r })); }
}
