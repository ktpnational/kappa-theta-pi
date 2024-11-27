'use client';
import { cn } from '@/lib/utils';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import { encode } from 'qss';
import React, { memo } from 'react';

/**
 * Props for the LinkPreview component
 * @typedef {Object} LinkPreviewProps
 * @property {React.ReactNode} children - Child elements to render within the preview trigger
 * @property {string} url - URL to preview and link to
 * @property {string} [className] - Optional CSS class name
 * @property {number} [width=200] - Width of preview image in pixels
 * @property {number} [height=125] - Height of preview image in pixels
 * @property {number} [quality=50] - Quality of preview image (1-100)
 * @property {string} [layout='fixed'] - Layout mode for preview image
 * @property {boolean} [isStatic=false] - Whether to use static image source or generate preview
 * @property {string} [imageSrc] - Static image source URL (required if isStatic is true)
 */
type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never });

/**
 * Memoized Image component to prevent unnecessary re-renders
 * @param {ImageProps} props - Props passed to Next.js Image component
 */
const MemoizedImage = memo((props: ImageProps) => <Image {...props} />);

/**
 * LinkPreview component that shows a preview image when hovering over a link
 * @param {LinkPreviewProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export const LinkPreview = React.memo(
  ({
    children,
    url,
    className,
    width = 200,
    height = 125,
    quality = 50,
    layout = 'fixed',
    isStatic = false,
    imageSrc = '',
  }: LinkPreviewProps) => {
    let src;
    if (!isStatic) {
      // Generate preview URL using microlink API
      const params = encode({
        url,
        screenshot: true,
        meta: false,
        embed: 'screenshot.url',
        colorScheme: 'dark',
        'viewport.isMobile': true,
        'viewport.deviceScaleFactor': 1,
        'viewport.width': width * 3,
        'viewport.height': height * 3,
      });
      src = `https://api.microlink.io/?${params}`;
    } else {
      src = imageSrc;
    }

    // Track hover card open state
    const [isOpen, setOpen] = React.useState(false);

    // Track component mount state
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    // Configure spring animation properties
    const springConfig = { stiffness: 100, damping: 15 };
    const x = useMotionValue(0);
    const translateX = useSpring(x, springConfig);

    /**
     * Handle mouse movement to create hover animation effect
     * @param {MouseEvent} event - Mouse move event
     */
    const handleMouseMove = (event: any) => {
      const targetRect = event.target.getBoundingClientRect();
      const eventOffsetX = event.clientX - targetRect.left;
      const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
      x.set(offsetFromCenter);
    };

    return (
      <>
        {isMounted ? (
          <div className="hidden">
            <MemoizedImage
              src={src}
              width={width}
              height={height}
              quality={quality}
              layout={layout}
              priority={true}
              alt="hidden image"
            />
          </div>
        ) : null}

        <HoverCardPrimitive.Root
          openDelay={50}
          closeDelay={100}
          onOpenChange={(open) => {
            setOpen(open);
          }}
        >
          <HoverCardPrimitive.Trigger
            onMouseMove={handleMouseMove}
            className={cn('text-black dark:text-white', className)}
            href={url}
          >
            {children}
          </HoverCardPrimitive.Trigger>

          <HoverCardPrimitive.Content
            className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
            side="top"
            align="center"
            sideOffset={10}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  {...({
                    className: 'shadow-xl rounded-xl',
                    style: {
                      x: translateX,
                    },
                  } as HTMLMotionProps<'div'>)}
                >
                  <Link
                    href={url}
                    className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                    style={{ fontSize: 0 }}
                  >
                    <MemoizedImage
                      src={isStatic ? imageSrc : src}
                      width={width}
                      height={height}
                      quality={quality}
                      layout={layout}
                      priority={true}
                      className="rounded-lg"
                      alt="preview image"
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Root>
      </>
    );
  },
);

LinkPreview.displayName = 'LinkPreview';
