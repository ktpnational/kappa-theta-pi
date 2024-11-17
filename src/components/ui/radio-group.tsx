import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A group of radio buttons that allows users to select a single option from multiple choices.
 * Built on top of Radix UI's RadioGroup primitive.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply to the radio group
 * @param {React.RefObject<HTMLDivElement>} ref - Forwarded ref to access the underlying DOM element
 * @param {...React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>} props - Additional props to pass to the radio group root
 *
 * @example
 * ```tsx
 * <RadioGroup>
 *   <RadioGroupItem value="option1" />
 *   <RadioGroupItem value="option2" />
 * </RadioGroup>
 * ```
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * An individual radio button item that can be selected within a RadioGroup.
 * Provides visual feedback and handles user interaction states.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply to the radio item
 * @param {React.RefObject<HTMLButtonElement>} ref - Forwarded ref to access the underlying DOM element
 * @param {string} value - The value associated with this radio item
 * @param {boolean} [disabled] - Whether the radio item is disabled
 * @param {...React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>} props - Additional props to pass to the radio item
 *
 * @example
 * ```tsx
 * <RadioGroupItem value="option1" className="custom-class" disabled={false} />
 * ```
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
