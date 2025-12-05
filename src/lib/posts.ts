import fs from 'fs';
import path from 'path';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Ensure the posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export function getAllPosts(locale: string = 'en'): Post[] {
  try {
    const filePath = path.join(postsDirectory, `posts-${locale}.json`);
    
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const posts: Post[] = JSON.parse(fileContents);
    
    return posts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string, locale: string = 'en'): Post | null {
  try {
    const posts = getAllPosts(locale);
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
}

export function savePosts(posts: Post[], locale: string = 'en'): void {
  const filePath = path.join(postsDirectory, `posts-${locale}.json`);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}

export function createPost(post: Omit<Post, 'id' | 'publishedAt' | 'updatedAt'>): Post {
  try {
    const locale = post.locale || 'en';
    
    // Ensure posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }
    
    const posts = getAllPosts(locale);
    
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      status: post.status || 'published'
    };
    
    const allPosts = [...posts, newPost];
    savePosts(allPosts, locale);
    
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error(`Failed to create post: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function updatePost(id: string, updates: Partial<Post>, locale: string = 'en'): Post | null {
  const filePath = path.join(postsDirectory, `posts-${locale}.json`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const posts: Post[] = JSON.parse(fileContents);
  
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) {
    return null;
  }
  
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  savePosts(posts, locale);
  
  return posts[index];
}

export function deletePost(id: string, locale: string = 'en'): boolean {
  const filePath = path.join(postsDirectory, `posts-${locale}.json`);
  
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const posts: Post[] = JSON.parse(fileContents);
  
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) {
    return false;
  }
  
  savePosts(filteredPosts, locale);
  
  return true;
}
