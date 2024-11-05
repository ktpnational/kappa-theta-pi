'use client';

import { BlogCard, Section } from '@/components';
import { BlogLoading } from '@/components/blog-loading';
import { type Post, getBlogPosts } from '@/lib';
import { useEffect, useState } from 'react';

export const BlogSection = () => {
  const [articles, setArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogPosts();
        const data = response.slice(0, 6).map((item) => item.metadata);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Section title="Blog" subtitle="Latest Articles">
      {loading ? (
        <BlogLoading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((data, idx) => (
            <BlogCard key={data.slug} data={data} priority={idx <= 1} />
          ))}
        </div>
      )}
    </Section>
  );
};

BlogSection.displayName = 'BlogSection';
