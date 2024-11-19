"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationSections, NavItem, NavSection, portalLinks, standaloneLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { Menu, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { ScrollIntoCenterView } from "@/utils"
import * as React from "react"
import { useGlobalStore } from "@/providers"
/**
 * A custom list item component for use within navigation menus
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} props.title - The title text to display
 * @param {React.ReactNode} props.children - Child content to render
 * @param {string} [props.href] - URL to navigate to when clicked
 * @param {React.Ref<HTMLAnchorElement>} ref - Forwarded ref
 * @returns {JSX.Element} A styled list item with navigation functionality
 */
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href?.startsWith('#')) {
      e.preventDefault()
      ScrollIntoCenterView(href)
    }
  }

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '#'}
          ref={ref}
          onClick={handleClick}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

/**
 * A dropdown section component for the navigation menu
 *
 * @component
 * @param {Object} props - Component props
 * @param {NavSection} props.section - Navigation section data containing title and items
 * @returns {JSX.Element} A dropdown menu section with list items
 */
const DropdownSection: React.FC<{ section: NavSection }> = ({ section }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        {section.items.map((item) => (
          <ListItem
            key={item.href}
            href={item.href}
            title={item.title}
          >
            {item.description}
          </ListItem>
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
)

/**
 * A standalone navigation link component
 *
 * @component
 * @param {Object} props - Component props
 * @param {NavItem} props.item - Navigation item data containing href and title
 * @returns {JSX.Element} A styled navigation link
 */
const StandaloneNavLink: React.FC<{ item: NavItem }> = ({ item }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith('#')) {
      e.preventDefault()
      ScrollIntoCenterView(item.href)
    }
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.href}
          onClick={handleClick}
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

/**
 * A portal button component for special navigation actions
 *
 * @component
 * @param {Object} props - Component props
 * @param {NavItem} props.item - Navigation item data containing href and title
 * @returns {JSX.Element} A styled button that acts as a portal link
 */
const PortalButton: React.FC<{ item: NavItem }> = ({ item }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith('#')) {
      e.preventDefault()
      ScrollIntoCenterView(item.href)
    }
  }

  return (
    <Link href={item.href} className="hidden sm:block" onClick={handleClick}>
      <Button className="bg-[#234c8b] text-white hover:bg-[#458eff]">
        {item.title}
      </Button>
    </Link>
  )
}

/**
 * A mobile menu item component for responsive navigation
 */
const MobileMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const setIsMenuOpen = useGlobalStore((state) => state.header.setIsMenuOpen)

  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith('#')) {
      e.preventDefault()
      ScrollIntoCenterView(item.href)
      setIsMenuOpen(false)
    }
  }

  return (
    <Link
      href={item.href}
      className="py-2 text-sm hover:text-primary"
      onClick={handleClick}
    >
      {item.title}
    </Link>
  )
}

/**
 * The main header component that provides site-wide navigation
 */
export const Header = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    visible,
    setVisible,
    prevScrollPos,
  } = useGlobalStore((state) => state.header)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY === 0) {
        setVisible(true)
        return
      }

      if (currentScrollY < prevScrollPos) {
        setVisible(true)
      } else if (currentScrollY > prevScrollPos) {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setVisible, prevScrollPos])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300",
        visible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/assets/images/logo.png" alt="ΚΘΠ Logo" width={40} height={40} />
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigationSections.map((section) => (
                <DropdownSection key={section.title} section={section} />
              ))}
              {standaloneLinks.map((item) => (
                <StandaloneNavLink key={item.href} item={item} />
              ))}
            </NavigationMenuList>
            <NavigationMenuIndicator />
            <NavigationMenuViewport />
          </NavigationMenu>
          {portalLinks.map((item) => (
            <PortalButton key={item.href} item={item} />
          ))}
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
          <nav className="flex flex-col p-6 space-y-4">
            {navigationSections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="font-semibold text-lg text-primary">{section.title}</h3>
                {section.items.map((item) => (
                  <MobileMenuItem key={item.href} item={item} />
                ))}
              </div>
            ))}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-primary">Links</h3>
              {standaloneLinks.map((item) => (
                <MobileMenuItem key={item.href} item={item} />
              ))}
            </div>
            <div className="pt-4 space-y-2 sm:hidden">
              {portalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block w-full">
                  <Button className="w-full bg-[#234c8b] text-white hover:bg-[#458eff]">
                    {item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

Header.displayName = 'Header';
export default Header
