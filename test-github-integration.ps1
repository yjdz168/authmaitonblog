# Vercel GitHub 集成测试脚本
# 用于验证 GitHub 推送是否能触发 Vercel 自动部署

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Vercel GitHub 集成测试" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 Git 状态
Write-Host "1. 检查 Git 状态..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "   ✓ 有未提交的更改" -ForegroundColor Green
} else {
    Write-Host "   ℹ 工作目录干净" -ForegroundColor Blue
}
Write-Host ""

# 2. 检查远程仓库配置
Write-Host "2. 检查远程仓库..." -ForegroundColor Yellow
$remoteUrl = git remote get-url origin
Write-Host "   远程仓库: $remoteUrl" -ForegroundColor White
if ($remoteUrl -match "github.com") {
    Write-Host "   ✓ GitHub 仓库已配置" -ForegroundColor Green
} else {
    Write-Host "   ✗ 未检测到 GitHub 仓库" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 3. 检查当前分支
Write-Host "3. 检查当前分支..." -ForegroundColor Yellow
$currentBranch = git branch --show-current
Write-Host "   当前分支: $currentBranch" -ForegroundColor White
if ($currentBranch -eq "main" -or $currentBranch -eq "master") {
    Write-Host "   ✓ 在主分支上" -ForegroundColor Green
} else {
    Write-Host "   ℹ 不在主分支上（Vercel 默认部署主分支）" -ForegroundColor Blue
}
Write-Host ""

# 4. 创建测试文件
Write-Host "4. 创建测试文件..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$testContent = @"
# GitHub Integration Test

Last test: $timestamp

This file is used to test Vercel's GitHub integration.
If you see a new deployment in Vercel after pushing this change,
it means the GitHub integration is working correctly.

## Test Results

- Timestamp: $timestamp
- Branch: $currentBranch
- Git Commit: $(git rev-parse --short HEAD)

---
This file can be safely deleted after confirming the integration works.
"@

Set-Content -Path "GITHUB_INTEGRATION_TEST.md" -Value $testContent
Write-Host "   ✓ 测试文件已创建" -ForegroundColor Green
Write-Host ""

# 5. 添加并提交更改
Write-Host "5. 提交测试更改..." -ForegroundColor Yellow
git add GITHUB_INTEGRATION_TEST.md VERCEL_GITHUB_INTEGRATION.md
git commit -m "Test: Verify Vercel GitHub integration - $timestamp"
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ 提交成功" -ForegroundColor Green
} else {
    Write-Host "   ✗ 提交失败" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 6. 推送到 GitHub
Write-Host "6. 推送到 GitHub..." -ForegroundColor Yellow
Write-Host "   正在推送..." -ForegroundColor White
git push origin $currentBranch
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ 推送成功" -ForegroundColor Green
} else {
    Write-Host "   ✗ 推送失败" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 7. 显示后续步骤
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "测试完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 打开 Vercel Dashboard:" -ForegroundColor White
Write-Host "   https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. 进入你的项目 (authmaitonblog)" -ForegroundColor White
Write-Host ""
Write-Host "3. 检查 'Deployments' 标签页" -ForegroundColor White
Write-Host ""
Write-Host "4. 验证结果：" -ForegroundColor White
Write-Host "   ✓ 如果看到新的部署正在进行，说明集成成功！" -ForegroundColor Green
Write-Host "   ✗ 如果没有新部署，说明需要配置 GitHub 集成" -ForegroundColor Red
Write-Host ""
Write-Host "5. 如果集成未工作，请按照以下文档配置：" -ForegroundColor White
Write-Host "   VERCEL_GITHUB_INTEGRATION.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "6. 最新的 commit hash:" -ForegroundColor White
$latestCommit = git rev-parse --short HEAD
Write-Host "   $latestCommit" -ForegroundColor Cyan
Write-Host ""
Write-Host "7. 查看 GitHub 仓库：" -ForegroundColor White
Write-Host "   $remoteUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 8. 等待几秒钟，然后尝试打开 Vercel Dashboard
Write-Host "提示：按任意键打开 Vercel Dashboard..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Start-Process "https://vercel.com/dashboard"

Write-Host ""
Write-Host "测试脚本执行完毕！" -ForegroundColor Green
