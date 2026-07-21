"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface StorySectionProps {
  title: string;
  body: string;
  coda: string;
}

export function StorySection({ title, body, coda }: StorySectionProps) {
  return (
    <section id="story" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8">
          The Problem
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          className="text-2xl leading-relaxed text-foreground/80 sm:text-3xl sm:leading-relaxed md:text-4xl md:leading-relaxed font-light">
          {title}
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {body}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-card">
              <ArrowDown size={18} className="text-accent" />
            </div>
          </div>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 text-lg text-muted-foreground/60 font-light italic">
          {coda}
        </motion.p>
      </div>
    </section>
  );
}
