"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/shared/section-title";
import { ProjectCard } from "@/components/shared/project-card";
import { getProjects, getWebsites } from "@/lib/data";
import type { AnyProject } from "@/types";

const categories = ["All", "Mobile", "Dashboards", "Shopify", "WordPress", "Wix", "E-commerce"];

export function ProjectsContent() {
  const mobileProjects = getProjects().map((p) => ({ ...p, projectKind: "mobile" as const }));
  const websiteProjects = getWebsites().map((w) => ({ ...w, projectKind: "website" as const }));
  const allProjects: AnyProject[] = [...mobileProjects, ...websiteProjects];

  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? allProjects.sort((a, b) => (a.featuredIndex ?? 99) - (b.featuredIndex ?? 99))
    : allProjects.filter((p) => {
        if (active === "Mobile") return p.projectKind === "mobile";
        if (active === "E-commerce") return p.projectKind === "website";
        return p.categories?.includes(active);
      }).sort((a, b) => (a.featuredIndex ?? 99) - (b.featuredIndex ?? 99));

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Projects"
          title="Projects"
          description="Production software I've architected, built, and delivered — mobile apps and website projects. Each project includes a full case study."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                active === cat
                  ? "bg-accent text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            No case studies found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
