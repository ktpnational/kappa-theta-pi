/**
 * Renders a page component displayed when a requested blog post is not found
 *
 * This component serves as a fallback UI element when:
 * - The URL points to a non-existent blog post
 * - The blog post has been deleted or moved
 * - There is an error retrieving the blog post data
 *
 * @returns {JSX.Element} A React component that displays a "not found" message
 *
 * @example
 * // Usage in router/navigation
 * <Route path="/blog/:id" element={<BlogPostNotFoundPage />} />
 *
 * @since 1.0.0
 * @version 1.0.0
 * @category Pages
 * @see Related components: BlogPost, BlogLayout
 */
export default function BlogPostNotFoundPage(): JSX.Element {
  return <div>Blog post not found page. Under construction.</div>;
}
