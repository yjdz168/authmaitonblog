# 🔄 从 Vercel KV 迁移到 Supabase

本文档说明如何从 Vercel KV 切换到 Supabase PostgreSQL 数据库。

---

## 📊 对比：KV vs Supabase

| 特性 | Vercel KV | Supabase |
|------|-----------|----------|
| 数据库类型 | Redis (NoSQL) | PostgreSQL (SQL) |
| 免费存储 | 256 MB | 500 MB |
| 免费请求 | 3,000/天 | 无限 |
| 数据结构 | 键值对 | 关系表 |
| 查询能力 | 简单 GET/SET | 强大 SQL 查询 |
| 全文搜索 | ❌ | ✅ |
| 关系查询 | ❌ | ✅ |
| 备份 | 手动 | 自动每日 |
| 管理界面 | 基础 | 功能丰富 |
| 实时更新 | ❌ | ✅ |
| 可用性 | 仅 Marketplace | 独立平台 |

---

## ✅ 为什么切换到 Supabase？

### 当前问题
- ❌ Vercel Marketplace 中找不到 KV 选项
- ❌ 配置流程复杂
- ❌ 请求限制（3,000/天）
- ❌ 查询功能有限

### Supabase 优势
- ✅ 注册简单，无需信用卡
- ✅ 免费配额更大（500MB）
- ✅ 无限 API 请求
- ✅ 强大的 SQL 查询
- ✅ 自动备份
- ✅ 实时数据订阅
- ✅ 丰富的管理界面

---

## 🚀 迁移步骤（仅需 15 分钟）

### 步骤 1: 创建 Supabase 项目（5 分钟）

1. 访问：https://supabase.com
2. 使用 GitHub 登录
3. 创建新项目：`authmation-blog`
4. 选择区域：Singapore
5. 等待初始化完成

### 步骤 2: 创建数据表（3 分钟）

在 SQL Editor 执行：

```sql
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

CREATE INDEX idx_posts_locale ON posts(locale);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts("publishedAt" DESC);
CREATE UNIQUE INDEX idx_posts_locale_slug ON posts(locale, slug);

ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
```

### 步骤 3: 获取 API 密钥（2 分钟）

1. Supabase Dashboard → Settings → API
2. 复制：
   - Project URL: `https://xxx.supabase.co`
   - Service Role Key: `eyJhbG...`

### 步骤 4: 配置环境变量（2 分钟）

在 Vercel Dashboard → Settings → Environment Variables 添加：

```
NEXT_PUBLIC_SUPABASE_URL = https://你的项目.supabase.co
SUPABASE_SERVICE_ROLE_KEY = 你的service_role_key
API_SECRET_KEY = your-api-key (保持不变)
```

### 步骤 5: 重新部署（3 分钟）

```bash
vercel --prod
```

或在 Vercel Dashboard → Deployments → Redeploy

---

## 📦 代码变化

项目代码已经更新，无需手动修改：

### ✅ 已更新的文件：

1. **`src/lib/posts-supabase.ts`** - 新建，Supabase 数据访问层
2. **`src/app/api/posts/route.ts`** - 导入改为 `posts-supabase`
3. **`src/app/api/posts/[id]/route.ts`** - 导入改为 `posts-supabase`
4. **`src/app/[locale]/news/page.tsx`** - 导入改为 `posts-supabase`
5. **`src/app/[locale]/news/[slug]/page.tsx`** - 导入改为 `posts-supabase`
6. **`package.json`** - 添加 `@supabase/supabase-js`

### 🔄 API 保持不变

- ✅ 所有 API 端点不变
- ✅ 请求/响应格式不变
- ✅ n8n 工作流无需修改
- ✅ 测试脚本无需修改

---

## 🗂️ 数据迁移（如果已有 KV 数据）

### 方法 1: 手动迁移（适合数据少）

1. **从 KV 导出数据**
   - Vercel Dashboard → Storage → KV → Data Browser
   - 手动复制每篇文章数据

2. **导入到 Supabase**
   - Supabase → Table Editor → Insert row
   - 或使用 API 批量导入

### 方法 2: 使用脚本迁移（适合数据多）

创建迁移脚本 `migrate-kv-to-supabase.js`:

```javascript
// 这是示例，需要根据实际情况调整
const { createClient } = require('@supabase/supabase-js');
const { kv } = require('@vercel/kv');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrate() {
  const locales = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 'ar', 'it', 'nl', 'pl', 'tr', 'vi'];
  
  for (const locale of locales) {
    // 从 KV 获取文章 ID 列表
    const postIds = await kv.smembers(`posts:${locale}`);
    
    for (const id of postIds) {
      // 获取文章数据
      const post = await kv.get(`post:${locale}:${id}`);
      
      if (post) {
        // 插入到 Supabase
        const { error } = await supabase
          .from('posts')
          .insert([post]);
        
        if (error) {
          console.error(`Error migrating post ${id}:`, error);
        } else {
          console.log(`Migrated post ${id} (${locale})`);
        }
      }
    }
  }
  
  console.log('Migration complete!');
}

migrate();
```

运行：
```bash
node migrate-kv-to-supabase.js
```

### 方法 3: 不迁移，重新开始

如果没有重要数据，可以直接重新开始：
- ✅ 清空 KV（或不管）
- ✅ 使用 Supabase 作为新的数据存储
- ✅ 通过 n8n 或 API 重新发布文章

---

## 🧪 测试迁移

### 1. 测试 API

```powershell
.\test-api.ps1
```

应该返回：
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "测试文章",
    ...
  }
}
```

### 2. 检查 Supabase

1. Supabase → Table Editor
2. 查看 `posts` 表
3. 应该能看到新创建的文章

### 3. 检查网站

访问：https://authmationblog.vercel.app/zh/news

应该能看到文章列表

---

## 🔍 验证清单

迁移后确认：

- [ ] Supabase 项目已创建
- [ ] `posts` 表存在且结构正确
- [ ] 环境变量已配置
- [ ] 项目已重新部署
- [ ] API 测试通过
- [ ] Supabase 中能看到数据
- [ ] 网站能正常显示文章
- [ ] n8n 工作流正常（如果使用）

---

## 🗑️ 清理 KV 资源（可选）

迁移成功后，可以删除 KV 资源：

1. **在 Vercel Dashboard**
2. **Storage → 你的 KV 数据库**
3. **Settings → Delete Database**

或者保留作为备份。

---

## 📊 性能对比

### 查询速度

```
KV (Redis):      ~10-20ms
Supabase (PG):   ~30-50ms
```

对于博客系统，这个差异可以忽略。

### 功能对比

Supabase 提供更多功能：
- ✅ 复杂查询（JOIN, 聚合等）
- ✅ 全文搜索
- ✅ 实时订阅
- ✅ 自动备份
- ✅ 数据关系
- ✅ 触发器和函数

---

## 🎯 下一步

迁移完成后，可以利用 Supabase 的高级功能：

### 1. 添加分类（Categories）

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  locale TEXT DEFAULT 'en'
);

ALTER TABLE posts ADD COLUMN category_id INTEGER REFERENCES categories(id);
```

### 2. 添加评论系统

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. 添加浏览统计

```sql
ALTER TABLE posts ADD COLUMN view_count INTEGER DEFAULT 0;

CREATE FUNCTION increment_view_count(post_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
```

### 4. 实时更新

在前端使用 Supabase 实时订阅：

```typescript
const subscription = supabase
  .channel('posts')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('New post:', payload.new);
    }
  )
  .subscribe();
```

---

## 💡 最佳实践

### 1. 备份

Supabase 免费版自动每日备份，保留 7 天。

手动备份：
```bash
# 使用 pg_dump
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### 2. 索引优化

根据查询模式添加索引：

```sql
-- 按发布时间和状态查询
CREATE INDEX idx_posts_status_published_at 
ON posts(status, "publishedAt" DESC);

-- 按标签查询
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
```

### 3. 监控

在 Supabase Dashboard 查看：
- 数据库大小
- API 请求数
- 错误日志
- 慢查询

---

## 📚 参考文档

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - 详细配置指南
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API 文档
- [Supabase 官方文档](https://supabase.com/docs)

---

## ✅ 总结

### 迁移优势

- ✅ 更可靠：PostgreSQL 成熟稳定
- ✅ 更强大：支持复杂查询和关系
- ✅ 更灵活：可扩展性强
- ✅ 更简单：注册和配置更容易
- ✅ 更便宜：免费额度更大

### 迁移简单

- ✅ 代码已更新，无需手动修改
- ✅ API 保持不变
- ✅ 仅需配置环境变量
- ✅ 15 分钟完成迁移

**现在就开始迁移吧！** 🚀

👉 [Supabase 配置指南](./SUPABASE_SETUP.md)
