'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { useGlobalStore } from '@/providers';
import { ResetSchema } from '@/schemas';

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

import { reset } from '@/actions/reset';

/**
 * ResetForm Component
 *
 * A React component that renders a password reset form with email input.
 * Handles form submission and displays success/error states.
 *
 * @component
 * @returns {React.JSX.Element} The rendered password reset form
 */
const ResetForm = () => {
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
   * Form instance created using react-hook-form
   * Uses zod schema for validation
   */
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  /**
   * Handles form submission
   * Resets error/success states and initiates password reset process
   *
   * @param {z.infer<typeof ResetSchema>} values - Form values containing email
   */
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      setIsPending(true);
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
          if (data?.success) {
            form.reset();
          }
        })
        .catch(() => setError('Something went wrong'))
        .finally(() => setIsPending(false));
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
          </div>
          <FormError message={error} />
          <FormSucess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export { ResetForm };
