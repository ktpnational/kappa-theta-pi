import { cn } from '@/lib';
import { LogoIcon, LogoSmallIcon } from './components';
import {
  ArrowLeftIcon,
  AvatarIcon,
  PaperplaneIcon,
  PlaceholderIcon,
  SpinnerIcon,
} from './individual';
import type { IconsProps, SVGIconProps } from './types';

/**
 * Collection of SVG icons organized by category
 * @type {IconsProps}
 */
export const Icons: IconsProps = {
  /** Logo-related icons */
  logos: {
    /**
     * Small version of the logo
     * @param {SVGIconProps} props - Icon properties
     * @param {string} props.className - Additional CSS classes
     * @param {number} props.size - Icon size in pixels
     * @returns {JSX.Element} Small logo icon component
     */
    small: ({ className, size, props }: SVGIconProps) => (
      <LogoSmallIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
    /**
     * Default/full version of the logo
     * @param {SVGIconProps} props - Icon properties
     * @param {string} props.className - Additional CSS classes
     * @param {number} props.size - Icon size in pixels
     * @returns {JSX.Element} Default logo icon component
     */
    default: ({ className, size, props }: SVGIconProps) => (
      <LogoIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
  /** Navigation-related icons */
  navigation: {
    /**
     * Left-pointing arrow icon
     * @param {SVGIconProps} props - Icon properties
     * @param {string} props.className - Additional CSS classes
     * @param {number} props.size - Icon size in pixels
     * @returns {JSX.Element} Arrow left icon component
     */
    arrowLeft: ({ className, size, props }: SVGIconProps) => (
      <ArrowLeftIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
  /** User-related icons */
  user: {
    /**
     * User avatar placeholder icon
     * @param {SVGIconProps} props - Icon properties
     * @param {string} props.className - Additional CSS classes
     * @param {number} props.size - Icon size in pixels
     * @returns {JSX.Element} Avatar icon component
     */
    avatar: ({ className, size, props }: SVGIconProps) => (
      <AvatarIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
  /** Communication-related icons */
  communication: {
    /**
     * Paper plane/send message icon
     * @param {SVGIconProps} props - Icon properties
     * @param {string} props.className - Additional CSS classes
     * @param {number} props.size - Icon size in pixels
     * @returns {JSX.Element} Paper plane icon component
     */
    paperplane: ({ className, size, props }: SVGIconProps) => (
      <PaperplaneIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
  /** Miscellaneous icons */
  miscellaneous: {
    /**
     * Generic placeholder icon
     * @param {SVGIconProps} props - Icon properties
     * @param {string} props.className - Additional CSS classes
     * @param {number} props.size - Icon size in pixels
     * @returns {JSX.Element} Placeholder icon component
     */
    placeholder: ({ className, size, props }: SVGIconProps) => (
      <PlaceholderIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
    /**
     * Loading spinner animation icon
     * @param {SVGIconProps} props - Icon properties
     * @param {string} props.className - Additional CSS classes
     * @param {number} props.size - Icon size in pixels
     * @returns {JSX.Element} Spinner icon component
     */
    spinner: ({ className, size, props }: SVGIconProps) => (
      <SpinnerIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
};
