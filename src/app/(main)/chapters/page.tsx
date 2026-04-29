'use client';

import { GoogleMaps } from '@/components';
import React from 'react';

const chapters = [
  {
    school: 'University of Michigan',
    greekLetter: 'Alpha',
    email: 'ktp-board@umich.edu',
    website: 'https://ktpmichigan.com'
  },
  {
    school: 'University of Pittsburgh',
    greekLetter: 'Beta',
    email: 'upittkappathetapi@gmail.com',
    website: 'https://experience.pitt.edu/ktp/home/'
  },
  {
    school: 'Rose-Hulman Institute of Technology',
    greekLetter: 'Gamma',
    email: 'veep.ktp.rose@gmail.com',
    website: ''
  },
  {
    school: 'Syracuse University',
    greekLetter: 'Delta',
    email: 'ktpsyracuse@gmail.com',
    website: 'https://www.ktpcuse.com'
  },
  {
    school: 'University of Maryland',
    greekLetter: 'Epsilon',
    email: 'Kappa Theta Pi',
    website: 'https://www.ktpumd.com'
  },
  {
    school: 'The College of New Jersey',
    greekLetter: 'Zeta',
    email: 'ktp@tcnj.edu',
    website: ''
  },
  {
    school: 'University of North Carolina at Chapel Hill',
    greekLetter: 'Eta',
    email: 'markmaio@ad.unc.edu',
    website: 'https://www.ktpunc.com'
  },
  {
    school: 'University of Chicago',
    greekLetter: 'Theta',
    email: 'uchicagoktp@gmail.com',
    website: 'https://uchicagoktp.com'
  },
  {
    school: 'University of Texas at Austin',
    greekLetter: 'Iota',
    email: 'texaskappathetapi@gmail.com',
    website: 'https://texasktp.com'
  },
  {
    school: 'Northwestern University',
    greekLetter: 'Kappa',
    email: 'ktpnorthwestern@gmail.com',
    website: 'https://www.ktpnu.com'
  },
  {
    school: 'Boston University',
    greekLetter: 'Lambda',
    email: 'ktpbostonu@gmail.com',
    website: 'https://www.ktp-bostonu.com',
  },
  {
    school: 'University of Texas at Dallas',
    greekLetter: 'Mu',
    email: 'kappathetapiutd@gmail.com',
    website: 'https://www.utdktp.org'
  },
  {
    school: 'University of Colorado Boulder',
    greekLetter: 'Nu',
    email: 'ktp@colorado.edu',
    website: 'https://www.ktpboulder.com',
  },
  {
    school: 'Vanderbilt University',
    greekLetter: 'Rho',
    email: 'ktp@vanderbilt.edu',
    website: 'https://ktpvandy.org/',
  },
  {
    school: 'University of Miami',
    greekLetter: 'Sigma',
    email: 'ktp@miami.edu',
    website: 'https://www.ktpmiami.com',
  },
  {
    school: 'University of Southern California',
    greekLetter: 'Tau',
    email: 'ktpusc@usc.edu',
    website: 'https://www.ktpusc.com',
  },
  {
    school: 'Lewis University',
    greekLetter: 'Upsilon',
    email: 'nlange2021@gmail.com',
    website: ''
  },
  {
    school: 'University of Georgia',
    greekLetter: 'Phi',
    email: 'uga.ktp@gmail.com',
    website: 'https://ktpgeorgia.com',
  },
  {
    school: 'Nova Southeastern University',
    greekLetter: 'Chi',
    email: 'kappathetapi@clubs.nova.edu',
    website: '',
  },
  {
    school: 'Cameron University',
    greekLetter: 'Psi',
    email: 'ktp.cameron@gmail.com',
    website: '',
  },
  {
    school: 'Northeastern University',
    greekLetter: 'Omega',
    email: 'ktp.northeastern@gmail.com',
    website: 'https://www.ktpneu.org',
  },
  {
    school: 'University of Central Arkansas',
    greekLetter: 'Alpha Alpha',
    email: 'ktpuca@gmail.com',
    website: '',
  },
  {
    school: 'New Brunswick',
    greekLetter: 'Alpha Beta',
    email: 'ktpnewbrunswick@gmail.com',
    website: 'https://www.ktpnewbrunswick.org',
  },
  {
    school: 'Virginia Polytechnic and State University',
    greekLetter: 'Alpha Gamma',
    email: 'ktpatvt@gmail.com',
    website: 'https://ktpvt.com',
  },
  {
    school: 'Ohio State University',
    greekLetter: 'Alpha Delta',
    email: 'osuktp@gmail.com',
    website: 'https://linktr.ee/ktposu',
  },
  {
    school: 'Cornell University',
    greekLetter: 'Alpha Epsilon',
    email: 'ktpcornell@gmail.com',
    website: 'https://ktpcornell.com',
  },
  {
    school: 'University of Virginia',
    greekLetter: 'Alpha Zeta',
    email: 'uvaktp@gmail.com',
    website: '',
  },
  {
    school: 'Indiana University',
    greekLetter: 'Alpha Eta',
    email: 'ktpindiana@gmail.com',
    website: 'https://www.ktpiu.com',
  }
];

const ChaptersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-10">Chapters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {chapters.map((chapter, index) => {
          const cardClass =
            'bg-white shadow-md rounded-lg p-6 hover:shadow-lg transform transition-transform hover:scale-105 text-center';

          const cardContent = (
            <>
              <img
                src={`/assets/college-logos/${chapter.school
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w-]/g, '')}.webp`}
                alt={`${chapter.school} logo`}
                className="mx-auto mb-4 h-20 w-20 object-contain"
              />
              <h2 className="text-xl font-semibold text-navy-blue mb-2">{chapter.school}</h2>
              <p className="text-sm text-gray-500">
                Greek Letter: <span className="font-medium">{chapter.greekLetter}</span>
              </p>
              <a
                href={`mailto:${chapter.email}`}
                className="text-sm text-medium-blue underline hover:text-light-blue mt-2 block"
                onClick={(e) => e.stopPropagation()}
              >
                Contact Chapter
              </a>
            </>
          );

          return chapter.website ? (
            <a
              key={index}
              href={chapter.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} block`}
            >
              {cardContent}
            </a>
          ) : (
            <div key={index} className={cardClass}>
              {cardContent}
            </div>
          );
        })}
      </div>
      <section className="mb-16 md:mb-24 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#234c8b]">Our Chapters Map</h2>
        <GoogleMaps />
      </section>
    </div>
  );
};

ChaptersPage.displayName = 'ChaptersPage';
export default ChaptersPage;
