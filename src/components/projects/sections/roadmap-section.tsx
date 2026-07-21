"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const nextProject = {
  slug: "wealth-walk",
  title: "Wealth Walk",
  tagline: "Enterprise Trading Platform",
  description: "A full-service investment platform with portfolio management, market analysis, and institutional-grade reporting.",
  gradient: "from-emerald-500/20 via-transparent to-emerald-500/5",
  accent: "text-emerald-400",
  borderColor: "border-emerald-500/20",
  icon: <TrendingUp size={24} />,
};

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground/60 mb-8">
            Want to see another complex production system?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block"
          >
            <div className={`relative overflow-hidden rounded-2xl border ${nextProject.borderColor} bg-gradient-to-br ${nextProject.gradient} p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/[0.03]`}>
              <div className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="h-full w-full rounded-full bg-accent/5 blur-3xl" />
              </div>

              <div className="relative">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${nextProject.accent} bg-accent/10`}>
                  {nextProject.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-foreground">{nextProject.title}</h3>
                <p className={`mt-1 text-sm font-medium ${nextProject.accent}`}>{nextProject.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {nextProject.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-5 py-2 text-xs font-medium text-accent transition-all duration-300 group-hover:bg-accent/10 group-hover:gap-3">
                  View Project
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}