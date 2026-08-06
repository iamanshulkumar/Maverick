"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Search, Users, Home, MessageCircle, Banknote, Smartphone, User, Calendar, ExternalLink, Github, Lock, Zap, Activity, BarChart3, Eye, TrendingUp, Clock, Globe, Cpu, Database, GitBranch, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "@/components/shared/tech-icon";
import { FloatingNav } from "@/components/case-study/floating-nav";
import { StorySection } from "@/components/case-study/story-section";
import { FlowDiagram } from "@/components/case-study/flow-diagram";
import { FeatureExplorer } from "@/components/case-study/feature-explorer";
import { Architecture } from "@/components/case-study/architecture";
import { DecisionAccordion } from "@/components/case-study/decision-accordion";
import { MetricsGrid } from "@/components/case-study/metrics-grid";
import { Timeline } from "@/components/case-study/timeline";
import { ChallengeCards } from "@/components/case-study/challenge-cards";
import { TechStack } from "@/components/case-study/tech-stack";
import { Results } from "@/components/case-study/results";
import { LessonsAccordion } from "@/components/case-study/lessons-accordion";
import { CTA } from "@/components/case-study/cta";
import { carChoiceConfig } from "@/components/case-study/car-choice.config";
import type { Project } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const img = (name: string) => `/images/projects/Car%20choice%20website%20UI/${name.replace(/ /g, "%20")}`;

const config = carChoiceConfig;

const heroStatChips = [
  { label: "App Screens", value: 18, suffix: "", icon: <Smartphone size={14} /> },
  { label: "Components", value: 21, suffix: "", icon: <GitBranch size={14} /> },
  { label: "API Endpoints", value: 30, suffix: "+", icon: <Database size={14} /> },
  { label: "User Types", value: 2, suffix: "", icon: <Users size={14} /> },
  { label: "Cities", value: 11, suffix: "", icon: <Globe size={14} /> },
  { label: "Partners", value: 6, suffix: "", icon: <Banknote size={14} /> },
];

const tourFeatures = [
  { id: "home", number: "01", label: "Home", icon: <Home size={14} />, title: "Multi-Attribute Car Discovery", tagline: "Find any used car across 6 filter dimensions", screenshot: "Screenshot_1.jpg", description: "Banner carousels, brand grids, city-based browsing (11 Indian cities), and infinite-scroll results grid. Multi-attribute filters via bottom sheet with searchable FlatLists." },
  { id: "browse", number: "02", label: "Browse", icon: <Search size={14} />, title: "Smart Browsing & Filtering", tagline: "Brand, budget, fuel, transmission, color", screenshot: "Screenshot_5.jpg", description: "Six filter dimensions with cascading dropdowns. Searchable FlatList pickers. City-based browsing with GPS location detection persisted to AsyncStorage." },
  { id: "detail", number: "03", label: "Car Details", icon: <Car size={14} />, title: "Comprehensive Vehicle View", tagline: "Gallery, specs, features, and dealer info", screenshot: "Screenshot_8.jpg", description: "Reanimated image carousel with auto-play. 12 attribute display. Features and specs accordions as tabbed bottom sheets. EMI calculator via RBSheet." },
  { id: "chat", number: "04", label: "Real-Time Chat", icon: <MessageCircle size={14} />, title: "Stream Chat Integration", tagline: "Buyers and dealers connect instantly", screenshot: "Screenshot_12.jpg", description: "Stream Chat with server-generated tokens. Deterministic channel creation. First message auto-sent with buyer contact. All/Unread tabs with Today/Older grouping." },
  { id: "sell", number: "05", label: "Sell Wizard", icon: <TrendingUp size={14} />, title: "3-Step Vehicle Listing", tagline: "List your car in under 5 minutes", screenshot: "Screenshot_15.jpg", description: "Guided 3-step wizard with progressive validation. Brand/Model/Variant cascading. Multi-image upload with preview and delete. Per-step error catching." },
  { id: "dealer", number: "06", label: "Dealer Platform", icon: <Users size={14} />, title: "Dealer Registration & Management", tagline: "Business verification and lead management", screenshot: "Screenshot_18.jpg", description: "Dealer registration with business name, WhatsApp validation, multi-brand selection, document upload. Dealer profile with brand logos and office photos." },
  { id: "finance", number: "07", label: "Financing", icon: <Banknote size={14} />, title: "Loans, Insurance & EMI", tagline: "From browsing to financing in one flow", screenshot: "Screenshot_20.jpg", description: "6 partner banks integrated. Insurance enquiry with DateTimePicker. EMI calculator with debounced sliders. Formik + Yup forms with cascading pickers." },
];

interface CarzChoicePageProps {
  project: Project;
}

export function CarzChoicePage({ project }: CarzChoicePageProps) {
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
    { label: "Total Listings", value: "10K+", color: "text-accent", delay: 0, side: "right" as const, top: "8%" },
    { label: "Active Dealers", value: "500+", color: "text-emerald-400", delay: 0.3, side: "left" as const, top: "22%" },
    { label: "Chats Sent", value: "50K+", color: "text-amber-400", delay: 0.6, side: "right" as const, top: "52%" },
    { label: "Cities Live", value: "11", color: "text-accent", delay: 0.9, side: "left" as const, top: "68%" },
  ];

  return (
    <div>
      <FloatingNav sections={config.sections} visible={navVisible} activeSection={activeSection} onScrollTo={scrollTo} />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-800/20 via-background to-amber-500/5" />
        <div className="mx-auto max-w-6xl px-4 relative">
          <Link href="/projects" className="mb-8 inline-flex items-center gap-1.5 text-md text-muted-foreground transition-colors hover:text-foreground">
            ← Back to projects
          </Link>

          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
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
                  <Badge key={tech} variant="accent" className="flex items-center gap-1"><TechIcon name={tech} />{tech}</Badge>
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
              <div className="relative w-full max-w-[500px]">
                <div className="rounded-xl border border-border bg-card p-2 shadow-2xl">
                  <div className="overflow-hidden rounded-lg">
                    <img src={img("Screenshot_1.jpg")} alt="Carz Choice Home" className="w-full object-cover" />
                  </div>
                </div>
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

      {config.flowSteps && config.flowSteps.length > 0 && config.flowTitle && (
        <FlowDiagram title={config.flowTitle} steps={config.flowSteps} />
      )}

      <FeatureExplorer features={config.features} />

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
                  <div className="relative shrink-0 w-full max-w-[400px]">
                    <div className="rounded-xl border-2 border-border bg-card p-2 shadow-2xl">
                      <div className="overflow-hidden rounded-lg">
                        <img src={img(active.screenshot)} alt={active.label} className="w-full object-cover" />
                      </div>
                    </div>
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
