'use client';

import { Icons } from '@/components';
import type { BoardMemberProps, InauguralBoardMemberProps } from '@/constants';
import { Mail } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BoardProps {
  boardMembers: BoardMemberProps[];
  inauguralBoardMember: InauguralBoardMemberProps;
}

const Board: React.FC<BoardProps> = React.memo(({ boardMembers, inauguralBoardMember }) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#EEF3FF] to-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          className="space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-[#234b8b]">Meet Our E-Board</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The dedicated leaders driving our organization forward
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="aspect-3/4 relative">
                  <picture>
                    <Image
                      src={member.headshot}
                      alt={`${member.name}'s headshot`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="eager"
                      placeholder="blur"
                      blurDataURL={member.lqip}
                    />
                    <source srcSet={member.headshot} type="image/webp" />
                  </picture>
                  <motion.article
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent via-white/90 to-white"
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1], // Custom easing for smoother animation
                    }}
                  >
                    <div className="absolute inset-0 p-6 flex justify-between items-end">
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold text-[#234b8b] drop-shadow-xs">
                          {member.role}
                        </p>
                        <h2 className="text-lg font-bold text-gray-900 drop-shadow-xs">
                          {member.name}
                        </h2>
                        <p className="text-sm font-medium text-gray-700">{member.location}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`mailto:${member.email}`}
                          className="p-2 text-[#234b8b] hover:text-[#1a3866] bg-white/90 hover:bg-white rounded-lg transition-colors shadow-xs"
                        >
                          <Mail className="w-5 h-5" />
                          <span className="sr-only">Email {member.name}</span>
                        </Link>
                        {member.linkedin && (
                          <Link
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#234b8b] hover:text-[#1a3866] bg-white/90 hover:bg-white rounded-lg transition-colors shadow-xs"
                          >
                            <Icons.logos.linkedin className="w-5 h-5" />
                            <span className="sr-only">View {member.name}'s LinkedIn profile</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#234b8b]">
              Inaugural National Board
            </h2>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-linear-to-br from-[#234b8b] to-[#1a3866] shadow-lg rounded-xl p-8 text-center max-w-lg mx-auto border border-white/10"
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white mb-2">{inauguralBoardMember.name}</h3>
                <p className="text-lg text-white/90 font-medium">{inauguralBoardMember.role}</p>
                <p className="text-md text-white/70">{inauguralBoardMember.year}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

Board.displayName = 'Board';
export { Board };
