import { cn } from '@/lib';
import { LogoIcon, LogoSmallIcon } from './components';
import {
  AndroidIcon,
  AppleIcon,
  ArrowLeftIcon,
  AvatarIcon,
  CheckIcon,
  CoutKtp,
  PaperplaneIcon,
  Phone1,
  Phone2,
  Phone3,
  Phone4,
  PlaceholderIcon,
  SpinnerIcon,
} from './individual';
import type { SVGProps } from './types';

/**
 * Maps icon size prop values to corresponding Tailwind CSS classes for width and height.
 * This function provides consistent sizing across all icon components by mapping numeric
 * size values to Tailwind's width and height utility classes.
 *
 * @param {SVGProps['size']} size - The desired icon size value, corresponding to Tailwind's spacing scale
 * @returns {string} Tailwind CSS classes for width and height (e.g., 'w-4 h-4')
 * @default Returns 'w-4 h-4' if no size is provided
 *
 * @example
 * getSizeClasses('6') // returns 'w-6 h-6'
 * getSizeClasses() // returns 'w-4 h-4'
 */
const getSizeClasses = (size?: SVGProps['size']) => {
  const sizeMapping: Record<NonNullable<SVGProps['size']>, string> = {
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
 * A comprehensive collection of icon components organized by functional categories.
 * Each icon component accepts standard SVGProps for consistent styling and behavior.
 * Icons are grouped into logical categories like logos, navigation, user, etc.
 *
 * @namespace
 * @property {Object} logos - Collection of logo-related icons
 * @property {Object} navigation - Collection of navigation-related icons
 * @property {Object} user - Collection of user-related icons
 * @property {Object} communication - Collection of communication-related icons
 * @property {Object} miscellaneous - Collection of utility and general purpose icons
 * @property {Object} phones - Collection of phone-related icons
 */
export const Icons = {
  /**
   * Logo-related icons including company logos and platform-specific logos
   * @memberof Icons
   */
  logos: {
    /**
     * Renders a compact version of the logo icon
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Small logo icon component
     */
    small: ({ className, size, ...props }: SVGProps) => (
      <LogoSmallIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders the full/default version of the logo icon
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Default logo icon component
     */
    default: ({ className, size, ...props }: SVGProps) => (
      <LogoIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders the Apple platform logo
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Apple logo icon component
     */
    apple: ({ className, size, ...props }: SVGProps) => (
      <AppleIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders the Android platform logo
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Android logo icon component
     */
    android: ({ className, size, ...props }: SVGProps) => (
      <AndroidIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /**
   * Navigation-related icons for user interface navigation elements
   * @memberof Icons
   */
  navigation: {
    /**
     * Renders a left-pointing arrow icon for navigation/back actions
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Arrow left icon component
     */
    arrowLeft: ({ className, size, ...props }: SVGProps) => (
      <ArrowLeftIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /**
   * User-related icons for profile and user management features
   * @memberof Icons
   */
  user: {
    /**
     * Renders a user avatar placeholder icon
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Avatar icon component
     */
    avatar: ({ className, size, ...props }: SVGProps) => (
      <AvatarIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /**
   * Communication-related icons for messaging and interaction features
   * @memberof Icons
   */
  communication: {
    /**
     * Renders a paper airplane icon, commonly used for send/submit actions
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Paper plane icon component
     */
    paperplane: ({ className, size, ...props }: SVGProps) => (
      <PaperplaneIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /**
   * Miscellaneous utility icons for general purpose use
   * @memberof Icons
   */
  miscellaneous: {
    /**
     * Renders a generic placeholder icon for temporary or fallback use
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Placeholder icon component
     */
    placeholder: ({ className, size, ...props }: SVGProps) => (
      <PlaceholderIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders an animated spinner icon for loading states
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Spinner icon component for loading indicators
     */
    spinner: ({ className, size, ...props }: SVGProps) => (
      <SpinnerIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders a checkmark icon for success/completion states
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Check icon component
     */
    check: ({ className, size, ...props }: SVGProps) => (
      <CheckIcon className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders a KTP (Indonesian ID card) icon
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} KTP icon component
     */
    coutKtp: ({ className, size, ...props }: SVGProps) => (
      <CoutKtp className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
  /**
   * Collection of phone-related icons for different device representations
   * @memberof Icons
   */
  phones: {
    /**
     * Renders the first phone device icon variant
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Phone variant 1 icon component
     */
    phone1: ({ className, size, ...props }: SVGProps) => (
      <Phone1 className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders the second phone device icon variant
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Phone variant 2 icon component
     */
    phone2: ({ className, size, ...props }: SVGProps) => (
      <Phone2 className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders the third phone device icon variant
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Phone variant 3 icon component
     */
    phone3: ({ className, size, ...props }: SVGProps) => (
      <Phone3 className={cn(getSizeClasses(size), className)} {...props} />
    ),
    /**
     * Renders the fourth phone device icon variant
     * @param {SVGProps} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {JSX.Element} Phone variant 4 icon component
     */
    phone4: ({ className, size, ...props }: SVGProps) => (
      <Phone4 className={cn(getSizeClasses(size), className)} {...props} />
    ),
  },
};
