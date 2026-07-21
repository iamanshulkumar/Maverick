"use client";

import { motion } from "framer-motion";
import type { CaseStudySection } from "./types";

interface FloatingNavProps {
  sections: CaseStudySection[];
  visible: boolean;
  activeSection: string;
  onScrollTo: (id: string) => void;
}

export function FloatingNav({ sections, visible, activeSection, onScrollTo }: FloatingNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="fixed right-4 top-1/2 z-50 -translate-y-1/2 hidden lg:block"
    >
      <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-2 shadow-lg">
        <div className="space-y-1">
          {sections.map((s) => (
            <button key={s.id} onClick={() => onScrollTo(s.id)} className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-left transition-all duration-200 group">
              <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeSection === s.id ? "bg-accent w-3" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"}`} />
              <span className={`text-xs font-medium transition-all duration-300 ${activeSection === s.id ? "text-accent opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-60"}`}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
