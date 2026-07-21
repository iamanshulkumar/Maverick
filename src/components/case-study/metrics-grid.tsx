"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { MetricItem } from "./types";

interface MetricsGridProps {
  metrics: MetricItem[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); startedRef.current = true; observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="metrics" className="py-20" ref={ref}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">By the Numbers</h2>
          <p className="mt-2 text-sm text-muted-foreground">Key metrics from the platform</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-xl border border-border bg-card p-4 overflow-hidden">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3">{m.icon}</div>
                <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">{m.sublabel}</p>
                <span className={`mt-1 block text-2xl font-bold tracking-tight ${m.color} tabular-nums`}>
                  {inView ? (m.value >= 1000 ? `${(m.value).toLocaleString()}${m.suffix}` : `${m.value}${m.suffix}`) : `0${m.suffix}`}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
