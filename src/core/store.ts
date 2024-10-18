import { createStore } from 'zustand';

/**
 * Interface representing the state of the store.
 */
interface StoreState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;

  user: {
    id: string | null;
    name: string | null;
    email: string | null;
  };
  setUser: (user: StoreState['user']) => void;
  clearUser: () => void;

  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

/**
 * Creates a global store using Zustand.
 * @returns {StoreApi<StoreState>} The Zustand store.
 */
const createGlobalStore = () =>
  createStore<StoreState>((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),

    user: { id: null, name: null, email: null },
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: { id: null, name: null, email: null } }),

    theme: 'light',
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  }));

export { createGlobalStore, type StoreState };
