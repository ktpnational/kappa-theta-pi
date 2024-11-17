'use client';

import { subscribeToNewsletter } from '@/actions/newsletter';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { type NewsletterSignUpFormInput, newsletterSignUpSchema } from '@/schemas/newsletter';

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
 * Newsletter signup form component for collecting email subscriptions
 *
 * @component
 * @description
 * A React component that renders a responsive newsletter signup form with email input.
 * Uses react-hook-form for form handling and validation, with Zod schema validation.
 * Includes loading states, error handling, success notifications, and duplicate subscription checking.
 *
 * @example
 * ```tsx
 * <NewsletterSignUpForm />
 * ```
 *
 * @returns {JSX.Element} A fully styled and functional newsletter signup form
 *
 * @features
 * - Form validation using Zod schema
 * - Loading states during form submission
 * - Error handling with toast notifications
 * - Success feedback with form reset
 * - Duplicate subscription detection
 * - Responsive design with mobile/desktop variants
 * - Accessible form controls with ARIA labels
 *
 * @validation
 * Validates:
 * - Email (required, valid email format)
 *
 * @state
 * - isPending: Tracks form submission state using React.useTransition
 * - form: React Hook Form instance with email field
 *
 * @notifications
 * Toast messages for:
 * - Successful subscription
 * - Existing subscription
 * - Error states
 *
 * @accessibility
 * - Screen reader labels for form controls
 * - Loading state indicators
 * - Clear success/error feedback
 *
 * @styling
 * - Responsive sizing (mobile/desktop)
 * - Loading spinner animation
 * - Custom button icons
 * - Tailwind CSS utilities
 */
export const NewsletterSignUpForm = (): JSX.Element => {
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();

  /**
   * Form instance created using react-hook-form with zod validation
   * @type {UseFormReturn<NewsletterSignUpFormInput>}
   */
  const form = useForm<NewsletterSignUpFormInput>({
    resolver: zodResolver(newsletterSignUpSchema),
    defaultValues: {
      email: '',
    },
  });

  /**
   * Handles the form submission for newsletter signup
   *
   * @param {NewsletterSignUpFormInput} formData - The form data containing the email
   * @returns {void}
   *
   * @async
   * @function
   * @description
   * Processes the newsletter signup request:
   * 1. Starts a transition for loading state
   * 2. Attempts to subscribe the email
   * 3. Handles different response cases:
   *    - Existing subscription
   *    - Successful subscription
   *    - Error states
   * 4. Shows appropriate toast notifications
   * 5. Resets form on success/existing subscription
   *
   * @error
   * Handles errors with user-friendly toast notifications
   */
  function onSubmit(formData: NewsletterSignUpFormInput): void {
    startTransition(async () => {
      try {
        const message = await subscribeToNewsletter({ email: formData.email });

        switch (message) {
          case 'exists':
            toast({
              title: 'You are subscribed already',
              variant: 'destructive',
            });
            form.reset();
            break;
          case 'success':
            toast({
              title: 'Thank you!',
              description: 'You have successfully subscribed to our newsletter',
            });
            form.reset();
            break;
          default:
            toast({
              title: 'Something went wrong',
              description: 'Please try again',
              variant: 'destructive',
            });
        }
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: 'Please try again',
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex h-10 w-full  items-center justify-center md:h-12"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative h-10 w-full space-y-0 md:h-12">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl className="rounded-r-none">
                <Input
                  type="email"
                  placeholder="johnsmith@gmail.com"
                  className="h-10 placeholder:text-xs md:h-12 md:placeholder:text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button className="size-10 rounded-l-none md:size-12" disabled={isPending}>
          {isPending ? (
            <Icons.miscellaneous.spinner className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Icons.communication.paperplane className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">Join newsletter</span>
        </Button>
      </form>
    </Form>
  );
};
