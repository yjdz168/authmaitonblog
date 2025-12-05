# n8n 集成配置指南

本指南将帮助您配置 n8n 自动化工作流，实现自动发布文章到您的博客系统。

## 前置要求

- n8n 已安装（自托管或云版本）
- 博客系统已部署到 Vercel
- API 密钥已配置

## 第一步：在 Vercel 获取 API 配置信息

### 1. 获取您的 Vercel 域名
部署完成后，您会得到一个域名，例如：
- `https://your-project.vercel.app`
- 或您的自定义域名：`https://yourdomain.com`

### 2. 设置 API 密钥
在项目的 `.env.local` 文件中（或 Vercel 环境变量中）：
```env
API_SECRET_KEY=your-super-secret-api-key-change-this
```

**重要提示：** 请使用强密码，不要使用默认值！

## 第二步：配置 n8n 工作流

### 方法 1：导入预配置工作流

将以下 JSON 保存为 `blog-automation-workflow.json`，然后在 n8n 中导入：

```json
{
  "name": "博客自动发布工作流",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "hoursInterval": 6
            }
          ]
        }
      },
      "name": "定时触发器",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://your-project.vercel.app/api/posts",
        "authentication": "none",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "x-api-key",
              "value": "your-super-secret-api-key-change-this"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": []
        },
        "jsonParameters": true,
        "options": {},
        "bodyParametersJson": "={\n  \"title\": \"{{ $json.title }}\",\n  \"content\": \"{{ $json.content }}\",\n  \"excerpt\": \"{{ $json.excerpt }}\",\n  \"author\": \"{{ $json.author }}\",\n  \"locale\": \"{{ $json.locale || 'en' }}\",\n  \"tags\": {{ $json.tags }},\n  \"status\": \"published\",\n  \"featuredImage\": \"{{ $json.featuredImage }}\"\n}"
      },
      "name": "发布文章到博客",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [670, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "title",
              "value": "工控显示屏行业最新动态"
            },
            {
              "name": "content",
              "value": "# 行业新闻\\n\\n本月工控显示屏市场呈现强劲增长态势...\\n\\n## 主要亮点\\n\\n- AUO 推出新系列产品\\n- BOE 扩大产能\\n- Sharp 技术创新"
            },
            {
              "name": "excerpt",
              "value": "本月工控显示屏市场最新动态和行业趋势分析"
            },
            {
              "name": "author",
              "value": "编辑部"
            },
            {
              "name": "locale",
              "value": "zh"
            },
            {
              "name": "featuredImage",
              "value": "https://example.com/image.jpg"
            }
          ],
          "array": [
            {
              "name": "tags",
              "value": [
                "行业动态",
                "工控显示屏",
                "市场分析"
              ]
            }
          ]
        },
        "options": {}
      },
      "name": "准备文章数据",
      "type": "n8n-nodes-base.set",
      "typeVersion": 1,
      "position": [450, 300]
    }
  ],
  "connections": {
    "定时触发器": {
      "main": [
        [
          {
            "node": "准备文章数据",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "准备文章数据": {
      "main": [
        [
          {
            "node": "发布文章到博客",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

### 方法 2：手动创建工作流

#### 节点 1: 触发器
1. 添加节点：**Schedule Trigger** 或 **Webhook**
2. 配置触发时间（例如：每6小时执行一次）

#### 节点 2: 数据准备（可选）
1. 添加节点：**Function** 或 **Set**
2. 准备文章数据：
```javascript
// Function 节点示例
const article = {
  title: "您的文章标题",
  content: "# 文章内容\n\n使用 Markdown 格式编写...",
  excerpt: "文章摘要",
  author: "作者名称",
  locale: "zh", // 语言代码
  tags: ["标签1", "标签2"],
  status: "published",
  featuredImage: "https://example.com/image.jpg" // 可选
};

return { json: article };
```

#### 节点 3: HTTP 请求
1. 添加节点：**HTTP Request**
2. 配置参数：

**基本设置：**
- Method: `POST`
- URL: `https://your-project.vercel.app/api/posts`

**认证：**
- Authentication: `None`（我们使用自定义 Header）

**Headers：**
```
x-api-key: your-super-secret-api-key-change-this
Content-Type: application/json
```

**Body：**
- 选择：`JSON`
- 内容：
```json
{
  "title": "={{ $json.title }}",
  "content": "={{ $json.content }}",
  "excerpt": "={{ $json.excerpt }}",
  "author": "={{ $json.author }}",
  "locale": "={{ $json.locale }}",
  "tags": ={{ $json.tags }},
  "status": "published",
  "featuredImage": "={{ $json.featuredImage }}"
}
```

#### 节点 4: 成功处理（可选）
添加节点处理响应：
- **IF** 节点：检查响应状态
- **Send Email** 节点：发送成功通知
- **Slack** 节点：发送到 Slack 频道

## 第三步：高级配置示例

### 示例 1: RSS 订阅自动发布

```
[RSS Read] → [Filter] → [Transform Data] → [HTTP Request] → [Notification]
```

**RSS Read 节点：**
- URL: 您的 RSS 源
- 间隔：每小时检查一次

**Filter 节点：**
```javascript
// 只处理新文章
const items = $input.all();
return items.filter(item => {
  const pubDate = new Date(item.json.pubDate);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return pubDate > oneDayAgo;
});
```

**Transform Data 节点：**
```javascript
const transformed = $input.all().map(item => ({
  json: {
    title: item.json.title,
    content: item.json.contentSnippet || item.json.content,
    excerpt: item.json.contentSnippet?.substring(0, 200) + '...',
    author: item.json.creator || 'RSS Feed',
    locale: 'zh',
    tags: item.json.categories || ['新闻'],
    status: 'published'
  }
}));
return transformed;
```

### 示例 2: Webhook 实时发布

在 n8n 中创建 Webhook 触发器：

**Webhook 节点配置：**
- Method: `POST`
- Path: `blog-publish`
- Response Mode: `When Last Node Finishes`

**测试 Webhook：**
```bash
curl -X POST https://your-n8n-instance.com/webhook/blog-publish \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试文章",
    "content": "这是通过 Webhook 发布的文章",
    "excerpt": "Webhook 测试",
    "author": "测试用户",
    "locale": "zh"
  }'
```

### 示例 3: Google Sheets 批量发布

```
[Schedule] → [Google Sheets] → [Loop] → [HTTP Request] → [Update Sheet]
```

**Google Sheets 节点：**
- Operation: `Read`
- Range: `A2:G100`（跳过标题行）

**Sheet 格式：**
| 标题 | 内容 | 摘要 | 作者 | 语言 | 标签 | 状态 |
|------|------|------|------|------|------|------|
| ... | ... | ... | ... | zh | 标签1,标签2 | pending |

**Loop 节点配置：**
遍历每一行，只处理状态为 "pending" 的行

## 第四步：测试和调试

### 测试 API 连接

使用 cURL 测试：

```bash
# 创建测试文章
curl -X POST https://your-project.vercel.app/api/posts \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-super-secret-api-key-change-this" \
  -d '{
    "title": "测试文章",
    "content": "# 测试内容\n\n这是一篇测试文章",
    "excerpt": "测试摘要",
    "author": "测试用户",
    "locale": "zh",
    "tags": ["测试"],
    "status": "published"
  }'

# 获取所有文章
curl https://your-project.vercel.app/api/posts?locale=zh
```

### 在 n8n 中调试

1. **启用执行日志：**
   - Settings → Executions → Save execution progress

2. **查看执行历史：**
   - 点击工作流名称
   - 查看 Executions 标签

3. **使用 Manual Execution：**
   - 点击 "Execute Workflow" 按钮
   - 查看每个节点的输出

## 第五步：多语言发布

### 单一工作流发布多语言

```javascript
// Function 节点示例
const languages = ['zh', 'en', 'es', 'fr', 'de'];
const baseArticle = {
  title: {
    zh: "中文标题",
    en: "English Title",
    es: "Título en Español",
    fr: "Titre Français",
    de: "Deutscher Titel"
  },
  content: {
    zh: "中文内容...",
    en: "English content...",
    es: "Contenido en español...",
    fr: "Contenu français...",
    de: "Deutscher Inhalt..."
  }
};

// 为每种语言创建一个请求
return languages.map(lang => ({
  json: {
    title: baseArticle.title[lang],
    content: baseArticle.content[lang],
    excerpt: baseArticle.content[lang].substring(0, 200),
    author: "多语言编辑",
    locale: lang,
    tags: ["多语言", "自动发布"],
    status: "published"
  }
}));
```

## 安全建议

### 1. 保护 API 密钥
- ✅ 使用 n8n 的 Credentials 功能存储密钥
- ✅ 定期更换 API 密钥
- ❌ 不要在工作流中硬编码密钥
- ❌ 不要在日志中暴露密钥

### 2. 使用 IP 白名单（可选）
在 Vercel 的 Middleware 中添加 IP 检查：
```javascript
// src/middleware.ts
const allowedIPs = ['your-n8n-server-ip'];
// 实现 IP 检查逻辑
```

### 3. 限流保护
API 已内置基本保护，避免滥用。

## 常见问题

### Q: 文章发布失败
**A:** 检查：
1. API 密钥是否正确
2. URL 是否正确（包含 https://）
3. Content-Type 是否为 application/json
4. 请求体格式是否正确

### Q: 中文内容乱码
**A:** 确保：
1. n8n 使用 UTF-8 编码
2. HTTP Request 节点的 Content-Type 包含 charset=utf-8

### Q: 如何批量删除测试文章
**A:** 使用 API：
```bash
# 获取所有文章 ID
curl https://your-project.vercel.app/api/posts?locale=zh

# 删除指定 ID 的文章
curl -X DELETE https://your-project.vercel.app/api/posts/{id}?locale=zh \
  -H "x-api-key: your-api-key"
```

## 生产环境检查清单

- [ ] API 密钥已更改为强密码
- [ ] Vercel 环境变量已正确配置
- [ ] n8n 工作流已测试通过
- [ ] 错误处理和通知已配置
- [ ] 执行日志已启用
- [ ] 备份策略已制定
- [ ] 监控告警已设置

## 支持和资源

- [n8n 官方文档](https://docs.n8n.io/)
- [Vercel 部署指南](./DEPLOYMENT.md)
- [API 文档](./API_DOCUMENTATION.md)

## 示例工作流下载

完整的 n8n 工作流示例文件：
- `blog-automation-workflow.json` - 基础自动发布
- `rss-to-blog-workflow.json` - RSS 订阅发布
- `sheets-to-blog-workflow.json` - Google Sheets 批量发布

这些文件可以直接导入到 n8n 中使用！
