"use client";

import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import type { Project } from "@/types";

interface ArchitectureProps {
  project: Project;
}

export function Architecture({ project }: ArchitectureProps) {
  const hasDiagram = !!project.architectureDiagram;

  return (
    <section id="architecture" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">System Architecture</h2>
          {project.architecture && (
            <p className="mt-2 text-sm text-muted-foreground">{project.architecture}</p>
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="rounded-xl border border-border bg-card p-6">
          {hasDiagram && (
            <div className="overflow-x-auto mb-4">
              <pre className="text-xs leading-relaxed text-muted-foreground font-mono">
                <code>{project.architectureDiagram}</code>
              </pre>
            </div>
          )}
          {project.architectureDescription && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.architectureDescription}
            </p>
          )}
          {!hasDiagram && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <GitBranch size={16} className="text-accent shrink-0" />
              <span>{project.architecture}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
