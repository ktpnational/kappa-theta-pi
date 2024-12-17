'use client';

import { BackButton, Header, Social } from '@/app/(auth)/_components';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
/**
 * Interface defining the props for the CardWrapper component
 * @interface CardWrapperProps
 * @property {React.ReactNode} children - Child components to render within the card content
 * @property {string} headerLabel - Text label to display in the card header
 * @property {string} backButtonLabel - Text label for the back button
 * @property {string} backButtonHref - URL/path that the back button links to
 * @property {boolean} [showSocial] - Optional flag to show social media components in footer
 */
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: Parameters<typeof import('next/link')['default']>[0]['href'];
  showSocial?: boolean;
}

/**
 * A wrapper component that renders content within a styled card layout
 *
 * @component
 * @param {CardWrapperProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to render within the card content
 * @param {string} props.headerLabel - Text label to display in the card header
 * @param {string} props.backButtonLabel - Text label for the back button
 * @param {string} props.backButtonHref - URL/path that the back button links to
 * @param {boolean} [props.showSocial] - Optional flag to show social media components in footer
 * @returns {React.JSX.Element} Rendered card wrapper component
 */
const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[400px] bg-white/95 shadow-xl backdrop-blur-sm z-10">
      <CardHeader className="space-y-3 pb-2">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="pb-6">{children}</CardContent>
      {showSocial && (
        <CardFooter className="flex flex-col space-y-4 px-6 py-4">
          <Social />
        </CardFooter>
      )}
      <CardFooter className="flex justify-center px-6 py-4">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export { CardWrapper };
