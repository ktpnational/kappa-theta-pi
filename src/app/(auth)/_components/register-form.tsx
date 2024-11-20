'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { useGlobalStore } from '@/providers';
import { RegisterSchema } from '@/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { register } from '@/actions/register';
import { CardWrapper } from '@/app/(auth)/_components';
import { FormError } from '@/components/form-error';
import { FormSucess } from '@/components/form-sucess';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * RegisterForm component for user registration
 *
 * @component
 * @description Provides a form interface for new users to create an account. Handles form state,
 * validation, and submission while providing visual feedback during the registration process.
 *
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */
const RegisterForm = () => {
  const {
    error,
    success,
    isPending,
    setError,
    setSuccess,
    setIsPending,
    // @ts-expect-error - TODO: fix this
    reset: resetAuth,
  } = useGlobalStore((state) => state.auth);

  const [, startTransition] = useTransition();

  /**
   * Form initialization with Zod schema validation
   * @type {UseFormReturn<z.infer<typeof RegisterSchema>>}
   */
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  /**
   * Handles form submission
   * @param {z.infer<typeof RegisterSchema>} values - Form values matching the RegisterSchema
   * @returns {void}
   */
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      setIsPending(true);
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.sucess); // Note: API returns 'sucess' (typo)
          if (data.sucess) {
            form.reset();
          }
        })
        .catch(() => setError('Something went wrong'))
        .finally(() => setIsPending(false));
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
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

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSucess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export { RegisterForm };
