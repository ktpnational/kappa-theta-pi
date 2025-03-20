import { MainProvider } from '@/app/_providers';
import { Footer, Header } from '@/components';
import { JotaiProvider } from '@/providers';
import dynamic from 'next/dynamic';
import type React from 'react';

const HomeSections = dynamic(() =>
  import('@/app/(main)/_components').then((mod) => mod.HomeSections),
);

const Page = () => {
  // await new Promise((resolve) => setTimeout(resolve, 20000));
  return (
    <MainProvider>
      <JotaiProvider Component={Header} />
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16 mt-20 min-h-screen w-[100dvw]">
        <HomeSections />
      </section>
      <Footer />
    </MainProvider>
  );
};

Page.displayName = 'Page';
export default Page;
