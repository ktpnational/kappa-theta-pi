'use client';

import { Slider } from '@/components';
import { companyLogos } from '@/constants';
import Image from 'next/image';
import React, { useState } from 'react';

export const SponsorsSection = () => {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const sliderProps = {
    width: '200px',
    duration: 30,
    pauseOnHover: true,
    blurBorders: true,
    blurBorderColor: '#f0f4f8',
  };

  const handleImageError = (src: string) => {
    setImageError((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <Slider {...sliderProps} toRight={true}>
      {companyLogos.map((logo, index) => (
        <Slider.Slide key={`${logo.alt}-${index}`}>
          <div className="mx-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-20 w-[160px] relative">
            {!imageError[logo.src] ? (
              <Image
                src={'/assets/images/logo.png'}
                alt={logo.alt}
                fill
                style={{ objectFit: 'contain' }}
                className="p-2"
                onError={() => handleImageError(logo.src)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                {logo.alt}
              </div>
            )}
          </div>
        </Slider.Slide>
      ))}
    </Slider>
  );
};

SponsorsSection.displayName = 'SponsorsSection';
