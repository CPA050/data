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
wrangler pages secret put ZAI_API_KEY     # 智谱 API Key
wrangler pages secret put AUTH_SECRET     # 任意长随机字符串，用于签发登录令牌

# 4) 部署
wrangler pages deploy .
```

**从老版本升级（不跑迁移也能直接部署）**：新代码会自动探测 `users` 表用的是 `password` 还是 `password_hash` 列。
老用户的明文密码不用重置——它会在下一次登录成功时自动升级成 PBKDF2 哈希。

唯一建议补的一步是限流表（全部是 `CREATE ... IF NOT EXISTS`，可重复执行）：

```bash
wrangler d1 execute exam_db --remote --file=./schema.sql
```

没有 `rate_limits` 表时限流会自动降级为关闭，并在日志里打一条告警（不会把登录接口打挂）。
`migrations/legacy-upgrade.sql` 是"把老列改名"的可选脚本，不改名也能正常跑。

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
migrations/           老库升级脚本
functions/
  _lib/               公共库：http 响应/错误、db 序列化、auth 哈希与令牌、session、限流
  api/                11 个接口：auth / questions* / wrong* / favorites* / ai
dev/
  server.mjs          在 Node 里跑 Pages Functions（D1 用 node:sqlite 模拟）
  d1.mjs              D1 兼容层
  seed.mjs            演示数据
  verify.mjs          接口回归测试
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
- PWA：manifest + Service Worker，可"添加到主屏幕"，题库接口 NetworkFirst 缓存
- 答题卡：选项状态色、连对鼓励、答错自动入错题本、键盘快捷键、打字机 AI 解析
- 错题/收藏/题库：搜索、科目筛选、批量选择、JSON 导出、AI 粘贴导入
- 无障碍：可缩放 viewport、`aria-*` 状态、焦点管理与 Esc 关闭弹窗、44px 触控目标

### 部署（两种方式，二选一）

**A. Cloudflare Pages 构建模式（推荐）**

仓库根目录已是项目根，Pages 设置里填：

| 配置项 | 值 |
|---|---|
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |

`functions/` 仍在仓库根目录，Pages 会自动识别并部署。

**B. 本地构建后直接上传**

```bash
npm run build
npm run deploy          # = wrangler pages deploy dist --project-name origin-quiz
```

切换前旧版静态文件仍在仓库根目录，即使暂时不构建也不会白屏。

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
| POST | `/api/ai` | `extract` / `explain` / `grade`（有每日配额） | Bearer |

统一响应约定：成功 `{ok:true, ...}`，失败 `{ok:false, success:false, error:"人话"}`，错误码走 HTTP status，不回传堆栈。

## 每日 AI 配额

| 类型 | 每人每天 | 说明 |
|---|---|---|
| 解析 / 批改（`explain` / `grade`） | 60 次 | glm-4-flash |
| 图片识别（`extract` + 图片） | 20 次 | glm-4v-flash，按张计费更高 |
| 全站兜底 | 3000 次/天 | 防止密钥被刷爆 |

改配额只需改 `functions/api/ai.js` 顶部的 `QUOTA` / `GLOBAL_DAILY_CAP`。
