import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the checkbox
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to access the underlying checkbox element
 * @param {...React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>} props - All other props are passed to the underlying Radix UI Checkbox
 *
 * @example
 * // Basic usage
 * <Checkbox />
 *
 * // With custom class
 * <Checkbox className="my-custom-class" />
 *
 * // Controlled checkbox
 * const [checked, setChecked] = useState(false);
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 *
 * @description
 * This component wraps Radix UI's Checkbox primitive and adds custom styling.
 * It supports all standard checkbox functionality including:
 * - Keyboard navigation
 * - Focus states
 * - Disabled states
 * - Custom styling via className prop
 * - Form integration
 *
 * The checkbox uses a custom check icon from lucide-react and applies
 * tailwind classes for consistent styling across the application.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
