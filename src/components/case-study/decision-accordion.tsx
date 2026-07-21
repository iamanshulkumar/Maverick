"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";
import type { DecisionItem } from "./types";

interface DecisionAccordionProps {
  decisions: DecisionItem[];
}

export function DecisionAccordion({ decisions }: DecisionAccordionProps) {
  return (
    <section id="decisions" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Engineering Decisions</h2>
          <p className="mt-2 text-sm text-muted-foreground">Architecture choices, tradeoffs, and their real-world impact</p>
        </div>

        <div className="space-y-2">
          {decisions.map((d, i) => {
            const [isOpen, setIsOpen] = useState(i === 0);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card overflow-hidden">
                <button onClick={() => setIsOpen(!isOpen)}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-hover">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">{d.icon}</div>
                  <span className="flex-1 text-sm font-medium text-foreground">{d.title}</span>
                  <ChevronDown size={14} className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="border-t border-border px-4 py-4 space-y-3">
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Alternatives Considered</span>
                          <p className="mt-1 text-xs text-muted-foreground">{d.alternatives}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-amber-400 uppercase tracking-wider flex items-center gap-1.5"><Zap size={10} /> Tradeoff</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.tradeoff}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-accent uppercase tracking-wider">Decision</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.decision}</p>
                        </div>
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Impact</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.impact}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
