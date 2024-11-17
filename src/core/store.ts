import type { ChapterInfo } from '@/data/map';
import { createStore } from 'zustand';

/**
 * Interface representing the global store state.
 * @interface StoreState
 */
interface StoreState {
  /** Header section containing menu, scroll, and visibility state/functions */
  header: {
    /**
     * Sets the menu open/closed state
     * @param {boolean | ((prev: boolean) => boolean)} value - New menu state or function to update it
     * @returns {void}
     */
    setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;

    /**
     * Sets whether the header is scrolled
     * @param {boolean} value - Whether header is scrolled
     * @returns {void} 
     */
    setIsScrolled: (value: boolean) => void;

    /**
     * Sets the header visibility
     * @param {boolean | ((prev: boolean) => boolean)} value - New visibility state or function to update it
     * @returns {void}
     */
    setVisible: (value: boolean | ((prev: boolean) => boolean)) => void;

    /** Whether the menu is currently open */
    isMenuOpen: boolean;

    /** Whether the header is currently scrolled */
    isScrolled: boolean;

    /** Whether the header is currently visible */
    visible: boolean;

    /** Previous scroll position in pixels */
    prevScrollPos: number;
  };

  /** Map section containing filter state and functions */
  map: {
    /** Currently active status filters */
    activeFilters: ChapterInfo['status'][];

    /**
     * Sets the active filters
     * @param {ChapterInfo['status'][]} filters - Array of status filters to set as active
     * @returns {void}
     */
    setActiveFilters: (filters: ChapterInfo['status'][]) => void;

    /**
     * Toggles a single filter on/off
     * @param {ChapterInfo['status']} filter - Status filter to toggle
     * @returns {void}
     */
    toggleFilter: (filter: ChapterInfo['status']) => void;
  };
}

/**
 * Creates a global store using Zustand for state management.
 * Initializes header and map state with default values and setter functions.
 * 
 * @function createGlobalStore
 * @returns {StoreApi<StoreState>} The initialized Zustand store
 * 
 * @example
 * const store = createGlobalStore();
 * store.getState().header.setIsMenuOpen(true);
 * store.getState().map.toggleFilter('Active');
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
