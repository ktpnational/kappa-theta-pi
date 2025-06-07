import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({
  title: 'Loading...',
  description: 'Loading...',
});

const Loader = dynamic(() => import('@/components').then((mod) => mod.Loader), {
  ssr: true,
});

/**
 * Loading component that displays during page/component transitions
 * @component Loading
 * @returns {React.JSX.Element} A wrapper component containing the Loader component
 * @example
 * return (
 *   <Loading />
 * )
 */
const Loading = () => <Loader />;

Loading.displayName = 'Loading';
export default Loading;
