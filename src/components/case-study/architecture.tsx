"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, ChevronDown, Server, Database, Layers, Wifi } from "lucide-react";
import type { Project } from "@/types";

interface ArchitectureProps {
  project: Project;
}

const iconFor = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("react native") || t.includes("expo")) return <Layers size={14} />;
  if (t.includes("node") || t.includes("express") || t.includes("laravel") || t.includes("python")) return <Server size={14} />;
  if (t.includes("postgres") || t.includes("mongo") || t.includes("redis") || t.includes("sql")) return <Database size={14} />;
  if (t.includes("socket") || t.includes("stream") || t.includes("firebase") || t.includes("websocket")) return <Wifi size={14} />;
  return <GitBranch size={14} />;
};

export function Architecture({ project }: ArchitectureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDiagram = !!project.architectureDiagram;
  const hasDetails = hasDiagram || project.architectureDescription;
  const summary = project.architectureSummary || project.architecture;

  return (
    <section id="architecture" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">System Architecture</h2>
          {summary && (
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">{summary}</p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {project.techStack.slice(0, 8).map((tech) => (
            <span key={tech} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
              {iconFor(tech)} {tech}
            </span>
          ))}
        </div>

        {hasDetails && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-accent/30 hover:text-accent"
            >
              <GitBranch size={14} />
              View Technical Details
              <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        <AnimatePresence>
          {isOpen && hasDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-8 rounded-xl border border-border bg-card p-6 space-y-4">
                {project.architectureDescription && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.architectureDescription}
                  </p>
                )}
                {hasDiagram && (
                  <div className="overflow-x-auto rounded-lg bg-background p-4">
                    <pre className="text-xs leading-relaxed text-muted-foreground font-mono whitespace-pre">
                      <code>{project.architectureDiagram}</code>
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
