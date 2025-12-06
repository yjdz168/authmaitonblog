# PowerShell 多语言测试脚本
# 为所有支持的语言创建测试文章

$API_URL = "https://authmationblog.vercel.app/api/posts"
$API_KEY = "1f5dff058fed4b8796ff0d6d6100011f"  # 请替换为你的实际 API 密钥

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "多语言文章创建测试" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$headers = @{
    "x-api-key" = $API_KEY
    "Content-Type" = "application/json; charset=utf-8"
}

# 定义多语言文章内容
$articles = @(
    @{
        locale = "en"
        title = "Test Article - English"
        content = "# Welcome to Our Blog`n`nThis is a test article in English.`n`n## Features`n`n- Markdown support`n- Multi-language capability`n- API integration"
        excerpt = "This is a test article created in English"
        author = "Test System"
        tags = @("Test", "English", "API")
    },
    @{
        locale = "zh"
        title = "测试文章 - 中文"
        content = "# 欢迎来到我们的博客`n`n这是一篇中文测试文章。`n`n## 功能特点`n`n- 支持 Markdown`n- 多语言能力`n- API 集成"
        excerpt = "这是一篇用中文创建的测试文章"
        author = "测试系统"
        tags = @("测试", "中文", "API")
    },
    @{
        locale = "ja"
        title = "テスト記事 - 日本語"
        content = "# ブログへようこそ`n`nこれは日本語のテスト記事です。`n`n## 機能`n`n- Markdownサポート`n- 多言語対応`n- API統合"
        excerpt = "これは日本語で作成されたテスト記事です"
        author = "テストシステム"
        tags = @("テスト", "日本語", "API")
    },
    @{
        locale = "es"
        title = "Artículo de Prueba - Español"
        content = "# Bienvenido a Nuestro Blog`n`nEste es un artículo de prueba en español.`n`n## Características`n`n- Soporte de Markdown`n- Capacidad multilingüe`n- Integración API"
        excerpt = "Este es un artículo de prueba creado en español"
        author = "Sistema de Prueba"
        tags = @("Prueba", "Español", "API")
    },
    @{
        locale = "fr"
        title = "Article de Test - Français"
        content = "# Bienvenue sur Notre Blog`n`nCeci est un article de test en français.`n`n## Fonctionnalités`n`n- Support Markdown`n- Capacité multilingue`n- Intégration API"
        excerpt = "Ceci est un article de test créé en français"
        author = "Système de Test"
        tags = @("Test", "Français", "API")
    },
    @{
        locale = "de"
        title = "Testartikel - Deutsch"
        content = "# Willkommen in Unserem Blog`n`nDies ist ein Testartikel auf Deutsch.`n`n## Funktionen`n`n- Markdown-Unterstützung`n- Mehrsprachige Fähigkeit`n- API-Integration"
        excerpt = "Dies ist ein auf Deutsch erstellter Testartikel"
        author = "Testsystem"
        tags = @("Test", "Deutsch", "API")
    },
    @{
        locale = "ko"
        title = "테스트 기사 - 한국어"
        content = "# 블로그에 오신 것을 환영합니다`n`n이것은 한국어 테스트 기사입니다.`n`n## 기능`n`n- 마크다운 지원`n- 다국어 기능`n- API 통합"
        excerpt = "이것은 한국어로 작성된 테스트 기사입니다"
        author = "테스트 시스템"
        tags = @("테스트", "한국어", "API")
    },
    @{
        locale = "it"
        title = "Articolo di Test - Italiano"
        content = "# Benvenuto nel Nostro Blog`n`nQuesto è un articolo di test in italiano.`n`n## Caratteristiche`n`n- Supporto Markdown`n- Capacità multilingue`n- Integrazione API"
        excerpt = "Questo è un articolo di test creato in italiano"
        author = "Sistema di Test"
        tags = @("Test", "Italiano", "API")
    },
    @{
        locale = "pt"
        title = "Artigo de Teste - Português"
        content = "# Bem-vindo ao Nosso Blog`n`nEste é um artigo de teste em português.`n`n## Recursos`n`n- Suporte para Markdown`n- Capacidade multilíngue`n- Integração de API"
        excerpt = "Este é um artigo de teste criado em português"
        author = "Sistema de Teste"
        tags = @("Teste", "Português", "API")
    },
    @{
        locale = "ru"
        title = "Тестовая Статья - Русский"
        content = "# Добро пожаловать в наш блог`n`nЭто тестовая статья на русском языке.`n`n## Возможности`n`n- Поддержка Markdown`n- Многоязычная поддержка`n- Интеграция API"
        excerpt = "Это тестовая статья, созданная на русском языке"
        author = "Тестовая Система"
        tags = @("Тест", "Русский", "API")
    },
    @{
        locale = "nl"
        title = "Testartikel - Nederlands"
        content = "# Welkom bij Onze Blog`n`nDit is een testartikel in het Nederlands.`n`n## Functies`n`n- Markdown-ondersteuning`n- Meertalige mogelijkheden`n- API-integratie"
        excerpt = "Dit is een testartikel gemaakt in het Nederlands"
        author = "Testsysteem"
        tags = @("Test", "Nederlands", "API")
    },
    @{
        locale = "pl"
        title = "Artykuł Testowy - Polski"
        content = "# Witamy w Naszym Blogu`n`nTo jest artykuł testowy po polsku.`n`n## Funkcje`n`n- Wsparcie dla Markdown`n- Możliwość wielojęzyczna`n- Integracja API"
        excerpt = "To jest artykuł testowy stworzony po polsku"
        author = "System Testowy"
        tags = @("Test", "Polski", "API")
    },
    @{
        locale = "tr"
        title = "Test Makalesi - Türkçe"
        content = "# Blogumuza Hoş Geldiniz`n`nBu Türkçe bir test makalesidir.`n`n## Özellikler`n`n- Markdown desteği`n- Çok dilli yetenek`n- API entegrasyonu"
        excerpt = "Bu Türkçe olarak oluşturulmuş bir test makalesidir"
        author = "Test Sistemi"
        tags = @("Test", "Türkçe", "API")
    },
    @{
        locale = "vi"
        title = "Bài Viết Thử Nghiệm - Tiếng Việt"
        content = "# Chào Mừng Đến Với Blog Của Chúng Tôi`n`nĐây là một bài viết thử nghiệm bằng tiếng Việt.`n`n## Tính Năng`n`n- Hỗ trợ Markdown`n- Khả năng đa ngôn ngữ`n- Tích hợp API"
        excerpt = "Đây là một bài viết thử nghiệm được tạo bằng tiếng Việt"
        author = "Hệ Thống Thử Nghiệm"
        tags = @("Thử nghiệm", "Tiếng Việt", "API")
    }
)

# 为每种语言创建文章
$successCount = 0
$failCount = 0

foreach ($article in $articles) {
    Write-Host "📝 正在创建 $($article.locale) 文章: $($article.title)" -ForegroundColor Yellow
    
    $body = @{
        title = $article.title
        content = $article.content
        excerpt = $article.excerpt
        author = $article.author
        locale = $article.locale
        status = "published"
        tags = $article.tags
    } | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-RestMethod -Uri $API_URL -Method Post -Headers $headers -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
        Write-Host "   ✅ 成功!" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "   ❌ 失败: $_" -ForegroundColor Red
        $failCount++
    }
    
    Start-Sleep -Milliseconds 500  # 避免请求过快
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "创建完成!" -ForegroundColor Cyan
Write-Host "成功: $successCount 个" -ForegroundColor Green
Write-Host "失败: $failCount 个" -ForegroundColor Red
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "现在可以访问各语言的新闻页面:" -ForegroundColor Yellow
Write-Host "- 中文: https://authmationblog.vercel.app/zh/news" -ForegroundColor Cyan
Write-Host "- 英文: https://authmationblog.vercel.app/en/news" -ForegroundColor Cyan
Write-Host "- 日文: https://authmationblog.vercel.app/ja/news" -ForegroundColor Cyan
Write-Host "- 西班牙文: https://authmationblog.vercel.app/es/news" -ForegroundColor Cyan
Write-Host "- 法文: https://authmationblog.vercel.app/fr/news" -ForegroundColor Cyan
Write-Host "- 德文: https://authmationblog.vercel.app/de/news" -ForegroundColor Cyan
Write-Host "- 其他语言..." -ForegroundColor Cyan
