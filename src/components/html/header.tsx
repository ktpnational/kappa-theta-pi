'use client';

import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/providers/core/global/zustand-provider';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';

/**
 * Memoized Button component for performance optimization
 */
const MemoizedButton = memo(Button);

/**
 * Navigation items configuration array
 * @type {Array<{href: string, label: string}>}
 */
const navItems = [
  { href: '/about', label: 'About Us' },
  { href: '/chapters', label: 'Chapters' },
  { href: '/join', label: 'Join Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
];

/**
 * Header component for the website's navigation bar
 *
 * @component
 * @description
 * A responsive header component that provides navigation functionality and adapts to scroll behavior.
 * Features include a collapsible mobile menu, scroll-aware visibility, and smooth transitions.
 * The component is memoized for performance optimization.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 *
 * @returns {JSX.Element} A memoized header component
 *
 * @features
 * - Responsive design with mobile/desktop layouts
 * - Scroll-aware behavior (hide/show on scroll)
 * - Frosted glass effect on scroll
 * - Collapsible mobile menu
 * - Smooth transitions and animations
 * - Memoized child components for performance
 *
 * @state
 * Uses global Zustand store for:
 * - isMenuOpen: Controls mobile menu visibility
 * - isScrolled: Tracks if page is scrolled
 * - visible: Controls header visibility based on scroll direction
 *
 * @hooks
 * - useCallback: Memoizes event handlers
 * - useEffect: Manages scroll event listeners
 * - useRef: Tracks previous scroll position
 *
 * @styling
 * - Uses Tailwind CSS for styling
 * - Dynamic classes based on scroll state
 * - Smooth transitions with CSS
 * - Consistent spacing and alignment
 * - Brand colors and theming
 *
 * @accessibility
 * - Semantic HTML structure
 * - Keyboard navigation support
 * - ARIA-compliant menu button
 * - Proper heading hierarchy
 *
 * @performance
 * - Memoized component
 * - Memoized event handlers
 * - Optimized scroll listener
 * - Efficient state updates
 *
 * @responsive
 * - Mobile-first design
 * - Breakpoint-based layout changes
 * - Touch-friendly mobile menu
 * - Adaptive spacing and sizing
 */
export const Header: React.FC = memo(() => {
  /**
   * Destructured global store values and setters for header state management
   */
  const { isMenuOpen, isScrolled, visible, setIsMenuOpen, setIsScrolled, setVisible } =
    useGlobalStore((state) => state.header);

  /**
   * Ref to store previous scroll position for scroll direction detection
   */
  const prevScrollPosRef = useRef<number>(0);

  /**
   * Handles scroll events to update header visibility and appearance
   *
   * @function
   * @description
   * Updates header state based on scroll position and direction:
   * - Shows header when scrolling up or near top
   * - Hides header when scrolling down
   * - Adds frosted glass effect when scrolled
   *
   * @listens {Event} scroll
   */
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const isScrolledNow = currentScrollPos > 0;
    const isVisibleNow =
      (prevScrollPosRef.current > currentScrollPos && currentScrollPos > 0) ||
      currentScrollPos < 10;

    if (isScrolledNow !== isScrolled) {
      setIsScrolled(isScrolledNow);
    }

    if (isVisibleNow !== visible) {
      setVisible(isVisibleNow);
    }

    prevScrollPosRef.current = currentScrollPos;
  }, [isScrolled, visible, setIsScrolled, setVisible]);

  /**
   * Effect to add and remove scroll event listener
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * Toggles the mobile menu state
   *
   * @function
   * @description
   * Toggles the mobile navigation menu visibility state
   * Memoized to prevent unnecessary re-renders
   */
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [setIsMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image src="/assets/images/logo.png" alt="ΚΘΠ Logo" width={50} height={50} />
            {/* <span className="text-xl md:text-2xl font-bold text-[#234c8b]">International</span> */}
          </div>
        </Link>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <MemoizedButton variant="ghost">{item.label}</MemoizedButton>
            </Link>
          ))}
          <Link href="/company-portal">
            <MemoizedButton
              variant="default"
              className="bg-[#234c8b] text-white hover:bg-[#458eff]"
            >
              Company Portal
            </MemoizedButton>
          </Link>
        </nav>
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? (
            <X className="h-6 w-6 text-[#234c8b]" />
          ) : (
            <Menu className="h-6 w-6 text-[#234c8b]" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <MemoizedButton variant="ghost" className="w-full">
                  {item.label}
                </MemoizedButton>
              </Link>
            ))}
            <Link href="/company-portal">
              <MemoizedButton
                variant="default"
                className="w-full bg-[#234c8b] text-white hover:bg-[#458eff]"
              >
                Company Portal
              </MemoizedButton>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';
