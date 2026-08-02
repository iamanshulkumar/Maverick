"use client";

import type { ResultItem } from "./types";

interface ResultsProps {
  title: string;
  items: ResultItem[];
}

export function Results({ title, items }: ResultsProps) {
  return (
    <section id="results" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Results</h2>
          <p className="mt-2 text-sm text-muted-foreground">{title}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">{item.icon}</div>
              <span className="text-xl font-bold text-foreground tracking-tight">{item.metric}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
              <p className="mt-2 text-xs text-muted-foreground/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
