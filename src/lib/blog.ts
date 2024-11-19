'use server';

import fs from 'fs';
import path from 'path';
import { app } from '@/constants';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

/**
 * @typedef {Object} Post
 * @property {string} title - The title of the post.
 * @property {string} publishedAt - The publication date of the post.
 * @property {string} summary - A brief summary of the post.
 * @property {string} author - The author of the post.
 * @property {string} slug - The slug (URL path) of the post.
 * @property {string} [image] - The URL of the post's image.
 */

export type Post = {
  title: string;
  publishedAt: string;
  summary: string;
  author: string;
  slug: string;
  image?: string;
};

/**
 * Parses the frontmatter from a markdown file.
 * @param {string} fileContent - The content of the markdown file.
 * @returns {{ data: Post, content: string }} The parsed metadata and content.
 */
export const parseFrontmatter = async (
  fileContent: string,
): Promise<{ data: Post; content: string }> => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock?.trim().split('\n') ?? [];
  const metadata: Partial<Post> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    if (key) {
      const value = valueArr.join(': ').trim();
      (metadata as any)[key.trim()] = value.replace(/^['"](.*)['"]$/, '$1');
    }
  });

  return { data: metadata as Post, content };
};

/**
 * Gets all MDX files in a directory.
 * @param {string} dir - The directory to search for MDX files.
 * @returns {string[]} An array of MDX file names.
 */
export const getMDXFiles = async (dir: string): Promise<string[]> => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
};

/**
 * Converts markdown content to HTML.
 * @param {string} markdown - The markdown content to convert.
 * @returns {Promise<string>} The converted HTML content.
 */
export const markdownToHTML = async (markdown: string): Promise<string> => {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: 'min-light',
        dark: 'min-dark',
      },
      keepBackground: false,
    })
    .use(rehypeStringify as any) // Type assertion to bypass strict typing
    .process(markdown);

  return p.toString();
};

/**
 * Gets a post by its slug.
 * @param {string} slug - The slug of the post.
 * @returns {Promise<{ source: string, metadata: Post, slug: string }>} The post content and metadata.
 */
export const getPost = async (
  slug: string,
): Promise<{ source: string; metadata: Post; slug: string }> => {
  const filePath = path.join('content', `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf-8');
  const { content: rawContent, data: metadata } = await parseFrontmatter(source);
  const content = await markdownToHTML(rawContent);
  const defaultImage = `${app.url}/api/og?title=${encodeURIComponent(metadata.title)}`;
  return {
    source: content,
    metadata: {
      ...metadata,
      image: metadata.image || defaultImage,
    },
    slug,
  };
};

/**
 * Gets all posts in a directory.
 * @param {string} dir - The directory to search for posts.
 * @returns {Promise<Array<{ source: string, metadata: Post, slug: string }>>} An array of posts.
 */
export const getAllPosts = async (
  dir: string,
): Promise<Array<{ source: string; metadata: Post; slug: string }>> => {
  const mdxFiles = await getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const { metadata, source } = await getPost(slug);
      return {
        metadata,
        source,
        slug,
      };
    }),
  );
};

/**
 * Gets all blog posts.
 * @returns {Promise<Array<{ source: string, metadata: Post, slug: string }>>} An array of blog posts.
 */
export async function getBlogPosts(): Promise<
  Array<{ source: string; metadata: Post; slug: string }>
> {
  return getAllPosts(path.join(process.cwd(), 'content'));
}
