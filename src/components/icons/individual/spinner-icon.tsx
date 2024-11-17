import { cn } from '@/lib';
import type { IconProps } from '../types';

export const SpinnerIcon: React.FC<IconProps> = ({ className, size, ...props }): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(`w-${size} h-${size}`, className)}
      role="img"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
