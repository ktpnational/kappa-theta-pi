import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Defines the style variants for the Badge component using class-variance-authority.
 * @param {string} base - The base styles applied to all badge variants
 * @param {object} options - The variant options configuration
 * @returns {function} A function that generates the appropriate className based on variants
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Props interface for the Badge component.
 * @extends {React.HTMLAttributes<HTMLDivElement>} - Extends standard HTML div attributes
 * @extends {VariantProps<typeof badgeVariants>} - Includes variant props from badgeVariants
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * A customizable badge component that can be used to display short status text, counts, or labels.
 *
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the badge
 * @param {('default'|'secondary'|'destructive'|'outline')} [props.variant='default'] - The visual style variant of the badge
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Any other props will be spread to the underlying div element
 *
 * @example
 * // Default badge
 * <Badge>New</Badge>
 *
 * @example
 * // Secondary variant with custom class
 * <Badge variant="secondary" className="my-2">Processing</Badge>
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
