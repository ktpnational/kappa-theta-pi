import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A navigation component that displays a breadcrumb trail showing the user's current location in a site hierarchy.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} [props.separator] - Optional custom separator element between breadcrumb items
 * @param {React.Ref<HTMLElement>} ref - Forward ref for the nav element
 * @returns {JSX.Element} A nav element containing the breadcrumb trail
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

/**
 * Container component for breadcrumb items.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLOListElement>} ref - Forward ref for the ol element
 * @returns {JSX.Element} An ordered list containing breadcrumb items
 */
const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

/**
 * Individual item within a breadcrumb trail.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLLIElement>} ref - Forward ref for the li element
 * @returns {JSX.Element} A list item containing a breadcrumb segment
 */
const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * Interactive link element within a breadcrumb item.
 *
 * @component
 * @param {Object} props - The component props
 * @param {boolean} [props.asChild] - Whether to render as a child component using Radix Slot
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLAnchorElement>} ref - Forward ref for the anchor element
 * @returns {JSX.Element} An anchor element or slot component for navigation
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

/**
 * Current page indicator in the breadcrumb trail.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLSpanElement>} ref - Forward ref for the span element
 * @returns {JSX.Element} A span element representing the current page
 */
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

/**
 * Separator component between breadcrumb items.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} [props.children] - Custom separator content
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} A list item containing the separator
 */
const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/**
 * Ellipsis component indicating truncated breadcrumb items.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} A span element containing the ellipsis indicator
 */
const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
