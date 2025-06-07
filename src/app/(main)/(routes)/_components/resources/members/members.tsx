'use client';

import { memo } from 'react';

const Members: React.FC = memo((): React.JSX.Element => {
  return (
    <div>
      <h1>Members</h1>
    </div>
  );
});

Members.displayName = 'Members';
export { Members };
