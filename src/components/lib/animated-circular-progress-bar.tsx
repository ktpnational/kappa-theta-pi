import { cn } from '@/lib';
import React from 'react';

/**
 * Props interface for the AnimatedCircularProgressBar component
 * @interface Props
 */
interface Props {
  /** Maximum value for the progress bar */
  max: number;
  /** Current value to display in the progress bar */
  value: number;
  /** Minimum value for the progress bar */
  min: number;
  /** Primary color of the gauge/progress arc */
  gaugePrimaryColor: string;
  /** Secondary/background color of the gauge */
  gaugeSecondaryColor: string;
  /** Optional CSS class name(s) to apply to the component */
  className?: string;
}

/**
 * Animated circular progress bar component that displays a percentage value
 * with smooth transitions and customizable colors.
 *
 * @component
 * @param {Props} props - Component props
 * @param {number} props.max - Maximum value (defaults to 100)
 * @param {number} props.min - Minimum value (defaults to 0)
 * @param {number} props.value - Current value to display (defaults to 0)
 * @param {string} props.gaugePrimaryColor - Color of the progress arc
 * @param {string} props.gaugeSecondaryColor - Color of the background arc
 * @param {string} [props.className] - Optional CSS classes
 *
 * @returns {React.JSX.Element} Animated circular progress bar
 */
export const AnimatedCircularProgressBar = React.memo(
  ({ max = 100, min = 0, value = 0, gaugePrimaryColor, gaugeSecondaryColor, className }: Props) => {
    const circumference = 2 * Math.PI * 45;
    const percentPx = circumference / 100;
    const currentPercent = ((value - min) / (max - min)) * 100;

    return (
      <div
        className={cn('relative size-40 text-2xl font-semibold', className)}
        style={
          {
            '--circle-size': '100px',
            '--circumference': circumference,
            '--percent-to-px': `${percentPx}px`,
            '--gap-percent': '5',
            '--offset-factor': '0',
            '--transition-length': '1s',
            '--transition-step': '200ms',
            '--delay': '0s',
            '--percent-to-deg': '3.6deg',
            transform: 'translateZ(0)',
          } as React.CSSProperties
        }
      >
        <svg fill="none" className="size-full" strokeWidth="2" viewBox="0 0 100 100">
          {currentPercent <= 90 && currentPercent >= 0 && (
            <circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="10"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" opacity-100"
              style={
                {
                  stroke: gaugeSecondaryColor,
                  '--stroke-percent': 90 - currentPercent,
                  '--offset-factor-secondary': 'calc(1 - var(--offset-factor))',
                  strokeDasharray:
                    'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
                  transform:
                    'rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)',
                  transition: 'all var(--transition-length) ease var(--delay)',
                  transformOrigin: 'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)',
                } as React.CSSProperties
              }
            />
          )}
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-100"
            style={
              {
                stroke: gaugePrimaryColor,
                '--stroke-percent': currentPercent,
                strokeDasharray:
                  'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
                transition:
                  'var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)',
                transitionProperty: 'stroke-dasharray,transform',
                transform:
                  'rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))',
                transformOrigin: 'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)',
              } as React.CSSProperties
            }
          />
        </svg>
        <span
          data-current-value={currentPercent}
          className="duration-[var(--transition-length)] delay-[var(--delay)] absolute inset-0 m-auto size-fit ease-linear animate-in fade-in"
        >
          {currentPercent}
        </span>
      </div>
    );
  },
);

AnimatedCircularProgressBar.displayName = 'AnimatedCircularProgressBar';
