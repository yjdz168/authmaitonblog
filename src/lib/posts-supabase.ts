import { createClient } from '@supabase/supabase-js';
import { Post } from '@/types/post';

// 表名
const POSTS_TABLE = 'posts';

// 获取 Supabase 客户端（懒加载）
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment variables.');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

/**
 * 获取所有已发布的文章
 */
export async function getAllPosts(locale: string = 'en'): Promise<Post[]> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .select('*')
      .eq('locale', locale)
      .eq('status', 'published')
      .order('publishedAt', { ascending: false });

    if (error) {
      console.error('Error fetching posts from Supabase:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

/**
 * 通过 slug 获取单篇文章
 */
export async function getPostBySlug(slug: string, locale: string = 'en'): Promise<Post | null> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .select('*')
      .eq('slug', slug)
      .eq('locale', locale)
      .single();

    if (error) {
      console.error('Error getting post by slug:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
}

/**
 * 创建新文章
 */
export async function createPost(post: Omit<Post, 'id' | 'publishedAt' | 'updatedAt'>): Promise<Post> {
  try {
    const supabase = getSupabaseClient();
    const newPost = {
      ...post,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      status: post.status || 'published'
    };

    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .insert([newPost])
      .select()
      .single();

    if (error) {
      console.error('Error creating post in Supabase:', error);
      throw new Error(`Failed to create post: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error(`Failed to create post: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * 更新文章
 */
export async function updatePost(id: string, updates: Partial<Post>, locale: string = 'en'): Promise<Post | null> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .eq('locale', locale)
      .select()
      .single();

    if (error) {
      console.error('Error updating post in Supabase:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
}

/**
 * 删除文章
 */
export async function deletePost(id: string, locale: string = 'en'): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from(POSTS_TABLE)
      .delete()
      .eq('id', id)
      .eq('locale', locale);

    if (error) {
      console.error('Error deleting post from Supabase:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}
