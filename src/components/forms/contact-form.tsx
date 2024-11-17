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
 * ContactForm Component
 * 
 * A React component that renders a contact form with name, email and message fields.
 * Uses react-hook-form for form handling and validation via zod schema.
 * Submits form data via server action and shows success/error toasts.
 *
 * @component
 * @returns {JSX.Element} The rendered contact form
 */
export const ContactForm = (): JSX.Element => {
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
   * Handles form submission
   * Submits form data to server action and shows appropriate toast notifications
   *
   * @param {ContactFormInput} formData - The validated form data
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

  /** 
   * Loading spinner element displayed during form submission
   * Conditionally rendered based on Icons.miscellaneous.spinner availability
   */
  const Spinner = Icons.miscellaneous?.spinner
    ? React.createElement(Icons.miscellaneous.spinner, {
        className: 'mr-2 size-4 animate-spin',
        'aria-hidden': 'true',
      })
    : null;

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
          className="h-14 border bg-gradient-to-br from-pink-600/70 to-purple-400/70 text-lg font-bold tracking-wide hover:opacity-70"
        >
          {isPending && <Spinner />}
          {isPending ? 'Sending...' : 'Send'}
          <span className="sr-only">Submit contact form</span>
        </Button>
      </form>
    </Form>
  );
};
