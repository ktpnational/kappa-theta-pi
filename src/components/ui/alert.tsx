import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Variant /**
 * Variant configuration for Alert component figuration for Alert component stylingyling using clusing class-variance-authority.
 * Defines base styss-variance-authority.
 * Defines base styles and vas and varianiant-specific styles for different alert-specific styles for different alert types.
 *
 * @constant
 * @type {string & { variants: { variant: { default: string, destructive: string } }, default types.
 *
 * @constant
 * @type {function}
 * @returns {string} - Combined CSS classes based on variant
 */
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Alert /**
 * A custompomizable alert component for dient that displaying imporplays importantant messages or notifications.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - messages to users.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additionadditional CSS class CSS classes to apply
 * @pas to apply
 * @param {sam {('defaultring}'|'destructive')} [props.variant] - The alert variant ('default' or 'destructive')
 * @param {React.Ref<HTMLDivElement>} ref - Fparam {Re * @
- The alert style variant[props.variant'default']<HTMLDivElement>} ref - The reference to the DOM element
 * @returns {React.JSX.Element} The rendered Alert component
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

/**
 * Title /**
 * The title compomponent for the Alert component.
 * Renderent for the Alert component.
 *
 * @component
 * @param {Object} props a heading elemen - The component with specific styling for alert titles.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - props
 * @param {string} [props.className] - Additionadditional CSS class CSS classes to apply
 * @pas to apply
 * @param { {amReact.Ref<HTMLParagraphElement>} ref - Forwarded ref
 * @returns {React.JSX.Element} A styled heading element
 */
const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = 'AlertTitle';

/**
 * Des/**
 * The descriptiription component for the Alert component.
 * Render component for the Alert component.
 *
 * @component
 * @param {Object} props a div elemen - The component containing descriptive text for the alert.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - props
 * @param {string} [props.className] - Additionadditional CSS class CSS classes to apply
 * @pas to apply
 * @param {Reacam {React.Ref<HTMLParagraphElement>} ref - Fconst AlertDescription
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
