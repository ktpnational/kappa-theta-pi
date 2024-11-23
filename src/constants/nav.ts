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
        title: 'National Board',
        href: '/about/board',
        description: 'Meet our national board members',
      },
      {
        title: 'Our History',
        href: '/about/history',
        description: 'Explore our founding and growth',
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
 * Authentication related navigation links
 */
export const authLinks: NavItem[] = [
  {
    title: 'Login',
    href: '/auth/login',
    description: 'Sign in to your account',
  },
  {
    title: 'Register',
    href: '/auth/register',
    description: 'Create a new account',
  },
];

/**
 * Dashboard navigation links based on user role
 */
export const dashboardLinks: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    description: 'View your dashboard',
  },
  {
    title: 'Company Portal',
    href: '/dashboard/company',
    description: 'Access company management tools',
  },
  {
    title: 'Member Portal',
    href: '/dashboard/member',
    description: 'Access member resources',
  },
  {
    title: 'Settings',
    href: '/settings',
    description: 'Manage your account settings',
  },
];

/**
 * Legal and policy related navigation links
 */
export const legalLinks: NavItem[] = [
  {
    title: 'Terms of Service',
    href: '/terms',
    description: 'Read our terms of service',
  },
  {
    title: 'Privacy Policy',
    href: '/privacy',
    description: 'View our privacy policy',
  },
  {
    title: 'Copyright Policy',
    href: '/copyright',
    description: 'Learn about our copyright policy',
  },
];

/**
 * Utility navigation links
 */
export const utilityLinks: NavItem[] = [
  {
    title: 'Contact',
    href: '/contact',
    description: 'Get in touch with us',
  },
];

export { navigationSections };
export type { NavItem, NavSection };
