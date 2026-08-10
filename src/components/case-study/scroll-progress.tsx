"use client";

import { motion } from "framer-motion";

interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-accent via-accent/80 to-accent/40"
        style={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
