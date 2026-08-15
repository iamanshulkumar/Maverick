import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetailContent } from "./project-detail-content";
import { getProjects, getProject, getWebsites, getWebsiteProject } from "@/lib/data";

export async function generateStaticParams() {
  const mobileSlugs = getProjects().map((p) => ({ slug: p.slug }));
  const websiteSlugs = getWebsites().map((w) => ({ slug: w.slug }));
  return [...mobileSlugs, ...websiteSlugs];
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  const website = getWebsiteProject(slug);
  const item = project ?? website;
  if (!item) return {};
  return {
    title: item.title,
    description: item.tagline,
  };
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = getProject(slug);
  const website = getWebsiteProject(slug);

  if (!project && !website) notFound();

  return <ProjectDetailContent project={project ?? undefined} website={website ?? undefined} />;
}
