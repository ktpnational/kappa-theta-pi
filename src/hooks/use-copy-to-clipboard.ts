'use client';

import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

/**
 * Custom React hook that provides functionality for copying text to the clipboard.
 * 
 * This hook uses the modern Clipboard API when available, falling back to a copy-to-clipboard
 * utility for older browsers. It maintains a state indicating whether text was recently copied
 * and automatically resets this state after 3 seconds.
 * 
 * @example
 * ```tsx
 * const { copied, copyToClipBoard } = useCopyToClipBoard();
 * 
 * return (
 *   <button onClick={() => copyToClipBoard("Text to copy")}>
 *     {copied ? "Copied!" : "Copy"}
 *   </button>
 * );
 * ```
 * 
 * @returns {Object} An object containing:
 *   @returns {boolean} copied - State indicating if text was recently copied
 *   @returns {(text: string) => Promise<void>} copyToClipBoard - Function to copy text to clipboard
 * 
 * @throws {Error} When clipboard access is denied or copying fails
 */
const useCopyToClipBoard = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const copyToClipBoard = useCallback(async (text: string): Promise<void> => {
    if ('clipboard' in navigator) {
      try {
        const res = await navigator.clipboard.writeText(text);
        setCopied(true);
        return res;
      } catch (error) {
        throw new Error(`${error instanceof Error ? error.message : error}`);
      } finally {
        setTimeout(() => setCopied(false), 3000);
      }
    } else {
      copy(text);
    }
  }, []);
  return { copied, copyToClipBoard };
};

export { useCopyToClipBoard };
