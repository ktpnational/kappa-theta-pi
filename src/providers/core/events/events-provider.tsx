import { Toaster } from '@/components/ui/sonner';

/**
 * Events component to handle global events such as error handling and toast notifications.
 * Wraps child components and provides toast notification capabilities using the Sonner toast library.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the Events wrapper
 * @returns {JSX.Element} Fragment containing Toaster configuration and children
 *
 * @example
 * // Basic usage
 * <Events>
 *   <App />
 * </Events>
 *
 * @remarks
 * The Toaster is configured with:
 * - System theme integration
 * - Top-center positioning
 * - 5 second duration
 * - Rich colors enabled
 * - Custom className support via toastOptions
 */
export const Events: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <>
      <Toaster
        theme={`system`}
        position={`top-center`}
        duration={5000}
        richColors
        toastOptions={{
          className: `

          `,
        }}
      />
      {children}
    </>
  );
};
