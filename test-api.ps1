# PowerShell API 测试脚本
# 用于测试博客 API 的各种功能

$API_URL = "https://authmationblog.vercel.app/api/posts"
$API_KEY = "your-api-key-here"  # 请替换为你的实际 API 密钥

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "测试博客 API" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 测试 1: 创建文章
Write-Host "📝 测试 1: 创建新文章" -ForegroundColor Yellow
Write-Host "-------------------------------------" -ForegroundColor Yellow

$body = @{
    title = "测试文章 - PowerShell Script"
    content = "# 这是测试文章`n`n通过 PowerShell 脚本创建。`n`n## 功能测试`n`n- 支持 Markdown`n- 多语言支持`n- API 兼容性"
    excerpt = "这是一篇通过 PowerShell 脚本创建的测试文章"
    author = "测试系统"
    locale = "zh"
    status = "published"
    tags = @("测试", "API", "自动化")
} | ConvertTo-Json -Depth 10

$headers = @{
    "x-api-key" = $API_KEY
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri $API_URL -Method Post -Headers $headers -Body $body
    $response | ConvertTo-Json -Depth 10
    Write-Host "`n✅ 文章创建成功！" -ForegroundColor Green
} catch {
    Write-Host "`n❌ 创建失败: $_" -ForegroundColor Red
}

Write-Host "`n"

# 测试 2: 获取文章列表
Write-Host "📋 测试 2: 获取文章列表 (中文)" -ForegroundColor Yellow
Write-Host "-------------------------------------" -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "$API_URL?locale=zh" -Method Get
    $response | ConvertTo-Json -Depth 10
    Write-Host "`n✅ 获取成功！" -ForegroundColor Green
} catch {
    Write-Host "`n❌ 获取失败: $_" -ForegroundColor Red
}

Write-Host "`n"

# 测试 3: 获取英文文章列表
Write-Host "📋 测试 3: 获取文章列表 (英文)" -ForegroundColor Yellow
Write-Host "-------------------------------------" -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "$API_URL?locale=en" -Method Get
    $response | ConvertTo-Json -Depth 10
    Write-Host "`n✅ 获取成功！" -ForegroundColor Green
} catch {
    Write-Host "`n❌ 获取失败: $_" -ForegroundColor Red
}

Write-Host "`n"
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "测试完成！" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
