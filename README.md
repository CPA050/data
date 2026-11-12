# 原点 · Origin（修复版）

一个"刷题 + 错题 + 收藏"的移动端 Web 应用。**Cloudflare Pages + Pages Functions + D1**，零框架、零构建。

> 本目录是基于原始仓库 `CPA050/data` 的修复版：修掉了 20+ 个真实 bug，补上了身份校验、密码哈希、限流、数据库结构和本地开发环境。
> 逐条问题说明见上级目录的 `BUG-REPORT.md`。

---

## 快速开始（本地，零依赖）

需要 **Node.js >= 22.5**（依赖内置的 `node:sqlite`，不需要 `npm install`）。

```bash
npm run dev        # 启动 http://127.0.0.1:8788
npm run check      # 跑 27 组接口回归测试
```

打开后可以用演示账号登录：**alice / 123456**（bob / 123456 是另一个用户，用来验证数据隔离）。

- 默认用**内存数据库**，重启即清空，方便反复试。
- 想持久化：`DB_FILE=./data/dev.db npm run dev`（Windows PowerShell 用 `$env:DB_FILE='./data/dev.db'; npm run dev`）。
- 本地**不会真的调用智谱 API**，`dev/server.mjs` 里有拦截器，会返回固定假数据，避免烧 key。

## 部署到 Cloudflare

```bash
# 1) 建库，把输出的 database_id 填进 wrangler.toml
wrangler d1 create exam_db

# 2) 建表
wrangler d1 execute exam_db --remote --file=./schema.sql

# 3) 配置密钥（不要写进代码或 wrangler.toml）
wrangler pages secret put DEEPSEEK_API_KEY   # DeepSeek API Key（默认用它做解析/批改/归类）
wrangler pages secret put ZAI_API_KEY        # 智谱 API Key（图片识别必须用视觉模型）
wrangler pages secret put AUTH_SECRET        # 任意长随机字符串，用于签发登录令牌

# 4) 部署
wrangler pages deploy .
```

**AI 上游可以换**：默认优先用 DeepSeek（`deepseek-flash`），文本和图片都走它；没配 DeepSeek 时
自动回落到智谱（文本 `glm-4-flash` / 图片 `glm-4v-flash`）。想强制某一家就再配一个普通环境变量：

```bash
wrangler pages secret put AI_PROVIDER   # 值填 deepseek 或 zhipu，留空则自动挑
```

| 场景 | 用哪家 | 模型 |
| --- | --- | --- |
| 解析 / 批改 / 归类 | DeepSeek（配了 key 时） | `deepseek-flash` |
| 解析 / 批改 / 归类 | 智谱（没配 DeepSeek key 时） | `glm-4-flash` |
| 图片识别 | DeepSeek（配了 key 时） | `deepseek-flash`（支持图片输入） |

**从老版本升级（不跑迁移也能直接部署）**：新代码会自动探测 `users` 表用的是 `password` 还是 `password_hash` 列。
老用户的明文密码不用重置——它会在下一次登录成功时自动升级成 PBKDF2 哈希。

唯一建议补的一步是限流表（全部是 `CREATE ... IF NOT EXISTS`，可重复执行）：

```bash
wrangler d1 execute exam_db --remote --file=./schema.sql
```

没有 `rate_limits` 表时限流会自动降级为关闭，并在日志里打一条告警（不会把登录接口打挂）。
`docs/legacy-upgrade.sql` 是"把老列改名"的可选脚本，不改名也能正常跑。

## 目录结构

```
web/                  v2 前端源码（Vite + TypeScript，零框架）
  index.html          入口
  src/core/           状态、接口、存储、格式化、路由
  src/views/          首页 / 题库 / 错题 / 收藏 / 我的 / 答题 / 登录
  src/styles/         设计 token（浅色 / 深色 / 护眼）与组件样式
  src/features/       练习会话、AI 能力
dist/                 构建产物（Pages 部署目录）
index.html            旧版单页应用（保留作回退，构建模式下不再使用）
app.js                旧版前端逻辑（QuizApp 全局对象，仅回退用）
style.css
wrong.html            独立的错题页（与 SPA 错题页功能重复，见 BUG-REPORT）
favicon.png
schema.sql            D1 建表语句
wrangler.toml         Pages 配置 + D1 绑定
migrations/           D1 迁移（0001_init.sql，本地/线上共用）
docs/                老库升级脚本等文档
functions/
  _lib/               公共库：http 响应/错误、db 序列化、auth 哈希与令牌、session、限流
  api/                11 个接口：auth / questions* / wrong* / favorites* / ai
dev/
  server.mjs          在 Node 里跑 Pages Functions（D1 用 node:sqlite 模拟）
  d1.mjs              D1 兼容层
  seed.mjs            演示数据
  verify.mjs          接口回归测试
  migrate.mjs         本地按序应用 migrations/*.sql
  check-cloudflare.mjs  部署链路自检（toml / 迁移 / Functions 打包 / dist）
  shots.mjs           用本机 Edge 拍界面截图（可选，需 playwright-core）
```

## v2 前端（Vite + TypeScript）

旧版是"一个 136 KB 的 app.js 拼 innerHTML"。v2 把它重写成有类型的模块，**依然是零框架、零运行时依赖**：
构建后只有一份压缩过的 JS + CSS，交互全部走事件委托，视图函数返回字符串再整体替换，逻辑与样式彻底分离。

```bash
npm install            # 首次
npm run dev            # 终端 1：后端（http://127.0.0.1:8788）
npm run dev:web        # 终端 2：前端（http://localhost:5173，/api 自动代理到 8788）
npm run build          # 类型检查 + 打包到 dist/
npm test               # vitest：格式化 / 组件流程
```

界面能力：

- 设计 token + 三套主题（跟随系统 / 明亮 / 深色 / 护眼），`prefers-reduced-motion` 自动降级动画
- PWA：manifest + Service Worker，可"添加到主屏幕"，题库接口 NetworkFirst 缓存，**断网也能打开首屏**
  （`npm run build && npm run check:offline` 会用本机 Edge 断网复测：SW 激活、预缓存 > 0、离线首屏可渲染）
- 答题卡：选项状态色、连对鼓励、答错自动入错题本、键盘快捷键、打字机 AI 解析
- 错题/收藏/题库：搜索、科目筛选、批量选择、JSON 导出
- 导入题库（题库页右上角「⇪」）：**JSON / TXT / Markdown / CSV / Word(.docx) / 图片 / 直接粘贴**，
  前端先本地解析（`web/src/features/import.ts`，Word 用 `fflate` 解 `word/document.xml`），解析不出再让 AI 读
  - 文本格式：`1. 题干` + `A. 选项` + `答案：A` + 可选 `章节：` / `科目：` / `解析：`
  - JSON 格式：`[{q,opts,a}]`、`{questions:[...]}`、`{data:[...]}` 都认，也认 `题目/选项/答案/章节/科目` 中文键
  - 图片：选完自动识别，识别结果进预览区，确认后再写库
- 无障碍：可缩放 viewport、`aria-*` 状态、焦点管理与 Esc 关闭弹窗、44px 触控目标

### 部署（三种方式，按你的 Pages 项目类型选一种）

**A. Cloudflare Pages 构建模式（推荐，需要能进后台改配置）**

仓库根目录已是项目根，Pages 设置里填：

| 配置项 | 值 |
|---|---|
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |

`functions/` 仍在仓库根目录，Pages 会自动识别并部署。

**B. 零配置部署（Pages 没有构建命令时用这个）**

默认情况下 Pages 直接把仓库根目录当静态站点发布。仓库根目录里的
`index.html + assets/ + sw.js` 就是 v2 前端的构建产物，所以**什么都不用配**，
推上去重新部署就是新版：

```bash
npm run build && npm run sync:root   # 改了前端后，重新生成根目录产物
```

> 只改后端（`functions/`）不需要重跑，Pages 会直接部署函数。

**C. 本地构建后直接上传**

```bash
npm run build
npm run deploy          # = wrangler pages deploy dist --project-name origin-quiz
```

## 数据库与迁移

线上和本地用**同一份** `migrations/*.sql`，本地开发不再单独维护建表脚本。

```bash
# 本地：把 migrations 应用到开发库（默认内存库，DB_FILE 可指定文件）
npm run db:migrate:local

# 本地：灌演示数据（alice / bob，密码 123456）
npm run db:seed:local

# 线上：先建库，把 database_id 填进 wrangler.toml，再迁移
wrangler d1 create exam_db
npm run db:migrate          # = wrangler d1 migrations apply exam_db --remote
```

`dev/migrate.mjs` 会像 D1 一样把已执行的文件记在 `d1_migrations` 表里，重复执行不会重跑；
`npm run dev` 启动时也会自动迁移，所以本地永远是最新结构。

老库升级：`docs/legacy-upgrade.sql`（可选，把 `users.password` 改名成 `password_hash`）。
不跑也能上线——后端会自动探测列名，明文密码在下次登录成功时升级为 PBKDF2。

### 部署前自检

```bash
npm run build && npm run cf:check
```

`cf:check` 会验证：wrangler.toml 关键字段、`database_id` 是否还是占位符、migrations 命名、
Pages Functions 能否打包（实际跑一遍 esbuild）、`dist/` 产物是否完整。12 项全绿再发布。

> 想用 Cloudflare 官方运行时本地跑：`npm run dev:cf`（`wrangler pages dev`）。
> 它依赖 workerd 原生二进制；在个别 Windows 环境（如精简版系统/受限容器）workerd 启动会
> `std::terminate()`，此时用 `npm run dev`（node:sqlite 模拟 D1）即可，功能一致。

## 接口一览

| 方法 | 路径 | 说明 | 鉴权 |
|---|---|---|---|
| POST | `/api/auth` | `check` / `set` / `login` / `change` / `logout` | 否 |
| GET | `/api/questions?user_id=&subject=` | 题库 | Bearer |
| POST | `/api/questions-add` | 批量导入（≤2000） | Bearer |
| POST | `/api/questions-update` | 修改题目 | Bearer |
| POST | `/api/questions-delete` | 批量删除（≤500） | Bearer |
| GET | `/api/wrong?user_id=` | 错题（含你的选择/正确答案） | Bearer |
| POST | `/api/wrong-add` | 记一道错题 | Bearer |
| POST | `/api/wrong-delete` | 删除错题 | Bearer |
| GET | `/api/favorites?user_id=` | 收藏列表 | Bearer |
| POST | `/api/favorites-add` / `favorites-remove` | 收藏增删 | Bearer |
| POST | `/api/ai` | `extract` / `explain` / `grade` / `classify`（有每日配额，支持 `stream:true`） | Bearer |

统一响应约定：成功 `{ok:true, ...}`，失败 `{ok:false, success:false, error:"人话"}`，错误码走 HTTP status，不回传堆栈。

## AI 能力

| 能力 | 用法 | 说明 |
|---|---|---|
| 流式解析 | `POST /api/ai {action:"explain", prompt, stream:true}` | 返回 `text/event-stream`，每帧 `data:{"delta":"…"}`，结束 `data:{"done":true,"cached":false}`；前端边收边渲染，首字从 2~5 秒降到几百毫秒 |
| 结果缓存 | 自动 | 同一道题（题干+选项+答案哈希）7 天内重复解析直接命中 `ai_cache`，**不扣配额、不再调用上游**；命中时返回 `cached:true` |
| 智能归类 | `POST /api/ai {action:"classify", prompt}` | 返回 `{"subject":"…","chapter":"…"}`；题库编辑弹窗里的「✦ AI 归类」按钮就是它 |
| 图片识别 | `{action:"extract", imageBase64:"data:image/…"}` | deepseek-flash（或 glm-4v-flash），图片过大（>8MB base64）会被拒 |

缓存清理（可选）：

```sql
DELETE FROM ai_cache WHERE created_at < datetime('now', '-7 day');
```

## 每日 AI 配额

| 类型 | 每人每天 | 说明 |
|---|---|---|
| 解析 / 批改 / 归类（`explain` / `grade` / `classify`） | 60 次 | `deepseek-flash`（未配 DeepSeek key 时回落 `glm-4-flash`） |
| 图片识别（`extract` + 图片） | 20 次 | 视觉模型，按张计费更高 |
| AI 出题（`generate`） | 60 次（每次最多 20 道，约 1200 道/天） | 前端按 20 道一批循环调用，本地去重 |
| 全站兜底 | 3000 次/天 | 防止密钥被刷爆 |

改配额只需改 `functions/api/ai.js` 顶部的 `QUOTA` / `GLOBAL_DAILY_CAP`。出题调用的 `max_tokens` 给到 8000、`temperature` 0.8，避免 20 道题被截断。

**批量出题**：题库页「✦ 出题」里可选 10–1000 道。前端每批 20 道调用一次模型，边生成边去重（题干归一化后取前 40 字比对，也跟题库已有题目比对），生成中可随时取消；同一批连续 3 次没有新题会自动停下。图片类示意图由本地 SVG 绘制，不消耗模型额度。


## 题目里怎么写图片和公式

**图片**：题库页「编辑/添加题目」→ 题干下方的「＋ 插入图片」，选图即可。图片会在浏览器里压到最长边 1400px 的 JPEG（约几十 KB），以 `<img src="data:image/jpeg;base64,…">` 内联进题干，跟题目一起存进 D1，不依赖图床、导出/导入都不丢。

也可以直接粘贴外链图片：`<img src="https://example.com/a.png">`（只放行 http(s)、data:image、blob 和站内路径）。

**公式**：用 LaTeX 写，渲染走 KaTeX 的 MathML 输出（不额外加载字体，首屏体积为零）。

| 写法 | 效果 |
|---|---|
| `$q=20\\,\\text{kN/m}$` | 行内公式 |
| `$$\\frac{qL^2}{8}$$` | 独立成行的分式 |
| `\\(a^2+b^2=c^2\\)` | 行内（备选写法） |
| `\\[\\int_0^1 x\\,dx\\]` | 独立成行（备选写法） |

编辑弹窗里点「＋ 插入公式」会把选中的文字自动包成 `$…$`；没选中就插入 `$公式$` 占位符。

> 从 Word/PDF 截图导入时，AI 会把公式解析成 LaTeX（识别质量取决于截图清晰度）；Word 原生公式（OMML）在 docx 纯文本解析里会退化成字符，建议用截图走 AI 识别。
