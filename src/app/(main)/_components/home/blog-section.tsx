import { BlogCard, Section } from '@/components';
import { getBlogPosts } from '@/lib/blog';
import { Suspense } from 'react';
import { BlogLoading } from '@/components/blog-loading';

async function BlogPosts() {
  const allPosts = await getBlogPosts();
  const articles = allPosts.sort((a, b) =>
    b.metadata.publishedAt.localeCompare(a.metadata.publishedAt)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((data, idx) => (
        <BlogCard key={data.slug} data={data.metadata} priority={idx <= 1} />
      ))}
    </div>
  );
}

// Main component
export const BlogSection = () => {
  return (
    <Section title="Blog" subtitle="Latest Articles">
      <Suspense fallback={<BlogLoading />}>
        <BlogPosts />
      </Suspense>
    </Section>
  );
};

BlogSection.displayName = 'BlogSection';
