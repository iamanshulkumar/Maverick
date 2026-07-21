"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GitBranch, Zap, Database } from "lucide-react";
import type { LessonItem } from "./types";

const lessonIcons = [<GitBranch size={14} />, <Zap size={14} />, <Database size={14} />];

interface LessonsAccordionProps {
  lessons: LessonItem[];
}

export function LessonsAccordion({ lessons }: LessonsAccordionProps) {
  return (
    <section id="lessons" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">What I&apos;d Build Differently</h2>
          <p className="mt-2 text-sm text-muted-foreground">Honest reflections with today&apos;s context</p>
        </div>

        <div className="space-y-3">
          {lessons.map((item, i) => {
            const [isOpen, setIsOpen] = useState(i === 0);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card overflow-hidden">
                <button onClick={() => setIsOpen(!isOpen)}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-hover">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {lessonIcons[i % lessonIcons.length]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground leading-snug block">{item.title}</span>
                  </div>
                  <ChevronDown size={14} className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="border-t border-border px-4 py-4 space-y-3">
                        <div>
                          <span className="text-xs font-medium text-accent uppercase tracking-wider">What I&apos;d do</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.what}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Why</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.why}</p>
                        </div>
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Impact</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.impact}</p>
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
