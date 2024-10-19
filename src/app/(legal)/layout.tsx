import { Footer, Header } from '@/components';
import type React from 'react';

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-10rem)]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Legal</h1>
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
};

LegalLayout.displayName = 'LegalLayout';

export default LegalLayout;
