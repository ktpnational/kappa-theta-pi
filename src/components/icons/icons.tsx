import { cn } from '@/lib';
import { LogoIcon, LogoSmallIcon } from './components';
import {
  ArrowLeftIcon,
  AvatarIcon,
  PaperplaneIcon,
  PlaceholderIcon,
  SpinnerIcon,
} from './individual';
import type { IconProps } from './types';

/**
 * Maps icon size prop values to corresponding Tailwind CSS classes for width and height
 * @param {IconProps['size']} size - The desired icon size, matching available Tailwind sizes
 * @returns {string} The corresponding Tailwind CSS classes for the icon dimensions
 */
const getSizeClasses = (size?: IconProps['size']) => {
  const sizeMapping: Record<NonNullable<IconProps['size']>, string> = {
    '0': 'w-0 h-0',
    '1': 'w-1 h-1',
    '2': 'w-2 h-2',
    '3': 'w-3 h-3',
    '4': 'w-4 h-4',
    '5': 'w-5 h-5',
    '6': 'w-6 h-6',
    '7': 'w-7 h-7',
    '8': 'w-8 h-8',
    '9': 'w-9 h-9',
    '10': 'w-10 h-10',
    '11': 'w-11 h-11',
    '12': 'w-12 h-12',
    '14': 'w-14 h-14',
    '16': 'w-16 h-16',
    '20': 'w-20 h-20',
    '24': 'w-24 h-24',
    '28': 'w-28 h-28',
    '32': 'w-32 h-32',
    '36': 'w-36 h-36',
    '40': 'w-40 h-40',
    '44': 'w-44 h-44',
    '48': 'w-48 h-48',
    '52': 'w-52 h-52',
    '56': 'w-56 h-56',
    '60': 'w-60 h-60',
    '64': 'w-64 h-64',
    '72': 'w-72 h-72',
    '80': 'w-80 h-80',
    '96': 'w-96 h-96',
  };

  return size ? sizeMapping[size] : 'w-4 h-4';
};

/**
 * Collection of icon components organized by category
 * Each icon is a React component that accepts IconProps for customization
 * All icons support consistent sizing through the size prop and className for additional styling
 */
export const Icons = {
  /** Logo-related icons */
  logos: {
    /**
     * Small version of the logo icon
     * @param {IconProps} props - Icon properties including size and className
     * @returns {JSX.Element} Small logo icon component
     */
    small: ({ className, size, ...props }: IconProps) => (
      <LogoSmallIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Default/full version of the logo icon
     * @param {IconProps} props - Icon properties including size and className
     * @returns {JSX.Element} Default logo icon component
     */
    default: ({ className, size, ...props }: IconProps) => (
      <LogoIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /** Navigation-related icons */
  navigation: {
    /**
     * Left-pointing arrow icon for navigation
     * @param {IconProps} props - Icon properties including size and className
     * @returns {JSX.Element} Arrow left icon component
     */
    arrowLeft: ({ className, size, ...props }: IconProps) => (
      <ArrowLeftIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /** User-related icons */
  user: {
    /**
     * User avatar placeholder icon
     * @param {IconProps} props - Icon properties including size and className
     * @returns {JSX.Element} Avatar icon component
     */
    avatar: ({ className, size, ...props }: IconProps) => (
      <AvatarIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /** Communication-related icons */
  communication: {
    /**
     * Paper airplane icon, commonly used for send actions
     * @param {IconProps} props - Icon properties including size and className
     * @returns {JSX.Element} Paper plane icon component
     */
    paperplane: ({ className, size, ...props }: IconProps) => (
      <PaperplaneIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /** Miscellaneous utility icons */
  miscellaneous: {
    /**
     * Generic placeholder icon
     * @param {IconProps} props - Icon properties including size and className
     * @returns {JSX.Element} Placeholder icon component
     */
    placeholder: ({ className, size, ...props }: IconProps) => (
      <PlaceholderIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Animated spinner icon for loading states
     * @param {IconProps} props - Icon properties including size and className
     * @returns {JSX.Element} Spinner icon component
     */
    spinner: ({ className, size, ...props }: IconProps) => (
      <SpinnerIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
};
