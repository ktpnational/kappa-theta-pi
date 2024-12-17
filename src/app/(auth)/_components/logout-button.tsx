'use client';

import { logout } from '@/actions/logout';

/**
 * Props interface for the LogoutButton component
 * @interface LogoutButtonProps
 * @property {React.ReactNode} [children] - Optional child elements/content to render inside the button
 */
interface LogoutButtonProps {
  children?: React.ReactNode;
}

/**
 * A button component that handles user logout functionality
 * @component LogoutButton
 * @param {LogoutButtonProps} props - The component props
 * @param {React.ReactNode} props.children - Optional child elements to render
 * @returns {React.JSX.Element} A span element that triggers logout when clicked
 * @example
 * // Basic usage
 * <LogoutButton>Logout</LogoutButton>
 *
 * // With custom children
 * <LogoutButton>
 *   <Icon name="logout" />
 *   <span>Sign Out</span>
 * </LogoutButton>
 */
export const LogoutButton = ({ children }: LogoutButtonProps) => {
  /**
   * Handler function for click events
   * Calls the logout action to sign out the user
   * @function
   * @returns {void}
   */
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
