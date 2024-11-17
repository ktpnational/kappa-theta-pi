import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import type { ComputedFields } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import type { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

/**
 * Computed fields shared across document types.
 * These fields are automatically generated based on document content and metadata.
 *
 * @type {ComputedFields}
 *
 * @property {Object} slug - Generates URL-friendly path from document location
 * @property {Object} slugAsParams - Generates URL parameters from document path
 * @property {Object} readingTime - Estimates reading duration in minutes
 */
const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    /**
     * Generates a URL-friendly slug from the document's file path.
     * Prepends a forward slash to create an absolute path.
     *
     * @param {Object} doc - The document object containing metadata
     * @param {Object} doc._raw - Raw document metadata
     * @param {string} doc._raw.flattenedPath - Full file path flattened into URL format
     * @returns {string} Absolute URL path starting with '/'
     * @example
     * // For a doc at blog/2023/hello-world.mdx
     * // Returns '/blog/2023/hello-world'
     */
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    /**
     * Converts document path into URL parameters by removing the root segment.
     * Useful for dynamic routing in Next.js.
     *
     * @param {Object} doc - The document object containing metadata
     * @param {Object} doc._raw - Raw document metadata
     * @param {string} doc._raw.flattenedPath - Full file path flattened into URL format
     * @returns {string} URL parameters without the root segment
     * @example
     * // For a doc at blog/2023/hello-world.mdx
     * // Returns '2023/hello-world'
     */
    resolve: (doc: any) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  readingTime: {
    type: 'number',
    /**
     * Calculates estimated reading time based on word count.
     * Uses standard reading speed of 200 words per minute.
     *
     * @param {Object} doc - The document object containing content
     * @param {Object} doc.body - Document body content
     * @param {string} doc.body.raw - Raw text content of the document
     * @returns {number} Estimated reading time in minutes, rounded up
     * @example
     * // For a 1500 word article
     * // Returns 8 (1500 words / 200 words per minute = 7.5, rounded up to 8)
     */
    resolve: (doc: any) => {
      const content = String(doc.body.raw);
      const wordsPerMinute = 200;
      const numberOfWords = content.split(/\s/g).length;
      const minutes = numberOfWords / wordsPerMinute;
      return Math.ceil(minutes);
    },
  },
};

/**
 * Blog post document type definition.
 * Represents articles in the blog section of the site.
 *
 * @property {string} name - Document type identifier
 * @property {string} filePathPattern - Glob pattern for matching blog post files
 * @property {string} contentType - Content format (MDX)
 * @property {Object} fields - Schema fields for blog posts
 * @property {Object} fields.title - Post title (required)
 * @property {Object} fields.description - Post summary (optional)
 * @property {Object} fields.date - Publication date (required)
 * @property {Object} fields.published - Publication status (defaults to true)
 * @property {Object} fields.image - Featured image path (required)
 * @property {Object} fields.authors - List of author IDs (required)
 */
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'blog/**/*.mdx' as const,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    authors: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  computedFields,
}));

/**
 * Author document type definition.
 * Represents content creators and contributors.
 *
 * @property {string} name - Document type identifier
 * @property {string} filePathPattern - Glob pattern for matching author files
 * @property {string} contentType - Content format (MDX)
 * @property {Object} fields - Schema fields for authors
 * @property {Object} fields.title - Author's name (required)
 * @property {Object} fields.description - Author bio (optional)
 * @property {Object} fields.avatar - Profile image path (required)
 * @property {Object} fields.twitter - Twitter handle (required)
 */
export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/**/*.mdx' as const,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    avatar: {
      type: 'string',
      required: true,
    },
    twitter: {
      type: 'string',
      required: true,
    },
  },
  computedFields,
}));

/**
 * Static page document type definition.
 * Represents standalone content pages.
 *
 * @property {string} name - Document type identifier
 * @property {string} filePathPattern - Glob pattern for matching page files
 * @property {string} contentType - Content format (MDX)
 * @property {Object} fields - Schema fields for pages
 * @property {Object} fields.title - Page title (required)
 * @property {Object} fields.description - Page description (optional)
 */
export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx' as const,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
  },
  computedFields,
}));

/**
 * Content source configuration for the application.
 * Sets up document processing and MDX transformation pipeline.
 *
 * @property {string} contentDirPath - Root directory for content files
 * @property {Array} documentTypes - Registered document type definitions
 * @property {Object} mdx - MDX processing configuration
 * @property {Array} mdx.rehypePlugins - Plugins for transforming MDX content
 * @property {Function} mdx.rehypePlugins[].onVisitLine - Handles empty lines in code blocks
 * @property {Function} mdx.rehypePlugins[].onVisitHighlightedLine - Styles highlighted code lines
 * @property {Function} mdx.rehypePlugins[].onVisitHighlightedChars - Styles highlighted characters
 */
export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Post, Author, Page],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode as any,
        {
          theme: 'github-dark',
          /**
           * Ensures empty lines in code blocks have minimum height.
           * Inserts a space character if line is empty.
           *
           * @param {Object} node - AST node representing a code line
           * @param {Array} node.children - Child nodes of the line
           */
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          /**
           * Applies highlighting styles to marked code lines.
           * Adds a CSS class for custom styling.
           *
           * @param {Object} node - AST node representing a highlighted line
           * @param {Object} node.properties - Node properties including classes
           * @param {Array} node.properties.className - CSS classes for the line
           */
          onVisitHighlightedLine(node) {
            node.properties.className?.push('line--highlighted');
          },
          /**
           * Applies highlighting styles to marked characters.
           * Sets CSS class for custom styling.
           *
           * @param {Object} node - AST node representing highlighted characters
           * @param {Object} node.properties - Node properties including classes
           */
          onVisitHighlightedChars(node) {
            node.properties.className = ['word--highlighted'];
          },
        } satisfies Partial<Options>,
      ],
    ],
  },
});
