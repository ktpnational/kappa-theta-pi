import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';
import React from 'react';

const ContactSection = dynamic(() => import('../_components').then((mod) => mod.ContactSection));

export const metadata = constructMetadata({ title: 'Contact' });

const ContactPage = () => {
  return <ContactSection />;
};

ContactPage.displayName = 'ContactPage';
export default ContactPage;
