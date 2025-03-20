'use client';

import { memo } from 'react';

const Companies: React.FC = memo((): React.JSX.Element => {
  return (
    <div>
      <h1>Companies</h1>
    </div>
  );
});

Companies.displayName = 'Companies';
export { Companies };
