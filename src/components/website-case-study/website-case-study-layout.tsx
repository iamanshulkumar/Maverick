"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechIcon } from "@/components/shared/tech-icon";
import { WebsiteHero } from "./website-hero";
import type { WebsiteProject } from "@/types";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface WebsiteCaseStudyLayoutProps {
  project: WebsiteProject;
}

export function WebsiteCaseStudyLayout({ project }: WebsiteCaseStudyLayoutProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? Math.min(top / height, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-accent via-accent/80 to-accent/40"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <WebsiteHero project={project} />

      {/* About */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-4">About the Project</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              {project.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              {project.challenge}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What I Built */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-8">What I Built</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.whatIBuilt.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, delay: i * 0.1 },
                  },
                }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h3 className="text-sm font-bold text-accent">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-2">Technology Stack</h2>
            <p className="text-sm text-muted-foreground mb-8">
              Core technologies powering the {project.title} storefront.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {project.techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3, delay: i * 0.05 },
                  },
                }}
                className="rounded-xl border border-border bg-card p-4 hover:border-accent/20 transition-colors duration-300"
              >
                <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                  <TechIcon name={tech} />
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-8">Key Features</h2>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.keyFeatures.map((feature, i) => (
              <motion.div
                key={feature}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, delay: i * 0.05 },
                  },
                }}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots (only if available) */}
      {project.screenshots.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl font-bold mb-8">Screenshots</h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((shot, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, delay: i * 0.1 },
                    },
                  }}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={shot.src}
                    alt={shot.caption || `${project.title} screenshot ${i + 1}`}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  {shot.caption && (
                    <div className="px-4 py-3 bg-card">
                      <p className="text-xs text-muted-foreground">{shot.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* My Contribution */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-4">My Contribution</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              {project.contribution}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-3">Interested in this project?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {project.demo
                ? "Check out the live website or get in touch."
                : "Get in touch to learn more about this project."}
            </p>
            <div className="flex justify-center gap-3">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <Button variant="accent" size="sm">
                    <ExternalLink size={14} className="mr-1.5" /> Visit Website
                  </Button>
                </a>
              )}
              <Link href="/projects">
                <Button variant="outline" size="sm">All Projects</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
