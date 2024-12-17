// import { BlogCard } from "@/components";
// import { getBlogPosts } from "@/lib";

/**
 * BlogSection Component
 *
 * A React server component that displays a grid of blog posts in a visually appealing section.
 *
 * Features:
 * - Asynchronously fetches and displays blog posts
 * - Sorts posts by publish date (newest first)
 * - Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
 * - Prioritizes loading of first two blog post images
 *
 * Layout Structure:
 * - Section with gray background and vertical padding
 * - Centered heading "Blog" with "Latest Articles" subheading
 * - Responsive grid of BlogCard components
 *
 * @component
 * @async
 * @returns {Promise<React.JSX.Element>} A section containing a grid of blog post cards
 *
 * @example
 * ```tsx
 * <BlogSection />
 * ```
 */
// export const BlogSection: React.FC = async () => {
//   // Fetch all blog posts
//   const allPosts = await getBlogPosts();

//   // Sort posts by publish date in descending order
//   const articles = allPosts.sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));

//   return (
//     <section className="py-12 bg-gray-100">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-2">Blog</h2>
//         <p className="text-xl text-center text-gray-600 mb-8">Latest Articles</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {articles.map((data, idx) => (
//             <BlogCard key={data.slug} data={data.metadata} priority={idx <= 1} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// BlogSection.displayName = 'BlogSection';
// export default BlogSection;
