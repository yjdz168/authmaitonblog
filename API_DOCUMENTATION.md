# API Documentation

This document describes the WordPress-compatible API endpoints for automated content publishing with n8n.

## Authentication

All API requests require authentication using an API key. Include the API key in the request header:

```
x-api-key: your-secret-key-change-this-in-production
```

Set your API key in `.env.local`:
```
API_SECRET_KEY=your-secret-key-change-this-in-production
```

## Endpoints

### Get All Posts

**GET** `/api/posts?locale={locale}`

Retrieve all published posts for a specific locale.

**Parameters:**
- `locale` (optional): Language code (en, zh, es, etc.). Default: `en`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Post Title",
      "slug": "post-title",
      "excerpt": "Post excerpt",
      "content": "Full post content",
      "author": "Author Name",
      "publishedAt": "2024-01-15T10:00:00.000Z",
      "locale": "en",
      "tags": ["tag1", "tag2"],
      "status": "published"
    }
  ]
}
```

### Create Post

**POST** `/api/posts`

Create a new blog post. Supports WordPress-compatible format.

**Headers:**
```
Content-Type: application/json
x-api-key: your-api-key
```

**Request Body (Standard Format):**
```json
{
  "title": "New Post Title",
  "slug": "new-post-title",
  "excerpt": "Post excerpt",
  "content": "Full post content in markdown",
  "author": "Author Name",
  "locale": "en",
  "tags": ["industry", "news"],
  "status": "published"
}
```

**Request Body (WordPress Compatible Format):**
```json
{
  "title": {
    "rendered": "New Post Title"
  },
  "content": {
    "rendered": "Full post content"
  },
  "excerpt": {
    "rendered": "Post excerpt"
  },
  "author": "Author Name",
  "lang": "en",
  "tags": ["industry", "news"],
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123456789",
    "title": "New Post Title",
    "slug": "new-post-title",
    "publishedAt": "2024-01-15T10:00:00.000Z",
    ...
  }
}
```

### Update Post

**PUT** `/api/posts/{id}`

Update an existing post.

**Headers:**
```
Content-Type: application/json
x-api-key: your-api-key
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "locale": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123456789",
    "title": "Updated Title",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    ...
  }
}
```

### Delete Post

**DELETE** `/api/posts/{id}?locale={locale}`

Delete a post.

**Headers:**
```
x-api-key: your-api-key
```

**Parameters:**
- `locale` (optional): Language code. Default: `en`

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

## n8n Integration Example

### Setup in n8n

1. **HTTP Request Node Configuration:**
   - Method: POST
   - URL: `https://yourdomain.com/api/posts`
   - Authentication: None (use custom headers)
   - Headers:
     ```
     x-api-key: your-secret-key-change-this-in-production
     Content-Type: application/json
     ```

2. **Request Body:**
   ```json
   {
     "title": "{{ $json.title }}",
     "content": "{{ $json.content }}",
     "excerpt": "{{ $json.excerpt }}",
     "author": "{{ $json.author }}",
     "locale": "en",
     "tags": {{ $json.tags }},
     "status": "published"
   }
   ```

### Example n8n Workflow

```
[Trigger] → [Process Data] → [HTTP Request to API] → [Success Handler]
```

1. **Trigger**: Schedule or webhook trigger
2. **Process Data**: Format your content
3. **HTTP Request**: POST to `/api/posts` with your content
4. **Success Handler**: Log or notify on success

## Supported Locales

- `en` - English
- `zh` - Chinese (中文)
- `es` - Spanish (Español)
- `fr` - French (Français)
- `de` - German (Deutsch)
- `ja` - Japanese (日本語)
- `ko` - Korean (한국어)
- `pt` - Portuguese (Português)
- `ru` - Russian (Русский)
- `ar` - Arabic (العربية)
- `it` - Italian (Italiano)
- `nl` - Dutch (Nederlands)
- `pl` - Polish (Polski)
- `tr` - Turkish (Türkçe)
- `vi` - Vietnamese (Tiếng Việt)

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Post not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to create post"
}
```

## Testing with cURL

### Create a post:
```bash
curl -X POST https://yourdomain.com/api/posts \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key-change-this-in-production" \
  -d '{
    "title": "Test Post",
    "content": "This is a test post content",
    "excerpt": "Test excerpt",
    "author": "Admin",
    "locale": "en",
    "status": "published"
  }'
```

### Get all posts:
```bash
curl https://yourdomain.com/api/posts?locale=en
```

### Update a post:
```bash
curl -X PUT https://yourdomain.com/api/posts/123456789 \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key-change-this-in-production" \
  -d '{
    "title": "Updated Title",
    "locale": "en"
  }'
```

### Delete a post:
```bash
curl -X DELETE https://yourdomain.com/api/posts/123456789?locale=en \
  -H "x-api-key: your-secret-key-change-this-in-production"
```
