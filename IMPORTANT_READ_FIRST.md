# ⚠️ 重要：首次使用必读

## 🔴 关键问题：文件系统只读错误

如果你在使用 n8n 工作流或 API 时遇到以下错误：

```
Failed to create post: EROFS: read-only file system, open '/var/task/content/posts/posts-zh.json'
```

**这是正常的！** Vercel 的无服务器环境文件系统是只读的，无法直接写入文件。

---

## ✅ 解决方案：配置数据库

由于 Vercel Marketplace 中 KV 选项可能不可用，**推荐使用 Supabase PostgreSQL 数据库**。

### 必须完成的配置步骤

> 💡 **推荐**：使用 Supabase（更简单、更强大、更可靠）

1. **创建 Supabase 项目**（5 分钟）
   - 访问：https://supabase.com
   - GitHub 登录 → 创建项目
   
2. **创建数据表**（3 分钟）
   - SQL Editor → 执行建表 SQL
   
3. **配置环境变量**（2 分钟）
   - Vercel 添加 Supabase URL 和 Key
   
4. **重新部署**（2 分钟）
5. **配置 n8n 工作流**（5 分钟）

详细步骤请查看：

📖 **推荐顺序**：

1. **[Supabase 配置指南](./SUPABASE_SETUP.md)** ← 15 分钟完成（推荐）
2. **[迁移指南](./SUPABASE_MIGRATION_GUIDE.md)** ← 如果你之前用过 KV
3. **[完整配置指南](./SETUP_COMPLETE_GUIDE.md)** ← 详细步骤和原理

或者，如果 Vercel Marketplace 可用：
- **[Marketplace 配置指南](./VERCEL_MARKETPLACE_GUIDE.md)** ← KV 配置（备选）

---

## 📦 项目已包含的功能

### ✅ 已完成
- Next.js 15 博客系统
- 15 种语言支持（en, zh, es, fr, de, ja, ko, pt, ru, ar, it, nl, pl, tr, vi）
- RESTful API（WordPress 兼容格式）
- Vercel KV 存储集成
- n8n 工作流模板（3个）
- 响应式设计
- 工控显示屏业务内容

### 🔧 需要你配置的
- Vercel KV 数据库（5 分钟）
- API 密钥环境变量（1 分钟）
- n8n 工作流（5 分钟）

---

## 🎯 配置流程（仅需 15 分钟）

### 第 1 步：创建 Supabase 项目（5 分钟）
1. 访问 https://supabase.com
2. GitHub 登录
3. 创建项目 `authmation-blog`
4. 选择区域 Singapore
5. 等待初始化

### 第 2 步：创建数据表（3 分钟）
1. SQL Editor
2. 执行建表 SQL（见 SUPABASE_SETUP.md）
3. 禁用 RLS

### 第 3 步：配置环境变量（2 分钟）
1. 复制 Project URL 和 Service Role Key
2. Vercel → Settings → Environment Variables
3. 添加：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `API_SECRET_KEY`

### 第 4 步：重新部署（2 分钟）
```bash
vercel --prod
```

### 第 5 步：测试（3 分钟）
```powershell
.\test-api.ps1
```

---

## 🆘 遇到问题？

### 常见错误和解决方案

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `EROFS: read-only file system` | 未配置数据库 | 按照指南配置 Supabase |
| `SUPABASE_SERVICE_ROLE_KEY is not defined` | 环境变量缺失 | 添加环境变量，重新部署 |
| `relation 'posts' does not exist` | 表未创建 | 在 SQL Editor 执行建表 SQL |
| `401 Unauthorized` | API Key 错误 | 检查 n8n 中的 key 是否正确 |
| `500 - Failed to create post` | 多种可能 | 查看 Vercel 函数日志或 Supabase 日志 |

---

## 📚 完整文档列表

1. **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Supabase 配置指南（推荐）
2. **[SUPABASE_MIGRATION_GUIDE.md](./SUPABASE_MIGRATION_GUIDE.md)** - 从 KV 迁移到 Supabase
3. **[VERCEL_MARKETPLACE_GUIDE.md](./VERCEL_MARKETPLACE_GUIDE.md)** - Marketplace 创建 KV（备选）
4. **[QUICK_FIX_GUIDE.md](./QUICK_FIX_GUIDE.md)** - 快速修复指南
5. **[SETUP_COMPLETE_GUIDE.md](./SETUP_COMPLETE_GUIDE.md)** - 完整配置指南
6. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Vercel 部署指南
7. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API 文档
8. **[N8N_SETUP.md](./N8N_SETUP.md)** - n8n 配置指南
9. **[n8n-workflows/README.md](./n8n-workflows/README.md)** - 工作流说明

---

## 🚀 快速命令

```bash
# 本地开发
npm run dev

# 构建测试
npm run build

# 部署到 Vercel
vercel --prod

# 拉取环境变量
vercel env pull .env.local

# 测试 API
.\test-api.ps1  # Windows
./test-api.sh   # Linux/Mac
```

---

## ✨ 项目亮点

- 🌍 **15 种语言**：覆盖全球主要市场
- 📱 **响应式设计**：完美支持手机、平板、桌面
- 🚀 **Vercel 部署**：全球 CDN，秒级响应
- 💾 **KV 存储**：Redis 性能，持久化数据
- 🤖 **n8n 自动化**：无需手动发布，工作流搞定一切
- 🔒 **API 安全**：密钥认证，防止滥用
- 📊 **WordPress 兼容**：可对接现有 WordPress 工具

---

## 💡 提示

- 配置完成后，通过 https://authmationblog.vercel.app 访问你的博客
- 使用 n8n 可以实现：定时发布、RSS 订阅、Webhook 触发、批量导入等
- Supabase 免费配额（500MB）足够存储 50,000+ 篇文章
- 所有代码开源，可自由修改和扩展
- PostgreSQL 功能强大，支持复杂查询、全文搜索、关系等

---

**现在就开始配置吧！** 👉 [Supabase 配置指南](./SUPABASE_SETUP.md)
