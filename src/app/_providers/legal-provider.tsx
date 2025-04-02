'use client';

import type React from 'react';

const LegalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

LegalProvider.displayName = 'LegalProvider';
export { LegalProvider };
