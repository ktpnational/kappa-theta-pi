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

  /** Auth section containing login form state and functions */
  auth: {
    /** Controls visibility of two-factor authentication form */
    showTwoFactor: boolean;
    /** Stores error messages from form submission */
    error: string | undefined;
    /** Stores success messages from form submission */
    success: string | undefined;
    /** Indicates if form submission is in progress */
    isPending: boolean;

    /** Sets the two-factor authentication visibility */
    setShowTwoFactor: (value: boolean) => void;
    /** Sets the error message */
    setError: (value: string | undefined) => void;
    /** Sets the success message */
    setSuccess: (value: string | undefined) => void;
    /** Sets the pending state */
    setIsPending: (value: boolean) => void;
    /** Resets all auth state */
    reset: () => void;
  };

  /** Contact section containing form and carousel state */
  contact: {
    /** Current slide index in the carousel */
    currentSlide: number;
    /** Error message from form submission */
    error: string | undefined;
    /** Success message from form submission */
    success: string | undefined;
    /** Loading state for form submission */
    isPending: boolean;

    /** Sets the current slide index */
    setCurrentSlide: (value: number) => void;
    /** Sets the error message */
    setError: (value: string | undefined) => void;
    /** Sets the success message */
    setSuccess: (value: string | undefined) => void;
    /** Sets the loading state */
    setIsPending: (value: boolean) => void;
    /** Resets all contact state */
    reset: () => void;
  };

  /** FAQ section containing accordion state */
  faq: {
    /** Index of currently open FAQ item */
    openIndex: number | null;
    /** Sets the open FAQ item index */
    setOpenIndex: (value: number | null) => void;
    /** Toggles an FAQ item open/closed */
    toggleOpen: (index: number) => void;
  };

  /** Settings section containing form state */
  settings: {
    /** Error message from form submission */
    error: string | undefined;
    /** Success message from form submission */
    success: string | undefined;
    /** Loading state for form submission */
    isPending: boolean;
    /** Sets the error message */
    setError: (value: string | undefined) => void;
    /** Sets the success message */
    setSuccess: (value: string | undefined) => void;
    /** Sets the loading state */
    setIsPending: (value: boolean) => void;
    /** Resets all settings state */
    reset: () => void;
  };
  copyButton: {
    isCopied: boolean;
    setIsCopied: (value: boolean) => void;
  };
  passwordInput: {
    showPassword: boolean;
    setShowPassword: (value: boolean) => void;
  };
  speechToText: {
    isRecording: boolean;
    setIsRecording: (value: boolean) => void;
  };
  idNanoid: {
    id: string;
    setId: (value: string) => void;
  };
  containerWidth: {
    width: number;
    setWidth: (value: number) => void;
  };
  legal: {
    title: string;
    setTitle: (value: string) => void;
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
    auth: {
      showTwoFactor: false,
      error: undefined,
      success: undefined,
      isPending: false,
      setShowTwoFactor: (value) =>
        set((state) => ({
          auth: { ...state.auth, showTwoFactor: value },
        })),
      setError: (value) =>
        set((state) => ({
          auth: { ...state.auth, error: value },
        })),
      setSuccess: (value) =>
        set((state) => ({
          auth: { ...state.auth, success: value },
        })),
      setIsPending: (value) =>
        set((state) => ({
          auth: { ...state.auth, isPending: value },
        })),
      reset: () =>
        set((state) => ({
          auth: {
            ...state.auth,
            showTwoFactor: false,
            error: undefined,
            success: undefined,
            isPending: false,
          },
        })),
    },
    contact: {
      currentSlide: 0,
      error: undefined,
      success: undefined,
      isPending: false,
      setCurrentSlide: (value) =>
        set((state) => ({
          contact: { ...state.contact, currentSlide: value },
        })),
      setError: (value) =>
        set((state) => ({
          contact: { ...state.contact, error: value },
        })),
      setSuccess: (value) =>
        set((state) => ({
          contact: { ...state.contact, success: value },
        })),
      setIsPending: (value) =>
        set((state) => ({
          contact: { ...state.contact, isPending: value },
        })),
      reset: () =>
        set((state) => ({
          contact: {
            ...state.contact,
            error: undefined,
            success: undefined,
            isPending: false,
          },
        })),
    },
    faq: {
      openIndex: null as number | null,
      setOpenIndex: (value: number | null) =>
        set((state) => ({
          faq: { ...state.faq, openIndex: value },
        })),
      toggleOpen: (index: number) =>
        set((state) => ({
          faq: {
            ...state.faq,
            openIndex: state.faq.openIndex === index ? null : index,
          },
        })),
    },
    settings: {
      error: undefined,
      success: undefined,
      isPending: false,
      setError: (value) =>
        set((state) => ({
          settings: { ...state.settings, error: value },
        })),
      setSuccess: (value) =>
        set((state) => ({
          settings: { ...state.settings, success: value },
        })),
      setIsPending: (value) =>
        set((state) => ({
          settings: { ...state.settings, isPending: value },
        })),
      reset: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            error: undefined,
            success: undefined,
            isPending: false,
          },
        })),
    },
    copyButton: {
      isCopied: false,
      setIsCopied: (value) =>
        set((state) => ({
          copyButton: { ...state.copyButton, isCopied: value },
        })),
    },
    passwordInput: {
      showPassword: false,
      setShowPassword: (value) =>
        set((state) => ({
          passwordInput: { ...state.passwordInput, showPassword: value },
        })),
    },
    speechToText: {
      isRecording: false,
      setIsRecording: (value) =>
        set((state) => ({
          speechToText: { ...state.speechToText, isRecording: value },
        })),
    },
    idNanoid: {
      id: '',
      setId: (value) =>
        set((state) => ({
          idNanoid: { ...state.idNanoid, id: value },
        })),
    },
    containerWidth: {
      width: 0,
      setWidth: (value) =>
        set((state) => ({
          containerWidth: { ...state.containerWidth, width: value },
        })),
    },
    legal: {
      title: '',
      setTitle: (value) =>
        set((state) => ({
          legal: { ...state.legal, title: value },
        })),
    },
  }));

export { createGlobalStore, type StoreState };
