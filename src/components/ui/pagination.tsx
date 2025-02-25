import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Main pagination navigation component that wraps pagination content
 * @param {object} props - Component props
 * @param {string} [props.className] - Optional CSS class name
 * @returns {React.JSX.Element} Navigation element containing pagination
 */
const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

/**
 * Container for pagination items
 * @param {object} props - Component props
 * @param {string} [props.className] - Optional CSS class name
 * @param {React.Ref<HTMLUListElement>} ref - Forwarded ref
 * @returns {React.JSX.Element} Unordered list containing pagination items
 */
const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  ),
);
PaginationContent.displayName = 'PaginationContent';

/**
 * Individual pagination item wrapper
 * @param {object} props - Component props
 * @param {string} [props.className] - Optional CSS class name
 * @param {React.Ref<HTMLLIElement>} ref - Forwarded ref
 * @returns {React.JSX.Element} List item element
 */
const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />,
);
PaginationItem.displayName = 'PaginationItem';

/**
 * Props for PaginationLink component
 * @typedef {object} PaginationLinkProps
 * @property {boolean} [isActive] - Whether the link represents current page
 * @property {ButtonProps['size']} [size] - Size variant of the button
 * @extends {React.ComponentProps<'a'>}
 */
type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

/**
 * Clickable pagination link component
 * @param {PaginationLinkProps} props - Component props
 * @returns {React.JSX.Element} Anchor element styled as a button
 */
const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

/**
 * Previous page navigation button
 * @param {React.ComponentProps<typeof PaginationLink>} props - Component props
 * @returns {React.JSX.Element} Styled previous page button
 */
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

/**
 * Next page navigation button
 * @param {React.ComponentProps<typeof PaginationLink>} props - Component props
 * @returns {React.JSX.Element} Styled next page button
 */
const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

/**
 * Ellipsis component to indicate more pages
 * @param {React.ComponentProps<'span'>} props - Component props
 * @returns {React.JSX.Element} Span element with ellipsis icon
 */
const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
