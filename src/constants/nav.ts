type NavItem = {
  title: string
  href: string
  description?: string
}

type NavSection = {
  title: string
  items: NavItem[]
}

const navigationSections: NavSection[] = [
  {
    title: "About Us",
    items: [
      {
        title: "Overview",
        href: "#hero",
        description: "Learn about our mission and values"
      },
      {
        title: "National Board",
        href: "/about/board",
        description: "Meet our national board members"
      },
      {
        title: "Our History",
        href: "/about/history",
        description: "Explore our founding and growth"
      },
      {
        title: "FAQ",
        href: "#faq",
        description: "Frequently asked questions"
      }
    ]
  },
  {
    title: "Get Involved",
    items: [
      {
        title: "Join KΘΠ",
        href: "/join",
        description: "Become a member of our community"
      },
      {
        title: "Chapters",
        href: "/chapters",
        description: "Find chapters at universities nationwide"
      },
      {
        title: "Start a Chapter",
        href: "/chapters/start",
        description: "Bring KΘΠ to your campus"
      }
    ]
  },
  {
    title: "Resources",
    items: [
      {
        title: "For Members",
        href: "/resources/members",
        description: "Access member-exclusive content"
      },
      {
        title: "For Companies",
        href: "/resources/companies",
        description: "Partner with our organization"
      },
      {
        title: "For Chapters",
        href: "/resources/chapters",
        description: "Chapter management tools"
      }
    ]
  }
]

const standaloneLinks: NavItem[] = [
  { title: "Sponsors", href: "#sponsors" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" }
]

const portalLinks: NavItem[] = [
  { title: "Company Portal", href: "/dashboard/company" },
  { title: "Member Portal", href: "/dashboard/member" }
]

export { navigationSections, standaloneLinks, portalLinks };
export type { NavItem, NavSection };
