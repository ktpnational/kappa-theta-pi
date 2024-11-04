'use client';

import { type StoreState, createGlobalStore } from '@/core/store';
import type React from 'react';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

const GlobalStoreContext = createContext<ReturnType<typeof createGlobalStore> | null>(null);

/**
 * GlobalStoreProvider component to provide the global store to the React component tree.
 *
 * @param {React.PropsWithChildren} props - The props containing children components.
 * @returns {JSX.Element} - The GlobalStoreProvider component wrapping the children.
 */
export const GlobalStoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<ReturnType<typeof createGlobalStore>>();
  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
  }
  return (
    <GlobalStoreContext.Provider value={storeRef.current}>{children}</GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = <T,>(selector: (state: StoreState) => T) => {
  const store = useContext(GlobalStoreContext);
  if (!store) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
  }
  return useStore(store, selector);
};
