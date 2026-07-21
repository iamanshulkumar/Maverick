"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Lock, User, Calendar, Smartphone, Code2, GitBranch, Scale, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import { AiAnalyzerPage } from "@/components/projects/ai-analyzer-page";
import { CarzChoicePage } from "@/components/projects/carz-choice-page";
import { CarzchoiceAppPage } from "@/components/projects/carzchoice-app-page";
import { CarzchoiceOldAppPage } from "@/components/projects/carzchoice-old-app-page";
import { LandSquirePage } from "@/components/projects/land-squire-page";
import { VictoryVisionPage } from "@/components/projects/victory-vision-page";
import { WealthWalkPage } from "@/components/projects/wealth-walk-page";
import type { Project } from "@/types";

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  if (project.slug === "ai-analyzer") {
    return <AiAnalyzerPage project={project} />;
  }
  if (project.slug === "car-choice") {
    return <CarzChoicePage project={project} />;
  }
  if (project.slug === "carzchoice-app") {
    return <CarzchoiceAppPage project={project} />;
  }
  if (project.slug === "carzchoice-old-app") {
    return <CarzchoiceOldAppPage project={project} />;
  }
  if (project.slug === "landsquire") {
    return <LandSquirePage project={project} />;
  }
  if (project.slug === "victory-vision") {
    return <VictoryVisionPage project={project} />;
  }
  if (project.slug === "wealth-walk") {
    return <WealthWalkPage project={project} />;
  }

  return <LegacyLayout project={project} />;
}

function LegacyLayout({ project }: { project: Project }) {
  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> Back to projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 aspect-video w-full rounded-xl bg-gradient-to-br from-accent/10 to-accent-cyan/10 flex items-center justify-center">
            <div className="p-12 text-center">
              <h1 className="text-3xl font-bold sm:text-4xl">{project.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{project.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <User size={14} /> Role: <span className="text-foreground">{project.role}</span>
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={14} /> Timeline: <span className="text-foreground">{project.timeline}</span>
            </span>
            {project.platform && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Smartphone size={14} /> Platform: <span className="text-foreground">{project.platform}</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="accent">{tech}</Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Button variant="accent" size="sm">
                  <ExternalLink size={14} className="mr-1.5" /> Live Demo
                </Button>
              </a>
            )}
            {project.github && !project.isPrivate && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Github size={14} className="mr-1.5" /> Source Code
                </Button>
              </a>
            )}
            {project.isPrivate && (
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                <Lock size={14} /> Source is private due to client confidentiality
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-16 space-y-12">
          <AnimatedSection>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed whitespace-pre-line">{project.overview}</p>
            </div>
          </AnimatedSection>

          {project.roleDescription && (
            <AnimatedSection delay={0.05}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User size={18} className="text-accent" />
                  <h2 className="text-xl font-semibold">My Role</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{project.roleDescription}</p>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Problem</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Solution</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </AnimatedSection>

          {project.architectureDiagram && (
            <AnimatedSection delay={0.15}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch size={18} className="text-accent" />
                  <h2 className="text-xl font-semibold">Architecture</h2>
                </div>
                <div className="mb-4 overflow-x-auto">
                  <pre className="rounded-lg bg-background p-4 font-mono text-xs leading-relaxed text-muted-foreground min-w-0">
                    <code>{project.architectureDiagram}</code>
                  </pre>
                </div>
                {project.architectureDescription && (
                  <p className="text-muted-foreground leading-relaxed">{project.architectureDescription}</p>
                )}
              </div>
            </AnimatedSection>
          )}

          {!project.architectureDiagram && (
            <AnimatedSection delay={0.2}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Architecture</h2>
                <div className="mt-4 aspect-video w-full rounded-lg bg-gradient-to-br from-accent/5 to-accent-cyan/5 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Architecture Diagram</p>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">{project.architecture}</p>
              </div>
            </AnimatedSection>
          )}

          {project.challengeDetails && project.challengeDetails.length > 0 && (
            <AnimatedSection delay={0.2}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6">Key Challenges</h2>
                <div className="space-y-6">
                  {project.challengeDetails.map((item, i) => (
                    <div key={i} className="rounded-lg border border-border bg-background p-4">
                      <h3 className="font-medium text-accent mb-2">{item.challenge}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {(!project.challengeDetails || project.challengeDetails.length === 0) && project.challenges.length > 0 && (
            <AnimatedSection delay={0.3}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Challenges</h2>
                <ul className="mt-4 space-y-3">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}

          {project.featureGroups && project.featureGroups.length > 0 && (
            <AnimatedSection delay={0.25}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Code2 size={18} className="text-accent" />
                  <h2 className="text-xl font-semibold">Feature Groups</h2>
                </div>
                <div className="space-y-6">
                  {project.featureGroups.map((group, i) => (
                    <div key={i} className="rounded-lg border border-border bg-background p-4">
                      <h3 className="font-medium mb-1">{group.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {group.features.map((f) => (
                          <Badge key={f} variant="accent">{f}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{group.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {project.technicalDecisions && project.technicalDecisions.length > 0 && (
            <AnimatedSection delay={0.3}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <GitBranch size={18} className="text-accent" />
                  <h2 className="text-xl font-semibold">Technical Decisions</h2>
                </div>
                <div className="space-y-4">
                  {project.technicalDecisions.map((td, i) => (
                    <div key={i} className="rounded-lg border border-border bg-background p-4">
                      <h3 className="font-medium mb-2">{td.decision}</h3>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{td.rationale}</p>
                      <p className="text-xs text-muted-foreground/60"><span className="font-medium text-foreground/60">Alternatives considered:</span> {td.alternatives}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {project.tradeoffs && project.tradeoffs.length > 0 && (
            <AnimatedSection delay={0.35}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Scale size={18} className="text-accent-cyan" />
                  <h2 className="text-xl font-semibold">Tradeoffs</h2>
                </div>
                <div className="space-y-4">
                  {project.tradeoffs.map((t, i) => (
                    <div key={i} className="rounded-lg border border-border bg-background p-4">
                      <h3 className="font-medium mb-1 text-accent-cyan">{t.tradeoff}</h3>
                      <p className="text-sm mb-2"><span className="font-medium text-foreground">Chosen:</span> <span className="text-muted-foreground">{t.choice}</span></p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.4}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Technical Outcomes</h2>
                <div className="mt-4 space-y-4">
                  {project.technicalOutcomes.map((result, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <span className="text-sm text-muted-foreground">{result.metric}</span>
                      <span className="text-lg font-bold text-accent">{result.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Business Impact</h2>
                <div className="mt-4 space-y-4">
                  {project.businessOutcomes.map((result, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <span className="text-sm text-muted-foreground">{result.metric}</span>
                      <span className="text-lg font-bold text-accent-cyan">{result.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">
                  {project.businessImpact}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={18} className="text-accent" />
                <h2 className="text-xl font-semibold">Lessons Learned</h2>
              </div>
              <ul className="space-y-3">
                {project.lessons.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <AnimatedSection delay={0.55}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowRight size={18} className="text-accent" />
                  <h2 className="text-xl font-semibold">Future Improvements</h2>
                </div>
                <ul className="space-y-3">
                  {project.futureImprovements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </article>
  );
}
