'use client';

import React from 'react';

export const FoundersDay = () => {
  return (
    <div className="min-h-screen text-navy-blue py-12 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center text-navy-blue mb-6">
        🎉 Founders Day Event Winners! 🎉
      </h1>

      <div className="p-8 bg-[#DBEAFE] rounded-lg shadow-md text-center w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">
          Congratulations to our Winners!
        </h2>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-900">🥇 First Place: KTP Time Capsule</h3>
          <p className="text-lg text-blue-700">Chapter: Alpha, University of Michigan</p>
          <p className="mt-2 text-blue-800">
            The KTP Time Capsule App is a fun, engaging way to preserve fraternity memories through
            digital time capsules tailored to KTP events and traditions. Features include a public
            gallery, messaging with future delivery, and tailored notifications. Future updates will
            enhance alumni engagement and profile customization.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-900">🥈 Second Place: KTP Galactic Glide</h3>
          <p className="text-lg text-blue-700">Chapter: Nu, University of Colorado Boulder</p>
          <p className="mt-2 text-blue-800">
            An interactive webpage where users pilot a spaceship to explore photos from Nu Chapter's
            history. This interactive experience will grow as the chapter's history expands.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-900">
            🥉 Third Place: Founder's Day Project
          </h3>
          <p className="text-lg text-blue-700">Chapter: Iota, University of Texas at Austin</p>
          <p className="mt-2 text-blue-800">
            A dedicated tab on the chapter website that serves as a digital memory lane, allowing
            users to explore different pledge classes and their shared history.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-blue-900">🏅 Honorary Mention: ThirdTry</h3>
          <p className="text-lg text-blue-700">
            Chapter: Alpha Alpha, University of Central Arkansas
          </p>
          <p className="mt-2 text-blue-800">
            An engaging image quiz challenging members to match project visuals with descriptions,
            adding an interactive and educational twist to the digital archives.
          </p>
        </div>
      </div>
    </div>
  );
};

FoundersDay.displayName = 'FoundersDay';
export default FoundersDay;
