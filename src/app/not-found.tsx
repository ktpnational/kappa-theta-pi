import { NotFound } from '@/components';
import { constructMetadata } from '@/utils';

export const metadata = constructMetadata({
  title: '404',
  description: 'This page does not exist',
});

const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;
