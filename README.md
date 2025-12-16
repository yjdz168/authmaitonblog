# 🌐 Industrial Display Blog - 工控显示屏博客系统

一个现代化的多语言博客系统，专为工控显示屏行业打造，支持 Vercel 部署和 n8n 自动化发布。自用

![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Vercel](https://img.shields.io/badge/Vercel-Ready-black)

---

## ✨ 特性

- 🌍 **15 种语言支持** - en, zh, es, fr, de, ja, ko, pt, ru, ar, it, nl, pl, tr, vi
- 🚀 **Vercel 部署** - 全球 CDN，自动扩展
- 💾 **Vercel KV 存储** - 基于 Redis 的高性能持久化
- 🤖 **n8n 自动化** - 工作流自动发布文章
- 📱 **响应式设计** - 完美支持各种设备
- 🔒 **API 安全** - JWT + API Key 认证
- 📝 **Markdown 支持** - 富文本内容编辑
- 🏷️ **标签系统** - 文章分类和标签
- 🔍 **SEO 优化** - 搜索引擎友好

---

## 🚨 重要：首次使用必读

**在使用之前，请先阅读：**

👉 **[IMPORTANT_READ_FIRST.md](./IMPORTANT_READ_FIRST.md)** 👈

如果你遇到 "read-only file system" 错误，这是正常的。Vercel 环境需要配置数据库才能正常工作。

**推荐使用 Supabase**（PostgreSQL）：
- ✅ 免费 500MB 存储
- ✅ 无限 API 请求
- ✅ 注册简单，无需信用卡
- ✅ 强大的 SQL 查询功能

👉 **[Supabase 配置指南](./SUPABASE_SETUP.md)** ← 15 分钟完成配置！

---

## 📖 文档

> 💡 **推荐使用 Supabase**：Vercel Marketplace 中 KV 选项可能不可用，建议使用 Supabase PostgreSQL！

| 文档 | 说明 |
|------|------|
| [🔥 首次使用必读](./IMPORTANT_READ_FIRST.md) | 重要配置说明 |
| [🗄️ Supabase 配置](./SUPABASE_SETUP.md) | Supabase 数据库配置（推荐） |
| [🔄 KV 迁移指南](./SUPABASE_MIGRATION_GUIDE.md) | 从 KV 切换到 Supabase |
| [📦 Marketplace 配置](./VERCEL_MARKETPLACE_GUIDE.md) | KV 配置（如果可用） |
| [⚡ 快速修复](./QUICK_FIX_GUIDE.md) | 快速解决问题 |
| [📘 完整配置指南](./SETUP_COMPLETE_GUIDE.md) | 详细步骤 |
| [🚀 Vercel 部署](./DEPLOYMENT.md) | 部署方式 |
| [🔌 API 文档](./API_DOCUMENTATION.md) | RESTful API |
| [🤖 n8n 配置](./N8N_SETUP.md) | 自动化工作流 |
| [📋 工作流说明](./n8n-workflows/README.md) | n8n 模板 |

---

## 🎯 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd 025authmaitonblog
npm install
```

### 2. 配置 Supabase 数据库（推荐）
按照 [Supabase 配置指南](./SUPABASE_SETUP.md) 配置数据库（15 分钟）。

### 3. 本地开发
```bash
# 配置环境变量
echo "NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co" > .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=your_key" >> .env.local

# 启动开发服务器
npm run dev
```

### 4. 部署到 Vercel
```bash
vercel --prod
```

### 5. 配置 n8n
导入 `n8n-workflows/` 中的工作流模板。

---

## 📂 项目结构

```
025authmaitonblog/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # 多语言路由
│   │   └── api/          # API 路由
│   ├── lib/              # 工具函数
│   │   ├── posts-kv.ts   # KV 存储逻辑
│   │   └── auth.ts       # 认证逻辑
│   └── types/            # TypeScript 类型
├── messages/             # 国际化翻译文件
├── n8n-workflows/        # n8n 工作流模板
├── content/              # 静态内容（已弃用）
├── public/               # 静态资源
└── docs/                 # 文档
```

---

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 3.4
- **国际化**: next-intl
- **数据库**: Supabase PostgreSQL
- **部署**: Vercel
- **自动化**: n8n
- **认证**: JWT + bcryptjs

---

## 🌟 功能演示

### 首页
- 16 个工控显示屏型号展示（4×4 网格）
- 品牌介绍（AUO, BOE, Sharp, Innolux 等 9 个品牌）
- 响应式卡片布局

### 多语言
- 自动语言检测
- 语言切换器
- 15 种语言完整翻译

### API
- 创建文章：`POST /api/posts`
- 获取列表：`GET /api/posts?locale=zh`
- 更新文章：`PUT /api/posts/[id]`
- 删除文章：`DELETE /api/posts/[id]`

### n8n 自动化
- 手动触发发布
- Webhook 接收发布
- 定时自动发布

---

## 🧪 测试

### 本地测试
```bash
npm run build
npm start
```

### API 测试
```powershell
# Windows
.\test-api.ps1

# Linux/Mac
./test-api.sh
```

### 手动 curl 测试
```bash
curl -X POST https://authmationblog.vercel.app/api/posts \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试文章",
    "content": "文章内容",
    "excerpt": "摘要",
    "author": "作者",
    "locale": "zh",
    "status": "published"
  }'
```

---

## 📊 性能和配额

### Vercel 免费配额
- ✅ 100 GB 带宽/月
- ✅ 无限 API 请求
- ✅ 100 次构建/天

### Supabase 免费配额
- ✅ 500 MB 数据库存储（≈ 50,000 篇文章）
- ✅ 1 GB 文件存储
- ✅ 2 GB 带宽/月
- ✅ 无限 API 请求
- ✅ 每日自动备份

---

## 🔐 安全

- API 密钥认证（`x-api-key` header）
- JWT token 支持（可选）
- CORS 配置
- 输入验证
- SQL 注入防护（无 SQL）

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

## 🆘 支持

遇到问题？

1. 查看 [IMPORTANT_READ_FIRST.md](./IMPORTANT_READ_FIRST.md)
2. 阅读 [完整配置指南](./SETUP_COMPLETE_GUIDE.md)
3. 检查 Vercel 函数日志
4. 查看 n8n 执行日志
5. 检查 KV Data Browser

---

## 📮 联系方式

- 项目地址：https://github.com/yourusername/025authmaitonblog
- 在线演示：https://authmationblog.vercel.app

---

**准备好了吗？** 🚀

👉 [首次使用必读](./IMPORTANT_READ_FIRST.md) | [Supabase 配置指南](./SUPABASE_SETUP.md)
