// functions/_lib/schema.js —— 兼容"老库 / 新库"结构差异
// 线上历史库里 users 表的密码列叫 password（且是明文）；新 schema 改名为 password_hash。
// 这里做一次探测并缓存，避免为了改密码列而强依赖用户先跑迁移。

let cachedPasswordColumn = null;

export async function usersPasswordColumn(env) {
  if (cachedPasswordColumn) return cachedPasswordColumn;
  let col = 'password_hash';
  try {
    const res = await env.exam_db.prepare('PRAGMA table_info(users)').all();
    const cols = (res && res.results ? res.results : []).map(r => String(r.name || '').toLowerCase());
    if (cols.length) col = cols.includes('password_hash') ? 'password_hash' : 'password';
  } catch (e) {
    // PRAGMA 不支持时按新库处理；写入失败会由调用方抛错
  }
  cachedPasswordColumn = col;
  return col;
}
