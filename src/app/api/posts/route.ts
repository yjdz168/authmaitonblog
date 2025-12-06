import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/posts-supabase';
import { verifyApiKey } from '@/lib/auth';

// GET /api/posts - Get all posts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'en';
    
    const posts = await getAllPosts(locale);
    
    return NextResponse.json({
      success: true,
      data: posts
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post (WordPress API compatible)
export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey || !verifyApiKey(apiKey)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Generate slug from title if not provided
    const generateSlug = (title: string): string => {
      return title
        .toLowerCase()
        .replace(/[\u4e00-\u9fa5]/g, (char) => encodeURIComponent(char)) // Handle Chinese characters
        .replace(/\s+/g, '-')
        .replace(/[^\w\-\%]/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^\-+/, '')
        .replace(/\-+$/, '');
    };
    
    // WordPress API compatibility mapping
    const postData = {
      title: body.title?.rendered || body.title,
      slug: body.slug || generateSlug(body.title?.rendered || body.title),
      excerpt: body.excerpt?.rendered || body.excerpt || '',
      content: body.content?.rendered || body.content,
      author: body.author || 'Admin',
      locale: body.locale || body.lang || 'en',
      featuredImage: body.featured_media || body.featuredImage,
      tags: body.tags || [],
      status: body.status || 'published'
    };
    
    const newPost = await createPost(postData);
    
    return NextResponse.json({
      success: true,
      data: newPost,
      message: 'Post created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create post';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
