"use client";

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
        <p
          className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8">
          The Problem
        </p>
        <p
          className="text-2xl leading-relaxed text-foreground/80 sm:text-3xl sm:leading-relaxed md:text-4xl md:leading-relaxed font-light">
          {title}
        </p>
        <p
          className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {body}
        </p>
        <div className="mt-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-card">
              <ArrowDown size={18} className="text-accent" />
            </div>
          </div>
        </div>
        <p
          className="mt-8 text-lg text-muted-foreground/60 font-light italic">
          {coda}
        </p>
      </div>
    </section>
  );
}
