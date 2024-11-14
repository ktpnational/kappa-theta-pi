import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import type { ComputedFields } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import type { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

/**
 * Computed fields for document types.
 * @type {ComputedFields}
 */
const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    /**
     * Resolves the slug field for a document.
     * @param {Object} doc - The document object.
     * @returns {string} The resolved slug.
     */
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    /**
     * Resolves the slugAsParams field for a document.
     * @param {Object} doc - The document object.
     * @returns {string} The resolved slug as parameters.
     */
    resolve: (doc: any) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  readingTime: {
    type: 'number',
    /**
     * Calculates the reading time for a document.
     * @param {Object} doc - The document object.
     * @returns {number} The estimated reading time in minutes.
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
 * Defines the Post document type.
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
 * Defines the Author document type.
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
 * Defines the Page document type.
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
 * Creates a content source configuration.
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
           * Callback for visiting each line in the code block.
           * @param {Object} node - The node representing a line.
           */
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          /**
           * Callback for visiting highlighted lines.
           * @param {Object} node - The node representing a highlighted line.
           */
          onVisitHighlightedLine(node) {
            node.properties.className?.push('line--highlighted');
          },
          /**
           * Callback for visiting highlighted characters.
           * @param {Object} node - The node representing highlighted characters.
           */
          onVisitHighlightedChars(node) {
            node.properties.className = ['word--highlighted'];
          },
        } satisfies Partial<Options>,
      ],
    ],
  },
});
