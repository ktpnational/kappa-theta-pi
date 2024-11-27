'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Interface defining the props for the BackButton component
 * @interface BackButtonProps
 * @property {string} href - The URL destination that the button will link to
 * @property {string} label - The text content that will be displayed on the button
 */
interface BackButtonProps {
  href: Parameters<typeof Link>[0]['href'];
  label: string;
}

/**
 * A reusable back button component that combines Next.js Link with a styled button
 * @component
 * @param {BackButtonProps} props - The component props
 * @param {string} props.href - The URL destination that the button will link to
 * @param {string} props.label - The text content that will be displayed on the button
 * @returns {JSX.Element} A button wrapped in a Next.js Link component with the specified styling
 *
 * @example
 * ```tsx
 * <BackButton
 *   href="/previous-page"
 *   label="Go Back"
 * />
 * ```
 */
const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export { BackButton };
