"use client";

import { motion } from "framer-motion";
import type { TimelineItem } from "./types";

interface TimelineProps {
  title: string;
  items: TimelineItem[];
}

export function Timeline({ title, items }: TimelineProps) {
  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Build Timeline</h2>
          <p className="mt-2 text-sm text-muted-foreground">{title}</p>
        </div>

        <div className="relative">
          <div className="absolute left-[18px] top-0 h-full w-px bg-border md:left-1/2" />
          <div className="space-y-8">
            {items.map((item, i) => (
              <motion.div key={item.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative flex items-start gap-4 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 order-2 md:order-none ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <span className="text-xs font-bold text-accent">Phase {item.phase}</span>
                    <h3 className="mt-1 text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="order-1 md:order-none relative z-10 flex shrink-0 items-center justify-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent/30 bg-card">
                    <span className="text-xs font-bold text-accent">{item.phase}</span>
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
