"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, ExternalLink, Github, Lock, Zap, Activity, BarChart3, Eye, Home, Search, GitBranch, Cpu, Database, Users, Clock, Image, Layout, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneMockup } from "./visual-components";
import { FloatingNav } from "@/components/case-study/floating-nav";
import { StorySection } from "@/components/case-study/story-section";
import { FlowDiagram } from "@/components/case-study/flow-diagram";
import { Architecture } from "@/components/case-study/architecture";
import { DecisionAccordion } from "@/components/case-study/decision-accordion";
import { MetricsGrid } from "@/components/case-study/metrics-grid";
import { Timeline } from "@/components/case-study/timeline";
import { ChallengeCards } from "@/components/case-study/challenge-cards";
import { TechStack } from "@/components/case-study/tech-stack";
import { Results } from "@/components/case-study/results";
import { LessonsAccordion } from "@/components/case-study/lessons-accordion";
import { CTA } from "@/components/case-study/cta";
import { victoryVisionConfig } from "@/components/case-study/victory-vision.config";
import type { Project } from "@/types";

const filenames = [
  "Home screen.jpg",
  "Predictions.jpg",
  "Ai Generated Teams.jpg",
  "Expert Analysis.jpg",
  "Fantasy Points Tacker.jpg",
  "Reports.jpg",
];

const img = (index: number) => `/images/projects/Victory%20Vision/${encodeURIComponent(filenames[index])}`;

const config = victoryVisionConfig;

const heroStatChips = [
  { label: "App Screens", value: 10, suffix: "", icon: <SmartphoneIcon /> },
  { label: "Components", value: 22, suffix: "+", icon: <GitBranch size={14} /> },
  { label: "API Endpoints", value: 15, suffix: "+", icon: <Database size={14} /> },
  { label: "Nav Groups", value: 2, suffix: "", icon: <Layout size={14} /> },
  { label: "Theme Zones", value: 2, suffix: "", icon: <Activity size={14} /> },
  { label: "Custom Icons", value: 11, suffix: "", icon: <Image size={14} /> },
];

const tourFeatures = [
  { id: "home", number: "01", label: "Home", icon: <Home size={14} />, title: "App Home Screen", tagline: "Today's matches at a glance", screenshot: 0, description: "Match listing with today/upcoming tabs. Users pick a match to open the intelligence hub, or jump straight into AI team generation." },
  { id: "predictions", number: "02", label: "Predictions", icon: <BarChart3 size={14} />, title: "Match Intelligence Hub", tagline: "Toss, score, and top players predicted", screenshot: 1, description: "AI-calculated toss winner probability, predicted first-innings score, and top batsman/bowler projections in a swipeable tab view alongside AI teams and lineups." },
  { id: "ai-teams", number: "03", label: "AI Teams", icon: <Cpu size={14} />, title: "AI Team Generation", tagline: "Paired safe and risky teams", screenshot: 2, description: "Users configure match, contest type, and risk level. The AI produces paired safe (green) and risky (orange) teams with role distribution and win rate projections." },
  { id: "analysis", number: "04", label: "Expert Analysis", icon: <Image size={14} />, title: "Fantasy Screenshot Analysis", tagline: "AI feedback on any Dream11 team", screenshot: 3, description: "Upload a team screenshot via document picker. The AI returns a structured breakdown — points, captain evaluation, and improvement suggestions in a 2-column grid." },
  { id: "tracker", number: "05", label: "Points Tracker", icon: <Activity size={14} />, title: "Fantasy Points Tracker", tagline: "Live points for every selection", screenshot: 4, description: "Track fantasy points earned per match and per player, so users always know how their picks are performing in real time." },
  { id: "reports", number: "06", label: "Reports", icon: <BarChart3 size={14} />, title: "Performance Dashboard", tagline: "Net profit, win rate, and captain analysis", screenshot: 5, description: "Three sections — Performance Summary, Top Player Picks, and Captain Analysis — all fed from a single API endpoint via the global context." },
];

interface VictoryVisionPageProps {
  project: Project;
}

function SmartphoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
  );
}

export function VictoryVisionPage({ project }: VictoryVisionPageProps) {
  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(config.sections[0]?.id || "story");
  const [tourFeature, setTourFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const active = tourFeatures[tourFeature];

  const floatingCards = [
    { label: "App Screens", value: "10", color: "text-accent", delay: 0, side: "right" as const, top: "8%" },
    { label: "Reusable Components", value: "22+", color: "text-emerald-400", delay: 0.3, side: "left" as const, top: "22%" },
    { label: "API Endpoints", value: "15+", color: "text-amber-400", delay: 0.6, side: "right" as const, top: "52%" },
    { label: "Theme Zones", value: "2", color: "text-emerald-400", delay: 0.9, side: "left" as const, top: "68%" },
  ];

  return (
    <div>
      <FloatingNav sections={config.sections} visible={navVisible} activeSection={activeSection} onScrollTo={scrollTo} />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <Link href="/projects" className="mb-8 inline-flex items-center gap-1.5 text-md text-muted-foreground transition-colors hover:text-foreground">
            ← Back to projects
          </Link>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-3">
                <Badge variant="accent" className="text-xs">Mobile App</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{project.tagline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="flex items-center gap-1.5 text-md text-muted-foreground"><User size={14} /> <span className="text-foreground">{project.role}</span></span>
                <span className="flex items-center gap-1.5 text-md text-muted-foreground"><Calendar size={14} /> <span className="text-foreground">{project.timeline}</span></span>
                <span className="flex items-center gap-1.5 text-md text-muted-foreground"><SmartphoneIcon /> <span className="text-foreground">iOS + Android</span></span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.slice(0, 6).map((tech) => (
                  <Badge key={tech} variant="accent">{tech}</Badge>
                ))}
                {project.techStack.length > 6 && <Badge variant="outline">+{project.techStack.length - 6}</Badge>}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer"><Button variant="accent" size="sm"><ExternalLink size={14} className="mr-1.5" /> Live Demo</Button></a>}
                {project.github && !project.isPrivate && <a href={project.github} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm"><Github size={14} className="mr-1.5" /> Source Code</Button></a>}
                {project.isPrivate && <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-md text-muted-foreground"><Lock size={14} /> Private repository</div>}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative flex justify-center">
              <div className="relative">
                <PhoneMockup gradient="from-blue-500/20 via-indigo-500/10 to-blue-500/10">
                  <img src={img(0)} alt="Victory Vision Home" className="h-full w-full object-cover" />
                </PhoneMockup>
                {floatingCards.map((card) => (
                  <motion.div key={card.label}
                    className={`absolute rounded-lg border border-border bg-card px-3 py-2 shadow-lg ${card.side === "right" ? "-right-16" : "-left-16"}`}
                    style={{ top: card.top }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + card.delay, duration: 0.3 }}>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3 + card.delay, repeat: Infinity, ease: "easeInOut" }}>
                      <span className="text-md text-muted-foreground">{card.label}</span>
                      <span className={`block text-md font-bold ${card.color}`}>{card.value}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {heroStatChips.map((chip) => (
              <div key={chip.label} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2">
                <span className="text-accent">{chip.icon}</span>
                <span className="text-xs font-semibold text-foreground">{chip.label}</span>
                <span className="text-xs font-mono text-accent">{chip.value}{chip.suffix}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StorySection title={config.storyTitle} body={config.storyBody} coda={config.storyCoda} />

      {config.flowSteps && config.flowSteps.length > 0 && config.flowTitle && (
        <FlowDiagram title={config.flowTitle} steps={config.flowSteps} />
      )}

      {/* Product Tour */}
      <section id="experience" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-4">
              <Eye size={12} /> Experience the App
            </div>
            <h2 className="text-2xl font-bold text-foreground">App Experience</h2>
            <p className="mt-2 text-sm text-muted-foreground">Walk through the screens that ship the experience</p>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            <div className="space-y-0.5 lg:col-span-2">
              {tourFeatures.map((f, i) => (
                <button key={f.id} onClick={() => setTourFeature(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-300 ${tourFeature === i ? "border border-accent/30 bg-accent/10" : "border border-transparent hover:bg-surface-hover"}`}>
                  <span className={`shrink-0 font-mono text-xs transition-colors ${tourFeature === i ? "text-accent" : "text-muted-foreground/40"}`}>{f.number}</span>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${tourFeature === i ? "bg-accent text-white" : "bg-card text-muted-foreground"}`}>{f.icon}</div>
                  <div className="min-w-0 flex-1">
                    <span className={`text-xs font-medium ${tourFeature === i ? "text-accent" : "text-foreground"}`}>{f.label}</span>
                    {tourFeature === i && <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.4 }} className="mt-0.5 block h-0.5 rounded-full bg-accent" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
                  <div className="relative shrink-0">
                    <PhoneMockup gradient="from-blue-500/20 via-indigo-500/10 to-blue-500/10">
                      <img src={img(active.screenshot)} alt={active.label} className="h-full w-full object-cover" />
                    </PhoneMockup>
                  </div>
                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <span className="font-mono text-xs text-muted-foreground/40">{active.number}</span>
                      <h3 className="mt-1 text-lg font-bold text-foreground">{active.title}</h3>
                      <p className="mt-0.5 text-xs text-accent font-medium">{active.tagline}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{active.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Architecture project={project} />
      <DecisionAccordion decisions={config.decisions} />
      <MetricsGrid metrics={config.metrics} />
      <Timeline title={config.timelineTitle} items={config.timeline} />
      <ChallengeCards challenges={config.challenges} />
      <TechStack title={config.techStackTitle} items={config.techStack} />
      <Results title={config.resultsTitle} items={config.results} />
      <LessonsAccordion lessons={config.lessons} />
      <CTA config={config.cta} />
    </div>
  );
}
