'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/providers';
import { ScrollIntoCenterView } from '@/utils';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import {
  type NavItem,
  type NavSection,
  navigationSections,
  portalLinks,
  standaloneLinks,
} from '@/constants';

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
 * @returns {JSX.Element} A styled list item with title and description
 */
const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
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
 * Renders a dropdown section in the navigation menu.
 *
 * @component
 * @param {Object} props - The component props
 * @param {NavSection} props.section - The navigation section data containing title and items
 * @returns {JSX.Element} A dropdown menu section with a trigger and content
 */
const DropdownSection: React.FC<{ section: NavSection }> = ({ section }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="text-primary hover:text-primary-foreground">
      {section.title}
    </NavigationMenuTrigger>
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
);

/**
 * Renders a standalone navigation link item.
 *
 * @component
 * @param {Object} props - The component props
 * @param {NavItem} props.item - The navigation item data containing title and href
 * @returns {JSX.Element} A styled navigation link
 */
const StandaloneNavLink: React.FC<{ item: NavItem }> = ({ item }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      ScrollIntoCenterView(item.href);
    }
  };

  return (
    <NavigationMenuItem>
      <Link
        href={item.href}
        onClick={handleClick}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

/**
 * Renders a portal button link.
 *
 * @component
 * @param {Object} props - The component props
 * @param {NavItem} props.item - The navigation item data containing title and href
 * @returns {JSX.Element} A styled button link that's hidden on mobile
 */
const PortalButton: React.FC<{ item: NavItem }> = ({ item }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      ScrollIntoCenterView(item.href);
    }
  };

  return (
    <Link href={item.href} className="hidden sm:block" onClick={handleClick}>
      <Button className="bg-[#234C8B] text-white hover:bg-[#1E4378]">{item.title}</Button>
    </Link>
  );
};

/**
 * Renders a mobile menu item.
 *
 * @component
 * @param {Object} props - The component props
 * @param {NavItem} props.item - The navigation item data containing title and href
 * @returns {JSX.Element} A styled link for mobile navigation
 */
const MobileMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const setIsMenuOpen = useGlobalStore((state) => state.header.setIsMenuOpen);

  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      ScrollIntoCenterView(item.href);
      setIsMenuOpen(false);
    }
  };

  return (
    <Link
      href={item.href}
      className="block py-2 text-sm text-gray-700 hover:text-primary transition-colors duration-200"
      onClick={handleClick}
    >
      {item.title}
    </Link>
  );
};

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
 * @returns {JSX.Element} The complete header component with navigation
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export const Header = () => {
  const { isMenuOpen, setIsMenuOpen, visible, setVisible, prevScrollPos } = useGlobalStore(
    (state) => state.header,
  );

  // Handle scroll behavior to show/hide header
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setVisible(true);
        return;
      }
      if (currentScrollY < prevScrollPos) {
        setVisible(true);
      } else if (currentScrollY > prevScrollPos) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setVisible, prevScrollPos]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-transform duration-300',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/images/logo.png"
              alt="ΚΘΠ Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-xl text-[#234C8B]">ΚΘΠ</span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationSections.map((section) => (
                  <DropdownSection key={section.title} section={section} />
                ))}
                {standaloneLinks.map((item) => (
                  <StandaloneNavLink key={item.href} item={item} />
                ))}
              </NavigationMenuList>
              <NavigationMenuViewport />
            </NavigationMenu>
            {portalLinks.map((item) => (
              <PortalButton key={item.href} item={item} />
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navigationSections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="font-semibold text-lg text-[#234C8B]">{section.title}</h3>
                {section.items.map((item) => (
                  <MobileMenuItem key={item.href} item={item} />
                ))}
              </div>
            ))}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-[#234C8B]">Links</h3>
              {standaloneLinks.map((item) => (
                <MobileMenuItem key={item.href} item={item} />
              ))}
            </div>
            <div className="pt-4 space-y-2 sm:hidden">
              {portalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block w-full">
                  <Button className="w-full bg-[#234C8B] text-white hover:bg-[#1E4378]">
                    {item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
