import type { LucideIcon } from 'lucide-react';
import type * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

/**
 * Secondary navigation component that renders a list of menu items in a sidebar group
 *
 * @component
 * @param {Object} props - The component props
 * @param {Array<NavItem>} props.items - Array of navigation items to display
 * @param {string} props.items[].title - The text label for the menu item
 * @param {string} props.items[].url - The URL/href the menu item links to
 * @param {LucideIcon} props.items[].icon - The Lucide icon component to display
 * @param {React.ComponentPropsWithoutRef<typeof SidebarGroup>} props.rest - Additional props passed to SidebarGroup
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     title: "Dashboard",
 *     url: "/dashboard",
 *     icon: HomeIcon
 *   }
 * ];
 *
 * <NavSecondary items={items} />
 * ```
 *
 * @returns {JSX.Element} The rendered navigation component
 */
export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
