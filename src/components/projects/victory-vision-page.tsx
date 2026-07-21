"use client";

import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { victoryVisionConfig } from "@/components/case-study/victory-vision.config";
import type { Project } from "@/types";

interface VictoryVisionPageProps {
  project: Project;
}

export function VictoryVisionPage({ project }: VictoryVisionPageProps) {
  return <CaseStudyLayout config={victoryVisionConfig} project={project} />;
}
