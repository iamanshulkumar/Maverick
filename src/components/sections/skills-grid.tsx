"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ScrollStagger } from "@/components/shared/scroll-stagger";
import { TechIcon } from "@/components/shared/tech-icon";
import { getSkills } from "@/lib/data";
import { Monitor, Server, Smartphone, Brain, Shield, Database } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={20} />,
  server: <Server size={20} />,
  smartphone: <Smartphone size={20} />,
  brain: <Brain size={20} />,
  shield: <Shield size={20} />,
  database: <Database size={20} />,
};

export function TechnicalExpertise() {
  const skills = getSkills();

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <div className="mb-12">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Expertise
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Technical Expertise
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl">
              Domains I work in and the technologies I use.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((domain) => (
            <div
              key={domain.category}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/20"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-accent">{iconMap[domain.icon]}</span>
                <h3 className="text-base font-semibold">{domain.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {domain.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    <TechIcon name={item.name} size={12} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
