"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { User, Calendar, Smartphone, ExternalLink, Github, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "@/components/shared/tech-icon";
import type { Project } from "@/types";

interface StatChip {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

interface FloatingCard {
  label: string;
  value: string;
  color: string;
  delay: number;
  side: "left" | "right";
  top: string;
}

interface HeroWithStatsProps {
  project: Project;
  badgeLabel: string;
  platform: string;
  gradient?: string;
  statChips: StatChip[];
  floatingCards: FloatingCard[];
  phoneImage?: React.ReactNode;
}

export function HeroWithStats({ project, badgeLabel, platform, gradient, statChips, floatingCards, phoneImage }: HeroWithStatsProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const counters = counterRef.current?.querySelectorAll("[data-counter]");
    if (!counters) return;
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (target > 1000) {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          } else {
            el.textContent = Math.floor(obj.val) + suffix;
          }
        },
      });
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className={`relative pt-20 pb-16 overflow-hidden${gradient ? ` ${gradient}` : ""}`}>
      <div className="mx-auto max-w-6xl px-4 relative">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-1.5 text-md text-muted-foreground transition-colors hover:text-foreground">
          ← Back to projects
        </Link>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-3">
              <Badge variant="accent" className="text-xs">{badgeLabel}</Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">{project.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5 text-md text-muted-foreground"><User size={14} /> <span className="text-foreground">{project.role}</span></span>
              <span className="flex items-center gap-1.5 text-md text-muted-foreground"><Calendar size={14} /> <span className="text-foreground">{project.timeline}</span></span>
              <span className="flex items-center gap-1.5 text-md text-muted-foreground"><Smartphone size={14} /> <span className="text-foreground">{platform}</span></span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, 6).map((tech) => (
                <Badge key={tech} variant="accent" className="flex items-center gap-1"><TechIcon name={tech} />{tech}</Badge>
              ))}
              {project.techStack.length > 6 && <Badge variant="outline">+{project.techStack.length - 6}</Badge>}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer"><Button variant="accent" size="sm"><ExternalLink size={14} className="mr-1.5" /> Live Demo</Button></a>}
              {project.github && !project.isPrivate && <a href={project.github} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm"><Github size={14} className="mr-1.5" /> Source Code</Button></a>}
              {project.isPrivate && <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-md text-muted-foreground"><Lock size={14} /> Private repository</div>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative flex justify-center">
            <div className="relative w-full max-w-[500px]">
              {phoneImage}
              {floatingCards.map((card) => (
                <motion.div key={card.label}
                  className={`absolute rounded-lg border border-border bg-card px-3 py-2 shadow-lg ${card.side === "right" ? "-right-16" : "-left-16"}`}
                  style={{ top: card.top }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + card.delay, duration: 0.3 }}>
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3 + card.delay, repeat: Infinity, ease: "easeInOut" }}>
                    <span className="text-md text-muted-foreground">{card.label}</span>
                    <span className={`block text-md font-bold ${card.color}`}>{card.value}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div ref={counterRef} className="mt-12 flex flex-wrap justify-center gap-2">
          {statChips.map((chip) => (
            <div key={chip.label} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2">
              <span className="text-accent">{chip.icon}</span>
              <span className="text-xs font-semibold text-foreground">{chip.label}</span>
              <span data-counter data-target={chip.value} data-suffix={chip.suffix} className="text-xs font-mono text-accent">0{chip.suffix}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
