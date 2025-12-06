# Check deployment status
Write-Host "=== Checking API Status ===" -ForegroundColor Cyan

# Check if posts exist
Write-Host "`n1. Checking if posts exist..." -ForegroundColor Yellow
try {
    $posts = Invoke-RestMethod -Uri "https://authmationblog.vercel.app/api/posts?locale=en"
    if ($posts.data -and $posts.data.Count -gt 0) {
        Write-Host "   Posts found: $($posts.data.Count)" -ForegroundColor Green
        $posts.data | ForEach-Object {
            Write-Host "   - $($_.title) (slug: $($_.slug))" -ForegroundColor Gray
        }
    } else {
        Write-Host "   No posts found!" -ForegroundColor Red
    }
} catch {
    Write-Host "   Error: $_" -ForegroundColor Red
}

# Check article page
Write-Host "`n2. Checking article page..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://authmationblog.vercel.app/en/news/test-article-english" -Method Get
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   Status: $($_.Exception.Response.StatusCode.Value__)" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan
