import { cn } from '@/lib/utils';

/**
 * Interface for the Marquee component props
 * @interface MarqueeProps
 * @property {string} [className] - Additional CSS class names to be applied to the marquee container
 * @property {boolean} [reverse] - Whether the marquee should animate in reverse direction
 * @property {boolean} [pauseOnHover=false] - Whether the animation should pause when hovering over the marquee
 * @property {React.ReactNode} [children] - Child elements to be rendered inside the marquee
 * @property {boolean} [vertical=false] - Whether the marquee should animate vertically instead of horizontally
 * @property {number} [repeat=4] - Number of times to repeat the children elements for continuous scrolling
 * @property {any} [key: string] - Additional props to be spread onto the container element
 */
interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

/**
 * A marquee component that creates an infinitely scrolling container of repeated elements
 *
 * @param {MarqueeProps} props - The component props
 * @param {string} [props.className] - Additional CSS class names
 * @param {boolean} [props.reverse] - Reverse animation direction
 * @param {boolean} [props.pauseOnHover=false] - Pause animation on hover
 * @param {React.ReactNode} [props.children] - Child elements
 * @param {boolean} [props.vertical=false] - Vertical scrolling
 * @param {number} [props.repeat=4] - Number of repetitions
 * @returns {JSX.Element} The rendered marquee component
 */
export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
              'animate-marquee flex-row': !vertical,
              'animate-marquee-vertical flex-col': vertical,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
              '[animation-direction:reverse]': reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
