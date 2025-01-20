'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { type NavItem, legalLinks, navigationSections } from '@/constants';
import { handleScrollAtom, isMenuOpenAtom, visibleAtom } from '@/core/atoms';
import { cn } from '@/lib/utils';
import { ScrollIntoCenterView } from '@/utils';
import { useAtom } from 'jotai/react';
import { throttle } from 'lodash';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { memo, useCallback, useEffect } from 'react';

/**
 * A custom list item component for use within the navigation menu.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} props.title - The title text to display
 * @param {React.ReactNode} props.children - The description content
 * @param {string} [props.href] - The link destination
 * @param {React.Ref<HTMLAnchorElement>} ref - Forwarded ref for the anchor element
 * @returns {React.JSX.Element} A styled list item with title and description
 */
const ListItem = React.forwardRef<React.ComponentRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, href, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent) => {
      if (href?.startsWith('#')) {
        e.preventDefault();
        ScrollIntoCenterView(href);
      }
    };

    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href || '#'}
            ref={ref}
            onClick={handleClick}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';

/**
 * Renders a mobile menu item.
 *
 * @component
 * @param {Object} props - The component props
 * @param {NavItem} props.item - The navigation item data containing title and href
 * @returns {React.JSX.Element} A styled link for mobile navigation
 */
const MobileMenuItem = memo<{ item: NavItem }>(({ item }) => {
  const [, setIsMenuOpen] = useAtom(isMenuOpenAtom);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (item.href.startsWith('#')) {
        e.preventDefault();
        ScrollIntoCenterView(item.href);
        setIsMenuOpen(false);
      }
    },
    [item.href, setIsMenuOpen],
  );

  return (
    <Link
      href={item.href}
      className="block py-3 px-2 text-base text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
      onClick={handleClick}
    >
      {item.title}
    </Link>
  );
});
MobileMenuItem.displayName = 'MobileMenuItem';

/**
 * The main header component for the application.
 * Features a responsive design with:
 * - Logo and branding
 * - Desktop navigation menu with dropdowns
 * - Mobile hamburger menu
 * - Portal links
 * - Auto-hide on scroll down behavior
 *
 * @component
 * @returns {React.JSX.Element} The complete header component with navigation
 *
 * @example
 * \`\`\`tsx
 * <Header />
 * \`\`\`
 */
export const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);
  const [visible] = useAtom(visibleAtom);
  const [, handleScroll] = useAtom(handleScrollAtom);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-transform duration-300',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/svgs/logo.svg"
              alt="ΚΘΠ Logo"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="font-bold text-xl text-[#234C8B]">ΚΘΠ</span>
          </Link>
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationSections.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {section.items.map((item) => (
                          <ListItem key={item.href} title={item.title} href={item.href}>
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-200 ease-in-out">
          <nav className="container mx-auto px-4 py-6 space-y-6">
            {/* Main Navigation Sections */}
            {navigationSections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="font-semibold text-lg text-[#234C8B] px-2 mb-2">{section.title}</h3>
                {section.items.map((item) => (
                  <MobileMenuItem key={item.href} item={item} />
                ))}
              </div>
            ))}

            {/* Legal Links Section */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-[#234C8B] px-2 mb-2">Legal</h3>
              {legalLinks.map((item) => (
                <MobileMenuItem key={item.href} item={item} />
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
