"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/shared/section-title";
import { ProjectCard } from "@/components/shared/project-card";
import { getProjects } from "@/lib/data";

const categories = ["All", "Mobile", "Web", "AI", "Security"];

export function ProjectsContent() {
  const projects = getProjects();
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter(
    (p) => p.techStack.some((t) => t.toLowerCase().includes(active.toLowerCase()))
  );

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Projects"
          title="Projects"
          description="Production software I've architected, built, and delivered. Each project includes a full case study."
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
