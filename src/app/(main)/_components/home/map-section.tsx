'use client';

import React from 'react';

export const MapSection = () => {
  return (
    <section className="mb-16 md:mb-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#234c8b]">Our Chapters</h2>
      <div className="w-full h-96 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
        <p className="text-gray-600">
          Interactive map will be implemented here using Google Maps from visgl
        </p>
      </div>
      <div className="mt-4 flex justify-center space-x-8">
        <span className="flex items-center">
          <span className="inline-block w-4 h-4 bg-black mr-2 rounded-full"></span>Active Chapters
        </span>
        <span className="flex items-center">
          <span className="inline-block w-4 h-4 bg-green-500 mr-2 rounded-full"></span>Colonies
        </span>
      </div>
    </section>
  );
};

MapSection.displayName = 'MapSection';
