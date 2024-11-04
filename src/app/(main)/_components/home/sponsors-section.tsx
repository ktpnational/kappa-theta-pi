'use client';

import { Slider } from '@/components';
import Image from 'next/image';
import React from 'react';

// Dummy sponsor data with local images
const dummySponsors = [
  { name: 'Sponsor 1', logo: '/assets/images/logo.png' },
  { name: 'Sponsor 2', logo: '/assets/images/logo.png' },
  { name: 'Sponsor 3', logo: '/assets/images/logo.png' },
  { name: 'Sponsor 4', logo: '/assets/images/logo.png' },
  { name: 'Sponsor 5', logo: '/assets/images/logo.png' },
  { name: 'Sponsor 6', logo: '/assets/images/logo.png' },
] as const;

export const SponsorsSection = () => {
  const sliderProps = {
    width: '200px',
    duration: 30,
    pauseOnHover: true,
    blurBorders: true,
    blurBorderColor: '#f0f4f8',
  };

  return (
    <Slider {...sliderProps} toRight={true}>
      {dummySponsors.map((sponsor, index) => (
        <Slider.Slide key={`${sponsor.name}-${index}`}>
          <div className="mx-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-20 w-[160px] relative">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              fill
              style={{ objectFit: 'contain' }}
              className="p-2"
              priority={index < 2}
            />
          </div>
        </Slider.Slide>
      ))}
    </Slider>
  );
};

SponsorsSection.displayName = 'SponsorsSection';
