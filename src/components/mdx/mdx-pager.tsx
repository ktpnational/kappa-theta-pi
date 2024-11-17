import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

import { cn, truncate } from "@/lib"

import { buttonVariants } from "@/components/ui/button"

/**
 * Interface representing a single item in the MDX pager
 * @interface MdxPagerItem
 * @property {string} title - The title of the MDX document
 * @property {string} slug - The URL slug/path for the MDX document
 */
interface MdxPagerItem {
  title: string
  slug: string
}

/**
 * Props interface for the MdxPager component
 * @interface MdxPagerProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {MdxPagerItem} currentItem - The currently active/displayed MDX document
 * @property {MdxPagerItem[]} allItems - Array of all available MDX documents for pagination
 */
interface MdxPagerProps extends React.HTMLAttributes<HTMLDivElement> {
  currentItem: MdxPagerItem
  allItems: MdxPagerItem[]
}

/**
 * MDX Pager component that provides navigation between MDX documents
 *
 * @component
 * @description
 * Renders a pagination component with previous/next links to navigate between MDX documents.
 * The component automatically determines the previous and next items based on the current document's position
 * in the provided array of all items. Links are styled as ghost buttons and include directional chevron icons.
 *
 * @param {MdxPagerProps} props - Component props
 * @param {MdxPagerItem} props.currentItem - The currently active MDX document
 * @param {MdxPagerItem[]} props.allItems - Array of all available MDX documents
 * @param {string} [props.className] - Optional additional CSS classes
 *
 * @returns {JSX.Element | null} A navigation component with prev/next links, or null if pager info cannot be determined
 *
 * @example
 * ```tsx
 * <MdxPager
 *   currentItem={{ title: "Current Post", slug: "/posts/current" }}
 *   allItems={[
 *     { title: "First Post", slug: "/posts/first" },
 *     { title: "Current Post", slug: "/posts/current" },
 *     { title: "Last Post", slug: "/posts/last" }
 *   ]}
 * />
 * ```
 */
export function MdxPager({
  currentItem,
  allItems,
  className,
  ...props
}: MdxPagerProps): JSX.Element | null {
  const pager = getPager(currentItem, allItems)

  if (!pager) {
    return null
  }

  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {pager?.prev ? (
        <Link
          aria-label="Previous post"
          href={pager.prev.slug}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
          {truncate(pager.prev.title, 20)}
        </Link>
      ) : null}
      {pager?.next ? (
        <Link
          aria-label="Next post"
          href={pager.next.slug}
          className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
        >
          {truncate(pager.next.title, 20)}
          <ChevronRightIcon className="ml-2 size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  )
}

/**
 * Helper function to determine the previous and next items for pagination
 *
 * @function getPager
 * @description
 * Analyzes the provided array of items to determine which items should be linked as
 * previous and next relative to the current item. The function flattens the array
 * if nested, finds the current item's position, and returns adjacent items.
 *
 * @param {MdxPagerItem} currentItem - The currently active MDX document
 * @param {MdxPagerItem[]} allItems - Array of all available MDX documents
 *
 * @returns {{
 *   prev: MdxPagerItem | null,
 *   next: MdxPagerItem | null
 * } | undefined} Object containing previous and next items, or undefined if current item not found
 *
 * @example
 * ```ts
 * const pager = getPager(
 *   { title: "Current", slug: "/current" },
 *   [
 *     { title: "First", slug: "/first" },
 *     { title: "Current", slug: "/current" },
 *     { title: "Last", slug: "/last" }
 *   ]
 * )
 * // Returns: { prev: {title: "First", ...}, next: {title: "Last", ...} }
 * ```
 */
export function getPager(currentItem: MdxPagerItem, allItems: MdxPagerItem[]) {
  const flattenedLinks = allItems.flat()
  const activeIndex = flattenedLinks.findIndex(
    (link) => currentItem.slug === link?.slug
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return {
    prev,
    next,
  }
}
