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
  PlaceholderIcon,
  SpinnerIcon,
} from './individual';

/**
 * Maps icon size prop values to corresponding Tailwind CSS classes for width and height.
 * This function provides consistent sizing across all icon components by mapping numeric
 * size values to Tailwind's width and height utility classes.
 *
 * @param {SVGProps<SVGSVGElement>['size']} size - The desired icon size value, corresponding to Tailwind's spacing scale
 * @returns {string} Tailwind CSS classes for width and height (e.g., 'w-4 h-4')
 * @default Returns 'w-4 h-4' if no size is provided
 *
 * @example
 * getSizeClasses('6') // returns 'w-6 h-6'
 * getSizeClasses() // returns 'w-4 h-4'
 */
const getSizeClasses = (size?: SVGProps<SVGSVGElement>['size']) => {
  const sizeMapping: Record<NonNullable<SVGProps<SVGSVGElement>['size']>, string> = {
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
 * Each icon component accepts standard SVGProps<SVGSVGElement> for consistent styling and behavior.
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
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Small logo icon component
     */
    small: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <LogoSmallIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
    /**
     * Renders the full/default version of the logo icon
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Default logo icon component
     */
    default: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <LogoIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
    /**
     * Renders the Apple platform logo
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Apple logo icon component
     */
    apple: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <AppleIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
    /**
     * Renders the Android platform logo
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Android logo icon component
     */
    android: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <AndroidIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
  },
  /**
   * Navigation-related icons for user interface navigation elements
   * @memberof Icons
   */
  navigation: {
    /**
     * Renders a left-pointing arrow icon for navigation/back actions
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Arrow left icon component
     */
    arrowLeft: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <ArrowLeftIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
  },
  /**
   * User-related icons for profile and user management features
   * @memberof Icons
   */
  user: {
    /**
     * Renders a user avatar placeholder icon
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Avatar icon component
     */
    avatar: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <AvatarIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
  },
  /**
   * Communication-related icons for messaging and interaction features
   * @memberof Icons
   */
  communication: {
    /**
     * Renders a paper airplane icon, commonly used for send/submit actions
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Paper plane icon component
     */
    paperplane: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <PaperplaneIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
  },
  /**
   * Miscellaneous utility icons for general purpose use
   * @memberof Icons
   */
  miscellaneous: {
    /**
     * Renders a generic placeholder icon for temporary or fallback use
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Placeholder icon component
     */
    placeholder: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <PlaceholderIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
    /**
     * Renders an animated spinner icon for loading states
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Spinner icon component for loading indicators
     */
    spinner: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <SpinnerIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
    /**
     * Renders a checkmark icon for success/completion states
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} Check icon component
     */
    check: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <CheckIcon className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
    /**
     * Renders a KTP (Indonesian ID card) icon
     * @param {SVGProps<SVGSVGElement>} props - Icon configuration properties
     * @param {string} [props.className] - Additional CSS classes to apply
     * @param {SVGProps<SVGSVGElement>['size']} [props.size] - Size of the icon using Tailwind's spacing scale
     * @returns {React.JSX.Element} KTP icon component
     */
    coutKtp: ({ className, size, ...props }: SVGProps<SVGSVGElement>) => (
      <i>
        <CoutKtp className={cn(getSizeClasses(size), className)} {...props} />
      </i>
    ),
  },
};
