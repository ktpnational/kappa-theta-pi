import Link from "next/link"

import { cn } from "@/lib"

/**
 * Props interface for the MdxCard component
 *
 * @interface CardProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 *
 * @property {string} [href] - Optional URL that the card links to when clicked
 * @property {boolean} [disabled] - Optional flag to disable the card interaction
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  disabled?: boolean
}

/**
 * MDX-compatible card component with optional link functionality
 *
 * @component
 * @description
 * A versatile card component designed for MDX content that can optionally act as a clickable link.
 * Features hover effects, disabled states, and accessible link behavior.
 *
 * @param {CardProps} props - Component props
 * @param {string} [props.href] - URL to navigate to when card is clicked
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {ReactNode} props.children - Card content
 * @param {boolean} [props.disabled] - Whether the card is disabled
 *
 * @returns {JSX.Element} A styled card component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <MdxCard>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </MdxCard>
 *
 * // As a link
 * <MdxCard href="/some-page">
 *   <h3>Clickable Card</h3>
 *   <p>Click to navigate</p>
 * </MdxCard>
 *
 * // Disabled state
 * <MdxCard disabled>
 *   <h3>Disabled Card</h3>
 *   <p>Cannot interact</p>
 * </MdxCard>
 * ```
 *
 * @styling
 * - Uses Tailwind CSS for styling
 * - Rounded corners with border and shadow
 * - Hover effect with enhanced shadow
 * - Disabled state with reduced opacity
 * - Supports custom className injection
 *
 * @accessibility
 * - Includes sr-only text for link announcements
 * - Proper cursor styling for disabled state
 * - Maintains semantic HTML structure
 */
export function MdxCard({
  href,
  className,
  children,
  disabled,
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      className={cn(
        "group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
          {children}
        </div>
      </div>
      {href && (
        <Link href={disabled ? "#" : href} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  )
}
