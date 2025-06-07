'use client';

import { Icons } from '@/components';
import { app } from '@/constants';
import { legalLinks, navigationSections } from '@/constants/nav';
import Link from 'next/link';
import { memo } from 'react';

const currentYear = new Date().getFullYear();

export const Footer = memo(() => {
  return (
    <footer className="bg-[#234c8b] text-white py-12 w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description Column */}
          <div className="space-y-4">
            <Icons.miscellaneous.coutKtp className="w-[180px] h-auto" />
            <p className="text-sm text-white/80 max-w-sm">
              Kappa Theta Pi is a professional technology fraternity dedicated to developing
              technical leaders and fostering innovation in technology.
            </p>
            <div className="flex gap-4 pt-4">
              <SocialLink href="https://www.instagram.com/ktpnational" aria-label="Instagram">
                <Icons.logos.instagram className="w-5 h-5 hover:text-[#8BB9FF] transition-colors" />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/company/kappa-theta-pi-national"
                aria-label="LinkedIn"
              >
                <Icons.logos.linkedin className="w-5 h-5 hover:text-[#8BB9FF] transition-colors" />
              </SocialLink>
              <SocialLink href="https://github.com/ktpnational" aria-label="Github">
                <Icons.logos.github className="w-5 h-5 hover:text-[#8BB9FF] transition-colors" />
              </SocialLink>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="grid grid-cols-2 gap-8">
            {navigationSections.map(
              (section, index) =>
                index < 2 && (
                  <div key={section.title}>
                    <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm text-white/80 hover:text-[#8BB9FF] transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
            )}
          </div>

          {/* Last Navigation Section */}
          <div>
            {navigationSections[2] && (
              <>
                <h3 className="text-lg font-semibold mb-4">{navigationSections[2].title}</h3>
                <ul className="space-y-2">
                  {navigationSections[2].items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/80 hover:text-[#8BB9FF] transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {currentYear} {app.name.split(' - ')[0]}
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-[#8BB9FF] transition-colors"
                >
                  {link.title.split(' ')[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

type SocialLinkProps = {
  href: string;
  'aria-label': string;
  children: React.ReactNode;
};

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
