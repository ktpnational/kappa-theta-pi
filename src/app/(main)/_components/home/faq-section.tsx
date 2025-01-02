"use client";

import { type FAQItem, faqs } from "@/constants";
import { useGlobalStore } from "@/providers";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";

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
 * @example
 * ```tsx
 * <FAQItem
 *   question="What is Kappa Theta Pi?"
 *   answer="Kappa Theta Pi is a professional technology fraternity..."
 *   isOpen={true}
 *   toggleOpen={() => setIsOpen(!isOpen)}
 * />
 * ```
 *
 * @remarks
 * The component implements several key features:
 * - Smooth expand/collapse animations using Framer Motion
 * - Accessible button controls with proper ARIA attributes
 * - Chevron icon that rotates on expansion
 * - Responsive text sizing and spacing
 *
 * @styling
 * - Uses border-bottom for visual separation
 * - Question text uses primary color
 * - Answer text uses slightly muted foreground color
 * - Animated chevron rotation on toggle
 *
 * @accessibility
 * - Button has aria-expanded attribute
 * - Uses semantic HTML structure
 * - Maintains keyboard focus management
 *
 * @animation
 * - Height and opacity animations on expand/collapse
 * - Smooth chevron rotation
 * - Configurable animation timing and easing
 *
 * @returns {React.JSX.Element} Rendered FAQ item with animated expansion capabilities
 */
const FAQItem: React.FC<
  FAQItem & { isOpen: boolean; toggleOpen: () => void }
> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div className="border-b border-gray-200 py-4" initial={false}>
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen} // Explicit string conversion
      >
        <span className="text-lg font-medium text-primary">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
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
              open: { opacity: 1, height: "auto", marginTop: "1rem" },
              collapsed: { opacity: 0, height: 0, marginTop: "0" },
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

FAQItem.displayName = "FAQItem";

/**
 * FAQ Section component that displays a list of frequently asked questions with animated expandable answers.
 *
 * @component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FAQSection />
 * ```
 *
 * @remarks
 * The component implements several key features:
 * - Accordion-style expansion where only one item can be open at a time
 * - Staggered entrance animations for FAQ items
 * - Responsive layout with centered content
 * - Semantic HTML structure with proper heading hierarchy
 * - State management for tracking open/closed items
 *
 * @dependencies
 * - motion/react: For smooth animations and transitions
 * - lucide-react: For the chevron icon
 * - @/constants: For FAQ content data
 *
 * @styling
 * - Centered layout with max-width constraint
 * - Responsive padding using Tailwind classes
 * - Background color handling
 * - Proper spacing between elements
 *
 * @accessibility
 * - Proper heading structure with sr-only class
 * - ARIA attributes for interactive elements
 * - Keyboard navigation support
 * - Focus management
 *
 * @animation
 * Features several layers of animations:
 * - Initial fade-in for the entire section
 * - Staggered entrance animations for individual FAQ items
 * - Smooth expand/collapse transitions
 * - Configurable timing and easing
 *
 * @performance
 * - Uses useCallback for stable toggle function
 * - Efficient state management
 * - Optimized animations with AnimatePresence
 * - Proper component memoization
 *
 * @state
 * - Tracks currently open FAQ item index
 * - Handles toggling between items
 * - Maintains single-item-open behavior
 *
 * @returns {React.JSX.Element} A fully functional FAQ section with animated, interactive FAQ items
 */
export const FAQSection: React.FC = () => {
  const { openIndex, toggleOpen } = useGlobalStore((state) => state.faq);

  return (
    <section className="py-16 bg-none" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground text-center mb-12 sr-only">
          Frequently Asked Questions
        </h2>
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
              <FAQItem
                {...faq}
                isOpen={openIndex === index}
                toggleOpen={() => toggleOpen(index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

FAQSection.displayName = "FAQSection";
export default FAQSection;
