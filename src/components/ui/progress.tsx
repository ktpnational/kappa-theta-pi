'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A customizable progress bar component built on top of Radix UI Progress primitive.
 *
 * @component
 * @example
 * ```tsx
 * <Progress value={75} /> // Creates a progress bar at 75%
 * ```
 *
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply to the progress bar
 * @param {number} [props.value] - Current progress value (0-100)
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} A progress bar component with customizable appearance and value
 *
 * @remarks
 * The component uses Tailwind CSS for styling and supports theme customization through the bg-secondary
 * and bg-primary classes. The progress indicator animates smoothly using CSS transitions.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
