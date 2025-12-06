import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/posts-supabase';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export async function generateStaticParams({params: {locale}}: {params: {locale: string}}) {
  const posts = await getAllPosts(locale);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('news');
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const contentHtml = await marked(post.content);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          ← {t('back')}
        </Link>

        <article>
          {post.featuredImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <span className="mr-4">
                {t('publishedOn')} {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
              </span>
              {post.author && (
                <span>By {post.author}</span>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-600">
              Last updated: {format(new Date(post.updatedAt), 'MMMM dd, yyyy')}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
