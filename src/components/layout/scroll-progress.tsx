"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 z-[100] h-0.5 w-full bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-accent to-accent-cyan transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
