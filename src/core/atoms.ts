import { atom } from 'jotai/vanilla';

export const isMenuOpenAtom = atom(false);
export const visibleAtom = atom(true);
export const prevScrollPosAtom = atom(0);

export const handleScrollAtom = atom(
  (get) => ({ visible: get(visibleAtom), prevScrollPos: get(prevScrollPosAtom) }),
  (get, set) => {
    const currentScrollY = window.scrollY;
    const prevScrollPos = get(prevScrollPosAtom);

    if (currentScrollY === 0) {
      set(visibleAtom, true);
      return;
    }

    if (currentScrollY < prevScrollPos) {
      set(visibleAtom, true);
    } else if (currentScrollY > prevScrollPos) {
      set(visibleAtom, false);
    }

    set(prevScrollPosAtom, currentScrollY);
  },
);
