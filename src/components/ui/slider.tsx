'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A customizable slider component that allows users to select a value from a range.
 * Built on top of Radix UI's Slider primitive.
 *
 * @component
 * @example
 * ```tsx
 * <Slider defaultValue={[50]} min={0} max={100} step={1} />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS class names to apply to the slider root
 * @param {number[]} props.defaultValue - Default value(s) of the slider
 * @param {number} props.min - Minimum allowed value
 * @param {number} props.max - Maximum allowed value
 * @param {number} props.step - Step interval between values
 * @param {boolean} [props.disabled] - Whether the slider is disabled
 * @param {function} [props.onValueChange] - Callback fired when the value changes
 * @param {React.Ref} ref - Forwarded ref to access the underlying DOM element
 * 
 * @returns {JSX.Element} A slider component with track, range and thumb elements
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
