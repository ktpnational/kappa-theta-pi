'use client';

import { FormError } from '@/components/form-error';
import { useCurrentRole } from '@/hooks/use-current-role';
import type { Role } from '@prisma/client';

/**
 * Interface defining the props accepted by the RoleGate component
 * @interface RoleGateProps
 * @property {React.ReactNode} children - Child elements/components to be rendered if role check passes
 * @property {Role} allowedRole - The role required to view the gated content
 */
interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

/**
 * A component that gates content based on user role permissions
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered if role check passes
 * @param {Role} props.allowedRole - The role required to view the content
 *
 * @returns {JSX.Element} Either the children content if role matches, or an error message if access denied
 *
 * @example
 * ```tsx
 * <RoleGate allowedRole="ADMIN">
 *   <AdminDashboard />
 * </RoleGate>
 * ```
 */
export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message="You do not have permission to view this content!" />;
  }
  return <>{children}</>;
};
