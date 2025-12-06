# Simple Test Script - UTF-8 with BOM
$API_URL = "https://authmationblog.vercel.app/api/posts"
$API_KEY = "1f5dff058fed4b8796ff0d6d6100011f"

Write-Host "Testing API..." -ForegroundColor Yellow

$headers = @{
    "x-api-key" = $API_KEY
    "Content-Type" = "application/json; charset=utf-8"
}

# Test 1: English Article
Write-Host "`nCreating English article..." -ForegroundColor Cyan
$body1 = @{
    title = "Test Article - English"
    content = "# Welcome`n`nThis is a test article in English."
    excerpt = "Test article in English"
    author = "Admin"
    locale = "en"
    status = "published"
    tags = @("Test", "English")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri $API_URL -Method Post -Headers $headers -Body ([System.Text.Encoding]::UTF8.GetBytes($body1))
    Write-Host "Success: English article created!" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}

# Test 2: Chinese Article
Write-Host "`nCreating Chinese article..." -ForegroundColor Cyan
$body2 = @{
    title = "Test Article - Chinese"
    content = "# Welcome`n`nThis is a test article."
    excerpt = "Test article in Chinese"
    author = "Admin"
    locale = "zh"
    status = "published"
    tags = @("Test", "Chinese")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri $API_URL -Method Post -Headers $headers -Body ([System.Text.Encoding]::UTF8.GetBytes($body2))
    Write-Host "Success: Chinese article created!" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}

Write-Host "`nDone!" -ForegroundColor Green
