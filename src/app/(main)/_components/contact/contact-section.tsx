'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FormError } from '@/components/form-error';
import { FormSucess } from '@/components/form-sucess';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useGlobalStore } from '@/providers';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const carouselItems = [
  {
    title: 'Contact Information',
    content: (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <MapPin className="text-primary" />
          <p>123 Tech Avenue, Innovation City, IC 54321</p>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="text-primary" />
          <p>+1 (555) 123-4567</p>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="text-primary" />
          <p>contact@kappathetapi.org</p>
        </div>
        <div className="flex items-center space-x-4">
          <Clock className="text-primary" />
          <p>Monday - Friday: 9am - 5pm EST</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Frequently Asked Questions',
    content: (
      <div>
        <ul className="list-disc list-inside space-y-2">
          <li>How can I join Kappa Theta Pi?</li>
          <li>What events does KTP organize?</li>
          <li>Are there membership fees?</li>
          <li>How can I start a chapter at my university?</li>
        </ul>
        <Button className="mt-4" variant="outline" onClick={() => (window.location.href = '/faq')}>
          View All FAQs
        </Button>
      </div>
    ),
  },
  {
    title: 'Connect With Us',
    content: (
      <div>
        <p className="mb-4">Follow us on social media for the latest updates and tech insights:</p>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => window.open('https://twitter.com/KappaThetaPi', '_blank')}
          >
            Twitter
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('https://facebook.com/KappaThetaPi', '_blank')}
          >
            Facebook
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('https://linkedin.com/company/KappaThetaPi', '_blank')}
          >
            LinkedIn
          </Button>
        </div>
      </div>
    ),
  },
];

export const ContactSection: React.FC = () => {
  const {
    currentSlide,
    error,
    success,
    isPending,
    setCurrentSlide,
    setError,
    setSuccess,
    setIsPending,
    // @ts-expect-error - TODO: fix this
    reset: resetContact,
  } = useGlobalStore((state) => state.contact);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  /**
   * Handles form submission
   * @param {z.infer<typeof formSchema>} values - Form values matching the formSchema
   * @returns {void}
   */
  async function onSubmit(
    // @ts-expect-error - TODO: fix this
    values: z.infer<typeof formSchema>,
  ) {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      // Here you would typically send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess('Message sent successfully!');
      form.reset();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                We'd love to hear from you. Fill out the form and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject of your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormError message={error} />
                  <FormSucess message={success} />
                  <Button disabled={isPending} type="submit" className="w-full">
                    {isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={currentSlide}>
              <motion.div
                key={currentSlide}
                custom={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{carouselItems[currentSlide]?.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{carouselItems[currentSlide]?.content}</CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button size="icon" variant="outline" onClick={prevSlide}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={nextSlide}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
