'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';

const MemoizedButton = memo(Button);

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';

export const Header: React.FC = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const prevScrollPosRef = useRef<number>(0);

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
  }, [isScrolled, visible]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

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
          </div>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Kappa Theta Pi</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Professional Technology Fraternity
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/about" title="About Us">
                      Learn about our mission, values, and history.
                    </ListItem>
                    <ListItem href="/chapters" title="Chapters">
                      Explore our chapters across different universities.
                    </ListItem>
                    <ListItem href="/join" title="Join Us">
                      Find out how to become a member of Kappa Theta Pi.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href}>
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
            <Link href="/about">
              <MemoizedButton variant="ghost" className="w-full">
                About Us
              </MemoizedButton>
            </Link>
            <Link href="/chapters">
              <MemoizedButton variant="ghost" className="w-full">
                Chapters
              </MemoizedButton>
            </Link>
            <Link href="/join">
              <MemoizedButton variant="ghost" className="w-full">
                Join Us
              </MemoizedButton>
            </Link>
            <Link href="/blog">
              <MemoizedButton variant="ghost" className="w-full">
                Blog
              </MemoizedButton>
            </Link>
            <Link href="/contact">
              <MemoizedButton variant="ghost" className="w-full">
                Contact Us
              </MemoizedButton>
            </Link>
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

export default Header;
