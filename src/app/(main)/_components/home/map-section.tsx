'use client';

import { GoogleMaps } from '@/components';
import { motion } from 'framer-motion';
import type React from 'react';

export const MapSection: React.FC = () => {
  return (
    <section className="mb-16 md:mb-24 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#234c8b]">Our Chapters</h2>
      <GoogleMaps />
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {['Active Chapters', 'Colonies', 'Inactive Chapters'].map((status, index) => (
          <motion.span
            key={status}
            className="flex items-center bg-white px-3 py-2 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className={`inline-block w-4 h-4 mr-2 rounded-full ${
                index === 0 ? 'bg-[#234c8b]' : index === 1 ? 'bg-[#8bb9ff]' : 'bg-gray-400'
              }`}
            ></span>
            {status}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

MapSection.displayName = 'MapSection';
