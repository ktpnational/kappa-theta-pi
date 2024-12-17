'use client';

import { navigationSections } from '@/constants/nav';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

/**
 * Props for the PageTransition component
 * @typedef {Object} PageTransitionProps
 * @property {ReactNode} children - Child components to be animated during page transitions
 */
type PageTransitionProps = {
  children: ReactNode;
};

/**
 * Animation variants for page transitions
 * @constant
 * @type {Object}
 * @property {Object} hidden - Initial hidden state with opacity 0 and slight downward offset
 * @property {Object} enter - Visible state with full opacity and no offset
 * @property {Object} exit - Exit state with opacity 0 and slight upward offset
 */
const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Determines the transition configuration based on the current path
 * @function
 * @param {string} path - The current URL path
 * @returns {Object} Transition configuration object with duration and easing
 *
 * @description
 * Returns different transition configurations based on the route type:
 * - Navigation sections: 0.4s with easeInOut
 * - Dashboard routes: 0.6s with anticipate easing
 * - Auth routes: 0.3s with easeOut
 * - Default routes: 0.5s with easeInOut
 */
const getTransitionConfig = (path: string) => {
  const section = navigationSections.find((section) =>
    section.items.some((item) => item.href === path),
  );

  if (section) {
    return {
      transition: { duration: 0.4, ease: 'easeInOut' },
    };
  }

  if (path.startsWith('/dashboard')) {
    return {
      transition: { duration: 0.6, ease: 'anticipate' },
    };
  }

  if (path.startsWith('/auth')) {
    return {
      transition: { duration: 0.3, ease: 'easeOut' },
    };
  }

  return {
    transition: { duration: 0.5, ease: 'easeInOut' },
  };
};

/**
 * A component that provides smooth page transitions using Framer Motion
 * @component
 * @param {PageTransitionProps} props - Component props
 * @returns {React.JSX.Element} Animated page wrapper component
 *
 * @description
 * This component wraps page content and provides animated transitions between route changes.
 * It uses Framer Motion for animation and supports both standard animations and the View
 * Transitions API when available.
 *
 * Features:
 * - Smooth fade and slide transitions between pages
 * - Different transition timings based on route type
 * - Fallback to standard animations when View Transitions API is not supported
 * - Maintains minimum viewport height to prevent layout shifts
 *
 * @example
 * ```tsx
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 */
export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  // Register view transition if browser supports it
  useEffect(() => {
    if (!document.startViewTransition) return;

    const handleNavigation = () => {
      document.startViewTransition(() => {
        // Next.js will handle the actual navigation
      });
    };

    window.addEventListener('navigate', handleNavigation);
    return () => window.removeEventListener('navigate', handleNavigation);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        {...getTransitionConfig(pathname)}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};
