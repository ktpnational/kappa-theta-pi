'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

/**
 * Main navigation component that renders a collapsible sidebar menu.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Array<NavigationItem>} props.items - Array of navigation items to display
 * 
 * @typedef {Object} SubNavigationItem
 * @property {string} title - The title text to display for the sub-item
 * @property {string} url - The URL/href the sub-item should link to
 * 
 * @typedef {Object} NavigationItem
 * @property {string} title - The title text to display
 * @property {string} url - The URL/href the item should link to
 * @property {LucideIcon} icon - Lucide icon component to display next to the title
 * @property {boolean} [isActive] - Whether this navigation item is currently active
 * @property {Array<SubNavigationItem>} [items] - Optional array of sub-navigation items
 * 
 * @returns {JSX.Element} A sidebar navigation menu with collapsible sections
 * 
 * @example
 * const navItems = [
 *   {
 *     title: "Dashboard",
 *     url: "/dashboard",
 *     icon: HomeIcon,
 *     isActive: true,
 *     items: [
 *       { title: "Overview", url: "/dashboard/overview" },
 *       { title: "Analytics", url: "/dashboard/analytics" }
 *     ]
 *   }
 * ];
 * 
 * <NavMain items={navItems} />
 */
export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
