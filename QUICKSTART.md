# 🚀 快速开始指南

5分钟内完成部署和 n8n 配置！

## 📋 第一步：部署到 Vercel（2分钟）

### 方法 A：使用 Vercel CLI（推荐）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
cd e:/code/000git/025authmaitonblog
vercel

# 4. 跟随提示操作（全部按回车使用默认值）

# 5. 部署到生产环境
vercel --prod
```

**完成！** 您会得到一个类似这样的 URL：`https://your-project.vercel.app`

### 方法 B：通过 Vercel 网站（3分钟）

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 连接您的 GitHub/GitLab 账户
3. 选择仓库并导入
4. 点击 "Deploy"
5. 等待构建完成

## 🔑 第二步：配置环境变量（1分钟）

### 在 Vercel 控制台：

1. 进入您的项目 → Settings → Environment Variables
2. 添加以下变量：

```
API_SECRET_KEY=生成一个强密码（例如：MySecure2024Key!@#）
JWT_SECRET=生成另一个强密码
```

**生成随机密码：**
```bash
# 在 PowerShell 中
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

3. 点击 "Save"
4. 重新部署：在 Deployments 页面点击最新部署的 "..." → "Redeploy"

## 🔌 第三步：配置 n8n（2分钟）

### 选项 A：导入工作流（最简单）

1. 打开您的 n8n 实例
2. 点击右上角 "+" → "Import from File"
3. 选择文件：`n8n-workflows/blog-automation-workflow.json`
4. 修改以下配置：
   - **HTTP Request 节点**:
     - URL: 改为您的 Vercel URL
     - Headers 中的 `x-api-key`: 改为您设置的 API_SECRET_KEY
5. 点击 "Save" 保存工作流
6. 点击 "Execute Workflow" 测试

### 选项 B：手动创建（5分钟）

#### 1. 创建新工作流

#### 2. 添加触发器节点
- 节点类型：**Schedule Trigger**
- 间隔：每6小时

#### 3. 添加 Set 节点
- 添加字段：
  ```
  title: "测试文章标题"
  content: "# 测试内容\n\n这是测试文章"
  excerpt: "测试摘要"
  author: "测试用户"
  locale: "zh"
  tags: ["测试"]
  ```

#### 4. 添加 HTTP Request 节点
- Method: `POST`
- URL: `https://your-project.vercel.app/api/posts`
- Headers:
  ```
  x-api-key: your-api-secret-key
  Content-Type: application/json
  ```
- Body (JSON):
  ```json
  {
    "title": "={{ $json.title }}",
    "content": "={{ $json.content }}",
    "excerpt": "={{ $json.excerpt }}",
    "author": "={{ $json.author }}",
    "locale": "={{ $json.locale }}",
    "tags": ={{ $json.tags }},
    "status": "published"
  }
  ```

#### 5. 测试工作流
- 点击 "Execute Workflow"
- 检查执行结果

## ✅ 验证部署

### 测试 API

```bash
# 获取所有文章（公开接口）
curl https://your-project.vercel.app/api/posts?locale=zh

# 创建文章（需要 API 密钥）
curl -X POST https://your-project.vercel.app/api/posts \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-secret-key" \
  -d '{
    "title": "测试文章",
    "content": "测试内容",
    "excerpt": "测试摘要",
    "author": "测试",
    "locale": "zh",
    "status": "published"
  }'
```

### 访问网站

打开浏览器访问：
- 中文: `https://your-project.vercel.app/zh`
- 英文: `https://your-project.vercel.app/en`

## 🎯 常见问题

### Q: 部署失败怎么办？
**A:** 
1. 检查 Vercel 构建日志
2. 确保 `package.json` 中的依赖完整
3. 运行 `npm install` 和 `npm run build` 本地测试

### Q: API 返回 401 Unauthorized
**A:**
1. 检查 `x-api-key` 是否正确
2. 确认环境变量已在 Vercel 中设置
3. 重新部署以应用环境变量

### Q: 文章没有显示
**A:**
1. 检查 `content/posts/posts-{locale}.json` 文件
2. 确认文章状态为 "published"
3. 清除浏览器缓存

### Q: n8n 工作流执行失败
**A:**
1. 检查 HTTP Request 节点的 URL 是否正确
2. 查看执行日志中的错误信息
3. 确认 API 密钥配置正确

## 📚 下一步

- 📖 阅读完整文档：
  - [部署指南](./DEPLOYMENT.md)
  - [API 文档](./API_DOCUMENTATION.md)
  - [n8n 配置](./N8N_SETUP.md)

- 🎨 自定义：
  - 修改样式和主题
  - 添加更多页面内容
  - 配置自定义域名

- 🔧 优化：
  - 设置 CDN
  - 启用分析工具
  - 配置 SEO

## 🆘 获取帮助

遇到问题？
1. 查看 [常见问题](./FAQ.md)
2. 阅读 [故障排除指南](./TROUBLESHOOTING.md)
3. 提交 Issue

---

**恭喜！** 🎉 您的博客系统已经成功部署并配置完成！

现在可以开始自动化发布内容了！
