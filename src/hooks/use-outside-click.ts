'use client';

import type React from 'react';
import { useEffect } from 'react';

/**
 * Custom React hook that detects and handles clicks outside of a specified element.
 * 
 * This hook attaches event listeners for both mouse and touch events to detect clicks/taps
 * outside of the referenced element. When such an event occurs, it triggers the provided
 * callback function.
 *
 * @param {React.RefObject<HTMLDivElement>} ref - React ref object pointing to the DOM element 
 *        that should be monitored for outside clicks. The ref must be attached to an HTMLDivElement.
 * 
 * @param {Function} callback - Callback function that will be executed when a click/tap is detected
 *        outside of the referenced element. The callback receives the original event object as its parameter.
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const divRef = useRef<HTMLDivElement>(null);
 *   
 *   useOutsideClick(divRef, (event) => {
 *     console.log('Clicked outside!', event);
 *   });
 *
 *   return <div ref={divRef}>Click outside me</div>;
 * };
 * ```
 *
 * @returns {void} This hook doesn't return anything
 *
 * @remarks
 * - The hook automatically cleans up event listeners when the component unmounts
 * - Both mousedown and touchstart events are handled to support mouse and touch devices
 * - The callback won't trigger if the click/tap occurs inside the referenced element
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
