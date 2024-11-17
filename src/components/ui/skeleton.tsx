import { cn } from '@/lib/utils';

/**
 * A skeleton loading component that provides a visual placeholder while content is being loaded.
 *
 * @component
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-full" />
 * ```
 *
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the skeleton element
 * @param {React.HTMLAttributes<HTMLDivElement>} props.props - Any additional HTML div attributes
 *
 * @returns {JSX.Element} A div element with skeleton loading animation styles
 *
 * @remarks
 * The Skeleton component uses the `animate-pulse` utility class to create a subtle loading animation.
 * It has rounded corners and a muted background color by default.
 * The component can be customized through className prop and additional HTML div attributes.
 *
 * @see {@link https://tailwindcss.com/docs/animation#pulse Animation docs}
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export { Skeleton };
