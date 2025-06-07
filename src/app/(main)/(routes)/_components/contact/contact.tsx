'use client';

import { FAQSection } from '@/app/(main)/_components';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  BookOpen,
  Briefcase,
  Building2,
  GitPullRequest,
  HelpCircle,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const supportCategories = [
  {
    title: 'Get Started',
    description: 'New to KTP? Learn about membership and the basics.',
    icon: BookOpen,
    href: '/membership',
  },
  {
    title: 'Chapter Resources',
    description: 'Access tools and guides for chapter management.',
    icon: Building2,
    href: '/chapters',
  },
  {
    title: 'Community',
    description: 'Connect with other members and chapters.',
    icon: Users,
    href: '/community',
  },
  {
    title: 'Events & Programs',
    description: 'Learn about our events, workshops, and initiatives.',
    icon: GitPullRequest,
    href: '/events',
  },
  {
    title: 'Professional Development',
    description: 'Explore career resources and opportunities.',
    icon: Briefcase,
    href: '/professional',
  },
  {
    title: 'Help & Support',
    description: 'Get help from our dedicated support team.',
    icon: MessageCircle,
    href: '/contact',
  },
];

const popularArticles = [
  {
    title: 'How to become a member',
    description:
      'Learn about the membership process and requirements. Get started with your journey to joining Kappa Theta Pi.',
    href: '/membership/how-to-join',
    image: '/assets/images/logo.webp',
    author: 'Membership Team',
    date: 'January 15, 2024',
  },
  {
    title: 'Chapter leadership roles',
    description:
      'Understanding chapter positions and responsibilities. A comprehensive guide to chapter organization.',
    href: '/chapters/leadership',
    author: 'Chapter Relations',
    date: 'January 10, 2024',
  },
  {
    title: 'Event planning guidelines',
    description:
      'Step-by-step guide to organizing successful chapter events and professional development activities.',
    href: '/resources/event-planning',
    author: 'Events Team',
    date: 'December 28, 2023',
  },
  {
    title: 'Membership dues and payment',
    description:
      'Information about dues, deadlines, and payment methods. Everything you need to know about financial obligations.',
    href: '/membership/dues',
    author: 'Treasury Team',
    date: 'December 20, 2023',
  },
];

export const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold text-foreground">How can we help?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our resources to find what you're looking for
          </p>
        </div>

        {/* Support Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {supportCategories.map((category) => (
            <Link href={category.href} key={category.title}>
              <Card className="p-6 h-full hover:bg-accent transition-colors group cursor-pointer border-2 hover:border-primary">
                <div className="space-y-4">
                  <category.icon className="w-10 h-10 text-primary group-hover:text-primary/80 transition-colors" />
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <FAQSection />
        </div>

        {/* Popular Articles Section */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold">Popular Articles</h2>
          <div className="grid grid-cols-1 gap-4">
            {popularArticles.map((article) => (
              <Link href={article.href} key={article.title}>
                <Card className="hover:bg-accent/50 transition-colors group cursor-pointer border-muted">
                  <div className="flex items-center p-6 gap-6">
                    <div className="shrink-0 w-24 h-24 relative rounded-lg overflow-hidden">
                      <Image
                        src={article.image || '/assets/images/logo.webp'}
                        alt=""
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                        priority
                      />
                    </div>
                    <div className="grow">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{article.author || 'KTP Team'}</span>
                        <span>•</span>
                        <span>{article.date || 'Updated recently'}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" className="mt-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              View all articles
            </Button>
          </div>
        </div>

        {/* Contact Options Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">Still need help?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                <Mail className="w-6 h-6" />
                <span>Email Support</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                <MessageSquare className="w-6 h-6" />
                <span>Live Chat</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                <Phone className="w-6 h-6" />
                <span>Schedule Call</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                <HelpCircle className="w-6 h-6" />
                <span>Help Center</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.displayName = 'Contact';
