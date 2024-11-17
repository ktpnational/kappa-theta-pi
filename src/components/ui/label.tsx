'usee client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Defines the visual variants and styles for the Label component using class-variance-authority.
 * Provides consistent styling with disabled state support.
 *
 * @constant
 * @type {import('class-variance-authority').VariantProps}
 */
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

/**
 * A reusable form Label component built on top of Radix UI's Label primitive.
 * Provides accessible labeling for form controls with consistent styling.
 *
 * @component
 * @example
 * ```tsx
 * <Label htmlFor="email">Email address</Label>
 * ```
 *
 * @type {React.ForwardRefExoticComponent<
 *   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
 *   VariantProps<typeof labelVariants> &
 *   React.RefAttributes<HTMLLabelElement>
 * >}
 *
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLLabelElement>} ref - Forwarded ref
 * @returns {JSX.Element} Rendered label component
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
