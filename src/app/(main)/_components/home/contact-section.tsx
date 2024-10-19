'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

// Define the type for our form data
type FormData = z.infer<typeof formSchema>;

export const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Here you would typically send the data to your server
    console.log(data);
    toast.success('Message sent successfully!');
    reset();
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#234c8b]">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4">
          <div>
            <Input {...register('name')} placeholder="Your Name" className="w-full" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Your Email"
              className="w-full"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Textarea {...register('message')} placeholder="Your Message" className="w-full" />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-[#234c8b] hover:bg-[#1a3a6d]">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

ContactSection.displayName = 'ContactSection';
