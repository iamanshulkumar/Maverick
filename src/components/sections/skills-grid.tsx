"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/shared/section-title";
import { getSkills } from "@/lib/data";
import { Monitor, Server, Smartphone, Brain, Shield, Cloud } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={20} />,
  server: <Server size={20} />,
  smartphone: <Smartphone size={20} />,
  brain: <Brain size={20} />,
  shield: <Shield size={20} />,
  cloud: <Cloud size={20} />,
};

export function TechnicalExpertise() {
  const skills = getSkills();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Expertise"
          title="Technical Expertise"
          description="Domains I work in and the technologies I use."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((domain, i) => (
            <motion.div
              key={domain.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/20"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-accent">{iconMap[domain.icon]}</span>
                <h3 className="font-medium">{domain.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {domain.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {item.name}
                    <span className="ml-1.5 text-[10px] text-accent">{item.years}y</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
