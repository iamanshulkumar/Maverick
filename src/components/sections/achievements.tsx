"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ScrollStagger } from "@/components/shared/scroll-stagger";
import { getAchievements } from "@/lib/data";

export function Achievements() {
  const achievements = getAchievements();

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <div className="mb-12">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Milestones
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Achievements
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl">
              Key milestones and what they actually mean.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/20"
            >
              <span className="text-4xl font-bold text-accent tracking-tight">
                {achievement.value}
              </span>
              <h3 className="mt-3 text-base font-semibold">{achievement.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
