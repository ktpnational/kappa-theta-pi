/**
 * @module NewsletterWelcomeEmail
 * @description A React Email component that generates a welcome email template for SaaSy Land newsletter subscribers
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,'use client';
  
  import { Button } from '@/components/ui/button';
  import { useGlobalStore } from '@/providers/core/global/zustand-provider';
  import { Menu, X } from 'lucide-react';
  import Image from 'next/image';
  import Link from 'next/link';
  import type React from 'react';
  import { memo, useCallback, useEffect, useRef } from 'react';
  
  const MemoizedButton = memo(Button);
  
  const navItems = [
    { href: '/about', label: 'About Us' },
    { href: '/chapters', label: 'Chapters' },
    { href: '/join', label: 'Join Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact Us' },
  ];
  
  export const Header: React.FC = memo(() => {
    const { isMenuOpen, isScrolled, visible, setIsMenuOpen, setIsScrolled, setVisible } =
      useGlobalStore((state) => state.header);
  
    const prevScrollPosRef = useRef(0);
  
    const handleScroll = useCallback(() => {
      const currentScrollPos = window.scrollY;
      const isScrolledNow = currentScrollPos > 0;
      const isVisibleNow =
        (prevScrollPosRef.current > currentScrollPos && currentScrollPos > 0) ||
        currentScrollPos < 10;
  
      if (isScrolledNow !== isScrolled) {
        setIsScrolled(isScrolledNow);
      }
  
      if (isVisibleNow !== visible) {
        setVisible(isVisibleNow);
      }
  
      prevScrollPosRef.current = currentScrollPos;
    }, [isScrolled, visible, setIsScrolled, setVisible]);
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
  
    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [setIsMenuOpen]);
  
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
        } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image src="/assets/images/logo.png" alt="ΚΘΠ Logo" width={50} height={50} />
              {/* <span className="text-xl md:text-2xl font-bold text-[#234c8b]">International</span> */}
            </div>
          </Link>
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <MemoizedButton variant="ghost">{item.label}</MemoizedButton>
              </Link>
            ))}
            <Link href="/company-portal">
              <MemoizedButton
                variant="default"
                className="bg-[#234c8b] text-white hover:bg-[#458eff]"
              >
                Company Portal
              </MemoizedButton>
            </Link>
          </nav>
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#234c8b]" />
            ) : (
              <Menu className="h-6 w-6 text-[#234c8b]" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4">
            <nav className="flex flex-col items-center space-y-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <MemoizedButton variant="ghost" className="w-full">
                    {item.label}
                  </MemoizedButton>
                </Link>
              ))}
              <Link href="/company-portal">
                <MemoizedButton
                  variant="default"
                  className="w-full bg-[#234c8b] text-white hover:bg-[#458eff]"
                >
                  Company Portal
                </MemoizedButton>
              </Link>
            </nav>
          </div>
        )}
      </header>
    );
  });
  
  Header.displayName = 'Header';

  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { env } from '@/env.mjs';

/**
 * Generates a welcome email template for new newsletter subscribers
 * @function NewsletterWelcomeEmail
 * @returns {JSX.Element} A React Email component structure
 * @example
 * <NewsletterWelcomeEmail />
 */
export function NewsletterWelcomeEmail(): JSX.Element {
  /** Preview text shown in email clients */
  const previewText = 'Hello and welcome to SaaSy Land!';

  return (
    <Html>
      <Head>
        <title>SaaSy Land Newsletter</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-zinc-950">
                SaaSy Land
              </Heading>
              <Hr className="my-4" />
              <Heading className="text-center text-3xl font-semibold text-zinc-800">
                Welcome to SaaSy Land!
              </Heading>
              <Text className="mb-0 mt-6 text-center text-base">
                {`We're`} so glad {`you're`} here. {`We're`} excited to share our passion for online
                startups with you.
              </Text>
              <Text className="m-0 text-center text-base">
                {`We'll`} be sending you a newsletter every month.
              </Text>
            </Section>

            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                {`We're`} looking forward to seeing you around! If you have any questions, please{' '}
                {`don't`} hesitate to reach out to us at{' '}
                <Link
                  href={`mailto:${process.env.RESEND_EMAIL_FROM}`}
                  className="text-blue-500 underline"
                >
                  {process.env.RESEND_EMAIL_FROM}
                </Link>
              </Text>
              <Text className="mb-0 mt-4">@ SaaSyLand.com {new Date().getFullYear()}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
