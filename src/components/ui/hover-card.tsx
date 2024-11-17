'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Root component for the hover card functionality.
 * Manages the hover card's state and coordinates child components.
 */
const HoverCard = HoverCardPrimitive.Root;

/**
 * The element that triggers the hover card to appear when hovered.
 * Typically wraps the element that users will hover over.
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger;

/**
 * The content component that appears when the trigger is hovered.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the content
 * @param {string} [props.align='center'] - Alignment of the content relative to the trigger ('start' | 'center' | 'end')
 * @param {number} [props.sideOffset=4] - Offset distance from the trigger in pixels
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the content element
 * 
 * @returns {React.ReactElement} Rendered hover card content with positioning and animations
 */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
