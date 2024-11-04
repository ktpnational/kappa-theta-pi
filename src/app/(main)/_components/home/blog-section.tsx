'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { type HTMLMotionProps, motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Tech Fraternities',
    excerpt:
      'Explore how artificial intelligence is shaping the landscape of technology-focused fraternities and the opportunities it presents for student growth and innovation.',
    date: '2023-05-15',
    author: 'Jane Doe',
    image: '/assets/images/logo.png',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Networking Strategies for Tech Students',
    excerpt:
      'Learn effective networking techniques tailored for technology students, from leveraging social media to making the most of industry events and fraternity connections.',
    date: '2023-05-10',
    author: 'John Smith',
    image: '/assets/images/logo.png',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Career Development',
  },
  {
    id: '3',
    title: 'The Impact of Open Source in Education',
    excerpt:
      'Discover how open source projects are revolutionizing education in technology fields and how Kappa Theta Pi members are contributing to this movement.',
    date: '2023-05-05',
    author: 'Alice Johnson',
    image: '/assets/images/logo.png',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    category: 'Education',
  },
  {
    id: '4',
    title: 'The Role of Cybersecurity in Modern Tech',
    excerpt:
      'Understand the importance of cybersecurity in today’s tech landscape and how students can prepare for careers in this critical field.',
    date: '2023-05-01',
    author: 'Michael Brown',
    image: '/assets/images/logo.png',
    content:
      'Cybersecurity is a growing field with increasing importance as technology advances. This article explores the key aspects of cybersecurity and how students can get involved.',
    category: 'Cybersecurity',
  },
  {
    id: '5',
    title: 'Innovations in Blockchain Technology',
    excerpt:
      'Dive into the latest innovations in blockchain technology and how they are transforming various industries.',
    date: '2023-04-25',
    author: 'Emily Davis',
    image: '/assets/images/logo.png',
    content:
      'Blockchain technology is revolutionizing industries from finance to healthcare. Learn about the latest developments and how they are being applied.',
    category: 'Blockchain',
  },
  {
    id: '6',
    title: 'The Evolution of Cloud Computing',
    excerpt:
      'Explore the evolution of cloud computing and its impact on the tech industry, including benefits and challenges.',
    date: '2023-04-20',
    author: 'David Wilson',
    image: '/assets/images/logo.png',
    content:
      'Cloud computing has transformed the way businesses operate. This article covers the history, benefits, and future of cloud computing.',
    category: 'Cloud Computing',
  },
  {
    id: '7',
    title: 'AI and Machine Learning in Healthcare',
    excerpt:
      'Discover how AI and machine learning are being used to improve healthcare outcomes and the future of medical technology.',
    date: '2023-04-15',
    author: 'Sophia Martinez',
    image: '/assets/images/logo.png',
    content:
      'AI and machine learning are making significant strides in healthcare. Learn about the latest advancements and their potential impact on patient care.',
    category: 'Healthcare',
  },
  {
    id: '8',
    title: 'The Rise of Quantum Computing',
    excerpt:
      'Learn about the rise of quantum computing and its potential to solve complex problems that are beyond the capabilities of classical computers.',
    date: '2023-04-10',
    author: 'James Anderson',
    image: '/assets/images/logo.png',
    content:
      'Quantum computing is an emerging field with the potential to revolutionize technology. This article explores its principles and applications.',
    category: 'Quantum Computing',
  },
  {
    id: '9',
    title: 'Ethical Considerations in AI Development',
    excerpt:
      'Examine the ethical considerations in AI development and the importance of responsible AI practices.',
    date: '2023-04-05',
    author: 'Olivia Lee',
    image: '/assets/images/logo.png',
    content:
      'As AI technology advances, ethical considerations become increasingly important. This article discusses the key ethical issues and how they can be addressed.',
    category: 'Ethics',
  },
  {
    id: '10',
    title: 'The Future of Remote Work in Tech',
    excerpt:
      'Explore the future of remote work in the tech industry and how companies are adapting to this new way of working.',
    date: '2023-04-01',
    author: 'William Taylor',
    image: '/assets/images/logo.png',
    content:
      'Remote work has become a permanent fixture in the tech industry. Learn about the benefits, challenges, and future trends of remote work.',
    category: 'Remote Work',
  },
];

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleCardClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#234c8b] mb-12 text-center">
          Latest from Our Blog
        </h2>
        <InfiniteMovingCards items={blogPosts} onCardClick={handleCardClick} />
      </div>

      <Dialog open={!!selectedPost} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              By {selectedPost?.author} • {selectedPost?.date} • {selectedPost?.category}
            </DialogDescription>
          </DialogHeader>
          <BlogPostContent post={selectedPost} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

const InfiniteMovingCards: React.FC<{
  items: BlogPost[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
  onCardClick: (post: BlogPost) => void;
}> = ({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
  onCardClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards');
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse');
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background: 'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
            }}
          >
            <BlogCard post={item} onClick={() => onCardClick(item)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => {
  return (
    <motion.div
      {...({
        className: 'bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer h-full',
        onClick: onClick,
      } as HTMLMotionProps<'div'>)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 transform hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#234c8b] mb-2">{post.title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {post.date} • {post.author}
        </p>
        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
      </div>
    </motion.div>
  );
};

const BlogPostContent: React.FC<{ post: BlogPost | null }> = ({ post }) => {
  if (!post) return null;

  return (
    <div className="bg-white p-8 rounded-xl">
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 mb-6">{post.content}</p>
      <Button className="bg-[#458eff] text-white hover:bg-[#3a75d9]">Read Full Article</Button>
    </div>
  );
};

BlogSection.displayName = 'BlogSection';
