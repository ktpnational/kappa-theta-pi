'use client';

import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/providers/core/global/zustand-provider';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';

/**
 * Memoized version of the Button component for performance optimization
 */
const MemoizedButton = memo(Button);

/**
 * Navigation items configuration
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
 * Header component that provides navigation and responsive menu functionality
 * @component
 * @returns {React.ReactElement} The rendered Header component
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
   * @function
   * @returns {void}
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
   * Toggles mobile menu open/closed state
   * @function
   * @returns {void}
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
