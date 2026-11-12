// dev/sync-root.mjs —— 把 dist/ 的构建产物同步到仓库根目录
// 用途：Cloudflare Pages 如果没配构建命令（直接把仓库根目录当静态站点），
//       根目录就是线上内容；同步一次即可让线上切到 v2 前端，不必进后台改配置。
// 用法：npm run build && npm run sync:root
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(DIST))) {
  console.error('找不到 dist/，先跑 npm run build');
  process.exit(1);
}

// 2. 清掉旧的 assets，避免哈希文件名越积越多
await rm(path.join(ROOT, 'assets'), { recursive: true, force: true });
await mkdir(path.join(ROOT, 'assets'), { recursive: true });

// 3. 复制 dist 产物到根目录
const entries = await readdir(DIST, { withFileTypes: true });
for (const entry of entries) {
  const from = path.join(DIST, entry.name);
  const to = path.join(ROOT, entry.name);
  await cp(from, to, { recursive: true });
  console.log(`  ${entry.isDirectory() ? '目录' : '文件'} ${entry.name}`);
}

console.log('\n✅ 已同步 dist → 仓库根目录（Pages 无构建配置也能直接上线 v2 前端）');
