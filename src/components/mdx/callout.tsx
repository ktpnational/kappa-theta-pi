import type * as React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * Props interface for the Callout component.
 * @interface CalloutProps
 * @extends {React.PropsWithChildren}
 */
interface CalloutProps extends React.PropsWithChildren {
  /**
   * Optional icon to display at the start of the callout.
   * Typically an emoji or icon character.
   */
  icon?: string;
  /**
   * Optional title text to display at the top of the callout.
   */
  title?: string;
}

/**
 * A callout component that displays content in an alert-style box with optional icon and title.
 *
 * @component
 * @example
 * ```tsx
 * <Callout
 *   icon="💡"
 *   title="Pro tip"
 * >
 *   Here's some helpful information in a callout box.
 * </Callout>
 * ```
 *
 * @param {Object} props - Component props
 * @param {string} [props.title] - Optional title text displayed at the top of the callout
 * @param {React.ReactNode} props.children - The content to display in the callout body
 * @param {string} [props.icon] - Optional icon character displayed at the start
 * @returns {JSX.Element} A styled alert component containing the icon, title and content
 */
export function Callout({ title, children, icon, ...props }: CalloutProps): JSX.Element {
  return (
    <Alert {...props}>
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
