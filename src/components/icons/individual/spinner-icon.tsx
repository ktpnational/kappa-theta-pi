import { cn } from '@/lib';
import type { SVGIconProps } from '../types';

/**
 * SpinnerIcon component that renders a customizable loading spinner SVG.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the SVG element
 * @param {number|string} [props.size] - Size of the spinner icon, applied to both width and height
 * @param {Object} [props.props] - Any additional props to spread onto the SVG element
 * 
 * @returns {JSX.Element} A spinning loading indicator SVG element
 * 
 * @example
 * // Basic usage
 * <SpinnerIcon size={6} />
 * 
 * @example
 * // With custom classes
 * <SpinnerIcon size={8} className="text-blue-500" />
 */
export const SpinnerIcon: React.FC<SVGIconProps> = ({ className, size, props }): JSX.Element => {
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
