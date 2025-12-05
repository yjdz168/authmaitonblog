# Deployment Guide - Vercel

This guide will help you deploy your Industrial Display Blog to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A GitHub account (recommended for automatic deployments)
- Node.js 18.x or higher

## Deployment Steps

### Option 1: Deploy with Vercel CLI (Fastest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   cd e:/code/000git/025authmaitonblog
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - What's your project's name? `industrial-display-blog`
   - In which directory is your code located? `./`
   - Want to modify settings? `N`

5. **Set environment variables:**
   ```bash
   vercel env add API_SECRET_KEY
   vercel env add JWT_SECRET
   ```

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy with GitHub (Recommended for CI/CD)

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/industrial-display-blog.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Import your GitHub repository
   - Configure project settings (use defaults)

3. **Add Environment Variables:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add the following variables:
     ```
     API_SECRET_KEY=your-secret-key-change-this-in-production
     JWT_SECRET=your-jwt-secret-change-this-in-production
     NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
     ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 3: Deploy with Vercel Dashboard

1. **Create ZIP file of your project**
   - Exclude `node_modules`, `.next`, and `.git` folders

2. **Upload to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Deploy from ZIP"
   - Upload your ZIP file

3. **Configure and deploy** following steps from Option 2

## Environment Variables

Make sure to set these environment variables in Vercel:

| Variable | Description | Example |
|----------|-------------|---------|
| `API_SECRET_KEY` | API key for n8n integration | `your-secret-key-123` |
| `JWT_SECRET` | JWT token secret | `your-jwt-secret-456` |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | `https://yourdomain.com` |

## Post-Deployment Configuration

### 1. Custom Domain (Optional)

In Vercel Dashboard:
1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 2. Test API Endpoints

Test your deployment with curl:

```bash
# Test public endpoint
curl https://your-project.vercel.app/api/posts?locale=en

# Test authenticated endpoint (create post)
curl -X POST https://your-project.vercel.app/api/posts \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key-change-this-in-production" \
  -d '{
    "title": "Test Post",
    "content": "Test content",
    "excerpt": "Test excerpt",
    "author": "Admin",
    "locale": "en",
    "status": "published"
  }'
```

### 3. Configure n8n Integration

In your n8n workflow:
1. Update the API URL to your Vercel domain
2. Use your `API_SECRET_KEY` in the headers
3. Test the workflow

## Build Configuration

The project uses these build settings (configured in `vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

## Troubleshooting

### Build Fails

**Check Node version:**
- Vercel uses Node 18.x by default
- Ensure your `package.json` specifies compatible versions

**Check dependencies:**
```bash
npm install
npm run build
```

### API Routes Not Working

**Verify environment variables:**
- Check Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding/changing variables

**Check API routes:**
- Ensure routes are in `src/app/api/` directory
- Check route.ts files for syntax errors

### Pages Not Loading

**Check middleware:**
- Verify `src/middleware.ts` is configured correctly
- Check locale configuration in `src/i18n.ts`

**Check dynamic routes:**
- Ensure `[locale]` folder structure is correct
- Verify `generateStaticParams` functions

### Content Not Displaying

**Check content directory:**
- Ensure `content/posts/` directory exists
- Verify JSON files have correct format
- Check file permissions

## Performance Optimization

### Enable Caching

In `next.config.js`, add:
```javascript
const nextConfig = {
  // ... existing config
  headers: async () => [
    {
      source: '/api/posts',
      headers: [
        {
          key: 'Cache-Control',
          value: 's-maxage=60, stale-while-revalidate',
        },
      ],
    },
  ],
};
```

### Image Optimization

Use Next.js Image component for optimized images:
```jsx
import Image from 'next/image';

<Image 
  src="/your-image.jpg" 
  alt="Description" 
  width={800} 
  height={600}
  priority
/>
```

## Monitoring

### Vercel Analytics

Enable in Vercel Dashboard:
1. Go to Analytics tab
2. Enable Web Analytics
3. Add to your project

### Error Tracking

Check deployment logs in Vercel Dashboard:
1. Go to Deployments
2. Click on a deployment
3. View Build Logs and Function Logs

## Continuous Deployment

Every push to your main branch will trigger:
1. Automatic build
2. Run tests (if configured)
3. Deploy to production
4. Previous deployment becomes preview

## Rollback

To rollback to a previous deployment:
1. Go to Deployments in Vercel Dashboard
2. Find the previous working deployment
3. Click "..." → "Promote to Production"

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/yourusername/industrial-display-blog/issues)
