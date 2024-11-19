'use client';

import { app } from '@/constants';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { NewsletterSignUpForm } from '../forms';

/**
 * Footer component for the Kappa Theta Pi website
 *
 * @component
 * @description
 * A responsive footer component that displays organizational information, navigation links,
 * contact details, and social media links. The component is memoized for performance optimization.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @returns {JSX.Element} A memoized footer component
 *
 * @features
 * - Responsive grid layout that adapts to different screen sizes
 * - Quick links navigation section
 * - Resources section with important links
 * - Contact information display
 * - Social media links with icons
 * - Copyright notice and legal links
 *
 * @styling
 * - Uses Tailwind CSS for styling
 * - Consistent color scheme with brand colors
 * - Hover effects on interactive elements
 * - Responsive padding and spacing
 * - Accessible color contrast ratios
 */
export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#234c8b] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <FooterSection
              title="Quick Links"
              links={[
                { href: '/about', text: 'About Us' },
                { href: '/chapters', text: 'Chapters' },
                { href: '/join', text: 'Join Us' },
                { href: '/blog', text: 'Blog' },
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <FooterSection
              title="Resources"
              links={[
                { href: '/company-portal', text: 'Company Portal' },
                { href: '/blog', text: 'Student Resources' },
                { href: '#', text: 'New Company Interest Form' },
              ]}
            />
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4">Contact Kappa Theta Pi</h3>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-[#458eff]" />
              <a href={`mailto:${app.email}`} className="text-lg font-medium hover:underline">
                {app.email}
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Follow ΚΘΠ</h3>
            <div className="flex space-x-4">
              <SocialLink
                href="https://www.instagram.com/ktpnational?igsh=MWJkcGt2dDN1NHRzNQ=="
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-[#458eff]" />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/company/kappa-theta-pi-national/"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-[#458eff]" />
              </SocialLink>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <NewsletterSignUpForm />
          </div>
        </div>
        <div className="mt-12 text-center">
          <p>
            &copy; {currentYear} Kappa Theta Pi National Technology Fraternity. All rights reserved.
          </p>
          <div className="mt-4 space-x-4">
            <FooterLink href="/terms" text="Terms of Service" />
            <FooterLink href="/privacy" text="Privacy Policy" />
            <FooterLink href="/copyright" text="Copyright Notice" />
          </div>
        </div>
      </div>
    </footer>
  );
});

/**
 * Props interface for the FooterSection component
 * @interface FooterSectionProps
 * @property {string} title - The heading text for the footer section
 * @property {Array<{href: string, text: string}>} links - Array of link objects containing href and display text
 */
type FooterSectionProps = {
  title: string;
  links: Array<{ href: string; text: string }>;
};

/**
 * Reusable FooterSection component for grouping related links
 *
 * @component
 * @description
 * A component that renders a section of footer links with a title.
 * Used for organizing related links into logical groups within the footer.
 *
 * @param {FooterSectionProps} props - Component props
 * @param {string} props.title - The heading text for the section
 * @param {Array<{href: string, text: string}>} props.links - Array of link objects
 *
 * @example
 * ```tsx
 * <FooterSection
 *   title="Quick Links"
 *   links={[
 *     { href: '/about', text: 'About Us' },
 *     { href: '/contact', text: 'Contact' }
 *   ]}
 * />
 * ```
 *
 * @returns {JSX.Element} A footer section with title and links
 */
const FooterSection = ({ title, links }: FooterSectionProps) => (
  <div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="hover:text-[#8BB9FF] transition-colors">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Props interface for the SocialLink component
 * @interface SocialLinkProps
 * @property {string} href - The URL the social link points to
 * @property {string} aria-label - Accessible label for the social link
 * @property {React.ReactNode} children - Child elements (typically social icons)
 */
type SocialLinkProps = {
  href: string;
  'aria-label': string;
  children: React.ReactNode;
};

/**
 * Reusable SocialLink component for social media links
 *
 * @component
 * @description
 * A component that renders a social media link with an icon.
 * Includes proper accessibility attributes and styling for social media links.
 *
 * @param {SocialLinkProps} props - Component props
 * @param {string} props.href - The URL the social link points to
 * @param {string} props.aria-label - Accessible label for the social link
 * @param {React.ReactNode} props.children - Child elements (typically social icons)
 *
 * @example
 * ```tsx
 * <SocialLink href="https://instagram.com" aria-label="Instagram">
 *   <InstagramIcon />
 * </SocialLink>
 * ```
 *
 * @returns {JSX.Element} A styled social media link with icon
 */
const SocialLink = ({ href, 'aria-label': ariaLabel, children }: SocialLinkProps) => (
  <a
    href={href}
    className="hover:text-[#8BB9FF] transition-colors"
    aria-label={ariaLabel}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

/**
 * Props interface for the FooterLink component
 * @interface FooterLinkProps
 * @property {string} href - The URL the footer link points to
 * @property {string} text - The display text for the link
 */
type FooterLinkProps = {
  href: string;
  text: string;
};

/**
 * Reusable FooterLink component for legal and policy links
 *
 * @component
 * @description
 * A component that renders a footer link, typically used for legal pages
 * and policy documents. Includes consistent styling with hover effects.
 *
 * @param {FooterLinkProps} props - Component props
 * @param {string} props.href - The URL the footer link points to
 * @param {string} props.text - The display text for the link
 *
 * @example
 * ```tsx
 * <FooterLink href="/privacy" text="Privacy Policy" />
 * ```
 *
 * @returns {JSX.Element} A styled footer link
 */
const FooterLink = ({ href, text }: FooterLinkProps) => (
  <Link href={href} className="text-white hover:text-[#8BB9FF] transition-colors">
    {text}
  </Link>
);
