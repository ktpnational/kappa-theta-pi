import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

export const metadata = constructMetadata({ title: 'Unauthorized' });

const UnauthorizedError = dynamic(
  () => import('@/app/_client').then((mod) => mod.UnauthorizedError),
  {
    ssr: true,
  },
);

const Unauthorized = (): React.JSX.Element => {
  return <UnauthorizedError />;
};

Unauthorized.displayName = 'Unauthorized';
export default Unauthorized;
