'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A customizable avatar component that displays a user's profile image or fallback content.
 * Built on top of Radix UI's Avatar primitive.
 *
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the avatar
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 * @returns {JSX.Element} The Avatar component
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/profile.jpg" alt="User profile" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * The image component of the Avatar. Displays the actual profile picture.
 * Falls back to AvatarFallback when image fails to load.
 *
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the image
 * @param {string} props.src - The source URL of the profile image
 * @param {string} props.alt - Alt text for the image
 * @param {React.Ref<HTMLImageElement>} ref - Forwarded ref to the image element
 * @returns {JSX.Element} The AvatarImage component
 *
 * @example
 * ```tsx
 * <AvatarImage src="/profile.jpg" alt="User profile" />
 * ```
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * Fallback content displayed when the avatar image fails to load or is not provided.
 * Can contain text (like initials) or any other React elements.
 *
 * @component
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the fallback
 * @param {React.ReactNode} props.children - The fallback content to display
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the fallback element
 * @returns {JSX.Element} The AvatarFallback component
 *
 * @example
 * ```tsx
 * <AvatarFallback>JD</AvatarFallback>
 * ```
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
