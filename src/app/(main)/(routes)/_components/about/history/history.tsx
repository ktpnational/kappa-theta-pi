'use client';

import { motion } from 'motion/react';
import type React from 'react';
import { memo } from 'react';

const History: React.FC = memo((): React.JSX.Element => {
  return (
    <section className="min-h-screen bg-[#f7fdfd] px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-[#234b8b] mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>
        <motion.div
          className="bg-white shadow-lg rounded-lg p-8 border border-[#479dff]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[#234b8b] mb-6">A Message from the President</h2>
          <div className="space-y-6 text-gray-600">
            <p className="leading-relaxed">
              Hi, my name is <span className="text-[#479dff] font-semibold">Zoey Lee</span>, and I'm
              honored to serve as the inaugural President of the KTP National Organization. It's a
              privilege to work alongside a dedicated team of board members— Tommy, Anjali, Nate,
              Kairavi, and Beatriz—each a leader and pillar within their respective local chapters.
            </p>
            <p className="leading-relaxed">
              As KTP grew, several local leaders recognized the need for an overarching body to
              guide new chapter development and strengthen the bonds between existing chapters. From
              this realization, the KTP National Organization was born.
            </p>
            <h3 className="text-xl font-bold text-[#234b8b] mt-8 mb-4">
              In Our Inaugural Year, Our Goals Include:
            </h3>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li>Upholding the five KTP pillars in every local chapter.</li>
              <li>Developing a community platform to foster inter-chapter communication.</li>
              <li>
                Building a comprehensive KTP National Organization website to share our mission,
                highlight our chapters, facilitate new chapter inquiries, and feature our sponsors.
              </li>
              <li>Updating the KTP National Constitution to better support our mission.</li>
              <li>Appointing a board of directors aligned with KTP's values.</li>
            </ul>
            <p className="leading-relaxed">
              By striving toward these objectives, we will create a strong foundation for KTP's
              future endeavors and ensure that our community continues to thrive. With over 30+
              chapters and growing, the future of KTP is bright. I look forward to seeing everything
              we accomplish together!
            </p>
            <div className="mt-8 space-y-1">
              <p className="font-semibold text-[#234b8b]">Best,</p>
              <p className="font-semibold text-[#234b8b]">Zoey Lee</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

History.displayName = 'History';
export { History };
