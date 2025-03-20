import { redirect } from 'next/navigation';

const ResourcesPage = () => {
  redirect('/resources/members');
};

ResourcesPage.displayName = 'ResourcesPage';
export default ResourcesPage;
