'use client';

import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

/**
 * Custom hook for copying text to the clipboard.
 *
 * @returns {Object} An object containing the copied state and the function to copy text.
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
