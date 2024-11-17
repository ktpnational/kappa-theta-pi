import { CardWrapper } from '@/app/(auth)/_components';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

/**
 * A reusable error card component that displays an error message with a back button.
 *
 * @component
 * @example
 * // Basic usage
 * <ErrorCard />
 *
 * @returns {JSX.Element} Returns a CardWrapper component containing an error message
 *                        and exclamation triangle icon
 *
 * @remarks
 * This component uses:
 * - CardWrapper from auth components for consistent styling
 * - ExclamationTriangleIcon from Radix UI for the warning icon
 * - Tailwind CSS classes for layout and styling
 *
 * The component displays:
 * 1. A header label "Oops! Something went wrong!"
 * 2. A back button that links to the login page
 * 3. A centered exclamation triangle icon with destructive styling
 */
const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export { ErrorCard };
