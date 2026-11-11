// dev/check-cloudflare.mjs —— 部署链路自检：不启动 workerd 也能验证"能不能上 Cloudflare"
// 覆盖：wrangler.toml 关键字段、migrations 是否齐全、Pages Functions 能否打包、dist 构建产物是否完整
import { execFile } from 'node:child_process';
import { readFile, readdir, stat, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let pass = 0;
const fail = [];
const ok = (label, extra = '') => {
  pass++;
  console.log(`  ✓ ${label}${extra ? ` (${extra})` : ''}`);
};
const bad = (label, detail) => {
  fail.push(label);
  console.log(`  ✗ ${label}${detail ? `\n      ${detail}` : ''}`);
};

console.log('\nCloudflare 部署链路自检\n');

// 1. wrangler.toml
const tomlPath = path.join(ROOT, 'wrangler.toml');
const toml = await readFile(tomlPath, 'utf8').catch(() => '');
if (!toml) bad('wrangler.toml 存在', '文件缺失');
else {
  ok('wrangler.toml 存在');
  const checks = [
    [/^name\s*=\s*"[^"]+"/m, 'name'],
    [/^compatibility_date\s*=\s*"\d{4}-\d{2}-\d{2}"/m, 'compatibility_date'],
    [/pages_build_output_dir\s*=\s*"[^"]+"/m, 'pages_build_output_dir'],
    [/binding\s*=\s*"exam_db"/m, 'D1 绑定 exam_db'],
    [/database_id\s*=\s*"[^"]*"/m, 'database_id'],
  ];
  for (const [re, label] of checks) {
    if (re.test(toml)) ok(`wrangler.toml 含 ${label}`);
    else bad(`wrangler.toml 含 ${label}`);
  }
  if (/database_id\s*=\s*"(\s*|在这里填你的 database_id)"/m.test(toml)) {
    console.log('      ⚠ database_id 还是占位符，部署前记得填（wrangler d1 create exam_db 的输出）');
  }
}

// 2. migrations
const migDir = path.join(ROOT, 'migrations');
const files = (await readdir(migDir).catch(() => [])).filter((f) => f.endsWith('.sql')).sort();
if (!files.length) bad('migrations 目录有 .sql');
else if (!/^\d{4}_.+\.sql$/.test(files[0])) bad('migrations 文件按 0001_ 前缀命名', files.join(', '));
else ok('migrations 就绪', files.join(', '));

// 3. Pages Functions 打包
// 不用系统临时目录：这台机器上 %TEMP% 对 node 子进程不可写（Access is denied）
const out = path.join(ROOT, '.wf-build');
await rm(out, { recursive: true, force: true });
try {
  const wrangler = path.join(ROOT, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  await run(process.execPath, [wrangler, 'pages', 'functions', 'build', '--outdir', out], {
    cwd: ROOT,
    timeout: 180000,
    maxBuffer: 32 * 1024 * 1024,
    env: { ...process.env, CI: '1', WRANGLER_SEND_METRICS: 'false' },
  });
  const bundle = path.join(out, 'index.js');
  const size = (await stat(bundle)).size;
  const code = await readFile(bundle, 'utf8');
  const routes = ['auth', 'questions', 'wrong', 'favorites', 'ai'];
  const missing = routes.filter((r) => !code.includes(`/api/${r}`));
  if (missing.length) bad('Functions 打包包含全部路由', `缺少 ${missing.join(', ')}`);
  else ok('Functions 打包通过', `${(size / 1024).toFixed(0)} KB`);
  if (/onRequest(Get|Post)/.test(code)) ok('Pages 处理函数已注册');
  else bad('Pages 处理函数已注册');
} catch (error) {
  const detail = (error.stderr || error.stdout || error.message).toString().trim().split('\n').slice(-4).join(' / ');
  bad('Functions 打包通过', detail.slice(0, 400));
} finally {
  await rm(out, { recursive: true, force: true }).catch(() => {});
}

// 4. 构建产物
const distIndex = path.join(ROOT, 'dist', 'index.html');
if (await stat(distIndex).catch(() => null)) {
  const html = await readFile(distIndex, 'utf8');
  ok('dist/index.html 存在', `${(html.length / 1024).toFixed(1)} KB`);
  if (/manifest\.webmanifest/.test(html)) ok('dist 引用 PWA manifest');
  else console.log('      ⚠ dist/index.html 没有 manifest 链接');
  const assets = await readdir(path.join(ROOT, 'dist', 'assets')).catch(() => []);
  ok('dist/assets 产物', `${assets.length} 个文件`);
} else {
  bad('dist/index.html 存在', '先运行 npm run build');
}

console.log(`\n=== 部署自检：${pass} 通过 / ${fail.length} 失败 ===`);
if (fail.length) {
  console.log('失败项：' + fail.join('、'));
  process.exit(1);
}
console.log('可以部署：npm run deploy（或 Pages 构建命令 npm run build + 输出目录 dist）');
