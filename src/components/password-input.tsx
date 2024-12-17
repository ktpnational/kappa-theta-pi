'use client';

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input, type InputProps } from '@/components/ui/input';
import { useGlobalStore } from '@/providers';
/**
 * A password input component that allows toggling password visibility.
 *
 * @component
 * @template HTMLInputElement - The HTML input element type
 * @template InputProps - Props interface extending from the base Input component
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply to the input
 * @param {string} [props.value] - The current value of the input
 * @param {boolean} [props.disabled] - Whether the input is disabled
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to access the underlying input element
 *
 * @returns {React.JSX.Element} A password input with a toggle button to show/hide the password
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   value="mypassword"
 *   onChange={(e) => handleChange(e)}
 *   className="my-custom-class"
 * />
 * ```
 */
const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const { showPassword, setShowPassword } = useGlobalStore((state) => state.passwordInput);

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          disabled={props.value === '' || props.disabled}
        >
          {showPassword ? (
            <EyeNoneIcon className="size-4" aria-hidden="true" />
          ) : (
            <EyeOpenIcon className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
