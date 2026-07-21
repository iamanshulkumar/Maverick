"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types";
import type { ProjectIdentity, HeroTag } from "./types";

interface HeroProps {
  project: Project;
  identity: ProjectIdentity;
  icon: React.ReactNode;
  badgeLabel: string;
  heroTags: HeroTag[];
}

export function Hero({ project, identity, icon, badgeLabel, heroTags }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${identity.accentFrom} ${identity.accentVia} ${identity.accentTo}`} />
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${identity.primaryFaded} via-transparent to-transparent`} />
      <div className="relative mx-auto max-w-5xl px-4 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className={`inline-flex items-center gap-2 rounded-full border ${identity.primaryFaded.replace("from-", "border-").replace("/5", "/20")} ${identity.primaryFaded} px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-6`}>
            {icon} {badgeLabel}
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{project.tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {heroTags.map((tag) => (
              <span key={tag.text} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                {tag.icon} {tag.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
