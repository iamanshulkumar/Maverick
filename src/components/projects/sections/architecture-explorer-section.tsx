"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { aiAnalyzerConfig } from "@/components/projects/ai-analyzer-arch-config";
import { BullMQIcon, RedisIcon, MongoIcon, MetaAPIIcon, NodeIcon } from "@/components/shared/tech-icons";

const InteractiveArchitecture = dynamic(
  () => import("@/components/shared/interactive-architecture").then((m) => ({ default: m.InteractiveArchitecture })),
  { ssr: false }
);

const techFilters = [
  { id: "BullMQ", label: "BullMQ", icon: <BullMQIcon size={12} /> },
  { id: "Redis", label: "Redis", icon: <RedisIcon size={12} /> },
  { id: "MongoDB", label: "MongoDB", icon: <MongoIcon size={12} /> },
  { id: "MetaAPI", label: "MetaAPI", icon: <MetaAPIIcon size={12} /> },
  { id: "Node.js", label: "Node.js", icon: <NodeIcon size={12} /> },
];

export function ArchitectureExplorerSection() {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const highlightFilter = activeTech ? (aiAnalyzerConfig.technologyNodes?.[activeTech] || null) : null;

  return (
    <section id="architecture" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Architecture Explorer</h2>
          <p className="mt-2 text-sm text-muted-foreground">Interactive real-time trading engine — click to inspect, run simulations, filter by technology</p>
        </div>

        {/* Tech filter chips */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTech(null)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              !activeTech
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-card text-muted-foreground hover:text-accent hover:border-accent/40"
            }`}
          >
            All Components
          </button>
          {techFilters.map((tech) => (
            <motion.button
              key={tech.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTech(activeTech === tech.id ? null : tech.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeTech === tech.id
                  ? "border-accent bg-accent/10 text-accent shadow-[0_0_10px_rgba(99,102,241,0.15)]"
                  : "border-border bg-card text-muted-foreground hover:text-accent hover:border-accent/40"
              }`}
            >
              <span className="text-current">{tech.icon}</span>
              {tech.label}
            </motion.button>
          ))}
        </div>

        <InteractiveArchitecture config={aiAnalyzerConfig} highlightFilter={highlightFilter} />
      </div>
    </section>
  );
}
