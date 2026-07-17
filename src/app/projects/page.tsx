import type { Metadata } from "next";
import { ProjectsContent } from "./projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and projects delivered across fintech, real estate, mobile, and AI.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
