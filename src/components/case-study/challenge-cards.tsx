"use client";

import { motion } from "framer-motion";
import type { ChallengeItem } from "./types";

interface ChallengeCardsProps {
  challenges: ChallengeItem[];
}

export function ChallengeCards({ challenges }: ChallengeCardsProps) {
  return (
    <section id="challenges" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Engineering Challenges</h2>
          <p className="mt-2 text-sm text-muted-foreground">Problems solved during development</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-3 border-b border-border bg-surface-hover p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">{c.icon}</div>
                <h3 className="text-sm font-semibold">{c.label}</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-[10px] font-medium text-amber-400 uppercase tracking-wider">Problem</span>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-accent uppercase tracking-wider">Solution</span>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.solution}</p>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Result</span>
                  <p className="mt-1 text-xs text-muted-foreground">{c.result}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {c.metrics.map((m) => (
                      <span key={m} className="rounded-md border border-emerald-500/20 bg-background px-2 py-0.5 text-[10px] text-emerald-400 font-medium">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
