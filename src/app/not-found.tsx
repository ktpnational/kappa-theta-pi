'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-[#242424] text-white overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="loader" />
          <Image
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none w-60 h-60 animate-pulse"
            src="/assets/svgs/logo-client.svg"
            alt="404 Not Found"
            width={240}
            height={240}
            priority
          />
        </div>
        <h1 className="mt-8 text-4xl font-bold text-purple-300">404 - Not Found</h1>
        <p className="mt-4 text-xl text-purple-200">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href={'/'}>
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
