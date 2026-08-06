"use client";

import type { TechItem } from "./types";
import { TechIcon } from "@/components/shared/tech-icon";

interface TechStackProps {
  title: string;
  items: TechItem[];
}

export function TechStack({ title, items }: TechStackProps) {
  return (
    <section id="stack" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Technology Stack</h2>
          <p className="mt-2 text-sm text-muted-foreground">{title}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((tech) => (
            <div key={tech.name} className="rounded-xl border border-border bg-card p-4 hover:border-accent/20 transition-colors duration-300">
              <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                <TechIcon name={tech.name} />
                {tech.name}
              </span>
              <span className="block text-[10px] text-muted-foreground/60 mt-0.5">{tech.cat}</span>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
