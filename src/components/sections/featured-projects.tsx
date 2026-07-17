import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { ProjectCard } from "@/components/shared/project-card";
import { getFeaturedProjects } from "@/lib/data";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Projects"
          title="Featured Work"
          description="A selection of projects I've built and delivered."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
