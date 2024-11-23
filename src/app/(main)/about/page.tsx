import { redirect } from 'next/navigation';

const AboutPage = () => {
  redirect('/about/board');
};

AboutPage.displayName = 'AboutPage';
export default AboutPage;
