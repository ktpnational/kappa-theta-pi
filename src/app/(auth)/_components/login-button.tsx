import { useRouter } from 'next/navigation';

import { LoginForm } from '@/app/(auth)/_components';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

/**
 * Props interface for the LoginButton component
 * @interface LoginButtonProps
 */
interface LoginButtonProps {
  /** Child elements to be rendered within the button */
  children: React.ReactNode;

  /** Determines how the login functionality is presented
   * @default 'redirect'
   */
  mode?: 'modal' | 'redirect';

  /** When true, renders trigger as child component instead of wrapping
   * @default false
   */
  asChild?: boolean;
}

/**
 * A button component that handles user login functionality
 *
 * Provides two modes of operation:
 * - Modal: Opens a dialog containing the login form
 * - Redirect: Navigates user to the login page
 *
 * @component
 * @param {LoginButtonProps} props - Component props
 * @param {React.ReactNode} props.children - Child elements to render
 * @param {'modal' | 'redirect'} [props.mode='redirect'] - Display mode for login
 * @param {boolean} [props.asChild=false] - Whether to render trigger as child
 *
 * @example
 * // Modal usage
 * <LoginButton mode="modal">
 *   <button>Login</button>
 * </LoginButton>
 *
 * @example
 * // Redirect usage
 * <LoginButton>
 *   Click to login
 * </LoginButton>
 */
const LoginButton = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
  const router = useRouter();

  /** Handler for redirect mode click events */
  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export { LoginButton };
