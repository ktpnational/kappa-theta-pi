import { constructMetadata } from '@/utils';
import type React from 'react';

export const metadata = constructMetadata({
  title: 'About',
  description: 'About KTP',
});

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

AboutLayout.displayName = 'AboutLayout';
export default AboutLayout;
