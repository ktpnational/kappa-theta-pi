'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import * as React from 'react';

/**
 * ThemeProvider component that provides theme support to the application using next-themes.
 * This component wraps the application to enable theme switching functionality.
 * 
 * Supports both light and dark themes by default, and can be configured for custom themes.
 * Automatically syncs theme across browser tabs and persists user preferences.
 * 
 * @component
 * @example
 * // Basic usage
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * @example
 * // With custom configuration
 * <ThemeProvider 
 *   attribute="class"
 *   defaultTheme="system"
 *   enableSystem={true}
 *   disableTransitionOnChange={false}
 * >
 *   <App />
 * </ThemeProvider>
 * 
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components that will have theme context
 * @param {string} [props.attribute="class"] - HTML attribute to control theme ("class" or "data-theme")
 * @param {string[]} [props.themes] - List of theme names to support
 * @param {string} [props.defaultTheme="system"] - Default theme to use ("light", "dark", "system")
 * @param {boolean} [props.enableSystem=true] - Enable system theme detection
 * @param {boolean} [props.disableTransitionOnChange=false] - Disable transitions when switching themes
 * @param {string} [props.storageKey="theme"] - Key to use for local storage
 * @param {Function} [props.onThemeChange] - Callback when theme changes
 * @returns {JSX.Element} Themed component tree wrapped in NextThemesProvider
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
