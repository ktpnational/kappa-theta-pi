'use client';

import { ExitIcon } from '@radix-ui/react-icons';
import { FaUser } from 'react-icons/fa';

import { useCurrentUser } from '@/hooks/use-current-user';

import { LogoutButton } from '@/app/(auth)/_components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * UserButton component that displays a user avatar with dropdown menu functionality
 *
 * @component
 * @description
 * This component renders a clickable user avatar that opens a dropdown menu with user-related actions.
 * It displays the user's profile image if available, or falls back to a generic user icon.
 * The dropdown menu currently contains a logout option.
 *
 * @example
 * ```jsx
 * <UserButton />
 * ```
 *
 * @returns {JSX.Element} A dropdown menu component containing a user avatar and logout option
 *
 * @dependencies
 * - useCurrentUser hook for accessing the current user's data
 * - Radix UI components for dropdown menu functionality
 * - React Icons for fallback user icon
 *
 * @features
 * - Displays user profile image when available
 * - Provides fallback avatar with generic user icon
 * - Includes dropdown menu with logout functionality
 * - Fully accessible dropdown menu implementation
 */
export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="bg-neutral-700 text-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
