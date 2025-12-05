import { NextRequest, NextResponse } from 'next/server';
import { updatePost, deletePost } from '@/lib/posts-supabase';
import { verifyApiKey } from '@/lib/auth';

// PUT /api/posts/[id] - Update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey || !verifyApiKey(apiKey)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const body = await request.json();
    const locale = body.locale || body.lang || 'en';
    
    // WordPress API compatibility mapping
    const updates = {
      title: body.title?.rendered || body.title,
      slug: body.slug,
      excerpt: body.excerpt?.rendered || body.excerpt,
      content: body.content?.rendered || body.content,
      author: body.author,
      locale: locale,
      featuredImage: body.featured_media || body.featuredImage,
      tags: body.tags,
      status: body.status
    };
    
    // Remove undefined values
    Object.keys(updates).forEach(key => 
      updates[key as keyof typeof updates] === undefined && delete updates[key as keyof typeof updates]
    );
    
    const updatedPost = await updatePost(id, updates, locale);
    
    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey || !verifyApiKey(apiKey)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'en';
    
    const deleted = await deletePost(id, locale);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
