'use client';

import { type StoreState, createGlobalStore } from '@/core';
import { type ReactNode, createContext, useContext, useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';

const StoreContext = createContext<StoreApi<StoreState> | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * StoreProvider component that provides the global store to its children.
 * @param {StoreProviderProps} props - The props for the StoreProvider component.
 * @returns {JSX.Element} The StoreProvider component.
 */
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<ReturnType<typeof createGlobalStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

/**
 * Custom hook to access the global store.
 * @template T
 * @param {(state: StoreState) => T} selector - The selector function to select a part of the state.
 * @returns {T} The selected state.
 * @throws Will throw an error if used outside of a StoreProvider.
 */
export const useGlobalStore = <T,>(selector: (state: StoreState) => T): T => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error(`useGlobalStore must be used within a StoreProvider`);
  }
  return useStore(store, selector);
};
