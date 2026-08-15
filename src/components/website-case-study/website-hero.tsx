"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechIcon } from "@/components/shared/tech-icon";
import type { WebsiteProject } from "@/types";

interface WebsiteHeroProps {
  project: WebsiteProject;
}

export function WebsiteHero({ project }: WebsiteHeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const platformColors: Record<string, string> = {
    Shopify: "bg-[#96bf48]/10 text-[#96bf48] border-[#96bf48]/20",
    WordPress: "bg-[#21759b]/10 text-[#21759b] border-[#21759b]/20",
    Wix: "bg-[#0c6cfc]/10 text-[#0c6cfc] border-[#0c6cfc]/20",
  };

  return (
    <section className="relative pt-20 pb-0 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> Back to projects
        </Link>

        {/* Scrollable screenshot container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="rounded-t-xl border border-b-0 border-border bg-[#0a0a0a] p-3 pb-0 sm:p-4 sm:pb-0">
            {/* Browser chrome dots */}
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[10px] text-muted-foreground/40 font-mono">
                {project.demo ? new URL(project.demo).hostname : ""}
              </span>
            </div>

            {/* Scrollable image area */}
            <div
              ref={scrollRef}
              className="relative h-[50vh] sm:h-[60vh] overflow-y-auto overflow-x-hidden rounded-t-lg scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
            >
              {project.heroImage ? (
                <img
                  src={project.heroImage}
                  alt={`${project.title} full page screenshot`}
                  className="w-full h-auto"
                  loading="eager"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/5 to-accent/5">
                  <p className="text-sm text-muted-foreground">Screenshot coming soon</p>
                </div>
              )}

              {/* Top fade gradient */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
            </div>
          </div>

          {/* Bottom info bar */}
          <div className="rounded-b-xl border border-t-0 border-border bg-card px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold sm:text-xl">{project.title}</h1>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${platformColors[project.platform] || ""}`}
                  >
                    {project.platform}
                  </Badge>
                  {project.liveUnavailable && (
                    <Badge variant="outline" className="text-[10px] text-amber-500 border-amber-500/20">
                      Offline
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <p className="hidden sm:block text-xs text-muted-foreground max-w-md line-clamp-1">
                    {project.tagline}
                  </p>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <Button variant="accent" size="sm" className="shrink-0">
                        <ExternalLink size={12} className="mr-1.5" /> Visit Website
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="flex items-center gap-1 text-[10px]">
                    <TechIcon name={tech} size={12} />
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
