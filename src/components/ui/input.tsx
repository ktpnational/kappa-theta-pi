import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A reusable input component that extends the native HTML input element with custom styling
 * and functionality. Built using React.forwardRef to properly handle ref forwarding.
 *
 * @component
 * @template T - The type of the ref passed to the component
 *
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the input
 * @param {string} [props.type] - The input type (e.g. 'text', 'password', etc.)
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to access the underlying input element
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input type="text" placeholder="Enter text..." />
 *
 * // With custom className
 * <Input
 *   type="password"
 *   className="custom-class"
 *   placeholder="Enter password..."
 * />
 *
 * // With forwarded ref
 * const inputRef = useRef<HTMLInputElement>(null);
 * <Input ref={inputRef} type="text" />
 * ```
 *
 * @returns {JSX.Element} A styled input element that maintains full HTML input functionality
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

type InputProps = React.ComponentProps<'input'>;
export { Input, type InputProps };
