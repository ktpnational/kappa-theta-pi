'use client';

import { submitContactForm } from '@/actions/email';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { type ContactFormInput, contactFormSchema } from '@/schemas/email';

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
import { Textarea } from '@/components/ui/textarea';

/**
 * Contact form component for handling user inquiries and messages
 *
 * @component
 * @description
 * A React component that renders a responsive contact form with fields for name, email, and message.
 * Uses react-hook-form for form handling and validation, with Zod schema validation.
 * Includes loading states, error handling, and success notifications.
 *
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 *
 * @returns {React.JSX.Element} A fully styled and functional contact form
 *
 * @features
 * - Form validation using Zod schema
 * - Loading states during form submission
 * - Error handling with toast notifications
 * - Success feedback with form reset
 * - Responsive grid layout
 * - Accessible form controls
 *
 * @validation
 * Validates:
 * - Name (required)
 * - Email (required, valid email format)
 * - Message (required)
 *
 * @state
 * - isPending: Tracks form submission state
 * - form: React Hook Form instance with ContactFormInput type
 *
 * @notifications
 * Shows toast notifications for:
 * - Successful form submission
 * - Form submission errors
 * - General error handling
 *
 * @styling
 * - Uses Tailwind CSS for styling
 * - Responsive grid layout
 * - Custom gradient button styling
 * - Consistent form field heights
 * - Loading spinner animation
 */
export const ContactForm = (): React.JSX.Element => {
  /** Toast notification hook for showing submission status */
  const { toast } = useToast();

  /** Loading state for form submission */
  const [isPending, startTransition] = React.useTransition();

  /**
   * Form instance using react-hook-form
   * Validates against contactFormSchema using zod resolver
   */
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  /**
   * Handles form submission and server interaction
   *
   * @param {ContactFormInput} formData - The validated form data containing name, email, and message
   * @returns {void}
   *
   * @async
   * @function
   * @description
   * Processes the form submission using React transitions for better UX.
   * Submits data to server, handles response, and manages user feedback.
   *
   * @flow
   * 1. Starts submission transition
   * 2. Attempts to submit form data
   * 3. Handles success/failure responses
   * 4. Shows appropriate toast notifications
   * 5. Resets form on success
   *
   * @error
   * Handles errors with user-friendly toast notifications
   */
  function onSubmit(formData: ContactFormInput): void {
    startTransition(async () => {
      try {
        const message = await submitContactForm(formData);

        switch (message) {
          case 'success':
            toast({
              title: 'Thank you!',
              description: 'Your message has been sent',
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
          description: 'Something went wrong. Please try again',
          variant: 'destructive',
        });
      }
    });
  }
  return (
    <Form {...form}>
      <form
        className="grid w-full gap-8"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl className="h-12">
                  <Input type="text" placeholder="John" {...field} />
                </FormControl>
                <FormMessage className="pt-2 sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="h-12">
                  <Input type="email" placeholder="john@smith.com" {...field} />
                </FormControl>
                <FormMessage className="pt-2 sm:text-sm" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Message</FormLabel>
              <FormControl className="min-h-[180px] md:min-h-[240px]">
                <Textarea {...field} placeholder="Hi, I am looking to..." className="text-base" />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          className="h-14 border bg-linear-to-br from-pink-600/70 to-purple-400/70 text-lg font-bold tracking-wide hover:opacity-70"
        >
          {isPending && <Icons.miscellaneous.spinner className="mr-2 size-4 animate-spin" />}
          {isPending ? 'Sending...' : 'Send'}
          <span className="sr-only">Submit contact form</span>
        </Button>
      </form>
    </Form>
  );
};
