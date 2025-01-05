import { Footer, Header } from '@/components';
import { JotaiProvider } from '@/providers';
import type React from 'react';
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <JotaiProvider Component={Header} />
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16 mt-20 min-h-screen w-[100dvw]">
        {children}
      </section>
      <Footer />
    </>
  );
};

HomeLayout.displayName = 'HomeLayout';

export default HomeLayout;
