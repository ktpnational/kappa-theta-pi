'use client';

import { type FAQItem, faqs } from '@/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type React from 'react';
import { useCallback, useState } from 'react';

/**
 * Individual FAQ item component that displays a question and answer in an expandable format
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.question - The FAQ question text
 * @param {string} props.answer - The FAQ answer text
 * @param {boolean} props.isOpen - Whether this FAQ item is currently expanded
 * @param {() => void} props.toggleOpen - Callback function to toggle the expanded state
 * @returns {JSX.Element} Rendered FAQ item with animated expansion
 */
const FAQItem: React.FC<FAQItem & { isOpen: boolean; toggleOpen: () => void }> = ({
  question,
  answer,
  isOpen,
  toggleOpen,
}) => {
  return (
    <motion.div className="border-b border-gray-200 py-4" initial={false}>
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-primary">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: '1rem' },
              collapsed: { opacity: 0, height: 0, marginTop: '0' },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="text-foreground/80">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

FAQItem.displayName = 'FAQItem';

/**
 * FAQ Section component that displays a list of frequently asked questions
 * with animated expandable answers
 * 
 * @component
 * @returns {JSX.Element} Rendered FAQ section with animated title and items
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <FAQSection />
 * ```
 * 
 * Features:
 * - Animated entrance for title and FAQ items
 * - Accordion-style expansion where only one item can be open at a time
 * - Smooth animations for expanding/collapsing answers
 * - Responsive design with proper spacing and layout
 * - Accessibility support with proper ARIA attributes
 */
export const FAQSection: React.FC = () => {
  /**
   * State to track which FAQ item is currently open
   * @type {number | null}
   */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /**
   * Callback to toggle the expanded state of an FAQ item
   * If the clicked item is already open, it will be closed
   * If a different item is clicked, the previous item will close and the new one will open
   * 
   * @param {number} index - The index of the FAQ item to toggle
   */
  const toggleOpen = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  return (
    <section className="py-16 bg-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-foreground text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FAQItem {...faq} isOpen={openIndex === index} toggleOpen={() => toggleOpen(index)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

FAQSection.displayName = 'FAQSection';
export default FAQSection;
