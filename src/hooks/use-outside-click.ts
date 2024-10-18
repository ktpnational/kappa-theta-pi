'use client';

import type React from 'react';
import { useEffect } from 'react';

/**
 * Custom hook that triggers a callback when a click is detected outside the specified element.
 *
 * @param {React.RefObject<HTMLDivElement>} ref - The reference to the element.
 * @param {Function} callback - The callback function to be executed when an outside click is detected.
 */
export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: Function) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};
