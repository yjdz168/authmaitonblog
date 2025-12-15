# 快速部署到 Vercel 生产环境
# 用于在 GitHub 集成配置之前手动部署更新

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Vercel 生产环境部署" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 Git 状态
Write-Host "1. 检查 Git 状态..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "   ⚠️  有未提交的更改，建议先提交" -ForegroundColor Yellow
    Write-Host ""
    git status --short
    Write-Host ""
    $continue = Read-Host "是否继续部署？(y/n)"
    if ($continue -ne "y") {
        Write-Host "部署已取消" -ForegroundColor Red
        exit 0
    }
} else {
    Write-Host "   ✓ 工作目录干净" -ForegroundColor Green
}
Write-Host ""

# 2. 显示最新提交
Write-Host "2. 最新的 Git 提交..." -ForegroundColor Yellow
$latestCommit = git log -1 --oneline
Write-Host "   $latestCommit" -ForegroundColor White
Write-Host ""

# 3. 检查 Vercel 项目
Write-Host "3. 检查 Vercel 项目配置..." -ForegroundColor Yellow
if (Test-Path ".vercel/project.json") {
    $projectConfig = Get-Content ".vercel/project.json" | ConvertFrom-Json
    Write-Host "   项目名称: $($projectConfig.projectName)" -ForegroundColor White
    Write-Host "   项目 ID: $($projectConfig.projectId)" -ForegroundColor White
    Write-Host "   ✓ Vercel 项目已关联" -ForegroundColor Green
} else {
    Write-Host "   ✗ 未找到 Vercel 项目配置" -ForegroundColor Red
    Write-Host "   请先运行: vercel link" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# 4. 开始部署
Write-Host "4. 开始部署到生产环境..." -ForegroundColor Yellow
Write-Host ""
Write-Host "正在构建和部署，请稍候..." -ForegroundColor Cyan
Write-Host "提示：如果提示需要登录，请在浏览器中完成登录" -ForegroundColor Blue
Write-Host ""

# 执行部署命令
vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "✓ 部署成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "访问你的网站：" -ForegroundColor Yellow
    Write-Host "https://authmaitonblog.vercel.app" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "查看部署详情：" -ForegroundColor Yellow
    Write-Host "https://vercel.com/dashboard" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "提示：配置 GitHub 集成后可实现自动部署" -ForegroundColor Blue
    Write-Host "参考文档：VERCEL_GITHUB_INTEGRATION.md" -ForegroundColor Blue
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "✗ 部署失败" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "可能的原因：" -ForegroundColor Yellow
    Write-Host "1. Vercel 认证过期，需要重新登录" -ForegroundColor White
    Write-Host "   解决：运行 'vercel login'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. 网络连接问题" -ForegroundColor White
    Write-Host "   解决：检查网络连接后重试" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "3. 构建错误" -ForegroundColor White
    Write-Host "   解决：运行 'npm run build' 检查本地构建" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "查看详细错误日志：" -ForegroundColor Yellow
    Write-Host "https://vercel.com/dashboard" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
