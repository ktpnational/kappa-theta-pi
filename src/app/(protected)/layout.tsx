/**
 * A protected layout component that wraps child components in a styled container.
 *
 * @component
 * @description
 * This component creates a full-width and full-height container with centered content
 * and a gradient background. It uses Tailwind CSS for styling and implements a conic
 * gradient pattern from neutral colors.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 *
 * @returns {React.JSX.Element} A div container with gradient background and centered content
 *
 * @example
 * ```jsx
 * <ProtectedLayout>
 *   <SomeChildComponent />
 * </ProtectedLayout>
 * ```
 */
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        h-full w-full flex flex-col gap-y-10 items-center justify-center
        bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-600 to-neutral-900
    "
    >
      {children}
    </div>
  );
};

export default ProtectedLayout;
