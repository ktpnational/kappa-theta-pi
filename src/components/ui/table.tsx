import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Base table component that provides structure and styling for tabular data.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLTableElement>} ref - Forwarded ref for the table element
 * @returns {JSX.Element} Rendered table component
 */
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

/**
 * Table header component for containing header rows.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLTableSectionElement>} ref - Forwarded ref for the thead element
 * @returns {JSX.Element} Rendered table header component
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

/**
 * Table body component for containing data rows.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLTableSectionElement>} ref - Forwarded ref for the tbody element
 * @returns {JSX.Element} Rendered table body component
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

/**
 * Table footer component for containing summary rows.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLTableSectionElement>} ref - Forwarded ref for the tfoot element
 * @returns {JSX.Element} Rendered table footer component
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

/**
 * Table row component with hover and selection states.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLTableRowElement>} ref - Forwarded ref for the tr element
 * @returns {JSX.Element} Rendered table row component
 */
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

/**
 * Table header cell component for column headers.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLTableCellElement>} ref - Forwarded ref for the th element
 * @returns {JSX.Element} Rendered table header cell component
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

/**
 * Table cell component for data cells.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLTableCellElement>} ref - Forwarded ref for the td element
 * @returns {JSX.Element} Rendered table cell component
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

/**
 * Table caption component for table descriptions.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLTableCaptionElement>} ref - Forwarded ref for the caption element
 * @returns {JSX.Element} Rendered table caption component
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
