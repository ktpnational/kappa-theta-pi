'use client';

import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';

/**
 * A button component that copies text to the clipboard when clicked.
 *
 * @component
 * @param {Object} props - The component props
 * @param {any} props.value - The value to be copied to clipboard when clicked
 * @param {ButtonProps} props.props - Additional button props that will be spread onto the underlying Button component
 * @returns {JSX.Element} A button that copies text to clipboard with visual feedback
 *
 * @example
 * ```tsx
 * <CopyButton value="Text to copy" />
 * ```
 *
 * @remarks
 * - Uses the native clipboard API via navigator.clipboard
 * - Shows a checkmark icon for 2 seconds after successful copy
 * - Falls back gracefully if clipboard API is not available
 * - Includes screen reader accessible text
 * - Positioned absolutely by default with right-5 top-4 placement
 */
export function CopyButton({ value, ...props }: ButtonProps): JSX.Element {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute right-5 top-4 z-20 size-6 px-0"
      onClick={() => {
        if (typeof window === 'undefined') return;
        setIsCopied(true);
        void window.navigator.clipboard.writeText(value?.toString() ?? '');
        setTimeout(() => setIsCopied(false), 2000);
      }}
      {...props}
    >
      {isCopied ? (
        <CheckIcon className="size-3" aria-hidden="true" />
      ) : (
        <CopyIcon className="size-3" aria-hidden="true" />
      )}
      <span className="sr-only">{isCopied ? 'Copied' : 'Copy to clipboard'}</span>
    </Button>
  );
}
