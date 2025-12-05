export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  locale: string;
  featuredImage?: string;
  tags?: string[];
  status: 'draft' | 'published';
}
