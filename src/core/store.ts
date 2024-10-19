import type { ChapterInfo } from '@/data/map';
import { createStore } from 'zustand';

/**
 * Interface representing the state of the store.
 */
interface StoreState {
  header: {
    setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
    setIsScrolled: (value: boolean) => void;
    setVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
    isMenuOpen: boolean;
    isScrolled: boolean;
    visible: boolean;
    prevScrollPos: number;
  };
  map: {
    activeFilters: ChapterInfo['status'][];
    setActiveFilters: (filters: ChapterInfo['status'][]) => void;
    toggleFilter: (filter: ChapterInfo['status']) => void;
  };
}

/**
 * Creates a global store using Zustand.
 * @returns {StoreApi<StoreState>} The Zustand store.
 */
const createGlobalStore = () =>
  createStore<StoreState>((set) => ({
    header: {
      isMenuOpen: false,
      isScrolled: false,
      visible: true,
      prevScrollPos: 0,
      setIsMenuOpen: (value) =>
        set((state) => ({
          header: {
            ...state.header,
            isMenuOpen: typeof value === 'function' ? value(state.header.isMenuOpen) : value,
          },
        })),
      setIsScrolled: (value) =>
        set((state) => ({
          header: { ...state.header, isScrolled: value },
        })),
      setVisible: (value) =>
        set((state) => ({
          header: {
            ...state.header,
            visible: typeof value === 'function' ? value(state.header.visible) : value,
          },
        })),
    },
    map: {
      activeFilters: ['Active', 'Colony', 'Inactive'],
      setActiveFilters: (filters) =>
        set((state) => ({
          map: { ...state.map, activeFilters: filters },
        })),
      toggleFilter: (filter) =>
        set((state) => ({
          map: {
            ...state.map,
            activeFilters: state.map.activeFilters.includes(filter)
              ? state.map.activeFilters.filter((f) => f !== filter)
              : [...state.map.activeFilters, filter],
          },
        })),
    },
  }));

export { createGlobalStore, type StoreState };
