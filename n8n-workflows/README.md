# n8n 工作流导入指南

> ⚠️ **重要提示**：在使用 n8n 工作流之前，请先按照 [完整配置指南](../SETUP_COMPLETE_GUIDE.md) 配置 Vercel KV 存储！

## 🚨 首次配置必读

如果你遇到以下错误：
```
Failed to create post: EROFS: read-only file system
```

这是因为 Vercel 无服务器环境的文件系统是只读的。**必须先配置 Vercel KV 存储**才能使用 API。

📖 **请先阅读**：
- 完整配置：[SETUP_COMPLETE_GUIDE.md](../SETUP_COMPLETE_GUIDE.md)
- KV 快速配置：[VERCEL_KV_SETUP.md](../VERCEL_KV_SETUP.md)

---

## 📋 工作流说明

本目录包含3个 n8n 工作流文件，从简单到复杂：

### 1. 简单发布文章工作流 (`1-simple-post-workflow.json`)
- **触发方式**：手动触发
- **功能**：手动测试发布单篇文章
- **适用场景**：测试 API 连接和基本功能
- **难度**：⭐ 初学者

### 2. Webhook 接收文章工作流 (`2-webhook-workflow.json`)
- **触发方式**：HTTP Webhook
- **功能**：接收外部系统推送的文章并自动发布
- **适用场景**：与其他系统集成，如 RSS 阅读器、内容管理系统等
- **难度**：⭐⭐ 中级

### 3. 定时发布文章工作流 (`3-schedule-workflow.json`)
- **触发方式**：定时触发（每6小时）
- **功能**：定时自动发布预设内容
- **适用场景**：定期发布行业动态、市场资讯等
- **难度**：⭐⭐ 中级

---

## 🚀 导入步骤

### 方法1：通过 n8n UI 导入（推荐）

1. **打开 n8n**
   - 访问你的 n8n 实例（如 `http://localhost:5678`）
   - 登录到你的账户

2. **导入工作流**
   - 点击左上角的 **☰ 菜单**
   - 选择 **Import from File**（从文件导入）
   - 选择本目录下的任一 JSON 文件
   - 点击 **Import**（导入）

3. **配置工作流**
   - 工作流导入后会自动打开
   - 找到 **"发送到API"** 或 **"发布文章"** 节点
   - 更新以下配置：
     - **URL**: 将 `https://your-project.vercel.app` 改为你的实际域名
     - **x-api-key**: 将 `your-api-key-here` 改为你的 API 密钥

4. **保存并激活**
   - 点击右上角的 **Save**（保存）
   - 切换 **Active** 开关以激活工作流

### 方法2：使用 n8n CLI 导入

```bash
# 进入 n8n 工作目录
cd ~/.n8n/workflows

# 复制工作流文件
cp /path/to/n8n-workflows/*.json .

# 重启 n8n
n8n stop
n8n start
```

---

## ⚙️ 配置说明

### 必须修改的参数

每个工作流中都需要修改以下内容：

#### 1. API 端点 URL
```json
"url": "https://your-project.vercel.app/api/posts"
```
改为你的实际 Vercel 域名，例如：
```json
"url": "https://my-blog.vercel.app/api/posts"
```

#### 2. API 密钥
```json
{
  "name": "x-api-key",
  "value": "your-api-key-here"
}
```
改为你在 Vercel 环境变量中设置的 `API_SECRET_KEY`

---

## 🧪 测试工作流

### 测试工作流 1（简单发布）

1. 打开工作流
2. 点击 **"手动触发"** 节点
3. 点击 **"Execute Node"**（执行节点）
4. 查看执行结果

### 测试工作流 2（Webhook）

1. 激活工作流
2. 复制 Webhook URL（在 "Webhook触发器" 节点中）
3. 使用 curl 或 Postman 测试：

```bash
curl -X POST https://your-n8n.app/webhook/blog-post \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试文章",
    "content": "这是通过 Webhook 发布的文章",
    "excerpt": "测试摘要",
    "author": "测试作者",
    "locale": "zh",
    "status": "published"
  }'
```

### 测试工作流 3（定时发布）

1. 打开工作流
2. 修改 **"准备数据"** 节点中的文章内容
3. 点击 **"Execute Workflow"**（执行工作流）手动测试
4. 激活后将自动每6小时执行一次

---

## 🎯 现在可以测试了！

### ✅ 最新更新（已部署到 Vercel）

API 已经修复并重新部署，现在应该可以正常工作了：
- ✅ 修复了 slug 生成逻辑，支持中文标题
- ✅ 增加了字段验证和错误处理
- ✅ 改进了错误日志输出
- 🌐 **部署地址**: https://authmationblog.vercel.app

### 快速测试步骤

1. **重新导入 n8n 工作流**
   - 删除旧的工作流
   - 导入新的 `1-simple-post-workflow.json`
   - 更新 API Key

2. **点击执行**
   - 应该会成功创建文章
   - 返回包含文章 ID 和详情的响应

3. **查看结果**
   - 访问：https://authmationblog.vercel.app/zh/news
   - 应该能看到新创建的文章

### 🧪 使用测试脚本验证

项目根目录现在包含两个测试脚本：

**PowerShell (Windows):**
```powershell
# 1. 编辑 test-api.ps1，替换 API_KEY
# 2. 运行测试
.\test-api.ps1
```

**Bash (Linux/Mac):**
```bash
# 1. 编辑 test-api.sh，替换 API_KEY
# 2. 添加执行权限
chmod +x test-api.sh
# 3. 运行测试
./test-api.sh
```

---

## 🔧 常见问题

### Q1: 导入时提示 "Could not find property option"
**解决方案**：
- 确保使用的是 n8n v0.200+ 版本
- 尝试使用更简单的 `1-simple-post-workflow.json`
- 如果仍失败，手动创建工作流（见下方）

### Q2: API 调用返回 401 Unauthorized
**解决方案**：
- 检查 `x-api-key` 是否正确
- 确认 Vercel 环境变量 `API_SECRET_KEY` 已设置
- 检查 API 端点 URL 是否正确

### Q3: Webhook 无法接收请求
**解决方案**：
- 确保工作流已激活（Active 开关为 ON）
- 检查 n8n 实例是否可从外部访问
- 查看 Webhook 节点中的 "Test URL" 是否正确

### Q4: 定时触发不执行
**解决方案**：
- 确保工作流已激活
- 检查 n8n 实例是否持续运行（不是临时启动）
- 查看执行历史中是否有错误日志

---

## 📝 手动创建工作流（备选方案）

如果 JSON 导入失败，可以手动创建：

### 创建简单发布工作流

1. **添加触发器**
   - 节点类型：Manual Trigger（手动触发）

2. **添加数据设置节点**
   - 节点类型：Set
   - 添加以下字段：
     - `title` (String): 文章标题
     - `content` (String): 文章内容
     - `excerpt` (String): 摘要
     - `author` (String): 作者
     - `locale` (String): zh
     - `status` (String): published

3. **添加 HTTP 请求节点**
   - 节点类型：HTTP Request
   - **Method**: POST
   - **URL**: `https://your-project.vercel.app/api/posts`
   - **Authentication**: None
   - **Send Headers**: 开启
   - **Headers**:
     - Name: `x-api-key`, Value: `your-api-key`
     - Name: `Content-Type`, Value: `application/json`
   - **Send Body**: 开启
   - **Body Content Type**: JSON
   - **Specify Body**: JSON
   - **JSON**: `={{ JSON.stringify($json) }}`

4. **连接节点并保存**

---

## 🔍 故障排除：HTTP Request 节点配置

如果遇到 `body` 为空的错误，请按以下步骤检查：

### 检查清单：

1. **确认 Send Body 已开启**
   - 在 HTTP Request 节点中，找到 "Send Body" 选项
   - 确保它是 **ON** 状态

2. **确认 Body 配置正确**
   - **Specify Body**: 选择 "JSON"（不是 "Using Fields Below"）
   - **JSON 字段**: 输入表达式 `={{ JSON.stringify($json) }}`
   - 或者简化为：`={{ $json }}`

3. **测试表达式**
   - 在 HTTP Request 节点中，点击 "Execute Node"
   - 检查 "Input" 标签页，确认上一个节点的输出
   - 检查 "Output" 标签页，查看请求详情

### 替代方案 - 使用字段映射：

如果表达式不工作，可以使用字段映射方式：

1. **Body Content Type**: 选择 "JSON"
2. **Specify Body**: 选择 "Using Fields Below"
3. 添加以下字段：
   - `title` → `={{ $json.title }}`
   - `content` → `={{ $json.content }}`
   - `excerpt` → `={{ $json.excerpt }}`
   - `author` → `={{ $json.author }}`
   - `locale` → `={{ $json.locale }}`
   - `status` → `={{ $json.status }}`

---

## 📚 更多资源

- [n8n 官方文档](https://docs.n8n.io/)
- [HTTP Request 节点文档](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
- [Webhook 节点文档](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Schedule Trigger 文档](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)

---

## 🤝 支持

如果遇到问题，请检查：
1. n8n 版本是否为最新
2. API 端点是否可访问
3. API 密钥是否正确
4. 查看 n8n 执行日志获取详细错误信息

祝使用愉快！🎉
