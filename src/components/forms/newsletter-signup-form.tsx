'use client';

import { subscribeToNewsletter } from '@/actions/newsletter';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
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

export const NewsletterSignUpForm = (): JSX.Element => {
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<NewsletterSignUpFormInput>({
    resolver: zodResolver(newsletterSignUpSchema),
    defaultValues: {
      email: '',
    },
  });

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
      <form
        className="relative w-full max-w-md mx-auto"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <AnimatePresence>
          {!isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 text-base placeholder:text-muted-foreground/60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute mt-1 text-xs" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.miscellaneous.spinner className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                ) : (
                  <Icons.communication.paperplane className="w-5 h-5 mr-2" aria-hidden="true" />
                )}
                {isPending ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </Button>
            </motion.div>
          )}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-center"      
            >
              <Icons.miscellaneous.check className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">You're now subscribed to our newsletter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
};

export default NewsletterSignUpForm;
