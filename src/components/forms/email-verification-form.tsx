'use client';

import { resendEmailVerificationLink } from '@/actions/email';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { type EmailVerificationFormInput, emailVerificationSchema } from '@/schemas/email';

import { useToast } from '@/hooks/use-toast';

import { Icons } from '@/components/icons';
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

/**
 * Email verification form component for resending verification links
 *
 * @component
 * @description
 * A form component that allows users to request a new email verification link.
 * The form validates the email input using Zod schema validation and handles
 * the submission process with proper error handling and user feedback.
 *
 * @returns {JSX.Element} A React component representing the email verification form
 *
 * @example
 * ```tsx
 * <EmailVerificationForm />
 * ```
 *
 * @features
 * - Client-side form validation using Zod
 * - React Hook Form integration for form state management
 * - Loading state handling with React useTransition
 * - Toast notifications for user feedback
 * - Accessible form controls with proper ARIA attributes
 * - Responsive error handling with user-friendly messages
 *
 * @flow
 * 1. User enters their email address
 * 2. Form validates the input
 * 3. On submit:
 *    - Shows loading state
 *    - Calls verification link resend API
 *    - Handles various response cases:
 *      * Success: Redirects to signin
 *      * User not found: Shows error
 *      * Other errors: Shows appropriate message
 *
 * @dependencies
 * - next/navigation: For routing
 * - react-hook-form: Form state management
 * - @hookform/resolvers/zod: Schema validation
 * - Custom toast hook for notifications
 * - UI components from component library
 *
 * @accessibility
 * - Proper form labeling
 * - Loading state indicators
 * - Screen reader support
 * - Keyboard navigation
 *
 * @error-handling
 * - Validates email format
 * - Handles API errors
 * - Shows user-friendly error messages
 * - Provides recovery paths for errors
 *
 * @state-management
 * - Form state via react-hook-form
 * - Loading state via useTransition
 * - Navigation state via Next.js router
 * - Toast notifications for user feedback
 */
export const EmailVerificationForm = (): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();

  /**
   * Form initialization with Zod schema validation
   */
  const form = useForm<EmailVerificationFormInput>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: '',
    },
  });

  /**
   * Handles form submission for email verification
   *
   * @param {EmailVerificationFormInput} formData - The form data containing the email
   * @returns {void}
   *
   * @async
   * @function
   * @description
   * Processes the form submission by:
   * 1. Starting a transition for loading state
   * 2. Calling the verification link resend API
   * 3. Handling the response with appropriate user feedback
   * 4. Managing navigation based on the outcome
   *
   * @error-handling
   * - Handles API-specific error cases
   * - Provides fallback error handling
   * - Shows appropriate toast messages
   */
  function onSubmit(formData: EmailVerificationFormInput): void {
    startTransition(async () => {
      try {
        const message = await resendEmailVerificationLink({
          email: formData.email,
        });

        switch (message) {
          case 'not-found':
            toast({
              title: 'User with this email address does not exist',
              variant: 'destructive',
            });
            form.reset();
            break;
          case 'success':
            toast({
              title: 'Success!',
              description: 'Check your inbox and verify your email address',
            });
            router.push('/signin');
            break;
          default:
            toast({
              title: 'Error sending verification link',
              description: 'Please try again',
              variant: 'destructive',
            });
            router.push('/signup');
        }
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: 'Please try again',
          variant: 'destructive',
        });
        console.error(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4 "
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johnsmith@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.miscellaneous.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
              <span>Pending...</span>
            </>
          ) : (
            <span>Get verification link</span>
          )}
          <span className="sr-only">Resend email verification link</span>
        </Button>
      </form>
    </Form>
  );
};
