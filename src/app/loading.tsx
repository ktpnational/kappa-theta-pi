import { Loader } from '@/components';
import { constructMetadata } from '@/utils';

export const metadata = constructMetadata({
  title: 'Loading...',
  description: 'Loading...',
});

const Loading = () => {
  return (
    <>
      <Loader />
    </>
  );
};

export default Loading;
