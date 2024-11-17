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
  backButtonHref: string;
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
 * @returns {JSX.Element} Rendered card wrapper component
 */
const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export { CardWrapper };
