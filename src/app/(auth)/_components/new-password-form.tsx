'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { NewPasswordSchema } from '@/schemas';

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

import { newPassword } from '@/actions/new-password';

/**
 * NewPasswordForm Component
 *
 * A form component that allows users to set a new password, typically used in password reset flows.
 *
 * @component
 * @example
 * ```tsx
 * <NewPasswordForm />
 * ```
 *
 * @remarks
 * - Uses React Hook Form for form state management
 * - Validates input using Zod schema
 * - Handles loading states and displays success/error messages
 * - Integrates with Next.js client-side navigation
 */
const NewPasswordForm = () => {
  /** Error message state for form submission failures */
  const [error, setError] = useState<string | undefined>('');

  /** Success message state for successful password updates */
  const [success, setSuccess] = useState<string | undefined>('');

  /** Loading state indicator during form submission */
  const [isPending, startTransition] = useTransition();

  /** Access URL search parameters to get reset token */
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  /**
   * Initialize form with React Hook Form
   * @type {UseFormReturn<z.infer<typeof NewPasswordSchema>>}
   */
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  /**
   * Handles form submission
   * @param {z.infer<typeof NewPasswordSchema>} values - Form values containing new password
   */
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
    console.log(values);
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
