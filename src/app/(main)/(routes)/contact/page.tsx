import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';

const Contact = dynamic(
  () => import('@/app/(main)/(routes)/_components/contact/contact').then((mod) => mod.Contact),
  {
    ssr: true,
  },
);

export const metadata = constructMetadata({
  title: 'Contact',
  description: 'Contact',
});

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;
