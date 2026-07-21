import type { ReactNode } from "react";

export interface CaseStudySection {
  id: string;
  label: string;
}

export interface FeatureItem {
  id: string;
  number: string;
  icon: ReactNode;
  label: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  metrics: string;
}

export interface DecisionItem {
  title: string;
  icon: ReactNode;
  alternatives: string;
  tradeoff: string;
  decision: string;
  impact: string;
}

export interface ChallengeItem {
  icon: ReactNode;
  label: string;
  problem: string;
  solution: string;
  result: string;
  metrics: string[];
}

export interface TimelineItem {
  phase: string;
  title: string;
  desc: string;
}

export interface MetricItem {
  icon: ReactNode;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
}

export interface TechItem {
  name: string;
  cat: string;
  desc: string;
}

export interface ResultItem {
  icon: ReactNode;
  metric: string;
  label: string;
  desc: string;
}

export interface LessonItem {
  title: string;
  what: string;
  why: string;
  impact: string;
}

export interface ProjectIdentity {
  accentFrom: string;
  accentVia: string;
  accentTo: string;
  primary: string;
  primaryFaded: string;
}

export interface FlowStep {
  label: string;
  icon?: ReactNode;
  description?: string;
}

export interface HeroTag {
  icon: ReactNode;
  text: string;
}

export interface CTAConfig {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

export interface CaseStudyConfig {
  slug: string;
  icon: ReactNode;
  badgeLabel: string;
  heroTags: HeroTag[];
  sections: CaseStudySection[];
  identity: ProjectIdentity;
  storyTitle: string;
  storyBody: string;
  storyCoda: string;
  flowTitle?: string;
  flowSteps?: FlowStep[];
  features: FeatureItem[];
  metrics: MetricItem[];
  timelineTitle: string;
  timeline: TimelineItem[];
  decisions: DecisionItem[];
  challenges: ChallengeItem[];
  techStackTitle: string;
  techStack: TechItem[];
  resultsTitle: string;
  results: ResultItem[];
  lessons: LessonItem[];
  cta: CTAConfig;
}
