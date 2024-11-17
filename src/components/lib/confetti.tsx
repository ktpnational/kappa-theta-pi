'use client';

import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from 'canvas-confetti';
import confetti from 'canvas-confetti';
import type { ReactNode } from 'react';
import React from 'react';
import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';

/**
 * API interface for controlling confetti effects
 * @interface Api
 * @property {function} fire - Triggers the confetti effect with optional configuration
 */
type Api = {
  fire: (options?: ConfettiOptions) => void;
};

/**
 * Props for the Confetti component
 * @interface Props
 * @extends {React.ComponentPropsWithRef<'canvas'>}
 * @property {ConfettiOptions} [options] - Configuration options for the confetti effect
 * @property {ConfettiGlobalOptions} [globalOptions] - Global configuration options
 * @property {boolean} [manualstart=false] - Whether to manually trigger the confetti effect
 * @property {ReactNode} [children] - Child components to render
 */
type Props = React.ComponentPropsWithRef<'canvas'> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};

/**
 * Reference type for the Confetti component
 * @typedef {Api | null} ConfettiRef
 */
export type ConfettiRef = Api | null;

/**
 * Context for sharing confetti functionality across components
 */
const ConfettiContext = createContext<Api>({} as Api);

/**
 * A React component that creates a canvas-based confetti effect
 * @component
 * @param {Props} props - Component props
 * @param {React.Ref<ConfettiRef>} ref - Forwarded ref for accessing the confetti API
 * @returns {JSX.Element} Rendered component
 */
const Confetti = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    ...rest
  } = props;
  const instanceRef = useRef<ConfettiInstance | null>(null);

  /**
   * Callback ref for canvas element to manage confetti instance lifecycle
   * @param {HTMLCanvasElement} node - The canvas DOM node
   */
  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        if (instanceRef.current) return;
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      } else {
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions],
  );

  /**
   * Triggers the confetti effect with merged options
   * @param {ConfettiOptions} opts - Additional options to merge with default options
   */
  const fire = useCallback(
    (opts = {}) => instanceRef.current?.({ ...options, ...opts }),
    [options],
  );

  /**
   * Memoized API object containing the fire method
   */
  const api = useMemo(
    () => ({
      fire,
    }),
    [fire],
  );

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      fire();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

/**
 * Props interface for the ConfettiButton component
 * @interface ConfettiButtonProps
 * @extends {ButtonProps}
 * @property {ConfettiOptions & ConfettiGlobalOptions & { canvas?: HTMLCanvasElement }} [options] - Configuration options
 * @property {React.ReactNode} [children] - Child elements to render within the button
 */
interface ConfettiButtonProps extends ButtonProps {
  options?: ConfettiOptions & ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };
  children?: React.ReactNode;
}

/**
 * A button component that triggers a confetti effect when clicked
 * @component
 * @param {ConfettiButtonProps} props - Component props
 * @returns {JSX.Element} Rendered button component
 */
const ConfettiButton = React.memo(({ options, children, ...props }: ConfettiButtonProps) => {
  /**
   * Handles the click event and triggers the confetti effect
   * @param {React.MouseEvent<HTMLButtonElement>} event - Click event object
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    confetti({
      ...options,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
});

Confetti.displayName = 'Confetti';

export { Confetti, ConfettiButton };

export default Confetti;
