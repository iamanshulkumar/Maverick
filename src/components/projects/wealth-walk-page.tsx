"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Smartphone, User, Calendar, ExternalLink, Github, Lock, Activity, BarChart3, Fingerprint, Eye, BookOpen, Search, GitBranch, Cpu, Database, Clock, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneMockup, OverviewCard, FeatureCard, ChallengeTimeline, OutcomeMetrics, ScreenshotGallery } from "./visual-components";
import { FloatingNav } from "@/components/case-study/floating-nav";
import { StorySection } from "@/components/case-study/story-section";
import { Architecture } from "@/components/case-study/architecture";
import { DecisionAccordion } from "@/components/case-study/decision-accordion";
import { MetricsGrid } from "@/components/case-study/metrics-grid";
import { Timeline } from "@/components/case-study/timeline";
import { ChallengeCards } from "@/components/case-study/challenge-cards";
import { TechStack } from "@/components/case-study/tech-stack";
import { Results } from "@/components/case-study/results";
import { LessonsAccordion } from "@/components/case-study/lessons-accordion";
import { CTA } from "@/components/case-study/cta";
import { wealthWalkConfig } from "@/components/case-study/wealth-walk.config";
import type { Project } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const img = (name: string) => `/images/projects/Wealth%20Walk/${name.replace(/ /g, "%20")}`;

const config = wealthWalkConfig;

const heroStatChips = [
  { label: "Screens", value: 40, suffix: "+", icon: <Smartphone size={14} /> },
  { label: "API Endpoints", value: 35, suffix: "+", icon: <BarChart3 size={14} /> },
  { label: "Broker Integrations", value: 3, suffix: "", icon: <GitBranch size={14} /> },
  { label: "User Auth Providers", value: 2, suffix: "", icon: <Fingerprint size={14} /> },
  { label: "Market Data Providers", value: 3, suffix: "+", icon: <Activity size={14} /> },
];

const tourFeatures = [
  { id: "dashboard", number: "01", label: "Dashboard", icon: <Activity size={14} />, title: "Live Market Dashboard", tagline: "Real-time portfolio and market overview", screenshot: "Home Screen.png", description: "Open positions, P&L tracking, market indices (NIFTY, Sensex, FX), and AI-curated news — all in a single scrollable feed." },
  { id: "portfolio", number: "02", label: "Portfolio", icon: <BarChart3 size={14} />, title: "Multi-Broker Portfolio", tagline: "All your holdings, one place", screenshot: "My Portfolio Overview.png", description: "Broker-agnostic portfolio sync with holdings, positions, and trade history aggregated from multiple accounts with sector-wise allocation." },
  { id: "signals", number: "03", label: "AI Signals", icon: <Zap size={14} />, title: "AI Trading Signals", tagline: "Explainable, not black-box", screenshot: "Signal details.png", description: "AI-generated signals with confidence scores, supporting rationale, and backtested performance across equity, derivatives, and FX." },
  { id: "discovery", number: "04", label: "Discovery", icon: <Search size={14} />, title: "Smart Stock Discovery", tagline: "Screeners, patterns, AI picks", screenshot: "Screener Results.png", description: "Multi-criteria screener with AI pattern recognition, category-wise browsing, and pre-built strategy templates." },
  { id: "algo", number: "05", label: "Algo Trading", icon: <Cpu size={14} />, title: "Algorithmic Trading", tagline: "Deploy strategies without coding", screenshot: "Algo Trading (Running Strategies).png", description: "Pre-built strategy templates configured via simple parameters. Cloud execution with 99.9% uptime and live monitoring." },
  { id: "education", number: "06", label: "Education", icon: <BookOpen size={14} />, title: "Structured Learning", tagline: "From basics to algo trading", screenshot: "Course detail page.png", description: "Complete curriculum with category-wise courses, video lessons, articles, and progress tracking from beginner to algorithmic trader." },
  { id: "broker", number: "07", label: "Broker", icon: <GitBranch size={14} />, title: "Broker Connection", tagline: "Connect, trade, track", screenshot: "Connect broker.png", description: "In-app broker connection with guided setup, one-tap order placement from signals, and full trade history with P&L per trade." },
];

interface WealthWalkPageProps {
  project: Project;
}

export function WealthWalkPage({ project }: WealthWalkPageProps) {
  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(config.sections[0]?.id || "story");
  const [tourFeature, setTourFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const tourRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    const counters = counterRef.current?.querySelectorAll("[data-counter]");
    if (!counters) return;
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (target > 1000) {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          } else {
            el.textContent = Math.floor(obj.val) + suffix;
          }
        },
      });
    });
  }, { scope: heroRef });

  useGSAP(() => {
    if (!pinnedRef.current || !tourRef.current) return;
    ScrollTrigger.create({
      trigger: tourRef.current,
      start: "top 80px",
      end: "bottom 80px",
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const index = Math.min(Math.floor(self.progress * tourFeatures.length), tourFeatures.length - 1);
        setTourFeature(index);
      },
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, { scope: tourRef });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const active = tourFeatures[tourFeature];

  const floatingCards = [
    { label: "Portfolio Value", value: "$12,450", color: "text-emerald-400", delay: 0, side: "right" as const, top: "8%" },
    { label: "AI Signals Today", value: "156", color: "text-amber-400", delay: 0.3, side: "left" as const, top: "22%" },
    { label: "Broker Integrations", value: "3", color: "text-accent", delay: 0.6, side: "right" as const, top: "52%" },
    { label: "Screens Built", value: "40", color: "text-emerald-400", delay: 0.9, side: "left" as const, top: "68%" },
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
                <Badge variant="accent" className="text-xs">Featured Project</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{project.tagline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="flex items-center gap-1.5 text-md text-muted-foreground"><User size={14} /> <span className="text-foreground">{project.role}</span></span>
                <span className="flex items-center gap-1.5 text-md text-muted-foreground"><Calendar size={14} /> <span className="text-foreground">{project.timeline}</span></span>
                <span className="flex items-center gap-1.5 text-md text-muted-foreground"><Smartphone size={14} /> <span className="text-foreground">iOS + Android</span></span>
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
                <PhoneMockup gradient="from-emerald-500/20 via-amber-500/10 to-emerald-500/10">
                  <img src={img("Home Screen.png")} alt="Wealth Walk Home" className="h-full w-full object-cover" />
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

          <div ref={counterRef} className="mt-12 flex flex-wrap justify-center gap-2">
            {heroStatChips.map((chip) => (
              <div key={chip.label} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2">
                <span className="text-accent">{chip.icon}</span>
                <span className="text-xs font-semibold text-foreground">{chip.label}</span>
                <span data-counter data-target={chip.value} data-suffix={chip.suffix} className="text-xs font-mono text-accent">0{chip.suffix}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StorySection title={config.storyTitle} body={config.storyBody} coda={config.storyCoda} />

      {/* Product Tour */}
      <section ref={tourRef} id="experience" className="relative min-h-screen">
        <div ref={pinnedRef} className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-4">
              <Eye size={12} /> Experience the Platform
            </div>
            <h2 className="text-2xl font-bold text-foreground">Product Experience</h2>
            <p className="mt-2 text-sm text-muted-foreground">Scroll to walk through every feature</p>
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
                    <PhoneMockup gradient="from-emerald-500/20 via-amber-500/10 to-emerald-500/10">
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
