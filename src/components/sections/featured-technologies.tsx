"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ScrollStagger } from "@/components/shared/scroll-stagger";
import { TechIcon } from "@/components/shared/tech-icon";
import { getProjects, getWebsites } from "@/lib/data";

const featuredTech = [
  { name: "React Native", slug: "react-native" },
  { name: "Node.js", slug: "nodejs" },
  { name: "MySQL", slug: "mysql" },
  { name: "Firebase", slug: "firebase" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Redis", slug: "redis" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "TypeScript", slug: "typescript" },
];

function getProjectsForTech(techName: string) {
  const allProjects = [...getProjects(), ...getWebsites()];
  return allProjects
    .filter((p) =>
      p.techStack.some((t) => t.toLowerCase().includes(techName.toLowerCase()))
    )
    .slice(0, 3);
}

export function FeaturedTechnologies() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <div className="mb-12">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Stack Explorer
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Technologies → Projects
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl">
              Select a technology to see the projects that demonstrate it.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTech.map((tech) => {
            const techProjects = getProjectsForTech(tech.name);
            return (
              <div
                key={tech.name}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/20"
              >
                <div className="flex items-center gap-3">
                  <TechIcon name={tech.name} size={20} />
                  <h3 className="text-base font-semibold">{tech.name}</h3>
                </div>
                <div className="mt-4 space-y-2">
                  {techProjects.length > 0 ? (
                    techProjects.map((proj) => (
                      <Link
                        key={proj.slug}
                        href={`/projects/${proj.slug}`}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors group/link"
                      >
                        <ArrowRight size={12} className="shrink-0" />
                        <span className="group-hover/link:underline">{proj.title}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground/50">No featured projects</p>
                  )}
                </div>
              </div>
            );
          })}
        </ScrollStagger>
      </div>
    </section>
  );
}
