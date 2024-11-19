import { BlogCard } from '@/components';
import { getBlogPosts } from '@/lib/blog';
import { app } from '@/constants';
import { constructMetadata } from '@/utils';

/**
 * Metadata configuration for the blog page using constructMetadata utility
 * @constant {Metadata} metadata
 */
export const metadata = constructMetadata({
  title: 'Blog',
  description: `Latest news and updates from ${app.name}.`,
});

/**
 * Blog page component that displays a collection of blog posts
 * @async
 * @function Blog
 * @returns {Promise<JSX.Element>} Rendered blog page with article cards
 *
 * @description
 * This component fetches all blog posts and displays them in a responsive grid layout.
 * The posts are sorted by publish date in descending order (newest first).
 * The layout includes:
 * - A header section with title and description
 * - A grid of BlogCard components displaying the posts
 * - Responsive design with different column counts for mobile and desktop
 *
 * @example
 * // Route: /blog
 * <Blog />
 */
export default async function Blog() {
  // Fetch all blog posts
  const allPosts = await getBlogPosts();

  // Sort posts by publish date in descending order
  const articles = await Promise.all(
    allPosts.sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt)),
  );

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 mt-24">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Articles</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Latest news and updates from {app.name}
          </p>
        </div>
      </div>
      <div className="min-h-[50vh] bg-white/50 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur-lg">
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-8 px-2.5 py-10 lg:px-20 lg:grid-cols-3">
          {articles.map((data, idx) => (
            <BlogCard key={data.slug} data={data.metadata} priority={idx <= 1} />
          ))}
        </div>
      </div>
    </>
  );
}
