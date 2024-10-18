'use client';

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrolled(currentScrollPos > 0);
      setVisible(
        (prevScrollPos > currentScrollPos && currentScrollPos > 0) || currentScrollPos < 10,
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'} ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/assets/images/logo.png" alt="ΚΘΠ Logo" width={50} height={50} />
          <span className="text-xl md:text-2xl font-bold text-[#234c8b]">Kappa Theta Pi</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="/about">
            <Button variant="ghost">About Us</Button>
          </Link>
          <Link href="/chapters">
            <Button variant="ghost">Chapters</Button>
          </Link>
          <Link href="/join">
            <Button variant="ghost">Join Us</Button>
          </Link>
          <Link href="/blog">
            <Button variant="ghost">Blog</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Contact Us</Button>
          </Link>
          <Link href="/company-portal">
            <Button variant="default" className="bg-[#234c8b] text-white hover:bg-[#458eff]">
              Company Portal
            </Button>
          </Link>
        </nav>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? (
            <X className="h-6 w-6 text-[#234c8b]" />
          ) : (
            <Menu className="h-6 w-6 text-[#234c8b]" />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col items-center space-y-4">
            <Link href="/about">
              <Button variant="ghost" className="w-full">
                About Us
              </Button>
            </Link>
            <Link href="/chapters">
              <Button variant="ghost" className="w-full">
                Chapters
              </Button>
            </Link>
            <Link href="/join">
              <Button variant="ghost" className="w-full">
                Join Us
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost" className="w-full">
                Blog
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="w-full">
                Contact Us
              </Button>
            </Link>
            <Link href="/company-portal">
              <Button
                variant="default"
                className="w-full bg-[#234c8b] text-white hover:bg-[#458eff]"
              >
                Company Portal
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
