#!/bin/bash

# API 测试脚本
# 用于测试博客 API 的各种功能

API_URL="https://authmationblog.vercel.app/api/posts"
API_KEY="your-api-key-here"  # 请替换为你的实际 API 密钥

echo "========================================="
echo "测试博客 API"
echo "========================================="
echo ""

# 测试 1: 创建文章
echo "📝 测试 1: 创建新文章"
echo "-------------------------------------"
curl -X POST "$API_URL" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试文章 - API Script",
    "content": "# 这是测试文章\n\n通过 curl 脚本创建。\n\n## 功能测试\n\n- 支持 Markdown\n- 多语言支持\n- API 兼容性",
    "excerpt": "这是一篇通过 API 脚本创建的测试文章",
    "author": "测试系统",
    "locale": "zh",
    "status": "published",
    "tags": ["测试", "API", "自动化"]
  }'

echo -e "\n\n"

# 测试 2: 获取文章列表
echo "📋 测试 2: 获取文章列表 (中文)"
echo "-------------------------------------"
curl -X GET "$API_URL?locale=zh"

echo -e "\n\n"

# 测试 3: 获取英文文章列表
echo "📋 测试 3: 获取文章列表 (英文)"
echo "-------------------------------------"
curl -X GET "$API_URL?locale=en"

echo -e "\n\n"
echo "========================================="
echo "测试完成！"
echo "========================================="
