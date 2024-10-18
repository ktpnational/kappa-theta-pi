'use client';

import { AnimatedCircularProgressBar } from '@/components';
import React from 'react';

export const Loader = React.memo(() => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#8bb9ff] to-[#88dddd]">
      <div className="relative">
        <AnimatedCircularProgressBar
          max={100}
          value={75}
          min={0}
          gaugePrimaryColor="#234c8b"
          gaugeSecondaryColor="#458eff"
          className="w-32 h-32"
        />
      </div>
      <p className="mt-4 text-lg font-semibold text-[#234c8b] animate-pulse">Loading...</p>
    </div>
  );
});

Loader.displayName = 'Loader';
