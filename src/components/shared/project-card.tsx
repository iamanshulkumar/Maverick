"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Lock, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "@/components/shared/tech-icon";
import { AnimatePresence, motion } from "framer-motion";
import type { AnyProject, Project, WebsiteProject } from "@/types";

interface ProjectCardProps {
  project: AnyProject;
  index: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isWebsite = project.projectKind === "website";
  const overview = isWebsite
    ? (project as WebsiteProject).overview
    : (project as Project).overview;
  const whatIBuilt = isWebsite
    ? (project as WebsiteProject).whatIBuilt
    : undefined;

  return (
    <div
      className="group rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/20"
    >
      {/* Thumbnail */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">{project.tagline}</p>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            <h3 className="text-base font-semibold text-foreground">
              {project.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
            {isWebsite ? <ArrowUpRight size={14} /> : project.isPrivate ? <Lock size={14} /> : <ArrowUpRight size={14} />}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {overview}
        </p>

        {/* Tech badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="flex items-center gap-1 text-[10px]">
              <TechIcon name={tech} size={10} />
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" className="text-[10px]">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/20 hover:text-accent"
        >
          {expanded ? "Show less" : "Show more"}
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                {whatIBuilt && (
                  <div>
                    <h4 className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
                      What I Built
                    </h4>
                    <div className="space-y-2">
                      {whatIBuilt.map((item) => (
                        <div key={item.title}>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-4 flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  View Case Study <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
