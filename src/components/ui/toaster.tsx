'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

/**
 * Toaster component that renders toast notifications.
 *
 * This component uses the useToast hook to access the toast state and render
 * toast notifications in a consistent layout. It handles displaying toasts with
 * optional titles, descriptions, and actions.
 *
 * @component
 * @returns {JSX.Element} A ToastProvider containing mapped toast notifications
 *
 * @example
 * ```tsx
 * // In your app layout or pages:
 * import { Toaster } from './Toaster'
 *
 * function App() {
 *   return (
 *     <>
 *       <YourComponents />
 *       <Toaster />
 *     </>
 *   )
 * }
 * ```
 */
export function Toaster() {
  /**
   * Destructure toasts array from useToast hook
   * Each toast contains: id, title, description, action and other props
   */
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
