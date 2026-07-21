"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { FlowStep } from "./types";

interface FlowDiagramProps {
  title: string;
  steps: FlowStep[];
}

export function FlowDiagram({ title, steps }: FlowDiagramProps) {
  return (
    <section id="flow" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="flex flex-col items-center gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-xl border border-accent/20 bg-accent/5 px-6 py-3 text-center min-w-[200px]">
                {step.icon && <span className="block text-accent mb-1 flex justify-center">{step.icon}</span>}
                <span className="text-sm font-semibold text-foreground">{step.label}</span>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="flex flex-col items-center py-2">
                  <div className="h-6 w-px bg-border" />
                  <ArrowDown size={12} className="text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
