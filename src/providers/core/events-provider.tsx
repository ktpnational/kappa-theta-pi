import { Toaster } from '@/components/ui/sonner';

/**
 * Events component to handle global events such as error handling and toast notifications.
 *
 * @param {React.PropsWithChildren} props - The props containing children components.
 * @returns {JSX.Element} - The Events component.
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
