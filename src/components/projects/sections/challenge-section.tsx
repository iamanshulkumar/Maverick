"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function ChallengeSection() {
  return (
    <section id="challenge" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8"
        >
          The Problem
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-2xl leading-relaxed text-foreground/80 sm:text-3xl sm:leading-relaxed md:text-4xl md:leading-relaxed font-light"
        >
          Retail traders have access to hundreds of indicators, but very few tools help them combine
          {" "}<span className="font-semibold text-foreground">market sentiment, automated strategies, backtesting, broker execution, and AI</span>
          {" "}into a single workflow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-card">
              <ArrowDown size={18} className="text-accent" />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 text-lg text-muted-foreground/60 font-light italic"
        >
          I wanted to solve that.
        </motion.p>
      </div>
    </section>
  );
}