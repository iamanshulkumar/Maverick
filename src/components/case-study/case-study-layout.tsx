"use client";

import { useState, useEffect } from "react";
import type { Project } from "@/types";
import type { CaseStudyConfig } from "./types";
import { FloatingNav } from "./floating-nav";
import { Hero } from "./hero";
import { StorySection } from "./story-section";
import { FeatureExplorer } from "./feature-explorer";
import { Architecture } from "./architecture";
import { DecisionAccordion } from "./decision-accordion";
import { MetricsGrid } from "./metrics-grid";
import { Timeline } from "./timeline";
import { ChallengeCards } from "./challenge-cards";
import { TechStack } from "./tech-stack";
import { Results } from "./results";
import { LessonsAccordion } from "./lessons-accordion";
import { CTA } from "./cta";
import { FlowDiagram } from "./flow-diagram";

interface CaseStudyLayoutProps {
  config: CaseStudyConfig;
  project: Project;
  children?: React.ReactNode;
}

export function CaseStudyLayout({ config, project, children }: CaseStudyLayoutProps) {
  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(config.sections[0]?.id || "story");

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > 400);
      let current = config.sections[0]?.id || "story";
      for (const s of config.sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = s.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <FloatingNav sections={config.sections} visible={navVisible} activeSection={activeSection} onScrollTo={scrollTo} />

      <Hero project={project} identity={config.identity} icon={config.icon} badgeLabel={config.badgeLabel} heroTags={config.heroTags} />

      <StorySection title={config.storyTitle} body={config.storyBody} coda={config.storyCoda} />

      {config.flowSteps && config.flowSteps.length > 0 && config.flowTitle && (
        <FlowDiagram title={config.flowTitle} steps={config.flowSteps} />
      )}

      <FeatureExplorer features={config.features} />

      <Architecture project={project} />

      <DecisionAccordion decisions={config.decisions} />

      <MetricsGrid metrics={config.metrics} />

      <Timeline title={config.timelineTitle} items={config.timeline} />

      <ChallengeCards challenges={config.challenges} />

      <TechStack title={config.techStackTitle} items={config.techStack} />

      <Results title={config.resultsTitle} items={config.results} />

      <LessonsAccordion lessons={config.lessons} />

      {children}

      <CTA config={config.cta} />
    </div>
  );
}
