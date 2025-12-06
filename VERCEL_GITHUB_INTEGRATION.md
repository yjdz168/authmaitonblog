# Vercel GitHub 自动部署配置指南

## 问题描述

如果你的项目最初是通过 Vercel CLI (`vercel --prod`) 部署的，而不是通过 GitHub 集成，那么 GitHub 推送不会触发 Vercel 自动部署。

## 解决方案

### 方法 1：在 Vercel Dashboard 中连接 GitHub（推荐）

1. **登录 Vercel Dashboard**
   - 访问 https://vercel.com/dashboard
   - 找到你的项目 `authmaitonblog`

2. **进入项目设置**
   - 点击项目名称进入项目详情页
   - 点击顶部的 "Settings" 标签

3. **配置 Git 集成**
   - 在左侧菜单中选择 "Git"
   - 点击 "Connect Git Repository" 按钮
   - 选择 "GitHub"
   - 授权 Vercel 访问你的 GitHub 账户（如果尚未授权）
   - 选择仓库：`yjdz168/authmaitonblog`

4. **配置分支设置**
   - Production Branch: `main`
   - 启用 "Automatically deploy all pushes" 选项
   - 启用 "Automatically deploy all branches" （可选）

5. **保存设置**
   - 点击 "Save" 按钮
   - 现在每次推送到 `main` 分支都会自动触发部署

### 方法 2：重新导入项目（彻底解决）

如果方法 1 不工作，可以重新导入项目：

1. **备份当前环境变量**
   - 在 Vercel Dashboard 的项目设置中
   - 进入 "Environment Variables"
   - 记录或导出所有环境变量

2. **删除当前项目**
   - ⚠️ 注意：这会删除当前的部署记录
   - 在项目设置中选择 "General"
   - 滚动到底部，点击 "Delete Project"

3. **重新导入项目**
   - 在 Vercel Dashboard 点击 "Add New..." > "Project"
   - 选择 "Import Git Repository"
   - 选择 GitHub 并找到 `yjdz168/authmaitonblog`
   - 点击 "Import"

4. **配置项目**
   - Framework Preset: Next.js (自动检测)
   - Root Directory: `./` (默认)
   - Build Command: `npm run build` (默认)
   - Output Directory: `.next` (默认)

5. **添加环境变量**
   - 在部署前添加之前备份的环境变量：
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_url
     SUPABASE_SERVICE_ROLE_KEY=your_key
     API_SECRET_KEY=your_api_key
     ```

6. **部署**
   - 点击 "Deploy" 按钮
   - 等待首次部署完成

### 方法 3：使用 Vercel CLI 手动触发（临时方案）

如果你想继续使用 CLI 部署：

```bash
# 每次推送后手动部署
cd e:/code/000git/025authmaitonblog
vercel --prod
```

但这不是自动的，不推荐作为长期解决方案。

## 验证 GitHub 集成是否成功

1. **检查 Vercel 项目设置**
   - 在 Settings > Git 中应该能看到连接的 GitHub 仓库
   - 显示：`Connected to yjdz168/authmaitonblog`

2. **进行测试推送**
   ```bash
   # 创建一个小的测试更改
   echo "# Test" >> README.md
   git add README.md
   git commit -m "Test Vercel auto-deploy"
   git push origin main
   ```

3. **观察 Vercel Dashboard**
   - 在 Vercel 项目页面的 "Deployments" 标签中
   - 应该会立即看到新的部署开始
   - 状态会从 "Building" 变为 "Ready"

## 常见问题

### Q1: GitHub 推送后没有触发部署？

**检查清单：**
- ✓ Vercel 项目是否已连接到 GitHub 仓库？
- ✓ GitHub App 是否有权限访问该仓库？
- ✓ Production Branch 是否设置为 `main`？
- ✓ 是否推送到了正确的分支？

**解决方法：**
1. 进入 Vercel Settings > Git
2. 点击 "Disconnect" 然后重新连接
3. 确保 GitHub App 有仓库访问权限

### Q2: 部署失败了怎么办？

**查看日志：**
1. 在 Vercel Dashboard 进入 "Deployments"
2. 点击失败的部署
3. 查看 "Build Logs" 和 "Function Logs"

**常见错误：**
- 缺少环境变量
- 构建命令错误
- 依赖安装失败
- TypeScript 类型错误

### Q3: 如何回滚到之前的版本？

1. 在 Vercel Dashboard 的 "Deployments" 标签
2. 找到之前成功的部署
3. 点击部署旁边的 "⋯" 菜单
4. 选择 "Promote to Production"

## 部署流程图

```
GitHub Push (main branch)
    ↓
Vercel 检测到推送
    ↓
自动开始构建
    ↓
运行 npm install
    ↓
运行 npm run build
    ↓
部署到 Vercel CDN
    ↓
部署完成 ✓
    ↓
自动通知（如果配置）
```

## 推荐配置

在 Vercel 项目设置中配置以下选项：

### General Settings
- Node.js Version: `18.x` 或更高
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `.next`

### Git Settings
- Production Branch: `main`
- Deploy Hooks: 可以创建 webhook 用于手动触发部署

### Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_key

# API Security
API_SECRET_KEY=your_api_secret_key
NEXT_PUBLIC_API_URL=https://authmaitonblog.vercel.app

# JWT (Optional)
JWT_SECRET=your_jwt_secret
```

## 下一步

完成 GitHub 集成后：

1. ✅ 每次推送到 `main` 分支会自动部署
2. ✅ 可以在 Pull Request 中看到预览部署
3. ✅ 可以在 Vercel Dashboard 查看部署历史
4. ✅ 可以配置自定义域名

## 相关文档

- [Vercel Git Integration](https://vercel.com/docs/concepts/git)
- [Deploying from GitHub](https://vercel.com/docs/concepts/git/vercel-for-github)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**当前项目信息：**
- GitHub 仓库：https://github.com/yjdz168/authmaitonblog
- Vercel 项目：authmaitonblog
- 生产域名：https://authmaitonblog.vercel.app
- 当前分支：main

最后更新：2025-12-06
