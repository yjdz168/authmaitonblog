# 🚀 从这里开始 - Supabase 博客系统

欢迎使用工控显示屏博客系统！本系统已升级使用 **Supabase PostgreSQL** 数据库。

---

## ✅ 已完成的工作

### 代码已更新
- ✅ 安装 `@supabase/supabase-js`
- ✅ 创建 `src/lib/posts-supabase.ts` 数据访问层
- ✅ 所有 API 路由已切换到 Supabase
- ✅ 所有页面组件已切换到 Supabase
- ✅ 构建测试通过

### 文档已创建
- ✅ **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - 详细配置指南
- ✅ **[SUPABASE_MIGRATION_GUIDE.md](./SUPABASE_MIGRATION_GUIDE.md)** - 迁移说明
- ✅ 所有相关文档已更新

---

## 🎯 你需要做的（仅需 15 分钟）

### 步骤 1：创建 Supabase 项目（5 分钟）

1. **访问 Supabase**
   ```
   https://supabase.com
   ```

2. **GitHub 登录**
   - 点击 "Start your project"
   - 使用 GitHub 账号登录（推荐）

3. **创建项目**
   ```
   Name: authmation-blog
   Database Password: 生成并保存密码
   Region: Southeast Asia (Singapore)
   Pricing Plan: Free
   ```

4. **等待初始化**（1-2 分钟）

### 步骤 2：创建数据表（3 分钟）

1. **打开 SQL Editor**
   - Supabase Dashboard → 左侧菜单 → SQL Editor

2. **执行建表 SQL**
   - 点击 "+ New query"
   - 复制粘贴以下 SQL：

```sql
-- 创建文章表
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Admin',
  "publishedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  locale TEXT DEFAULT 'en',
  "featuredImage" TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'published'
);

-- 创建索引
CREATE INDEX idx_posts_locale ON posts(locale);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts("publishedAt" DESC);
CREATE UNIQUE INDEX idx_posts_locale_slug ON posts(locale, slug);

-- 禁用 RLS（因为我们使用 API Key 认证）
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
```

3. **点击 Run 或按 Ctrl+Enter**

### 步骤 3：获取 API 密钥（2 分钟）

1. **进入设置**
   - Dashboard → Project Settings （⚙️图标）→ API

2. **复制两个值**

   **Project URL:**
   ```
   https://abcdefgh.supabase.co
   ```
   
   **service_role (secret):**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
   ```
   
   ⚠️ **注意**：使用 `service_role` key，不是 `anon` key！

### 步骤 4：配置 Vercel 环境变量（2 分钟）

1. **打开 Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   ```

2. **进入项目设置**
   - 选择 `authmationblog` 项目
   - Settings → Environment Variables

3. **添加环境变量**

   **变量 1：**
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://你的项目ID.supabase.co
   Environment: All (Production, Preview, Development)
   ```

   **变量 2：**
   ```
   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: 你的service_role_key
   Environment: All (Production, Preview, Development)
   ```

   **变量 3：**（如果还没添加）
   ```
   Name: API_SECRET_KEY
   Value: your-super-secret-api-key-at-least-32-characters
   Environment: All (Production, Preview, Development)
   ```

4. **保存**

### 步骤 5：重新部署（3 分钟）

**方法 A：通过 Dashboard**
1. Deployments → 最新部署 → "..." 菜单 → Redeploy

**方法 B：通过命令行**
```bash
cd e:/code/000git/025authmaitonblog
vercel --prod
```

---

## 🧪 测试配置

### 1. 测试 API

编辑 `test-api.ps1`，设置你的 API 密钥：

```powershell
$API_KEY = "你在Vercel设置的API_SECRET_KEY"
```

运行测试：

```powershell
.\test-api.ps1
```

**预期结果：**
```
✅ 文章创建成功！
{
  "success": true,
  "data": { ... }
}
```

### 2. 检查 Supabase

1. Supabase Dashboard → Table Editor
2. 选择 `posts` 表
3. 应该能看到刚创建的文章

### 3. 检查网站

访问：https://authmationblog.vercel.app/zh/news

应该能看到文章列表！

---

## 📚 详细文档

| 文档 | 内容 | 时长 |
|------|------|------|
| [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) | Supabase 完整配置指南 | 15 分钟阅读 |
| [SUPABASE_MIGRATION_GUIDE.md](./SUPABASE_MIGRATION_GUIDE.md) | 从 KV 迁移到 Supabase | 10 分钟阅读 |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | API 使用说明 | 5 分钟阅读 |
| [n8n-workflows/README.md](./n8n-workflows/README.md) | n8n 自动化配置 | 10 分钟阅读 |

---

## 🎉 配置完成后

你将拥有：

- ✅ 功能完整的多语言博客（15 种语言）
- ✅ Supabase PostgreSQL 数据库（500MB 免费）
- ✅ RESTful API（WordPress 兼容）
- ✅ Vercel 全球 CDN 部署
- ✅ n8n 自动化发布能力
- ✅ 响应式设计（手机/平板/桌面）

---

## 🔍 验证清单

配置完成后，确认以下项目：

- [ ] Supabase 项目已创建
- [ ] `posts` 表已创建（12 个字段 + 索引）
- [ ] RLS 已禁用
- [ ] 已获取 Project URL 和 Service Role Key
- [ ] Vercel 环境变量已添加：
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `API_SECRET_KEY`
- [ ] 项目已重新部署到 Vercel
- [ ] `test-api.ps1` 运行成功
- [ ] Supabase Table Editor 中能看到数据
- [ ] 网站 `/zh/news` 能显示文章

全部打勾？**恭喜，配置成功！** 🎊

---

## 🆘 遇到问题？

### 常见错误

**错误 1：`relation 'posts' does not exist`**
- 原因：表还没创建
- 解决：在 SQL Editor 执行建表 SQL

**错误 2：`SUPABASE_SERVICE_ROLE_KEY is not defined`**
- 原因：环境变量未配置或未部署
- 解决：检查 Vercel 环境变量，重新部署

**错误 3：`401 Unauthorized`**
- 原因：API Key 不正确
- 解决：检查 n8n 中的 `x-api-key` 是否匹配

**错误 4：`Failed to create post: 403`**
- 原因：RLS 策略阻止或使用了 anon key
- 解决：确认使用 `service_role` key，且 RLS 已禁用

### 获取帮助

1. 查看 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 故障排除部分
2. 检查 Vercel 函数日志：Dashboard → Deployments → Functions
3. 检查 Supabase 日志：Dashboard → Logs

---

## 🚀 下一步

配置完成后，可以：

### 1. 配置 n8n 自动化

导入工作流：
- `n8n-workflows/1-simple-post-workflow.json` - 手动发布
- `n8n-workflows/2-webhook-workflow.json` - Webhook 触发
- `n8n-workflows/3-schedule-workflow.json` - 定时发布

详见：[n8n-workflows/README.md](./n8n-workflows/README.md)

### 2. 利用 Supabase 高级功能

- 全文搜索
- 实时订阅
- 自动备份
- 数据关系
- SQL 函数和触发器

详见：[SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 高级功能部分

### 3. 自定义和扩展

- 添加分类系统
- 添加评论功能
- 添加用户系统
- 添加浏览统计
- SEO 优化

---

## 💡 温馨提示

- Supabase 免费版每日自动备份，保留 7 天
- 500MB 数据库足够存储 50,000+ 篇文章
- PostgreSQL 功能强大，支持复杂查询
- 可以在 Supabase Dashboard 的 Table Editor 直接编辑数据
- API 保持不变，n8n 工作流无需修改

---

**准备好了吗？现在就开始配置吧！** 🎉

👉 **第一步：** [访问 Supabase 创建项目 →](https://supabase.com)

有任何问题随时查看详细文档或提问！
