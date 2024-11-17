'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Provider component that must wrap all tooltip components.
 * Manages shared state for multiple tooltips.
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Root tooltip component that coordinates the tooltip trigger and content.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * The element that triggers the tooltip when interacted with.
 * Usually wraps the element that the tooltip describes.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * The content displayed inside the tooltip when triggered.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {number} [props.sideOffset=4] - Offset from the trigger in pixels
 * @param {React.Ref} ref - Forward ref for the tooltip content element
 * @returns {React.ReactElement} Rendered tooltip content
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip content</TooltipContent>
 * </Tooltip>
 * ```
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
