import { getURL } from '@/utils';
import { allPosts } from 'contentlayer/generated';
import type { Metadata } from 'next';

/**
 * Interface representing the parameters for a blog post route
 * @interface BlogPostParamsProps
 * @property {object} params - The route parameters object
 * @property {string[]} params.slug - Array of URL segments representing the post slug
 */
interface BlogPostParamsProps {
  params: {
    slug: string[];
  };
}

/**
 * Retrieves a blog post based on the provided route parameters
 * @param {BlogPostParamsProps['params']} params - The route parameters containing the post slug
 * @returns {Post | null} The matching blog post or null if not found
 */
export function getPostFromParams(params: BlogPostParamsProps['params']) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) return null;
  return post;
}

/**
 * Generates static parameters for all blog post routes at build time
 * @returns {Promise<BlogPostParamsProps['params'][]>} Promise resolving to array of route parameters
 */
export function generateStaticParams(): Promise<BlogPostParamsProps['params'][]> {
  return Promise.resolve(
    allPosts.map((post) => ({
      slug: post.slugAsParams.split('/'),
    })),
  );
}

/**
 * Generates metadata for a blog post page
 * @param {BlogPostParamsProps} props - The route parameters containing the post slug
 * @returns {Promise<Metadata>} Promise resolving to the page metadata
 */
export function generateMetadata({ params }: BlogPostParamsProps): Promise<Metadata> {
  const post = getPostFromParams(params);
  if (!post) return Promise.resolve({});

  const ogUrl = new URL(getURL('/api/og'));
  ogUrl.searchParams.set('title', post.title);
  ogUrl.searchParams.set('type', 'Blog Post');
  ogUrl.searchParams.set('mode', 'dark');

  return Promise.resolve({
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: getURL(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  });
}
