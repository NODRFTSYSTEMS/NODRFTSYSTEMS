"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const BRAND_EASE = [0.16, 1, 0.3, 1] as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReduced ? {} : { clipPath: "inset(0 100% 0 0)" }}
        animate={prefersReduced ? {} : { clipPath: "inset(0 0% 0 0)" }}
        exit={prefersReduced ? {} : { opacity: 0 }}
        transition={
          prefersReduced
            ? {}
            : {
                clipPath: { duration: 0.28, ease: BRAND_EASE },
                opacity: { duration: 0.12 },
              }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
