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
 * Newsletter signup form component that allows users to subscribe to a newsletter.
 * 
 * @component
 * @remarks
 * This component provides a form with email input validation using zod schema.
 * It handles form submission asynchronously and shows appropriate toast messages.
 * 
 * @returns {JSX.Element} A form component with an email input field and submit button
 * 
 * @example
 * ```tsx
 * <NewsletterSignUpForm />
 * ```
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
   * Handles the form submission process
   * 
   * @async
   * @param {NewsletterSignUpFormInput} formData - The form data containing the email address
   * @throws {Error} When the newsletter subscription request fails
   * 
   * @remarks
   * This function:
   * 1. Attempts to subscribe the user to the newsletter
   * 2. Handles different response cases:
   *    - 'exists': User is already subscribed
   *    - 'success': Successful subscription
   *    - default: Generic error
   * 3. Shows appropriate toast notifications
   * 4. Resets the form on success or if user already exists
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
            <Icons.spinner className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Icons.paperPlane className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">Join newsletter</span>
        </Button>
      </form>
    </Form>
  );
};
