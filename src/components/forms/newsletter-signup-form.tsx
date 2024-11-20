'use client';

import { subscribeToNewsletter } from '@/actions/newsletter';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
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
 * @returns {JSX.Element} A form component for newsletter signup
 *
 * @example
 * ```tsx
 * <NewsletterSignUpForm />
 * ```
 *
 * Features:
 * - Email validation using Zod schema
 * - Loading state during submission
 * - Success state after successful subscription
 * - Error handling with toast notifications
 * - Animated transitions using Framer Motion
 */
export const NewsletterSignUpForm = (): JSX.Element => {
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const [isSuccess, setIsSuccess] = React.useState(false);

  /**
   * Initialize react-hook-form with Zod schema validation
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
   * @param {NewsletterSignUpFormInput} formData - The form data containing the email
   * @returns {void}
   *
   * Response handling:
   * - 'exists': User is already subscribed
   * - 'success': Successfully subscribed
   * - default: Error occurred
   */
  function onSubmit(formData: NewsletterSignUpFormInput): void {
    startTransition(async () => {
      try {
        const message = await subscribeToNewsletter({ email: formData.email });

        switch (message) {
          case 'exists':
            toast({
              title: 'Already subscribed',
              description: 'You are already on our mailing list.',
              variant: 'default',
            });
            form.reset();
            break;
          case 'success':
            setIsSuccess(true);
            toast({
              title: 'Welcome aboard!',
              description: 'You have successfully subscribed to our newsletter.',
            });
            form.reset();
            break;
          default:
            toast({
              title: 'Oops! Something went wrong',
              description: 'Please try again later.',
              variant: 'destructive',
            });
        }
      } catch (error) {
        toast({
          title: 'Oops! Something went wrong',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <AnimatePresence>
          {!isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          {...field}
                        />
                        <Button
                          type="submit"
                          size="icon"
                          variant="secondary"
                          className="rounded-l-none hover:bg-white/10"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Icons.miscellaneous.spinner className="h-4 w-4 animate-spin" />
                          ) : (
                            <Icons.communication.paperplane className="h-4 w-4" />
                          )}
                          <span className="sr-only">Subscribe to Newsletter</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-center"
            >
              <Icons.miscellaneous.check className="w-6 h-6 mx-auto text-green-500 mb-2" />
              <p className="text-sm">You're now subscribed to our newsletter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
};

export default NewsletterSignUpForm;
