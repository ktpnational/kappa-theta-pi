import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
/**
 * Interface for FormError component props
 * @interface FormErrorProps
 * @property {string} [message] - Optional error message to display. If not provided, component will not render.
 */
interface FormErrorProps {
  message?: string;
}

/**
 * FormError component displays an error message with an exclamation triangle icon
 *
 * @component
 * @param {FormErrorProps} props - Component props
 * @param {string} [props.message] - Error message to display
 *
 * @returns {JSX.Element | null} Returns a styled error message div with icon if message provided, null otherwise
 *
 * @example
 * // Basic usage with message
 * <FormError message="Invalid input" />
 *
 * // Without message (renders nothing)
 * <FormError />
 */
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
