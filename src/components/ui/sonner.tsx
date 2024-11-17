'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

/**
 * Type definition for Toaster component props, extending all props from the Sonner Toaster component
 */
type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * A themed toast notification component that wraps Sonner's Toaster
 * 
 * @component
 * @param {ToasterProps} props - Props to be passed to the underlying Sonner Toaster component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Toaster />
 * 
 * // With custom props
 * <Toaster position="bottom-right" closeButton={true} />
 * ```
 * 
 * @remarks
 * This component uses next-themes for theme handling and applies consistent styling through
 * Tailwind CSS classes. It automatically adapts to the current theme (light/dark/system).
 * 
 * The component applies custom styling for:
 * - Toast container background and text
 * - Toast description text
 * - Action and cancel buttons
 * - Borders and shadows
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
