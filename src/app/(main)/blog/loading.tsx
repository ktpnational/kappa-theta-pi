import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * BlogLoadingPage Component
 *
 * A loading placeholder component that displays a grid of skeleton articles
 * while the actual blog content is being fetched.
 *
 * Features:
 * - Responsive grid layout with 2 columns on mobile, 3 on desktop
 * - Consistent 16:9 aspect ratio for article thumbnails
 * - Skeleton placeholders for image, title, metadata
 * - Configurable number of placeholder articles via array length
 *
 * Grid Layout:
 * - Mobile (default): 2 columns with 2rem gap
 * - Desktop (lg): 3 columns with 4rem gap
 * - Container max width: 80rem (max-w-7xl)
 *
 * @component
 * @returns {JSX.Element} The rendered loading placeholder grid
 */
export default function BlogLoadingPage(): JSX.Element {
  return (
    <div className="container grid w-full max-w-7xl grid-cols-2 gap-8 py-24 md:py-16 lg:grid-cols-3 lg:gap-16 lg:py-32">
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className="flex flex-col space-y-2.5">
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="size-full" />
          </AspectRatio>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-28" />
        </article>
      ))}
    </div>
  );
}
