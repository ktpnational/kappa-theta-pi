import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A customizable textarea component that forwards refs and extends the native HTML textarea element.
 *
 * @component
 * @template {HTMLTextAreaElement} T - The HTML textarea element type
 * @template {React.ComponentProps<'textarea'>} P - The native textarea props type
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Optional CSS class name to apply additional styles
 * @param {React.Ref<HTMLTextAreaElement>} ref - Forwarded ref to access the underlying textarea element
 *
 * @returns {React.JSX.Element} A styled textarea component with forwarded ref support
 *
 * @example
 * // Basic usage
 * <Textarea placeholder="Enter text here..." />
 *
 * @example
 * // With custom class name
 * <Textarea className="custom-textarea" />
 *
 * @example
 * // With ref
 * const textareaRef = useRef<HTMLTextAreaElement>(null);
 * <Textarea ref={textareaRef} />
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
