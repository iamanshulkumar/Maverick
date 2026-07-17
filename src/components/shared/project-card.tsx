"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
      >
        <div className="aspect-video w-full rounded-t-xl bg-gradient-to-br from-accent/5 to-accent-cyan/5 flex items-center justify-center overflow-hidden">
          <div className="p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{project.tagline}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
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
    </motion.div>
  );
}
