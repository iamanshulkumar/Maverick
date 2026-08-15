"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/shared/project-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ScrollStagger } from "@/components/shared/scroll-stagger";
import { getFeaturedProjects } from "@/lib/data";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <div className="mb-12">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Projects
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Featured Work
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl">
              A selection of projects I&apos;ve built and delivered.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </ScrollStagger>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              View all projects <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
