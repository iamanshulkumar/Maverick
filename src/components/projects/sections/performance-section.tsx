"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
}

const metrics: Metric[] = [
  { value: 82, suffix: "ms", label: "Execution Latency", sublabel: "API round-trip time", color: "text-emerald-400" },
  { value: 999, suffix: "%", label: "Broker Connection", sublabel: "Uptime reliability", color: "text-emerald-400" },
  { value: 5000, suffix: "+", label: "Backtests Completed", sublabel: "Historical simulations", color: "text-accent" },
  { value: 78, suffix: "%", label: "Redis Cache Hit", sublabel: "AI cost reduction", color: "text-accent" },
  { value: 3000, suffix: "+", label: "Socket Connections", sublabel: "Concurrent real-time clients", color: "text-cyan-400" },
  { value: 120, suffix: "ms", label: "API Response", sublabel: "P95 endpoint latency", color: "text-emerald-400" },
];

function Counter({ target, suffix, enabled }: { target: number; suffix: string; enabled: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const start = performance.now();
    const duration = 2000;
    let frame: number;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      if (ref.current) {
        ref.current.textContent = (target > 1000 ? current.toLocaleString() : current) + suffix;
      }
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [enabled, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function PerformanceSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="performance" className="py-20" ref={ref}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Performance</h2>
          <p className="mt-2 text-sm text-muted-foreground">Production metrics from the live platform</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-xl border border-border bg-card p-4 overflow-hidden"
            >
              <div className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className={`h-full w-full rounded-full blur-3xl ${m.color.replace("text-", "bg-").replace("emerald", "emerald").replace("accent", "accent").replace("cyan", "cyan")}/[0.05]`} />
              </div>
              <div className="relative">
                <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">{m.sublabel}</p>
                <span className={`mt-1 block text-2xl font-bold tracking-tight ${m.color} tabular-nums`}>
                  <Counter target={m.value} suffix={m.suffix} enabled={inView} />
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