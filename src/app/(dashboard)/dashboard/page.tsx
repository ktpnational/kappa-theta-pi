import { currentRole } from '@/lib';
import { catchError } from '@/utils';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

const ForbiddenError = dynamic(() => import('@/app/_client').then((mod) => mod.ForbiddenError), {
  ssr: true,
});

/**
 * DashboardPage component - Main dashboard routing component that handles role-based redirection
 *
 * @component
 * @description
 * A server-side React component that manages dashboard access and routing based on user roles.
 * It performs the following:
 * 1. Retrieves the current user's role using the currentRole() function
 * 2. Handles any errors that occur during role retrieval
 * 3. Redirects authenticated users to their role-specific dashboard (e.g. /dashboard/admin, /dashboard/member)
 * 4. Shows a 404 page if no role is found
 *
 * @async
 * @throws {Error} Throws any errors encountered during role retrieval
 *
 * @example
 * // In app routing
 * import DashboardPage from './dashboard/page';
 *
 * // Route configuration
 * {
 *   path: '/dashboard',
 *   element: <DashboardPage />
 * }
 *
 * @example
 * // Role-based redirection examples:
 * // - Admin user -> redirects to /dashboard/admin
 * // - Member user -> redirects to /dashboard/member
 * // - No role -> shows 404 page
 *
 * @returns {Promise<React.JSX.Element>} A React fragment that handles redirection or 404 response
 * @since 1.0.0
 * @public
 *
 * @see {@link currentRole} For role retrieval implementation
 * @see {@link catchError} For error handling utility
 * @see {@link redirect} For Next.js redirection
 * @see {@link notFound} For Next.js 404 handling
 */
const DashboardPage = async () => {
  const res = await catchError(currentRole, []);
  if (res.success) {
    const role = res.value.toLowerCase();
    return <>{role ? redirect(`/dashboard/${role}`) : notFound()}</>;
  }
  return <ForbiddenError />;
};

DashboardPage.displayName = 'DashboardPage';
export default DashboardPage;
