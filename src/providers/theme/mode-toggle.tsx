'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * A component that provides a button to toggle between light and dark themes.
 *
 * The component uses the `next-themes` library to manage theme state and provides
 * a tooltip-wrapped button with sun/moon icons that toggle based on the current theme.
 *
 * @component
 * @example
 * ```tsx
 * <ModeToggle />
 * ```
 *
 * @returns {JSX.Element} A button component with theme toggling functionality
 *
 * @remarks
 * The component renders different icons based on the current theme:
 * - Sun icon is visible in light mode
 * - Moon icon is visible in dark mode
 *
 * @dependencies
 * - @radix-ui/react-icons - For theme icons
 * - next-themes - For theme management
 * - @/components/ui/button - For base button component
 * - @/components/ui/tooltip - For tooltip functionality
 *
 * @accessibility
 * - Uses semantic button element
 * - Includes tooltip for better UX
 * - Supports keyboard navigation
 */
export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            size="icon"
            className="px-2"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
            <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
