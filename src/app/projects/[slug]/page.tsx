import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetailContent } from "./project-detail-content";
import { getProjects, getProject } from "@/lib/data";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailContent project={project} />;
}
