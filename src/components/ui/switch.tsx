'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * A customizable switch/toggle component built on top of Radix UI Switch primitives.
 * 
 * @component
 * @example
 * ```tsx
 * <Switch checked={isChecked} onCheckedChange={setIsChecked} />
 * ```
 * 
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the switch
 * @param {boolean} props.checked - Whether the switch is checked/active
 * @param {(checked: boolean) => void} props.onCheckedChange - Callback fired when switch state changes
 * @param {boolean} [props.disabled] - Whether the switch is disabled
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the underlying button element
 * 
 * @returns {JSX.Element} A styled switch toggle component
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
