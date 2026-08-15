"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ScrollStagger } from "@/components/shared/scroll-stagger";
import { getExperience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function InteractiveTimeline() {
  const experience = getExperience();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <div className="mb-12">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Career
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Experience
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl">
              My professional journey — click each role for details.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experience.map((exp, i) => (
            <div
              key={`${exp.company}-${exp.role}`}
              className="rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/20"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{exp.duration}</span>
                </div>
                <h3 className="text-base font-semibold">{exp.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{exp.company}</p>

                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className={cn(
                    "mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/20 hover:text-accent",
                    expanded === i && "border-accent/20 text-accent"
                  )}
                >
                  {expanded === i ? "Show less" : "Show more"}
                  <ChevronDown
                    size={12}
                    className={cn(
                      "transition-transform duration-200",
                      expanded === i && "rotate-180"
                    )}
                  />
                </button>
              </div>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-6 pb-6 pt-4">
                      <p className="mb-2 text-xs font-medium text-accent uppercase tracking-wider">Responsibilities</p>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((r, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 mb-2 text-xs font-medium text-accent uppercase tracking-wider">Key Achievements</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
