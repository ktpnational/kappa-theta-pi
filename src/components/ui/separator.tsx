'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A customizable separator component that creates a visual division between content.
 * Built on top of Radix UI's Separator primitive.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the separator
 * @param {('horizontal'|'vertical')} [props.orientation='horizontal'] - The orientation of the separator
 * @param {boolean} [props.decorative=true] - Whether the separator is purely decorative or has semantic meaning
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to access the underlying DOM element
 *
 * @example
 * // Horizontal separator
 * <Separator className="my-4" />
 *
 * @example
 * // Vertical separator
 * <Separator orientation="vertical" className="mx-2 h-6" />
 *
 * @returns {JSX.Element} A separator element that visually or semantically divides content
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
