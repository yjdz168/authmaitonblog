# 📦 Vercel Marketplace 配置 KV 指南

> Vercel 已更新界面，现在 KV 和 Postgres 需要通过 **Marketplace** 创建。

---

## 🚀 快速创建 KV 数据库

### 步骤 1: 访问 Marketplace

**方法 A：直达链接**
- 访问：https://vercel.com/marketplace
- 登录你的 Vercel 账号

**方法 B：通过项目页面**
1. 访问：https://vercel.com/dashboard
2. 进入你的项目 `authmationblog`
3. 点击顶部 **"Storage"** 标签
4. 点击 **"Browse Marketplace"** 按钮

---

### 步骤 2: 创建 KV 数据库

1. **在 Marketplace 中找到 Vercel KV**
   - 在搜索框输入 "KV"
   - 或在 "Databases" 分类下找到 **"Vercel KV"**
   - 点击进入

2. **创建数据库**
   - 点击 **"Add Integration"** 或 **"Create"** 按钮
   - 填写配置：
     ```
     Database Name: blog-posts-kv
     Region: Singapore (sin1) 或选择最近的
     Pricing Plan: Hobby (免费)
     ```
   - 点击 **"Create & Continue"**

3. **连接到项目**
   - 在下一页勾选 `authmationblog` 项目
   - 点击 **"Connect"**
   - 等待几秒钟，连接完成

---

### 步骤 3: 验证环境变量

1. **检查环境变量**
   - 返回项目页面
   - 进入 **Settings** → **Environment Variables**
   - 确认以下变量已自动添加：
     ```
     ✅ KV_URL
     ✅ KV_REST_API_URL
     ✅ KV_REST_API_TOKEN
     ✅ KV_REST_API_READ_ONLY_TOKEN
     ```

2. **添加 API 密钥**（如果还没添加）
   - 在同一页面点击 **"Add New"**
   - 变量名：`API_SECRET_KEY`
   - 值：输入至少 32 个字符的密钥（记住它！）
   - Environment: 勾选所有（Production, Preview, Development）
   - 点击 **"Save"**

---

### 步骤 4: 重新部署

1. **进入 Deployments 页面**
   - 点击顶部 **"Deployments"** 标签

2. **重新部署最新版本**
   - 找到最新的部署记录
   - 点击右侧的 **"..."** 三个点菜单
   - 选择 **"Redeploy"**
   - 确认重新部署

3. **等待部署完成**
   - 大约需要 1-2 分钟
   - 看到 ✅ 绿色勾号表示成功

---

## 🎯 完成后的下一步

### 测试 API

**使用 PowerShell（Windows）**：
```powershell
# 1. 编辑 test-api.ps1
code test-api.ps1

# 2. 修改 API_KEY 为你设置的值
$API_KEY = "你的API密钥"

# 3. 运行测试
.\test-api.ps1
```

**使用 curl（Linux/Mac/Windows）**：
```bash
curl -X POST https://authmationblog.vercel.app/api/posts \
  -H "x-api-key: 你的API密钥" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "我的第一篇文章",
    "content": "# 欢迎使用\n\n这是通过 API 创建的第一篇文章！",
    "excerpt": "测试文章",
    "author": "管理员",
    "locale": "zh",
    "status": "published"
  }'
```

**预期结果**：
```json
{
  "success": true,
  "data": {
    "id": "1733356800123",
    "title": "我的第一篇文章",
    "slug": "我的第一篇文章",
    ...
  },
  "message": "Post created successfully"
}
```

---

## 🔍 查看创建的文章

1. **访问博客首页**
   - https://authmationblog.vercel.app

2. **查看新闻列表**
   - https://authmationblog.vercel.app/zh/news
   - 应该能看到刚创建的文章

3. **查看 KV 数据**
   - Vercel Dashboard → Storage
   - 点击你的 KV 数据库 `blog-posts-kv`
   - 点击 **"Data Browser"** 标签
   - 可以看到存储的键值对：
     ```
     posts:zh          → 中文文章 ID 集合
     post:zh:123...    → 单篇文章数据
     ```

---

## 🤖 配置 n8n 工作流

现在 API 已经可以正常工作了，可以配置 n8n 自动发布：

1. **导入工作流**
   - n8n → Import from File
   - 选择 `n8n-workflows/1-simple-post-workflow.json`

2. **配置节点**
   - 双击 "发送到API" 节点
   - URL: `https://authmationblog.vercel.app/api/posts`
   - Headers → x-api-key: 你的 API 密钥

3. **测试执行**
   - 点击 "Execute Workflow"
   - 应该返回成功响应

详细说明：[n8n-workflows/README.md](./n8n-workflows/README.md)

---

## 📊 Marketplace vs 旧版 Storage 的区别

| 功能 | Marketplace | 旧版 Storage |
|------|-------------|--------------|
| 创建方式 | 通过 Marketplace 安装 Integration | 直接 Create Database |
| 界面 | 统一的 Marketplace 界面 | 项目内 Storage 标签 |
| 功能 | 完全相同 | 完全相同 |
| 环境变量 | 自动添加 | 自动添加 |
| 定价 | 相同（Hobby 免费） | 相同（Hobby 免费） |

**结论**：只是界面不同，功能完全一样！

---

## ❓ 常见问题

### Q: 为什么要改用 Marketplace？
A: Vercel 在统一所有集成的安装流程，包括数据库、监控、分析等。Marketplace 提供更好的浏览和管理体验。

### Q: 旧版创建的 KV 还能用吗？
A: 完全可以！旧版创建的 KV 数据库不受影响，继续正常使用。

### Q: Marketplace 在哪里？
A: 
- 直接访问：https://vercel.com/marketplace
- 或项目页面 → Storage → Browse Marketplace

### Q: 找不到 Browse Marketplace 按钮？
A: 可能你的账号还没更新到新界面，可以：
1. 直接访问：https://vercel.com/marketplace
2. 或使用旧方法：Storage → Create Database → KV

### Q: 创建失败怎么办？
A: 
1. 确认登录了正确的 Vercel 账号
2. 确认账号有权限创建数据库
3. 尝试换一个 Region（区域）
4. 联系 Vercel 支持

---

## 📚 相关文档

- [Vercel Marketplace 官方文档](https://vercel.com/docs/marketplace)
- [Vercel KV 文档](https://vercel.com/docs/storage/vercel-kv)
- [完整配置指南](./SETUP_COMPLETE_GUIDE.md)
- [快速修复指南](./QUICK_FIX_GUIDE.md)

---

## ✅ 配置检查清单

完成后，确认以下项目：

- [ ] Marketplace 中已创建 `blog-posts-kv` 数据库
- [ ] KV 已连接到 `authmationblog` 项目
- [ ] 环境变量 `KV_URL`、`KV_REST_API_URL`、`KV_REST_API_TOKEN` 已存在
- [ ] 环境变量 `API_SECRET_KEY` 已添加
- [ ] 项目已重新部署
- [ ] test-api.ps1 运行成功
- [ ] 访问 /zh/news 可以看到文章列表

全部打勾？恭喜，配置完成！🎉

---

**准备好了吗？** [立即访问 Marketplace 创建 KV →](https://vercel.com/marketplace)
