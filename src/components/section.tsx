/**
 * Interface for props accepted by the Section component
 * @interface SectionProps
 */
interface SectionProps {
  /** Optional ID for the section element. Used as fallback if title is not provided */
  id?: string;
  /** Optional title text displayed at top of section in small uppercase text */
  title?: string;
  /** Optional subtitle displayed below title in large text */
  subtitle?: string;
  /** Optional description paragraph displayed below subtitle */
  description?: string;
  /** Optional child elements rendered below the header content */
  children?: React.ReactNode;
  /** Optional CSS classes to apply to the section's outer div */
  className?: string;
}

/**
 * A section component that displays a formatted header with optional title, subtitle,
 * and description, followed by child content.
 *
 * @component
 * @param {SectionProps} props - The properties passed to the component
 * @param {string} [props.id] - Optional ID for the section element
 * @param {string} [props.title] - Optional title text
 * @param {string} [props.subtitle] - Optional subtitle text
 * @param {string} [props.description] - Optional description text
 * @param {React.ReactNode} [props.children] - Optional child elements
 * @param {string} [props.className] - Optional CSS class names
 * @returns {JSX.Element} A section element with formatted header and content
 */
export const Section = ({
  id,
  title,
  subtitle,
  description,
  children,
  className,
}: SectionProps) => {
  const sectionId = title ? title.toLowerCase().replace(/\s+/g, '-') : id;
  return (
    <section id={id || sectionId}>
      <div className={className}>
        <div className="relative container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center space-y-4 pb-6 mx-auto">
            {title && (
              <h2 className="text-sm text-primary font-mono font-medium tracking-wider uppercase">
                {title}
              </h2>
            )}
            {subtitle && (
              <h3 className="mx-auto mt-4 max-w-xs text-3xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl">
                {subtitle}
              </h3>
            )}
            {description && (
              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};
