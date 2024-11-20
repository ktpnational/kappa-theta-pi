/**
 * Represents a single navigation item with title, link and optional description
 */
type NavItem = {
  /** Display text for the navigation item */
  title: string;
  /** URL or anchor link for navigation */
  href: string;
  /** Optional description text providing more context about the link destination */
  description?: string;
};

/**
 * Represents a grouping of related navigation items under a common heading
 */
type NavSection = {
  /** Title text for the navigation section */
  title: string;
  /** Array of navigation items contained within this section */
  items: NavItem[];
};

/**
 * Primary navigation sections containing grouped navigation items
 * Includes sections for About Us, Get Involved, and Resources
 */
const navigationSections: NavSection[] = [
  {
    title: 'About Us',
    items: [
      {
        title: 'Overview',
        href: '#hero',
        description: 'Learn about our mission and values',
      },
      {
        title: 'National Board',
        href: '/about/board',
        description: 'Meet our national board members',
      },
      {
        title: 'Our History',
        href: '/about/history',
        description: 'Explore our founding and growth',
      },
      {
        title: 'FAQ',
        href: '#faq',
        description: 'Frequently asked questions',
      },
    ],
  },
  {
    title: 'Get Involved',
    items: [
      {
        title: 'Join KΘΠ',
        href: '/join',
        description: 'Become a member of our community',
      },
      {
        title: 'Chapters',
        href: '/chapters',
        description: 'Find chapters at universities nationwide',
      },
      {
        title: 'Start a Chapter',
        href: '/chapters/start',
        description: 'Bring KΘΠ to your campus',
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'For Members',
        href: '/resources/members',
        description: 'Access member-exclusive content',
      },
      {
        title: 'For Companies',
        href: '/resources/companies',
        description: 'Partner with our organization',
      },
      {
        title: 'For Chapters',
        href: '/resources/chapters',
        description: 'Chapter management tools',
      },
    ],
  },
];

/**
 * Individual navigation links that are not part of any section
 * Contains links to sponsors, blog and contact pages
 */
const standaloneLinks: NavItem[] = [
  { title: 'Sponsors', href: '#sponsors' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

/**
 * Navigation links for accessing various user portals
 * Includes portals for company and member access
 */
const portalLinks: NavItem[] = [
  { title: 'Company Portal', href: '/dashboard/company' },
  { title: 'Member Portal', href: '/dashboard/member' },
];

/**
 * Export navigation-related constants and types
 */
export { navigationSections, standaloneLinks, portalLinks };
export type { NavItem, NavSection };
