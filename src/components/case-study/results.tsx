"use client";

import { motion } from "framer-motion";
import type { ResultItem } from "./types";

interface ResultsProps {
  title: string;
  items: ResultItem[];
}

export function Results({ title, items }: ResultsProps) {
  return (
    <section id="results" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold">Results</h2>
          <p className="mt-2 text-sm text-muted-foreground">{title}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">{item.icon}</div>
              <span className="text-xl font-bold text-foreground tracking-tight">{item.metric}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
              <p className="mt-2 text-xs text-muted-foreground/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
