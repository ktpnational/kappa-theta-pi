'use client';

import { Card } from '@/components/ui';
import { Button, CardContent } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const BlogSection = () => {
  const blogPosts: {
    title: string;
    excerpt: string;
    date: string;
    author: string;
    image: string;
  }[] = [
    {
      title: 'The Future of AI in Tech Fraternities',
      excerpt:
        'Explore how artificial intelligence is shaping the landscape of technology-focused fraternities and the opportunities it presents for student growth and innovation.',
      date: '2023-05-15',
      author: 'Jane Doe',
      image: '/assets/images/logo.png',
    },
    {
      title: 'Networking Strategies for Tech Students',
      excerpt:
        'Learn effective networking techniques tailored for technology students, from leveraging social media to making the most of industry events and fraternity connections.',
      date: '2023-05-10',
      author: 'John Smith',
      image: '/assets/images/logo.png',
    },
    {
      title: 'The Impact of Open Source in Education',
      excerpt:
        'Discover how open source projects are revolutionizing education in technology fields and how Kappa Theta Pi members are contributing to this movement.',
      date: '2023-05-05',
      author: 'Alice Johnson',
      image: '/assets/images/logo.png',
    },
  ];
  return (
    <section className="mb-16 md:mb-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#234c8b]">Latest from Our Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[#234c8b]">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                By {post.author} on {post.date}
              </p>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href="/blog">
                <Button variant="link" className="text-[#458eff] hover:text-[#8BB9FF] p-0">
                  Read More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/blog">
          <Button
            variant="outline"
            className="border-[#234c8b] text-[#234c8b] hover:bg-[#458eff] hover:text-white"
          >
            View All Posts
          </Button>
        </Link>
      </div>
    </section>
  );
};

BlogSection.displayName = 'BlogSection';
