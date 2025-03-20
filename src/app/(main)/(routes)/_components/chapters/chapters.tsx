'use client';

import { GoogleMaps } from '@/components';
import type { ChapterProps } from '@/constants';
import { slugify } from '@/utils';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ChaptersProps {
  chapters: ChapterProps[];
}

export const Chapters: React.FC<ChaptersProps> = React.memo(({ chapters }) => {
  const cards = React.useMemo(
    () =>
      chapters.map((chapter) => ({
        title: chapter.school,
        subtitle: `Greek Letter: ${chapter.greekLetter}`,
        src: `/assets/images/college-logos/${slugify(chapter.school)}.webp`,
        link: `mailto:${chapter.email}`,
        linkText: 'Contact Chapter',
        imageAlt: `${chapter.school} logo`,
        lqip: chapter.lqip,
      })),
    [chapters],
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EEF3FF] to-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          className="space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <header className="text-center space-y-4">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-[#234b8b]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Chapters
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover our network of chapters across prestigious universities
            </motion.p>
          </header>

          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {cards
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((card, index) => (
                <motion.article
                  key={card.title}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="aspect-square relative h-full">
                    <picture className="h-full w-full p-8 flex items-center justify-center bg-gray-50">
                      <Image
                        src={card.src}
                        alt={card.imageAlt}
                        width={300}
                        height={300}
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                        loading={index < 6 ? 'eager' : 'lazy'}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="empty"
                      />
                      <source srcSet={card.src} type="image/webp" />
                    </picture>
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#234b8b] via-[#234b8b]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end items-start text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <h2 className="text-xl font-bold mb-1">{card.title}</h2>
                      <p className="text-sm text-white/90 mb-4">{card.subtitle}</p>
                      <Link
                        href={card.link}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-white text-[#234b8b] rounded-lg transition-all duration-200 hover:bg-gray-100 hover:scale-105 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#234b8b] focus:outline-none"
                      >
                        {card.linkText}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
          </motion.section>

          <section className="space-y-8" aria-labelledby="map-heading">
            <h2 id="map-heading" className="text-3xl font-bold text-center text-[#234b8b]">
              Our Chapters Map
            </h2>
            <GoogleMaps />
         </section>
        </motion.div>
      </div>
    </main>
  );
});

Chapters.displayName = 'Chapters';
