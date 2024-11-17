import { Loader } from '@/components';
import { constructMetadata } from '@/utils';

/**
 * Metadata object for the loading page using constructMetadata utility
 * @constant {Object} metadata
 * @property {string} title - Page title showing loading state
 * @property {string} description - Page description showing loading state
 */
export const metadata = constructMetadata({
  title: 'Loading...',
  description: 'Loading...',
});

/**
 * Loading component that displays during page/component transitions
 * @component Loading
 * @returns {JSX.Element} A wrapper component containing the Loader component
 * @example
 * return (
 *   <Loading />
 * )
 */
const Loading = () => {
  return (
    <>
      <Loader />
    </>
  );
};

export default Loading;
