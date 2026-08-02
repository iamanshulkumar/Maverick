"use client";

import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
    >
      <div className="aspect-video w-full rounded-t-xl overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-accent/5 to-accent-cyan/5 flex items-center justify-center">
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">{project.tagline}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="outline">+{project.techStack.length - 4}</Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground transition-colors group-hover:text-accent">
            {project.isPrivate ? <Lock size={14} /> : <ArrowUpRight size={14} />}
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
          {project.overview}
        </p>
      </div>
    </Link>
  );
}
