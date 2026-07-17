"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { getExperience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function InteractiveTimeline() {
  const experience = getExperience();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle
          label="Career"
          title="Experience"
          description="My professional journey — click each role for details."
        />
        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-accent via-accent-cyan to-transparent" />
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative pl-16"
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="absolute left-4 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-background transition-colors hover:border-accent"
                  aria-label={expanded === i ? "Collapse" : "Expand"}
                >
                  <Briefcase size={14} className="text-accent" />
                </button>
                <div
                  className={cn(
                    "cursor-pointer rounded-xl border border-border bg-card p-5 transition-all duration-200",
                    expanded === i && "border-accent/30"
                  )}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-accent">{exp.duration}</span>
                      <h3 className="mt-1 text-lg font-semibold">{exp.role}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "text-muted-foreground transition-transform duration-200",
                        expanded === i && "rotate-180"
                      )}
                    />
                  </div>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 border-t border-border pt-4">
                          <p className="mb-2 text-xs font-medium text-accent uppercase tracking-wider">Responsibilities</p>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((r, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {r}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-4 mb-2 text-xs font-medium text-accent-cyan uppercase tracking-wider">Key Achievements</p>
                          <ul className="space-y-2">
                            {exp.achievements.map((a, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Click each role to expand details
        </p>
      </div>
    </section>
  );
}
