/**
 * @fileoverview Blog post page component and metadata generator for the blog section
 * @module BlogPost
 */

import { CtaSection } from '@/app/(main)/_components';
import { BlogAuthor } from '@/components';
import { app } from '@/constants';
import { getPost } from '@/lib';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

/**
 * Props interface for generateMetadata function
 * @interface GenerateMetadataProps
 * @property {Promise<{slug: string}>} params - URL parameters containing the blog post slug
 * @property {Promise<Record<string, string | string[] | undefined>>} [searchParams] - Optional URL search parameters
 */
interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Generates metadata for the blog post page including OpenGraph and Twitter card data
 * @async
 * @param {GenerateMetadataProps} props - The props containing URL parameters
 * @returns {Promise<Metadata>} Next.js Metadata object containing SEO and social sharing metadata
 */
export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const { title, publishedAt: publishedTime, summary, image } = post.metadata;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime,
      url: `${app.url}/blog/${post.slug}`,
      images: [
        {
          url: image || '/assets/images/hero.png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: [image || '/assets/images/hero.png'],
    },
  };
}

/**
 * Props interface for the Blog page component
 * @interface BlogPageProps
 * @property {Promise<{slug: string}>} params - URL parameters containing the blog post slug
 * @property {Promise<Record<string, string | string[] | undefined>>} [searchParams] - Optional URL search parameters
 */
interface BlogPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Blog post page component that displays a full blog post with metadata
 * @async
 * @param {BlogPageProps} props - The component props
 * @returns {Promise<JSX.Element>} The rendered blog post page
 * @throws {notFound} When the requested blog post is not found
 */
export default async function Blog({
  params,
  searchParams,
}: BlogPageProps) {
  const resolvedParams = await params;
  // @ts-expect-error - TODO: Fix this
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog">
      {/* Schema.org BlogPosting structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${app.url}${post.metadata.image}`
              : `${app.url}/blog/${post.slug}/opengraph-image`,
            url: `${app.url}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: app.name,
            },
          }),
        }}
      />
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8 space-y-4 my-12">
        {/* Featured image with loading suspense */}
        <Suspense
          fallback={<div className="mb-8 w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>}
        >
          {post.metadata.image && (
            <div className="mb-8">
              <Image
                width={1920}
                height={1080}
                src={post.metadata.image}
                alt={post.metadata.title}
                className="w-full h-auto rounded-lg border shadow-md"
              />
            </div>
          )}
        </Suspense>
        {/* Blog post title */}
        <div className="flex flex-col">
          <h1 className="title font-medium text-3xl tracking-tighter">{post.metadata.title}</h1>
        </div>
        {/* Publication date with loading suspense */}
        <div className="flex justify-between items-center text-sm">
          <Suspense fallback={<p className="h-5" />} >
            <div className="flex items-center space-x-2">
              <time dateTime={post.metadata.publishedAt} className="text-sm text-gray-500">
                {formatDate(post.metadata.publishedAt)}
              </time>
            </div>
          </Suspense>
        </div>
        {/* Author information */}
        <div className="flex items-center space-x-2">
          <BlogAuthor
            twitterUsername={post.metadata.author}
            name={post.metadata.author}
            image={'/author.jpg'}
          />
        </div>
        {/* Blog post content */}
        <article
          className="prose dark:prose-invert mx-auto max-w-full"
          dangerouslySetInnerHTML={{ __html: post.source }}
        ></article>
      </div>
      <CtaSection />
    </section>
  );
}
