'use client';

import { Loader } from '@/components';
import { memo } from 'react';

/**
 * Loading component that displays during page/component transitions
 * @component Loading
 * @returns {JSX.Element} A wrapper component containing the Loader component
 * @example
 * return (
 *   <Loading />
 * )
 */
const Loading = memo(() => {
  return (
    <>
      <Loader />
    </>
  );
});

export default Loading;
