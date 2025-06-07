import { boardMembers, inauguralBoardMember } from '@/constants';
import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';
import React from 'react';

export const metadata = constructMetadata({
  title: 'Board',
  description: 'The national board of Kappa Theta Pi',
});

const Board = dynamic(
  () => import('@/app/(main)/(routes)/_components/about/board/board').then((mod) => mod.Board),
  {
    ssr: true,
  },
);

const AboutBoardPage = async () => {
  return <Board boardMembers={boardMembers} inauguralBoardMember={inauguralBoardMember} />;
};

AboutBoardPage.displayName = 'AboutBoardPage';
export default AboutBoardPage;
