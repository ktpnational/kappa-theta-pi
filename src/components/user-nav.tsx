'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

/**
 * Props for the UserNav component
 * @interface UserNavProps
 * @property {User} user - The authenticated user object from NextAuth containing user details
 */
interface UserNavProps {
  user: User;
}

/**
 * User navigation dropdown component that displays user information and navigation options
 *
 * @component
 * @param {UserNavProps} props - Component props
 * @param {User} props.user - The authenticated user object
 *
 * @description
 * This component renders a dropdown menu triggered by the user's avatar. It displays:
 * - User's avatar image with fallback to initials
 * - User's name and email
 * - Navigation links to dashboard sections
 * - Logout option
 *
 * Features:
 * - Responsive avatar display with image fallback
 * - Accessible dropdown menu implementation
 * - Dynamic dashboard navigation links
 * - Integrated authentication signout
 *
 * @example
 * ```tsx
 * const user = {
 *   name: "John Doe",
 *   email: "john@example.com",
 *   image: "/avatar.jpg"
 * };
 *
 * return <UserNav user={user} />
 * ```
 */
export function UserNav({ user }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ''} alt={user.name || ''} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
