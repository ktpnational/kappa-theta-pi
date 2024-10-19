'use client';

import { app } from '@/constants';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

/**
 * Footer component for the Kappa Theta Pi website
 */
export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#234c8b] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterSection
            title="Quick Links"
            links={[
              { href: '/about-us', text: 'About Us' },
              { href: '/chapters', text: 'Chapters' },
              { href: '/join-us', text: 'Join Us' },
              { href: '/blog', text: 'Blog' },
            ]}
          />
          <FooterSection
            title="Resources"
            links={[
              { href: '/company-portal', text: 'Company Portal' },
              { href: '/blog', text: 'Student Resources' },
              { href: '#', text: 'New Company Interest Form' },
            ]}
          />
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Kappa Theta Pi</h3>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-[#458eff]" />
              <a href={`mailto:${app.email}`} className="text-lg font-medium hover:underline">
                {app.email}
              </a>
            </div>
          </div>
          <div>
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

type FooterSectionProps = {
  title: string;
  links: Array<{ href: string; text: string }>;
};

/**
 * Reusable FooterSection component for link lists
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

type SocialLinkProps = {
  href: string;
  'aria-label': string;
  children: React.ReactNode;
};

/**
 * Reusable SocialLink component for social media icons
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

type FooterLinkProps = {
  href: string;
  text: string;
};

/**
 * Reusable FooterLink component for legal links
 */
const FooterLink = ({ href, text }: FooterLinkProps) => (
  <Link href={href} className="text-white hover:text-[#8BB9FF] transition-colors">
    {text}
  </Link>
);
