# Vercel KV 存储配置指南

由于 Vercel 的无服务器环境文件系统是**只读的**，我们需要使用 Vercel KV（基于 Redis）来存储博客文章数据。

---

## 🚀 快速配置步骤

### 1. 在 Vercel 项目中创建 KV 数据库

#### 方法 A：通过 Vercel Marketplace（推荐 - 新版界面）

1. **登录 Vercel Dashboard**
   - 访问 https://vercel.com/dashboard
   - 选择你的项目 `authmationblog`

2. **进入 Marketplace**
   - 点击顶部菜单的 **"Storage"**（存储）标签
   - 如果看到提示 "KV and Postgres are now available through the Marketplace"
   - 点击 **"Browse Marketplace"** 按钮
   - 或直接访问：https://vercel.com/marketplace

3. **创建 KV 数据库**
   - 在 Marketplace 中搜索或找到 **"Vercel KV"**
   - 点击 **"Add Integration"** 或 **"Create"**
   - 数据库名称: `blog-posts-kv`
   - 区域: 选择离你最近的区域（如 `sin1` - Singapore）
   - 定价计划: 选择 **"Hobby"**（免费）
   - 点击 **"Create & Continue"**

4. **连接到项目**
   - 在下一个页面，勾选你的项目 `authmationblog`
   - 点击 **"Connect"**
   - Vercel 会自动添加以下环境变量：
     - `KV_URL`
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`

5. **重新部署**
   - 环境变量添加后，需要重新部署项目
   - 返回项目页面，点击 **"Deployments"**
   - 点击最新部署右侧的 **"..."** 菜单
   - 选择 **"Redeploy"**

#### 方法 B：通过 Vercel Dashboard（旧版界面）

如果你的界面还是旧版：

1. **登录 Vercel Dashboard**
   - 访问 https://vercel.com/dashboard
   - 选择你的项目 `authmationblog`

2. **创建 KV 数据库**
   - 点击顶部菜单的 **"Storage"**
   - 点击 **"Create Database"**
   - 选择 **"KV"** (Redis)
   - 数据库名称: `blog-posts-kv`
   - 区域: Singapore (sin1)
   - 点击 **"Create"**

3. **连接到项目**
   - 点击 **"Connect to Project"**
   - 选择 `authmationblog`
   - 点击 **"Connect"**

4. **重新部署**（同上）

#### 方法 B：通过 Vercel CLI

```bash
# 安装 Vercel CLI（如果还没安装）
npm install -g vercel

# 登录
vercel login

# 进入项目目录
cd e:/code/000git/025authmaitonblog

# 链接到 Vercel 项目
vercel link

# 创建 KV 存储（需要手动在 Dashboard 创建）
# 然后拉取环境变量
vercel env pull .env.local

# 部署到生产环境
vercel --prod
```

---

## 🔧 本地开发配置

### 1. 创建本地环境变量文件

创建或更新 `.env.local` 文件：

```bash
# API 密钥
API_SECRET_KEY=your-super-secret-api-key-change-this
JWT_SECRET=your-jwt-secret-key-32-chars-or-longer

# Vercel KV (会在执行 vercel env pull 后自动添加)
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."
```

### 2. 拉取 Vercel 环境变量（推荐）

```bash
vercel env pull .env.local
```

这会自动下载 Vercel 上配置的所有环境变量。

### 3. 本地测试

```bash
npm run dev
```

访问 http://localhost:3000 测试本地开发环境。

---

## 📊 Vercel KV 免费配额

Vercel KV 免费计划（Hobby）提供：
- ✅ **256 MB 存储空间**
- ✅ **每天 3,000 次命令执行**
- ✅ **每月 100 GB 带宽**

对于博客系统来说完全够用！

**估算存储容量**：
- 每篇文章约 5-10 KB
- 256 MB ≈ 可存储 **25,000-50,000 篇文章**

---

## 🧪 测试 KV 存储

### 使用 n8n 工作流测试

1. 打开 n8n 并导入 `1-simple-post-workflow.json`
2. 更新 API URL 和 API Key
3. 执行工作流
4. 应该成功创建文章

### 使用 curl 测试

```bash
# 创建文章
curl -X POST https://authmationblog.vercel.app/api/posts \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "KV 测试文章",
    "content": "这是存储在 Vercel KV 中的文章",
    "excerpt": "测试摘要",
    "author": "测试员",
    "locale": "zh",
    "status": "published"
  }'

# 获取文章列表
curl https://authmationblog.vercel.app/api/posts?locale=zh
```

### 使用 PowerShell 测试

```powershell
# 编辑 test-api.ps1 中的 API_KEY
.\test-api.ps1
```

---

## 📝 数据结构

### KV 存储结构

```
posts:en                 → Set (包含所有英文文章 ID)
posts:zh                 → Set (包含所有中文文章 ID)
post:en:1733356800123   → Hash (单个英文文章数据)
post:zh:1733356800123   → Hash (单个中文文章数据)
```

### Post 对象结构

```json
{
  "id": "1733356800123",
  "title": "文章标题",
  "slug": "article-slug",
  "content": "文章内容（Markdown）",
  "excerpt": "文章摘要",
  "author": "作者名",
  "locale": "zh",
  "status": "published",
  "publishedAt": "2024-12-04T12:00:00.000Z",
  "updatedAt": "2024-12-04T13:00:00.000Z",
  "featuredImage": "https://...",
  "tags": ["标签1", "标签2"]
}
```

---

## 🔍 查看和管理数据

### 使用 Vercel Dashboard

1. 进入 **Storage** → 选择你的 KV 数据库
2. 点击 **"Data Browser"**（数据浏览器）
3. 可以查看、编辑、删除键值对

### 使用 Redis CLI（本地）

如果你想在本地使用 Redis CLI 连接：

```bash
# 安装 Redis CLI
# Windows: https://github.com/microsoftarchive/redis/releases
# Mac: brew install redis
# Linux: apt-get install redis-tools

# 连接到 Vercel KV
redis-cli -u "your-kv-url"

# 查看所有键
KEYS *

# 查看某个文章
GET post:zh:1733356800123

# 查看文章列表
SMEMBERS posts:zh
```

---

## 🚨 常见问题

### Q1: 出现 "KV_URL is not defined" 错误

**原因**：环境变量未配置

**解决方案**：
1. 确保在 Vercel Dashboard 中已创建 KV 数据库
2. 确保已连接到项目
3. 重新部署项目
4. 本地开发需要运行 `vercel env pull .env.local`

### Q2: API 返回 500 错误，日志显示 "Cannot connect to KV"

**原因**：KV 连接失败

**解决方案**：
1. 检查 Vercel Dashboard → Settings → Environment Variables
2. 确认 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN` 存在
3. 重新部署项目

### Q3: 文章创建成功但列表为空

**原因**：可能是 locale 参数不匹配

**解决方案**：
- 检查创建文章时的 `locale` 字段
- 获取列表时使用相同的 `locale` 参数
- 例如：`/api/posts?locale=zh`

### Q4: 如何清空所有数据？

在 Vercel Dashboard 的 Data Browser 中：
```bash
# 删除所有文章
DEL posts:en posts:zh
KEYS post:* | xargs DEL
```

或者在项目中添加管理接口。

---

## 💰 升级到付费计划（可选）

如果免费配额不够用，可以升级到 Pro 计划：
- **$20/月** 起
- **无限存储空间**
- **更高的命令执行次数**
- **更多区域选择**

但对于大多数博客来说，免费计划完全够用！

---

## 📚 更多资源

- [Vercel KV 官方文档](https://vercel.com/docs/storage/vercel-kv)
- [Vercel KV SDK 文档](https://sdk.vercel.com/docs/kv)
- [Redis 命令参考](https://redis.io/commands/)

---

## ✅ 配置完成后

1. 确保 KV 数据库已创建并连接到项目
2. 环境变量已自动添加
3. 重新部署项目
4. 使用 n8n 工作流或测试脚本验证

现在你的博客系统可以在 Vercel 上正常存储和读取文章数据了！🎉
