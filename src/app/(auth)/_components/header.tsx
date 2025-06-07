'use client';

import { cn } from '@/lib/utils';

/**
 * Props interface for the Header component
 * @interface HeaderProps
 * @property {string} label - The text to be displayed below the header title
 */
interface HeaderProps {
  label: string;
}

/**
 * Header component that displays a title and descriptive label
 * @component
 * @param {HeaderProps} props - Component props
 * @param {string} props.label - The text to be displayed below the header title
 * @returns {React.JSX.Element} A header section with a title and descriptive label
 * @example
 * // Basic usage
 * <Header label="Welcome back!" />
 *
 * // The component renders:
 * // - A "🔐 Auth" title
 * // - The provided label text below
 */
const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn('text-3xl font-semibold', '')}>🔐 Auth</h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export { Header };
