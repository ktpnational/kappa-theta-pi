'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';

import { cn } from '@/lib';

import { Callout } from '@/components/mdx/callout';
import { CodeBlock } from '@/components/mdx/code-block';
import { MdxCard } from '@/components/mdx/mdx-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AspectRatio } from '@/components/ui/aspect-ratio';

/**
 * Custom MDX components mapping object that defines how MDX elements should be rendered
 *
 * @type {Object.<string, React.ComponentType>}
 * @description
 * This object maps MDX/markdown elements to custom React components with tailored styling.
 * Each component is enhanced with Tailwind CSS classes and proper semantic HTML structure.
 *
 * The mapping includes:
 * - Heading elements (h1-h6) with consistent typography and spacing
 * - Text elements (p, blockquote) with proper vertical rhythm
 * - List elements (ul, ol, li) with standard indentation
 * - Table elements with responsive layout and striped rows
 * - Code blocks and inline code with syntax highlighting
 * - Custom components like Alert, Callout, and Cards
 *
 * @example
 * ```tsx
 * // Usage in MDX:
 * # Heading 1
 * ## Heading 2
 *
 * Normal paragraph text
 *
 * - List item 1
 * - List item 2
 *
 * <Callout>
 *   Custom component usage
 * </Callout>
 * ```
 */
const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn('mt-2 scroll-m-20 font-heading text-4xl font-bold', className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-12 scroll-m-20 border-b pb-2 font-heading text-2xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 font-heading text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 font-heading text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn('font-medium underline underline-offset-4', className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: CodeBlock,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className,
      )}
      {...props}
    />
  ),
  Image,
  Alert,
  AlertTitle,
  AlertDescription,
  AspectRatio,
  Card: MdxCard,
  Callout,
};

/**
 * Props interface for the Mdx component
 *
 * @interface MdxProps
 * @property {string} code - The compiled MDX code as a string that will be rendered
 */
interface MdxProps {
  code: string;
}

/**
 * MDX content renderer component with custom component mapping
 *
 * @component
 * @description
 * A React component that renders MDX content with custom styling and components.
 * Uses next-contentlayer's useMDXComponent hook to parse and render the MDX content.
 * Applies custom component mappings defined in the components object.
 *
 * Features:
 * - Custom component mapping for all MDX elements
 * - Consistent styling through Tailwind CSS
 * - Support for custom React components in MDX
 * - Proper TypeScript typing for all components
 * - Semantic HTML structure
 *
 * @param {MdxProps} props - Component props
 * @param {string} props.code - The compiled MDX code to render
 *
 * @returns {JSX.Element} A div containing the rendered MDX content
 *
 * @example
 * ```tsx
 * // Usage with MDX content
 * const mdxCode = "# Hello\n\nThis is *MDX* content"
 *
 * function Page() {
 *   return <Mdx code={mdxCode} />
 * }
 * ```
 */
export function Mdx({ code }: MdxProps): JSX.Element {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
