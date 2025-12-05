# 🗄️ Supabase 数据库配置指南

Supabase 是一个开源的 Firebase 替代品，提供免费的 PostgreSQL 数据库。本指南将帮助你配置 Supabase 作为博客系统的数据存储。

---

## 🎯 为什么选择 Supabase？

- ✅ **完全免费**：500MB 数据库存储，无限 API 请求
- ✅ **PostgreSQL**：强大的关系型数据库
- ✅ **实时更新**：支持实时数据订阅
- ✅ **自动备份**：每日自动备份
- ✅ **REST API**：自动生成 RESTful API
- ✅ **无需信用卡**：免费计划不需要信用卡

---

## 📋 第一步：创建 Supabase 项目（5 分钟）

### 1.1 注册账号

1. **访问 Supabase**
   - 打开：https://supabase.com
   - 点击右上角 **"Start your project"**

2. **登录/注册**
   - 使用 GitHub 账号登录（推荐）
   - 或使用邮箱注册

### 1.2 创建新项目

1. **进入 Dashboard**
   - 登录后会看到 "All projects" 页面
   - 点击 **"New project"**

2. **填写项目信息**
   ```
   Organization: 选择或创建一个组织
   Name: authmation-blog
   Database Password: 生成一个强密码（保存好！）
   Region: Southeast Asia (Singapore) 或选择最近的
   Pricing Plan: Free（免费）
   ```

3. **创建项目**
   - 点击 **"Create new project"**
   - 等待 1-2 分钟，数据库初始化中...
   - 看到绿色勾号表示完成！

---

## 🗃️ 第二步：创建数据表（3 分钟）

### 2.1 打开 SQL Editor

1. **在项目 Dashboard 左侧菜单**
2. **点击 "SQL Editor"** （或 "Table Editor"）

### 2.2 创建 posts 表

**方法 A：使用 SQL Editor（推荐）**

1. 点击 **"+ New query"**
2. 复制粘贴以下 SQL：

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

-- 创建索引以提高查询性能
CREATE INDEX idx_posts_locale ON posts(locale);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts("publishedAt" DESC);

-- 创建唯一索引（防止重复 slug）
CREATE UNIQUE INDEX idx_posts_locale_slug ON posts(locale, slug);

-- 添加注释
COMMENT ON TABLE posts IS '博客文章表';
COMMENT ON COLUMN posts.id IS '文章唯一ID';
COMMENT ON COLUMN posts.title IS '文章标题';
COMMENT ON COLUMN posts.slug IS 'URL 友好的标识符';
COMMENT ON COLUMN posts.excerpt IS '文章摘要';
COMMENT ON COLUMN posts.content IS '文章正文（Markdown）';
COMMENT ON COLUMN posts.author IS '作者';
COMMENT ON COLUMN posts."publishedAt" IS '发布时间';
COMMENT ON COLUMN posts."updatedAt" IS '更新时间';
COMMENT ON COLUMN posts.locale IS '语言代码';
COMMENT ON COLUMN posts."featuredImage" IS '特色图片URL';
COMMENT ON COLUMN posts.tags IS '标签数组';
COMMENT ON COLUMN posts.status IS '状态：draft 或 published';
```

3. 点击 **"Run"** 或按 `Ctrl+Enter`
4. 看到 "Success" 表示成功！

**方法 B：使用 Table Editor（可视化）**

1. 左侧菜单点击 **"Table Editor"**
2. 点击 **"New table"**
3. 手动添加列：

| 列名 | 类型 | 默认值 | 可空 | 主键 |
|------|------|--------|------|------|
| id | text | - | NO | YES |
| title | text | - | NO | NO |
| slug | text | - | NO | NO |
| excerpt | text | '' | YES | NO |
| content | text | - | NO | NO |
| author | text | 'Admin' | YES | NO |
| publishedAt | timestamptz | now() | YES | NO |
| updatedAt | timestamptz | - | YES | NO |
| locale | text | 'en' | YES | NO |
| featuredImage | text | - | YES | NO |
| tags | text[] | - | YES | NO |
| status | text | 'published' | YES | NO |

---

## 🔐 第三步：配置权限（Row Level Security）

Supabase 默认启用 RLS（行级安全），我们需要配置策略。

### 3.1 禁用 RLS（适用于 API Key 认证）

如果你的 API 使用自己的认证系统（如我们的 `x-api-key`），可以禁用 RLS：

1. **在 SQL Editor 执行**：

```sql
-- 禁用 posts 表的 RLS
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
```

### 3.2 或者配置 RLS 策略（更安全，推荐）

如果想保留 RLS，添加以下策略：

```sql
-- 启用 RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取已发布的文章
CREATE POLICY "Allow public read published posts"
ON posts FOR SELECT
USING (status = 'published');

-- 允许通过 service_role 创建文章（使用 Service Key）
CREATE POLICY "Allow service role to insert"
ON posts FOR INSERT
WITH CHECK (true);

-- 允许通过 service_role 更新文章
CREATE POLICY "Allow service role to update"
ON posts FOR UPDATE
USING (true);

-- 允许通过 service_role 删除文章
CREATE POLICY "Allow service role to delete"
ON posts FOR DELETE
USING (true);
```

**推荐**：使用第一种方法（禁用 RLS），因为我们已经在应用层实现了 API Key 认证。

---

## 🔑 第四步：获取 API 密钥（2 分钟）

### 4.1 查找 API 配置

1. **在项目 Dashboard 左侧菜单**
2. **点击 "Project Settings"**（设置图标 ⚙️）
3. **点击 "API"** 标签

### 4.2 复制必要的密钥

你需要两个值：

#### 1. Project URL
```
示例：https://abcdefghijklmnop.supabase.co
```
复制 "Project URL" 下的 URL

#### 2. Service Role Key（重要！）
```
示例：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...（很长的字符串）
```

**注意**：
- ⚠️ **使用 `service_role` (secret) key**，不是 `anon` (public) key
- 这个密钥有完整的数据库权限，**千万不要泄露**！
- 只在服务器端使用，不要暴露到客户端

---

## ⚙️ 第五步：配置 Vercel 环境变量（2 分钟）

### 5.1 在 Vercel Dashboard

1. **打开项目设置**
   - 访问：https://vercel.com/dashboard
   - 进入 `authmationblog` 项目
   - 点击 **"Settings"**

2. **进入环境变量**
   - 点击左侧 **"Environment Variables"**

3. **添加 Supabase 环境变量**

   点击 **"Add New"**，分别添加：

   **变量 1：项目 URL**
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://你的项目ID.supabase.co
   Environment: Production, Preview, Development (全选)
   ```

   **变量 2：Service Role Key**
   ```
   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: eyJhbG... (你的 service_role key)
   Environment: Production, Preview, Development (全选)
   ```

   **变量 3：API 密钥**（如果还没添加）
   ```
   Name: API_SECRET_KEY
   Value: your-super-secret-api-key-at-least-32-characters
   Environment: Production, Preview, Development (全选)
   ```

4. **保存**
   - 点击 **"Save"**

### 5.2 本地开发配置

创建或更新 `.env.local` 文件：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://你的项目ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=你的service_role_key

# API 密钥
API_SECRET_KEY=your-super-secret-api-key
```

或者使用 Vercel CLI 拉取：

```bash
vercel env pull .env.local
```

---

## 🚀 第六步：重新部署（2 分钟）

### 6.1 部署到 Vercel

**方法 A：通过 Dashboard**
1. 进入 **Deployments** 页面
2. 点击最新部署的 **"..."** 菜单
3. 选择 **"Redeploy"**
4. 等待部署完成

**方法 B：通过命令行**
```bash
cd e:/code/000git/025authmaitonblog
vercel --prod
```

---

## 🧪 第七步：测试（3 分钟）

### 7.1 使用 PowerShell 测试

1. **编辑测试脚本**
   ```powershell
   code test-api.ps1
   ```

2. **修改 API_KEY**
   ```powershell
   $API_KEY = "你在Vercel设置的API密钥"
   ```

3. **运行测试**
   ```powershell
   .\test-api.ps1
   ```

4. **预期结果**
   ```
   ✅ 文章创建成功！
   {
     "success": true,
     "data": { ... }
   }
   ```

### 7.2 在 Supabase 查看数据

1. **回到 Supabase Dashboard**
2. **点击 "Table Editor"**
3. **选择 `posts` 表**
4. **应该能看到刚创建的文章数据**

### 7.3 在网站查看

访问：https://authmationblog.vercel.app/zh/news

应该能看到通过 API 创建的文章！

---

## 📊 Supabase 免费配额

### 免费计划包含：

- ✅ **500 MB 数据库存储**
- ✅ **1 GB 文件存储**
- ✅ **2 GB 带宽/月**
- ✅ **50,000 月活跃用户**
- ✅ **每日自动备份（保留 7 天）**
- ✅ **无限 API 请求**
- ✅ **社区支持**

### 容量估算：

- 每篇文章约 5-10 KB
- 500 MB ≈ 可存储 **50,000-100,000 篇文章**
- 对于博客系统绰绰有余！

---

## 🔍 监控和管理

### 在 Supabase Dashboard

1. **Table Editor**
   - 查看和编辑数据
   - 筛选和排序
   - 导入/导出数据

2. **SQL Editor**
   - 执行自定义 SQL 查询
   - 创建视图和函数
   - 数据分析

3. **Database**
   - 查看表结构
   - 管理索引
   - 查看关系

4. **API**
   - API 文档
   - 测试端点
   - 查看请求日志

5. **Logs**
   - 查看数据库日志
   - API 请求日志
   - 错误追踪

---

## 🛠️ 高级功能（可选）

### 1. 全文搜索

为文章添加全文搜索：

```sql
-- 添加全文搜索列
ALTER TABLE posts ADD COLUMN search_vector tsvector;

-- 创建搜索索引
CREATE INDEX posts_search_idx ON posts USING GIN(search_vector);

-- 自动更新搜索向量
CREATE FUNCTION posts_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.content, '')), 'C');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_search_update
  BEFORE INSERT OR UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION posts_search_trigger();
```

### 2. 自动时间戳

确保 `updatedAt` 自动更新：

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### 3. 查看统计

```sql
-- 文章总数
SELECT COUNT(*) FROM posts;

-- 按语言统计
SELECT locale, COUNT(*) FROM posts GROUP BY locale;

-- 按状态统计
SELECT status, COUNT(*) FROM posts GROUP BY status;

-- 最近发布的文章
SELECT title, "publishedAt" FROM posts 
ORDER BY "publishedAt" DESC LIMIT 10;
```

---

## 🔧 故障排除

### 问题 1: "Failed to create post: 401"

**原因**：Service Role Key 不正确

**解决**：
1. 确认使用的是 `service_role` key，不是 `anon` key
2. 检查 Vercel 环境变量是否正确
3. 重新部署项目

### 问题 2: "relation 'posts' does not exist"

**原因**：表还没创建

**解决**：
1. 在 Supabase SQL Editor 执行建表 SQL
2. 确认表名是 `posts`（小写）
3. 刷新 Table Editor 查看

### 问题 3: RLS 策略阻止操作

**原因**：启用了 RLS 但没配置策略

**解决**：
```sql
-- 方法1：禁用 RLS
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- 方法2：添加策略（见上文）
```

### 问题 4: 连接超时

**原因**：网络问题或区域选择

**解决**：
1. 检查网络连接
2. 尝试选择其他 Region
3. 查看 Supabase 状态页面：https://status.supabase.com

### 问题 5: 本地开发无法连接

**原因**：环境变量未配置

**解决**：
```bash
# 创建 .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co" > .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=your_key" >> .env.local

# 或拉取 Vercel 环境变量
vercel env pull .env.local
```

---

## 📚 参考资源

- [Supabase 官方文档](https://supabase.com/docs)
- [Supabase JavaScript 客户端](https://supabase.com/docs/reference/javascript)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
- [Supabase 社区](https://github.com/supabase/supabase/discussions)

---

## ✅ 配置完成检查清单

完成后确认以下项目：

- [ ] Supabase 项目已创建
- [ ] `posts` 表已创建，包含所有必要字段
- [ ] RLS 已禁用或配置了正确的策略
- [ ] 已获取 Project URL 和 Service Role Key
- [ ] Vercel 环境变量已添加：
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `API_SECRET_KEY`
- [ ] 项目已重新部署
- [ ] test-api.ps1 运行成功
- [ ] Supabase Table Editor 中能看到数据
- [ ] 网站上能看到文章列表

全部打勾？恭喜，Supabase 配置成功！🎉

---

**准备好了吗？** [立即创建 Supabase 项目 →](https://supabase.com)
