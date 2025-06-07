'use client';

import { type FAQItem, faqs } from '@/constants';
import { useGlobalStore } from '@/providers';
import { ChevronDown } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef } from 'react';

/**
 * Individual FAQ item component that displays a question and answer in an expandable format.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.question - The FAQ question text to display
 * @param {string} props.answer - The FAQ answer text that appears when expanded
 * @param {boolean} props.isOpen - Whether this FAQ item is currently expanded
 * @param {() => void} props.toggleOpen - Callback function to toggle the expanded state
 *
 * @returns {React.JSX.Element} Rendered FAQ item with animated expansion capabilities
 */
const FAQItem: React.FC<FAQItem & { isOpen: boolean; toggleOpen: () => void }> = ({
  question,
  answer,
  isOpen,
  toggleOpen,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-primary">{question}</span>
        <div
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: 0 }}
      >
        <div className="text-foreground/80 pt-4">{answer}</div>
      </div>
    </div>
  );
};

FAQItem.displayName = 'FAQItem';

/**
 * FAQ Section component that displays a list of frequently asked questions with animated expandable answers.
 *
 * @component
 *
 * @returns {React.JSX.Element} A fully functional FAQ section with animated, interactive FAQ items
 */
export const FAQSection: React.FC = () => {
  const { openIndex, toggleOpen } = useGlobalStore((state) => ({
    openIndex: state.faq.openIndex,
    toggleOpen: state.faq.toggleOpen,
  }));

  return (
    <section id="faq" className="py-16 bg-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground text-center mb-12 sr-only">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              toggleOpen={() => toggleOpen(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

FAQSection.displayName = 'FAQSection';
export default FAQSection;
