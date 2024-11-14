import { cn } from '@/lib';
import { LogoIcon, LogoSmallIcon } from './components';
import type { IconsProps, SVGIconProps } from './types';
import {
  PaperplaneIcon,
  PlaceholderIcon,
  SpinnerIcon,
  AvatarIcon,
  ArrowLeftIcon,
} from './individual';

export const Icons: IconsProps = {
  logos: {
    small: ({ className, size, props }: SVGIconProps) => (
      <LogoSmallIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
    default: ({ className, size, props }: SVGIconProps) => (
      <LogoIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
  navigation: {
    arrowLeft: ({ className, size, props }: SVGIconProps) => (
      <ArrowLeftIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
  user: {
    avatar: ({ className, size, props }: SVGIconProps) => (
      <AvatarIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
  communication: {
    paperplane: ({ className, size, props }: SVGIconProps) => (
      <PaperplaneIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
  miscellaneous: {
    placeholder: ({ className, size, props }: SVGIconProps) => (
      <PlaceholderIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
    spinner: ({ className, size, props }: SVGIconProps) => (
      <SpinnerIcon className={cn('w-4 h-4', className)} size={size} {...props} />
    ),
  },
};
