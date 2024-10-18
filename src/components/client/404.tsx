'use client';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const NotFound = React.memo(() => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#8bb9ff] to-[#88dddd] text-[#234c8b]">
      <AlertTriangle className="w-24 h-24 mb-4 text-[#458eff] animate-bounce" />
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#234c8b] text-white rounded-full hover:bg-[#458eff] transition-colors duration-300 flex items-center"
      >
        <span className="mr-2">Return Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
});

NotFound.displayName = 'NotFound';
