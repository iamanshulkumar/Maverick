"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Zap } from "lucide-react";
import type { FeatureItem } from "./types";

interface FeatureExplorerProps {
  features: FeatureItem[];
}

export function FeatureExplorer({ features }: FeatureExplorerProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = features[activeFeature];

  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-4">
            <Eye size={12} /> Experience the Platform
          </div>
          <h2 className="text-2xl font-bold">Product Experience</h2>
          <p className="mt-2 text-sm text-muted-foreground">Every feature, explained with the engineering behind it</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-0.5 lg:col-span-2">
            {features.map((f, i) => (
              <button key={f.id} onClick={() => setActiveFeature(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-300 ${activeFeature === i ? "border border-accent/30 bg-accent/10" : "border border-transparent hover:bg-surface-hover"}`}>
                <span className={`shrink-0 font-mono text-xs transition-colors ${activeFeature === i ? "text-accent" : "text-muted-foreground/40"}`}>{f.number}</span>
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${activeFeature === i ? "bg-accent text-white" : "bg-card text-muted-foreground"}`}>{f.icon}</div>
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-medium ${activeFeature === i ? "text-accent" : "text-foreground"}`}>{f.label}</span>
                  {activeFeature === i && <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.4 }} className="mt-0.5 block h-0.5 rounded-full bg-accent" />}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div key={feature.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground/40">{feature.number}</span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{feature.title}</h3>
                    <p className="mt-0.5 text-xs text-accent font-medium">{feature.tagline}</p>
                  </div>
                  <div className="space-y-3 rounded-xl border border-border/50 bg-card/50 p-4">
                    <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap size={10} /> Engineering
                    </p>
                    <div>
                      <p className="text-[10px] text-amber-400/80 uppercase tracking-wider font-medium">Problem</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{feature.problem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-accent uppercase tracking-wider font-medium">Solution</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{feature.solution}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {feature.metrics.split(" | ").map((m) => (
                        <span key={m} className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[10px] text-emerald-400 font-medium">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
