import { currentRole } from '@/lib';
import { catchError } from '@/utils';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

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
 * @returns {Promise<void>} Redirects user or shows a 404 page
 */
const DashboardPage = async () => {
  const res = await catchError(() => currentRole()); // ✅ Call currentRole() inside catchError
  if (res.success) {
    const role = res.value;
    if (role) {
      redirect(`/dashboard/${role}`); // ✅ No need for JSX, call redirect directly
    } else {
      notFound(); // ✅ No need for JSX, call notFound directly
    }
  }
  throw res.error; // ✅ Properly handle and throw errors
};

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;
