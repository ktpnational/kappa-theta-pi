'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { useGlobalStore } from '@/providers';
import { LoginSchema } from '@/schemas';

import { CardWrapper } from '@/app/(auth)/_components';
import { FormError } from '@/components/form-error';
import { FormSucess } from '@/components/form-sucess';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { login } from '@/actions/login';

/**
 * LoginForm Component
 *
 * A comprehensive login form component that handles user authentication with support for:
 * - Email/password login
 * - Two-factor authentication
 * - OAuth error handling
 * - Password reset functionality
 * - Loading states
 * - Form validation
 * - Error/success messaging
 *
 * @component
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 *
 * @remarks
 * The component uses React Hook Form for form state management and Zod for schema validation.
 * It integrates with Next.js for client-side navigation and handles various authentication scenarios.
 *
 * State management is handled through a global store using useGlobalStore.
 *
 * The form supports three main states:
 * 1. Initial login with email/password
 * 2. Two-factor authentication code entry
 * 3. Error states (including OAuth account linking errors)
 *
 * @see {@link LoginSchema} for form validation schema
 * @see {@link useGlobalStore} for global state management
 * @see {@link login} for the authentication action
 */
const LoginForm = () => {
  const {
    showTwoFactor,
    error,
    success,
    isPending,
    setShowTwoFactor,
    setError,
    setSuccess,
    setIsPending,
    // @ts-expect-error - TODO: fix this
    reset: resetAuth,
  } = useGlobalStore((state) => state.auth);

  const [, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '';
  const urlError =
    searchParams?.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different Provider!'
      : '';

  /**
   * Initialize form with React Hook Form
   * @type {UseFormReturn<z.infer<typeof LoginSchema>>}
   */
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Handles form submission for both initial login and 2FA verification
   *
   * @param {z.infer<typeof LoginSchema>} values - Form values containing email, password, and optional 2FA code
   * @returns {Promise<void>}
   *
   * @remarks
   * The function handles multiple scenarios:
   * - Regular email/password login
   * - Two-factor authentication code verification
   * - Error handling and form reset
   * - Success state management
   *
   * On successful initial login with 2FA enabled, it transitions to the 2FA code entry state
   * rather than completing the login flow.
   */
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      setIsPending(true);
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError('Something went wrong'))
        .finally(() => setIsPending(false));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <Button size="sm" variant="link" asChild className="px-0 font-normal">
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSucess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export { LoginForm };
