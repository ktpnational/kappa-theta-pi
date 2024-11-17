'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Root component for the Popover functionality
 * Wraps the trigger and content components
 */
const Popover = PopoverPrimitive.Root;

/**
 * Trigger element that toggles the popover visibility when interacted with
 * Can be any interactive element like button, link etc.
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Content component for the Popover that displays when triggered
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.align='center'] - Alignment of the popover relative to trigger ('start' | 'center' | 'end')
 * @param {number} [props.sideOffset=4] - Offset from the trigger element in pixels
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref
 * @returns {React.ReactElement} Rendered PopoverContent component
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
