"use client";

import { useState, useEffect } from "react";
import type { Project } from "@/types";
import type { CaseStudyConfig } from "./types";
import { FloatingNav } from "./floating-nav";
import { ScrollProgress } from "./scroll-progress";
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
import { ScrollReveal } from "@/components/shared/scroll-reveal";

interface CaseStudyLayoutProps {
  config: CaseStudyConfig;
  project: Project;
  customHero?: React.ReactNode;
  afterStory?: React.ReactNode;
  children?: React.ReactNode;
}

export function CaseStudyLayout({ config, project, customHero, afterStory, children }: CaseStudyLayoutProps) {
  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(config.sections[0]?.id || "story");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > 400);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <ScrollProgress progress={scrollProgress} />
      <FloatingNav sections={config.sections} visible={navVisible} activeSection={activeSection} onScrollTo={scrollTo} scrollProgress={scrollProgress} />

      {customHero || <Hero project={project} identity={config.identity} icon={config.icon} badgeLabel={config.badgeLabel} heroTags={config.heroTags} />}

      <ScrollReveal>
        <StorySection title={config.storyTitle} body={config.storyBody} coda={config.storyCoda} />
      </ScrollReveal>

      {afterStory}

      {config.flowSteps && config.flowSteps.length > 0 && config.flowTitle && (
        <ScrollReveal>
          <FlowDiagram title={config.flowTitle} steps={config.flowSteps} />
        </ScrollReveal>
      )}

      <ScrollReveal>
        <FeatureExplorer features={config.features} />
      </ScrollReveal>

      {children}

      <ScrollReveal>
        <Architecture project={project} />
      </ScrollReveal>

      <ScrollReveal>
        <DecisionAccordion decisions={config.decisions} />
      </ScrollReveal>

      <ScrollReveal>
        <MetricsGrid metrics={config.metrics} />
      </ScrollReveal>

      <ScrollReveal>
        <Timeline title={config.timelineTitle} items={config.timeline} />
      </ScrollReveal>

      <ScrollReveal>
        <ChallengeCards challenges={config.challenges} />
      </ScrollReveal>

      <ScrollReveal>
        <TechStack title={config.techStackTitle} items={config.techStack} />
      </ScrollReveal>

      <ScrollReveal>
        <Results title={config.resultsTitle} items={config.results} />
      </ScrollReveal>

      <ScrollReveal>
        <LessonsAccordion lessons={config.lessons} />
      </ScrollReveal>

      <ScrollReveal>
        <CTA config={config.cta} />
      </ScrollReveal>
    </div>
  );
}
