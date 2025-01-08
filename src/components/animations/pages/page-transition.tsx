"use client";

import { navigationSections } from "@/constants/nav";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const getTransitionConfig = (path: string) => {
  const section = navigationSections.find((section) =>
    section.items.some((item) => item.href === path),
  );

  if (section) {
    return { transition: { duration: 0.4, ease: "easeInOut" } };
  }

  if (path.startsWith("/dashboard")) {
    return { transition: { duration: 0.6, ease: "anticipate" } };
  }

  if (path.startsWith("/auth")) {
    return { transition: { duration: 0.3, ease: "easeOut" } };
  }

  return { transition: { duration: 0.5, ease: "easeInOut" } };
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (!document.startViewTransition) return;

    const handleNavigation = () => {
      document.startViewTransition(() => {});
    };

    window.addEventListener("navigate", handleNavigation);
    return () => window.removeEventListener("navigate", handleNavigation);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        {...getTransitionConfig(pathname)}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};
