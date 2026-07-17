"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { getProjects } from "@/lib/data";

const featuredTech = [
  { name: "React Native", slug: "react-native" },
  { name: "Next.js", slug: "nextjs" },
  { name: "Node.js", slug: "nodejs" },
  { name: "LangChain", slug: "langchain" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Docker", slug: "docker" },
  { name: "TypeScript", slug: "typescript" },
];

const projects = getProjects();

interface TechProject {
  title: string;
  slug: string;
  github?: string;
  demo?: string;
  isPrivate?: boolean;
}

function getProjectsForTech(techName: string): TechProject[] {
  return projects
    .filter((p) =>
      p.techStack.some((t) => t.toLowerCase().includes(techName.toLowerCase()))
    )
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      github: p.github,
      demo: p.demo,
      isPrivate: p.isPrivate,
    }));
}

export function FeaturedTechnologies() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Stack Explorer"
          title="Technologies → Projects"
          description="Select a technology to see the projects that demonstrate it. Each project links to its full case study and repository."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTech.map((tech, i) => {
            const techProjects = getProjectsForTech(tech.name);
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/20"
              >
                <h3 className="font-semibold text-sm">{tech.name}</h3>
                <div className="mt-4 space-y-3">
                  {techProjects.length > 0 ? (
                    techProjects.slice(0, 3).map((proj) => (
                      <div key={proj.slug} className="space-y-1">
                        <Link
                          href={`/projects/${proj.slug}`}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors group/link"
                        >
                          <ArrowRight size={10} className="shrink-0" />
                          <span className="group-hover/link:underline">{proj.title}</span>
                        </Link>
                        <div className="flex items-center gap-2 pl-[18px]">
                          {proj.github && !proj.isPrivate ? (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-muted-foreground/60 hover:text-accent transition-colors flex items-center gap-0.5"
                            >
                              <Github size={10} /> repo
                            </a>
                          ) : null}
                          {proj.demo ? (
                            <a
                              href={proj.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-muted-foreground/60 hover:text-accent transition-colors flex items-center gap-0.5"
                            >
                              <ExternalLink size={10} /> demo
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground/50">No featured projects</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
