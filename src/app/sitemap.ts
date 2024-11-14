import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getBlogPosts();
  const headersList = await headers();value + ''
  const domain = headersList.get('host') as string;
  const protocol = 'https';

  return [
    {
      url: `${protocol}://${domain}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...allPosts.map((post) => ({
      url: `${protocol}://${domain}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
