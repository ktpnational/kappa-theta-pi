import { constructMetadata } from '@/utils';
import type React from 'react';

export const metadata = constructMetadata({
  title: 'Kappa Theta Pi | Chapters',
  description: 'Kappa Theta Pi | Chapters',
});

const ChaptersLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

ChaptersLayout.displayName = 'ChaptersLayout';
export default ChaptersLayout;
