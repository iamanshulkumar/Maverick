"use client";

import { useRef, useState, useCallback } from "react";
import {
  HeroSection,
  ChallengeSection,
  ProductTourSection,
  ArchitectureExplorerSection,
  EngineeringDecisionsSection,
  PerformanceSection,
  BuildTimelineSection,
  ChallengesSection,
  TechExplorerSection,
  AdminSection,
  DashboardSection,
  OutcomesSection,
  LessonsSection,
  RoadmapSection,
  FloatingNav,
} from "./sections";
import type { Project } from "@/types";

interface AiAnalyzerPageProps {
  project: Project;
}

export function AiAnalyzerPage({ project }: AiAnalyzerPageProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const handleTechSelect = useCallback((techName: string | null) => {
    setSelectedTech(techName);
    const archSection = document.getElementById("architecture");
    if (techName && archSection) {
      setTimeout(() => {
        archSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, []);

  return (
    <div ref={pageRef} id="hero">
      <FloatingNav />

      <HeroSection project={project} />
      <ChallengeSection />
      <ProductTourSection />
      <ArchitectureExplorerSection />
      <EngineeringDecisionsSection />
      <PerformanceSection />
      <BuildTimelineSection />
      <ChallengesSection />
      <TechExplorerSection onTechSelect={handleTechSelect} />
      <AdminSection />
      <DashboardSection />
      <OutcomesSection />
      <LessonsSection />
      <RoadmapSection />
    </div>
  );
}