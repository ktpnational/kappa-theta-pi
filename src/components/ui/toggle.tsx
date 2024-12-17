import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Defines the style variants for the Toggle component using class-variance-authority
 * @type {import('class-variance-authority').VariantProps}
 * @property {Object} variants - The available style variants
 * @property {Object} variants.variant - Visual style variants
 * @property {string} variants.variant.default - Default transparent background
 * @property {string} variants.variant.outline - Outlined style with border and hover states
 * @property {Object} variants.size - Size variants
 * @property {string} variants.size.default - Default size (40px height)
 * @property {string} variants.size.sm - Small size (36px height)
 * @property {string} variants.size.lg - Large size (44px height)
 * @property {Object} defaultVariants - Default variant settings
 */
const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/**
 * A customizable toggle button component built on Radix UI's Toggle primitive
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {('default'|'outline')} [props.variant='default'] - The visual style variant
 * @param {('default'|'sm'|'lg')} [props.size='default'] - The size variant
 * @param {React.Ref} ref - Forwarded ref
 * @returns {React.JSX.Element} A toggle button component with customizable styles
 *
 * @example
 * // Basic usage
 * <Toggle>Click me</Toggle>
 *
 * @example
 * // With variants
 * <Toggle variant="outline" size="lg">Large outlined toggle</Toggle>
 */
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
