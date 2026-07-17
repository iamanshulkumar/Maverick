"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Lock, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import type { Project } from "@/types";

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> Back to projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 aspect-video w-full rounded-xl bg-gradient-to-br from-accent/10 to-accent-cyan/10 flex items-center justify-center">
            <div className="p-12 text-center">
              <h1 className="text-3xl font-bold sm:text-4xl">{project.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{project.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <User size={14} /> Role: <span className="text-foreground">{project.role}</span>
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={14} /> Timeline: <span className="text-foreground">{project.timeline}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="accent">{tech}</Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Button variant="accent" size="sm">
                  <ExternalLink size={14} className="mr-1.5" /> Live Demo
                </Button>
              </a>
            )}
            {project.github && !project.isPrivate && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Github size={14} className="mr-1.5" /> Source Code
                </Button>
              </a>
            )}
            {project.isPrivate && (
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                <Lock size={14} /> Source is private due to client confidentiality
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-16 space-y-12">
          <AnimatedSection>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{project.overview}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Problem</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Solution</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Architecture</h2>
              <div className="mt-4 aspect-video w-full rounded-lg bg-gradient-to-br from-accent/5 to-accent-cyan/5 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Architecture Diagram</p>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">{project.architecture}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Challenges</h2>
              <ul className="mt-4 space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Technical Outcomes</h2>
                <div className="mt-4 space-y-4">
                  {project.technicalOutcomes.map((result, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <span className="text-sm text-muted-foreground">{result.metric}</span>
                      <span className="text-lg font-bold text-accent">{result.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Business Impact</h2>
                <div className="mt-4 space-y-4">
                  {project.businessOutcomes.map((result, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <span className="text-sm text-muted-foreground">{result.metric}</span>
                      <span className="text-lg font-bold text-accent-cyan">{result.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">
                  {project.businessImpact}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Lessons Learned</h2>
              <ul className="mt-4 space-y-3">
                {project.lessons.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </article>
  );
}
