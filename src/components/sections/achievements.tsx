"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/shared/section-title";
import { getAchievements } from "@/lib/data";
import { Shield, Briefcase, Smartphone, TrendingUp, Users, Star } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={20} />,
  briefcase: <Briefcase size={20} />,
  smartphone: <Smartphone size={20} />,
  "trending-up": <TrendingUp size={20} />,
  users: <Users size={20} />,
  star: <Star size={20} />,
};

const colorMap: Record<string, string> = {
  accent: "border-accent/30 bg-accent/10 text-accent",
  "accent-cyan": "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  "accent-light": "border-accent-light/30 bg-accent-light/10 text-accent-light",
};

export function Achievements() {
  const achievements = getAchievements();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Milestones"
          title="Achievements"
          description="Key milestones and what they actually mean."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/20 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border ${colorMap[achievement.color] || colorMap.accent}`}
                >
                  {iconMap[achievement.icon]}
                </div>
                <span className="text-2xl font-bold text-accent">{achievement.value}</span>
              </div>
              <div className="mt-1 font-medium">{achievement.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{achievement.description}</p>
              <p className="mt-3 text-xs text-accent/70 italic leading-relaxed">
                {achievement.why}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
