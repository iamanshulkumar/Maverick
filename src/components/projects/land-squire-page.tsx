"use client";

import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { landSquireConfig } from "@/components/case-study/land-squire.config";
import type { Project } from "@/types";

interface LandSquirePageProps {
  project: Project;
}

export function LandSquirePage({ project }: LandSquirePageProps) {
  return <CaseStudyLayout config={landSquireConfig} project={project} />;
}
