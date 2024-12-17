'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A scrollable area component that provides custom styling and behavior for overflow content.
 * Built on top of Radix UI's ScrollArea primitive.
 *
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names
 * @param {React.ReactNode} props.children - The content to be scrolled
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 * @returns {React.JSX.Element} A scrollable container with custom scrollbars
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-[200px]">
 *   <div>Scrollable content goes here</div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

/**
 * A custom scrollbar component that provides styled scrollbars for the ScrollArea component.
 * Can be oriented vertically or horizontally.
 *
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names
 * @param {('vertical'|'horizontal')} [props.orientation='vertical'] - The scrollbar orientation
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the scrollbar element
 * @returns {React.JSX.Element} A styled scrollbar component
 *
 * @example
 * ```tsx
 * <ScrollBar orientation="horizontal" />
 * ```
 */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
