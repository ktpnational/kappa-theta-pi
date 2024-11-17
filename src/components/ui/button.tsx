import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Configuration for button styling variants using class-variance-authority
 * @const {Function} buttonVariants - Function that generates button class names based on variants
 * @property {Object} variants - Available variant configurations
 * @property {Object} variants.variant - Visual style variants
 * @property {string} variants.variant.default - Primary button style with brand color background
 * @property {string} variants.variant.destructive - Danger/warning style with destructive color
 * @property {string} variants.variant.outline - Bordered style with hover effects
 * @property {string} variants.variant.secondary - Alternative style with secondary colors
 * @property {string} variants.variant.ghost - Transparent style with hover background
 * @property {string} variants.variant.link - Hyperlink style with underline
 * @property {Object} variants.size - Size variants
 * @property {string} variants.size.default - Standard button size
 * @property {string} variants.size.sm - Small button size
 * @property {string} variants.size.lg - Large button size
 * @property {string} variants.size.icon - Square icon button size
 * @property {Object} defaultVariants - Default variant settings
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/**
 * Button component props interface
 * @interface ButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>} - Native button props
 * @extends {VariantProps<typeof buttonVariants>} - Style variant props
 * @property {boolean} [asChild] - When true, button will render its children directly
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Primary button component with variants and forwarded ref
 * @component
 * @param {ButtonProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant] - Visual style variant
 * @param {string} [props.size] - Size variant
 * @param {boolean} [props.asChild=false] - Whether to render children directly
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref
 * @returns {JSX.Element} Rendered button component
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
