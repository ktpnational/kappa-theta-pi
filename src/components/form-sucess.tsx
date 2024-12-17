import { CheckCircledIcon } from '@radix-ui/react-icons';

/**
 * Props interface for the FormSucess component
 * @interface FormSucessProps
 * @property {string} [message] - Optional success message to display. If not provided, component will not render
 */
interface FormSucessProps {
  message?: string;
}

/**
 * A reusable form success message component that displays a checkmark icon with a message
 * @component
 * @param {FormSucessProps} props - Component props
 * @param {string} [props.message] - Success message to display
 * @returns {React.JSX.Element|null} Rendered component if message is provided, null otherwise
 * @example
 * // Basic usage
 * <FormSucess message="Operation completed successfully" />
 *
 * // Component will not render if message is undefined
 * <FormSucess message={undefined} />
 */
export const FormSucess = ({ message }: FormSucessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
