# 🚀 完整配置指南 - 从零到上线

这是一份完整的配置指南，帮助你将博客系统部署到 Vercel 并通过 n8n 自动发布文章。

---

## 📋 前置要求

- ✅ Vercel 账号（免费）
- ✅ n8n 实例（本地或云端）
- ✅ Node.js 18+ 和 npm

---

## 🎯 第一步：配置 Vercel KV 存储

### 为什么需要 KV？

Vercel 的无服务器环境文件系统是**只读的**，不能写入文件。因此我们使用 Vercel KV（Redis）来存储文章数据。

### 配置步骤

#### 通过 Marketplace 创建（新版界面）

1. **登录 Vercel Dashboard**
   - 访问 https://vercel.com/dashboard
   - 找到你的项目 `authmationblog`

2. **进入 Marketplace**
   - 点击顶部 **"Storage"** 标签
   - 点击 **"Browse Marketplace"** 按钮
   - 或访问：https://vercel.com/marketplace

3. **创建 KV 数据库**
   - 搜索或找到 **"Vercel KV"**
   - 点击 **"Add Integration"** 或 **"Create"**
   - 数据库名称：`blog-posts-kv`
   - 区域：选择最近的（推荐 `sin1` Singapore）
   - 定价：选择 **"Hobby"**（免费）
   - 点击 **"Create & Continue"**

4. **连接到项目**
   - 勾选 `authmationblog` 项目
   - 点击 **"Connect"**
   
   这会自动添加以下环境变量：
   ```
   KV_URL
   KV_REST_API_URL
   KV_REST_API_TOKEN
   KV_REST_API_READ_ONLY_TOKEN
   ```

#### 旧版界面方法

如果你看到 "Create Database" 按钮：
1. Storage → Create Database → 选择 KV
2. 输入名称 `blog-posts-kv`
3. Connect to Project → 选择项目

4. **设置 API 密钥**
   - 在项目设置中，进入 **Settings** → **Environment Variables**
   - 添加：
     ```
     Name: API_SECRET_KEY
     Value: your-super-secret-api-key-at-least-32-characters-long
     ```
   - **重要**：保存这个密钥，后面 n8n 配置要用！

5. **重新部署**
   - 环境变量添加后必须重新部署
   - 方法 1：在 **Deployments** 页面点击最新部署的 **"..."** → **"Redeploy"**
   - 方法 2：本地运行 `vercel --prod`

---

## 🧪 第二步：测试 API

### 使用 PowerShell 测试（Windows）

1. **编辑测试脚本**
   ```powershell
   # 打开 test-api.ps1
   code test-api.ps1
   
   # 修改 API_KEY 为你在 Vercel 设置的值
   $API_KEY = "your-actual-api-key-here"
   ```

2. **运行测试**
   ```powershell
   .\test-api.ps1
   ```

3. **预期结果**
   - ✅ 文章创建成功
   - ✅ 返回包含文章 ID 和详情的 JSON
   - ✅ 文章列表包含新创建的文章

### 使用 curl 测试（Linux/Mac）

```bash
# 编辑脚本
nano test-api.sh

# 修改 API_KEY
API_KEY="your-actual-api-key-here"

# 添加执行权限
chmod +x test-api.sh

# 运行测试
./test-api.sh
```

### 手动 curl 测试

```bash
# 创建文章
curl -X POST https://authmationblog.vercel.app/api/posts \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "我的第一篇文章",
    "content": "# 欢迎\n\n这是文章内容",
    "excerpt": "文章摘要",
    "author": "作者名",
    "locale": "zh",
    "status": "published"
  }'

# 获取文章列表
curl https://authmationblog.vercel.app/api/posts?locale=zh
```

---

## 🤖 第三步：配置 n8n 工作流

### 3.1 导入工作流

1. **打开 n8n**
   - 访问你的 n8n 实例（如 http://localhost:5678）

2. **导入工作流**
   - 点击左上角 **"☰"** 菜单
   - 选择 **"Import from File"**
   - 选择 `n8n-workflows/1-simple-post-workflow.json`
   - 点击 **"Import"**

### 3.2 配置工作流

1. **打开 "发送到API" 节点**
   - 双击该节点打开配置

2. **修改 URL**
   ```
   原值：https://your-project.vercel.app/api/posts
   改为：https://authmationblog.vercel.app/api/posts
   ```

3. **修改 API Key**
   - 找到 Headers 部分的 `x-api-key`
   - 改为你在 Vercel 设置的 `API_SECRET_KEY`

4. **确认 Body 配置**
   - **Send Body**: ✅ ON
   - **Body Content Type**: JSON
   - **Specify Body**: JSON
   - **JSON**: `={{ $json }}`

5. **保存工作流**
   - 点击右上角 **"Save"**

### 3.3 测试工作流

1. **执行测试**
   - 点击 **"Execute Workflow"** 按钮
   - 等待执行完成

2. **检查结果**
   - 在 "发送到API" 节点查看输出
   - 应该返回：
     ```json
     {
       "success": true,
       "data": {
         "id": "...",
         "title": "测试文章标题",
         ...
       },
       "message": "Post created successfully"
     }
     ```

3. **验证文章**
   - 访问 https://authmationblog.vercel.app/zh/news
   - 应该能看到刚创建的文章

---

## 📊 第四步：查看和管理数据

### 在 Vercel Dashboard 查看

1. **进入 Storage**
   - 选择你的 KV 数据库 `blog-posts-kv`

2. **打开 Data Browser**
   - 点击 **"Data Browser"** 标签
   - 可以看到所有存储的键值对

3. **数据结构**
   ```
   posts:zh          → 中文文章 ID 集合
   posts:en          → 英文文章 ID 集合
   post:zh:123...    → 单个中文文章数据
   post:en:456...    → 单个英文文章数据
   ```

### 使用 API 查看

```bash
# 获取所有中文文章
curl https://authmationblog.vercel.app/api/posts?locale=zh

# 获取所有英文文章
curl https://authmationblog.vercel.app/api/posts?locale=en

# 更新文章（需要 API Key）
curl -X PUT https://authmationblog.vercel.app/api/posts/ARTICLE_ID?locale=zh \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "更新后的标题",
    "content": "更新后的内容"
  }'

# 删除文章（需要 API Key）
curl -X DELETE https://authmationblog.vercel.app/api/posts/ARTICLE_ID?locale=zh \
  -H "x-api-key: your-api-key"
```

---

## 🎨 第五步：进阶配置

### 5.1 配置更多 n8n 工作流

#### Webhook 工作流（自动接收）

1. 导入 `n8n-workflows/2-webhook-workflow.json`
2. 修改 API URL 和 Key
3. 激活工作流
4. 复制 Webhook URL
5. 从外部系统发送 POST 请求到该 URL

**示例请求**：
```bash
curl -X POST https://your-n8n.app/webhook/blog-post \
  -H "Content-Type: application/json" \
  -d '{
    "title": "来自外部的文章",
    "content": "内容...",
    "excerpt": "摘要",
    "author": "作者",
    "locale": "zh",
    "status": "published"
  }'
```

#### 定时发布工作流

1. 导入 `n8n-workflows/3-schedule-workflow.json`
2. 修改 API URL 和 Key
3. 修改 "准备数据" 节点中的文章内容
4. 修改定时触发频率（默认每 6 小时）
5. 激活工作流

### 5.2 自定义域名（可选）

1. **在 Vercel 项目中**
   - 进入 **Settings** → **Domains**
   - 添加你的自定义域名
   - 按照提示配置 DNS

2. **更新 n8n 配置**
   - 将所有工作流中的 URL 改为新域名
   - 例如：`https://blog.yourdomain.com/api/posts`

### 5.3 配置多语言内容

你的博客支持 15 种语言：
```
en, zh, es, fr, de, ja, ko, pt, ru, ar, it, nl, pl, tr, vi
```

**创建不同语言的文章**：
```json
{
  "title": "English Article",
  "content": "Content in English",
  "locale": "en"
}
```

**访问不同语言的页面**：
- 英文：https://authmationblog.vercel.app/en/news
- 中文：https://authmationblog.vercel.app/zh/news
- 日文：https://authmationblog.vercel.app/ja/news

---

## 🔍 故障排除

### 问题 1：n8n 报错 "500 - Failed to create post"

**可能原因**：
- API Key 不正确
- KV 环境变量未配置
- 必填字段缺失

**解决方案**：
1. 检查 n8n 中的 API Key 是否与 Vercel 一致
2. 确认 Vercel 中 KV 已创建并连接
3. 确认 `title` 和 `content` 字段不为空
4. 查看 Vercel 函数日志：Dashboard → Deployments → Functions

### 问题 2：文章创建成功但列表为空

**原因**：locale 不匹配

**解决方案**：
- 创建时使用 `"locale": "zh"`
- 查询时使用 `/api/posts?locale=zh`
- 确保 locale 值完全一致

### 问题 3：Vercel 部署失败

**常见原因**：
- 构建错误
- 环境变量缺失

**解决方案**：
1. 本地测试：`npm run build`
2. 检查部署日志中的具体错误
3. 确认所有依赖已安装：`npm install`

### 问题 4：本地开发无法连接 KV

**原因**：本地缺少 KV 环境变量

**解决方案**：
```bash
# 拉取 Vercel 环境变量到本地
vercel env pull .env.local

# 或手动创建 .env.local 并添加：
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

---

## 📈 性能和配额

### Vercel 免费配额
- ✅ 100 GB 带宽/月
- ✅ 无限 API 请求
- ✅ 100 次构建/天
- ✅ 无服务器函数：10 秒超时

### KV 免费配额
- ✅ 256 MB 存储（≈ 25,000 篇文章）
- ✅ 3,000 次命令/天
- ✅ 100 GB 带宽/月

对于个人博客或中小型企业网站，免费配额完全够用！

---

## 🎉 完成！

现在你的博客系统已经完全配置好了：

✅ Vercel 生产环境运行
✅ KV 存储持久化数据
✅ API 完全可用
✅ n8n 自动化发布
✅ 15 种语言支持
✅ 响应式设计

### 下一步

1. **添加更多内容**
   - 使用 n8n 工作流批量导入文章
   - 从其他平台迁移内容

2. **自定义样式**
   - 修改 `src/app/[locale]/page.tsx` 自定义首页
   - 修改 `tailwind.config.ts` 调整颜色主题

3. **监控和分析**
   - 集成 Google Analytics
   - 使用 Vercel Analytics

4. **SEO 优化**
   - 添加 sitemap.xml
   - 配置 robots.txt
   - 优化 meta 标签

---

## 📚 相关文档

- [QUICKSTART.md](./QUICKSTART.md) - 快速开始
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 详细部署指南
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API 文档
- [N8N_SETUP.md](./N8N_SETUP.md) - n8n 配置指南
- [VERCEL_KV_SETUP.md](./VERCEL_KV_SETUP.md) - KV 存储配置

---

## 💬 需要帮助？

遇到问题？检查：
1. Vercel 函数日志
2. n8n 执行日志
3. 浏览器控制台
4. KV Data Browser

祝使用愉快！🚀
