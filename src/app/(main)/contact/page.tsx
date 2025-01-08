import React from 'react';
import dynamic from 'next/dynamic';
import { constructMetadata } from '@/utils';

const ContactSection = dynamic(() => import('../_components').then((mod) => mod.ContactSection));

export const metadata = constructMetadata({ title: 'Contact' });

const ContactPage = () => {
  return <ContactSection />;
};

ContactPage.displayName = "ContactPage";
export default ContactPage;
