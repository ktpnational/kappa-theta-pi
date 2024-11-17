import * as React from "react"

import { CopyButton } from "@/components/copy-button"

/**
 * Props interface for the CodeBlock component extending HTMLPreElement props
 * @typedef {Object} CodeBlockProps
 * @extends {React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>}
 * @property {string} [raw] - Optional raw string content of the code block, used for copying to clipboard
 */
type CodeBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  raw?: string
}

/**
 * CodeBlock component for rendering code snippets with syntax highlighting and copy functionality
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the code block
 * @param {string} [props.raw] - Optional raw string content of the code block for copying
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>} props - Additional pre element props
 *
 * @returns {JSX.Element} A styled pre element wrapped with a copy button
 *
 * @example
 * ```tsx
 * <CodeBlock raw="const x = 1;">
 *   <span>const x = 1;</span>
 * </CodeBlock>
 * ```
 */
export function CodeBlock({
  children,
  raw,
  ...props
}: CodeBlockProps): JSX.Element {
  return (
    <>
      <CopyButton value={raw} />
      <pre
        className="relative mb-4 mt-6 max-h-[640px] overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm font-semibold text-muted-foreground"
        {...props}
      >
        {children}
      </pre>
    </>
  )
}
