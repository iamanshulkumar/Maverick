"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown, Eye, ArrowRight, Target, Zap, Shield, BarChart3, Activity, Users, Clock, Smartphone, GitBranch, Database, Cpu, MessageCircle, Home, Image, TrendingUp, Search, Swords, Layout } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

interface VictoryVisionPageProps {
  project: Project;
}

const sections = [
  { id: "story", label: "Story" },
  { id: "experience", label: "Experience" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "metrics", label: "Metrics" },
  { id: "timeline", label: "Timeline" },
  { id: "challenges", label: "Challenges" },
  { id: "stack", label: "Stack" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "Lessons" },
];

const features = [
  {
    id: "ai-teams", number: "01", icon: <Cpu size={14} />, label: "AI Teams", title: "AI Team Generation Engine",
    tagline: "Safe and risky teams with dynamic green/orange theming", problem: "Fantasy players spend 10+ minutes researching player form, comparing stats across websites, and guessing at captain choices — all before every contest entry.",
    solution: "Users configure match, contest type, risk level, and auto-pick captain/VC toggles. The AI produces paired safe (green) and risky (orange) teams with role distribution (WK/BAT/AR/BOWL), win rate projections, and one-tap clipboard copy. Teams are grouped by generation minute using ISO date truncation (createdAt.toISOString().slice(0, 16)). The dynamic theme engine switches card visual identity via a centralized theme object controlling header backgrounds, accent colors, gradient ends, content backgrounds, borders, badge colors, and copy button styling.",
    metrics: "2 zone themes | 4 role types | 30s generation",
  },
  {
    id: "screenshot", number: "02", icon: <Image size={14} />, label: "Screenshot AI", title: "Fantasy Screenshot Analysis",
    tagline: "Upload any Dream11 team and get instant AI feedback", problem: "After submitting a fantasy team, users manually calculate points, compare with friends, and have no way to get objective feedback on their selections.",
    solution: "Users pick a screenshot from their gallery via expo-document-picker. The image is sent to the server via multipart form upload with userId. The AI processes it and returns structured analysis: points breakdown, captain evaluation, improvement suggestions, and strong points extracted from a period-delimited string. Results render in a responsive 2-column metric grid. The entire pipeline from picker to parsed analysis lives in a single self-contained component.",
    metrics: "multipart upload | 2-col grid | 1 component",
  },
  {
    id: "match-hub", number: "03", icon: <Swords size={14} />, label: "Match Hub", title: "Match Intelligence Center",
    tagline: "Predictions, AI teams, and lineups in three swipeable tabs", problem: "Users toggle between 3+ apps for match predictions, team recommendations, and playing XI — losing context with every switch.",
    solution: "A nested scroll architecture — parent FlatList with sections including banner, head-to-head stats, and a swipeable TabView for Predictions (toss winner probability, predicted score, top batsman/bowler), AI Teams (safe + risky per match), and Lineups (playing XI filterable by role). Nested scrolling conflicts are resolved via nestedScrollEnabled=true on inner ScrollViews, scrollEnabled=false on inner FlatLists, and overScrollMode='never' on the parent. Content height is tracked via onContentHeightChange callback.",
    metrics: "3 swipeable tabs | nested scroll | role filtering",
  },
  {
    id: "dashboard", number: "04", icon: <BarChart3 size={14} />, label: "Dashboard", title: "Performance Reports Dashboard",
    tagline: "Net profit, win rate, top picks, and captain analysis", problem: "Fantasy players have no single dashboard showing their performance across contests — they rely on memory and platform standings.",
    solution: "Three dashboard sections: Performance Summary (net profit, win rate, contests played, average rank), Top Player Picks (most successful selections with success rates), and Captain Analysis (best choices, need-work areas, AI improvement insights). All data flows from a single API endpoint through the GlobalProviderReport React Context, hydrated on login and refreshed on pull-to-refresh.",
    metrics: "3 sections | 1 API endpoint | pull-to-refresh",
  },
  {
    id: "navigation", number: "05", icon: <Layout size={14} />, label: "Navigation", title: "Custom Animated Tab Bar",
    tagline: "Spring physics, floating indicator, and icon morphing", problem: "Default tab bars are static. Users navigate between 4+ sections and need clear, delightful affordances for which section is active.",
    solution: "Fully custom bottom tab bar built with React Native's Animated API. Each TabItem manages its own Animated.Value refs for scale (0.84→1.0 on focus), translateY (-35px float on active tab), label opacity (0→1 over 400ms), and label translateY. The floating circular indicator position is driven by animated translateX responding to tab index changes. All four values animate in parallel via Animated.parallel with spring physics (friction: 6, tension: 50) for icons and timing (400ms) for labels.",
    metrics: "spring physics | 4 animated values | 400ms fade",
  },
];

const metrics = [
  { icon: <Smartphone size={16} />, value: 10, suffix: "", label: "App Screens", sublabel: "Expo Router file-based", color: "text-accent" },
  { icon: <GitBranch size={16} />, value: 22, suffix: "+", label: "Components", sublabel: "Reusable UI system", color: "text-emerald-400" },
  { icon: <Database size={16} />, value: 15, suffix: "+", label: "API Endpoints", sublabel: "Node.js REST API", color: "text-accent" },
  { icon: <Users size={16} />, value: 2, suffix: "", label: "Nav Groups", sublabel: "Auth + Root tabs", color: "text-cyan-400" },
  { icon: <Cpu size={16} />, value: 2, suffix: "", label: "Theme Zones", sublabel: "Safe (green) / Risky (orange)", color: "text-emerald-400" },
  { icon: <Layout size={16} />, value: 11, suffix: "", label: "Custom Icons", sublabel: "Tab bar + features", color: "text-accent" },
];

const timeline = [
  { phase: "1", title: "Discovery & Design", desc: "Fantasy sports market research, competitor analysis (Dream11, My11Circle), user flow design, navigation tree, design system (navy, space mono, green/orange)" },
  { phase: "2", title: "Auth & Foundation", desc: "OTP authentication flow, Expo Router setup with auth/root groups, GlobalProviderReport React Context, base component library" },
  { phase: "3", title: "Match Intelligence Hub", desc: "Match listing with today/upcoming tabs, match detail with nested scroll + TabView, predictions, lineups with role filtering" },
  { phase: "4", title: "AI Team Engine", desc: "Safe/risky team generation, dynamic green/orange theming, temporal pairing by generation minute, clipboard copy" },
  { phase: "5", title: "Analysis & Reporting", desc: "Fantasy screenshot upload and AI analysis pipeline, performance dashboard with 3 sections, custom animated tab bar" },
  { phase: "6", title: "Quality & Release", desc: "Cross-device testing (Android API 24-35), EAS Build profiles (dev/preview/prod), edge case handling, production launch" },
];

const decisions = [
  {
    title: "React Context over Redux or Zustand",
    icon: <Database size={16} />,
    alternatives: "Redux Toolkit, Zustand, Jotai",
    tradeoff: "Context re-renders all consumers on any state change. With 3 data sources and 10 screens, this can cause unnecessary re-renders if data grows.",
    decision: "Single GlobalProviderReport context with useState hydration pattern. refreshGlobalData() called after login and on pull-to-refresh provides consistent data freshness. The app has one global data dependency (match listings) plus two supplementary sources (reports, notifications) — well within Context's sweet spot.",
    impact: "Zero external state dependencies. Simple pattern: one provider, one refresh function, no boilerplate.",
  },
  {
    title: "Expo managed workflow over bare RN",
    icon: <Smartphone size={16} />,
    alternatives: "Bare React Native, Native Swift/Kotlin",
    tradeoff: "Managed Expo limits native module access. Some advanced camera/ML features may require ejecting later.",
    decision: "Expo SDK 53 managed workflow covers all requirements: expo-document-picker, expo-clipboard, expo-linear-gradient, expo-font. EAS Build handles CI/CD for Android and iOS. Over-the-air updates via expo-updates for rapid bug fixes.",
    impact: "Cross-platform from day one. 4-month delivery timeline met. OTA updates for post-launch fixes.",
  },
  {
    title: "Custom Animated tab bar over default",
    icon: <Layout size={16} />,
    alternatives: "Expo Router default, react-native-bottom-tabs",
    tradeoff: "Custom implementation means owning the full complexity of touch handling, indicator positioning, and animation reconciliation across screen transitions.",
    decision: "Fully custom with React Native Animated API. Each TabItem manages its own Animated.Value refs for scale, translateY, label opacity, and label translateY. Floating indicator driven by animated translateX. Spring physics (friction: 6, tension: 50) for natural icon transitions.",
    impact: "Signature micro-interaction. Pixel-perfect control over all animation parameters. Zero third-party tab bar overhead.",
  },
  {
    title: "SpaceMono single font over multi-font",
    icon: <MessageCircle size={16} />,
    alternatives: "Inter + SpaceMono, custom typeface system",
    tradeoff: "Monospace for all text reduces readability for long passages and limits typographic hierarchy.",
    decision: "SpaceMono provides a clean, modern monospace aesthetic that differentiates from typical fantasy sports apps. One .ttf file minimizes bundle size. Loaded via expo-font on app launch and applied globally through the navigation theme.",
    impact: "Distinctive brand identity. Users associate the monospace look with data and analytics. ~60KB font asset.",
  },
];

const challenges = [
  {
    icon: <Activity size={16} />, label: "Nested Scroll + TabView Conflicts",
    problem: "Match detail screen needed a scrollable banner and head-to-head section, followed by a swipeable TabView with 3 tabs. React Native's scroll system conflicts when nesting TabView inside ScrollView — scroll events bleed between the two, causing jank and gesture conflicts.",
    solution: "Combined nestedScrollEnabled=true on inner ScrollViews, scrollEnabled=false on inner FlatLists, and overScrollMode='never' on the parent. Content height tracked via onContentHeightChange callback to dynamically size the tab container. Android version testing was essential — behavior differs significantly across API levels.",
    result: "Smooth nested scrolling across all 3 tabs on iOS and Android API 24-35.",
    metrics: ["nestedScrollEnabled", "scrollEnabled=false", "onContentHeightChange"],
  },
  {
    icon: <Cpu size={16} />, label: "Dual Theme System (Safe/Risky)",
    problem: "Safe and risky teams share the same data shape and rendering logic but differ in every visual property — header backgrounds, accent colors, gradient ends, content backgrounds, borders, badge colors, and copy button styling must all switch between green and orange.",
    solution: "Dynamic theme generator function takes zone as input and returns a complete theme object with all visual properties. Two separate components (AiSafeTeam, AiRiskyTeam) with duplicated structure but different theme applications. Acceptable duplication (~100 lines each) because the visual divergence is systematic rather than occasional.",
    result: "Clean green/orange semantic split. Users intuitively understand safe vs risky without explanation.",
    metrics: ["2 components", "~100 lines each", "Theme generator"],
  },
  {
    icon: <Search size={16} />, label: "AI Team Temporal Pairing",
    problem: "Teams are generated in pairs (Safe + Risky) at the same time. Users need to see them grouped together in history, sorted by generation time, with search capability. MongoDB ObjectID format inconsistency requires defensive parsing across components.",
    solution: "Generations grouped by minute using createdAt.toISOString().slice(0, 16) as a key. Sorted newest-first, limited to 5 pairs. Each pair displays both safe and risky side by side with respective themes. Search filter by team number or generation time. ObjectID parsing uses try-catch with fallback to string comparison.",
    result: "Clean pair grouping. Search works across 100+ generation entries without performance issues.",
    metrics: ["ISO minute key", "5 pairs limit", "Defensive parsing"],
  },
  {
    icon: <Image size={16} />, label: "Screenshot Analysis Pipeline",
    problem: "Users upload Dream11 team screenshots for AI analysis. The pipeline must handle file selection, multipart upload with user context, asynchronous AI processing, and structured result rendering — all in a single flow that provides clear loading states and error handling.",
    solution: "Single self-contained component (FantasyTracker.jsx) manages the entire pipeline: expo-document-picker for file selection, FormData multipart upload with userId, loading spinner during AI processing, key-value pair results rendered as a responsive 2-column grid, strong points extracted from a period-delimited API response string.",
    result: "Highest-engagement feature in beta. Users love getting AI feedback on their actual team selections.",
    metrics: ["1 component", "multipart upload", "2-col grid"],
  },
];

export function VictoryVisionPage({ project }: VictoryVisionPageProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSection, setActiveSection] = useState("story");
  const [navVisible, setNavVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [inViewMetrics, setInViewMetrics] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsStartedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > 400);
      let current = "story";
      for (const s of sections) {
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

  useEffect(() => {
    const el = metricsRef.current;
    if (!el || metricsStartedRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInViewMetrics(true); metricsStartedRef.current = true; observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const feature = features[activeFeature];

  return (
    <div>
      {/* Floating nav */}
      <motion.nav
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: navVisible ? 1 : 0, x: navVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed right-4 top-1/2 z-50 -translate-y-1/2 hidden lg:block"
      >
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-2 shadow-lg">
          <div className="space-y-1">
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-left transition-all duration-200 group">
                <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeSection === s.id ? "bg-accent w-3" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"}`} />
                <span className={`text-xs font-medium transition-all duration-300 ${activeSection === s.id ? "text-accent opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-60"}`}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111F54]/20 via-background to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111F54]/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#111F54]/20 bg-[#111F54]/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-6">
              <Cpu size={12} /> Case Study
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{project.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{project.tagline}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Smartphone size={12} /> iOS + Android</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Cpu size={12} /> Expo SDK 53</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Clock size={12} /> 4.5 Months</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Layout size={12} /> 10 Screens</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section id="story" className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111F54]/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8">
            The Problem
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-2xl leading-relaxed text-foreground/80 sm:text-3xl sm:leading-relaxed md:text-4xl md:leading-relaxed font-light">
            Millions play fantasy sports daily. Most rely on gut feeling.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Fantasy cricket players manually track player form across multiple websites, compare stats, and guess at captain choices. 10+ minutes of research for every contest entry — with no objective way to evaluate their team before submitting.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-card">
                <ArrowDown size={18} className="text-accent" />
              </div>
            </div>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 text-lg text-muted-foreground/60 font-light italic">
            Victory Vision replaces hours of manual work with seconds of AI intelligence.
          </motion.p>
        </div>
      </section>

      {/* Product Experience */}
      <section id="experience" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-4">
              <Eye size={12} /> Experience the Platform
            </div>
            <h2 className="text-2xl font-bold">Product Experience</h2>
            <p className="mt-2 text-sm text-muted-foreground">Every feature, explained with the engineering behind it</p>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            <div className="space-y-0.5 lg:col-span-2">
              {features.map((f, i) => (
                <button key={f.id} onClick={() => setActiveFeature(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-300 ${activeFeature === i ? "border border-accent/30 bg-accent/10" : "border border-transparent hover:bg-surface-hover"}`}>
                  <span className={`shrink-0 font-mono text-xs transition-colors ${activeFeature === i ? "text-accent" : "text-muted-foreground/40"}`}>{f.number}</span>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${activeFeature === i ? "bg-accent text-white" : "bg-card text-muted-foreground"}`}>{f.icon}</div>
                  <div className="min-w-0 flex-1">
                    <span className={`text-xs font-medium ${activeFeature === i ? "text-accent" : "text-foreground"}`}>{f.label}</span>
                    {activeFeature === i && <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.4 }} className="mt-0.5 block h-0.5 rounded-full bg-accent" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div key={feature.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-xs text-muted-foreground/40">{feature.number}</span>
                      <h3 className="mt-1 text-lg font-bold text-foreground">{feature.title}</h3>
                      <p className="mt-0.5 text-xs text-accent font-medium">{feature.tagline}</p>
                    </div>

                    <div className="space-y-3 rounded-xl border border-border/50 bg-card/50 p-4">
                      <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider flex items-center gap-1.5">
                        <Zap size={10} /> Engineering
                      </p>
                      <div>
                        <p className="text-[10px] text-amber-400/80 uppercase tracking-wider font-medium">Problem</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{feature.problem}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-accent uppercase tracking-wider font-medium">Solution</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{feature.solution}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {feature.metrics.split(" | ").map((m) => (
                          <span key={m} className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[10px] text-emerald-400 font-medium">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-20 bg-gradient-to-b from-transparent via-[#111F54]/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">System Architecture</h2>
            <p className="mt-2 text-sm text-muted-foreground">Expo Router client + Node.js REST API + AI analysis pipeline</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="overflow-x-auto">
              <pre className="text-xs leading-relaxed text-muted-foreground font-mono">
                <code>{`Mobile App (React Native / Expo SDK 53)
  ├── Expo Router (10 screens, 2 nav groups)
  │   ├── (auth)/ Login, Register (OTP)
  │   └── (tabs)/ Cricket, Points, AI Teams, Kabaddi
  │           └── Reports (hidden, internal nav)
  │
  ├── State: GlobalProviderReport (Matches + Reports + Notifications)
  ├── Animations: Animated API (Tab Bar) + Reanimated (future)
  └── HTTP: Axios → HTTPS → api.victoryvision.live/...

Node.js REST API
  ├── Auth: OTP Generate, OTP Verify, Create User
  ├── Matches: Current Matches, Match Details
  ├── Predictions: Toss/Score/Top Players, AI Team Gen
  ├── Analysis: Screenshot Upload, Fantasy Points Analysis
  ├── Reports: User Reports, Performance Metrics
  └── Notifications: List, Mark as Read

External
  ├── AI Engine (Screenshot analysis + team generation)
  └── EAS Build (CI/CD for Android + iOS releases)`}</code>
              </pre>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Victory Vision uses Expo Router for file-based navigation across 10 screens organized into auth and root tab groups. The root group contains a custom animated bottom tab bar with spring-physics icon animations and a floating circular indicator. Global state is managed via React Context (GlobalProviderReport) which pre-fetches reports, notifications, and matches on initialization. The Node.js backend at api.victoryvision.live serves 15+ REST endpoints across auth, matches, predictions, AI teams, analysis, and notifications domains.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Decisions */}
      <section id="decisions" className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Engineering Decisions</h2>
            <p className="mt-2 text-sm text-muted-foreground">Architecture choices, tradeoffs, and their real-world impact</p>
          </div>

          <div className="space-y-2">
            {decisions.map((d, i) => {
              const [isOpen, setIsOpen] = useState(i === 0);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card overflow-hidden">
                  <button onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-hover">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">{d.icon}</div>
                    <span className="flex-1 text-sm font-medium text-foreground">{d.title}</span>
                    <ChevronDown size={14} className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <div className="border-t border-border px-4 py-4 space-y-3">
                          <div>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Alternatives Considered</span>
                            <p className="mt-1 text-xs text-muted-foreground">{d.alternatives}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-amber-400 uppercase tracking-wider flex items-center gap-1.5"><Zap size={10} /> Tradeoff</span>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.tradeoff}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-accent uppercase tracking-wider">Decision</span>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.decision}</p>
                          </div>
                          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Impact</span>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.impact}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section id="metrics" className="py-20" ref={metricsRef}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">By the Numbers</h2>
            <p className="mt-2 text-sm text-muted-foreground">Key metrics from the Victory Vision platform</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-xl border border-border bg-card p-4 overflow-hidden">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3">{m.icon}</div>
                  <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">{m.sublabel}</p>
                  <span className={`mt-1 block text-2xl font-bold tracking-tight ${m.color} tabular-nums`}>
                    {inViewMetrics ? (m.value >= 1000 ? `${(m.value).toLocaleString()}${m.suffix}` : `${m.value}${m.suffix}`) : `0${m.suffix}`}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Timeline */}
      <section id="timeline" className="py-20 bg-gradient-to-b from-transparent via-[#111F54]/5 to-transparent">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Build Timeline</h2>
            <p className="mt-2 text-sm text-muted-foreground">6 phases across 4.5 months</p>
          </div>

          <div className="relative">
            <div className="absolute left-[18px] top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div key={item.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`relative flex items-start gap-4 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <span className="text-xs font-bold text-accent">Phase {item.phase}</span>
                      <h3 className="mt-1 text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex shrink-0 items-center justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent/30 bg-card">
                      <span className="text-xs font-bold text-accent">{item.phase}</span>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Challenges */}
      <section id="challenges" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Engineering Challenges</h2>
            <p className="mt-2 text-sm text-muted-foreground">Problems solved during development</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {challenges.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="flex items-center gap-3 border-b border-border bg-surface-hover p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">{c.icon}</div>
                  <h3 className="text-sm font-semibold">{c.label}</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-medium text-amber-400 uppercase tracking-wider">Problem</span>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.problem}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium text-accent uppercase tracking-wider">Solution</span>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.solution}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Result</span>
                    <p className="mt-1 text-xs text-muted-foreground">{c.result}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {c.metrics.map((m) => (
                        <span key={m} className="rounded-md border border-emerald-500/20 bg-background px-2 py-0.5 text-[10px] text-emerald-400 font-medium">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="stack" className="py-20 bg-gradient-to-b from-transparent via-[#111F54]/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Technology Stack</h2>
            <p className="mt-2 text-sm text-muted-foreground">The tools and frameworks powering Victory Vision</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "React Native (Expo SDK 53)", cat: "Mobile", desc: "Cross-platform iOS/Android with Expo Router for file-based navigation across 10 screens and 22+ reusable components forming a complete design system." },
              { name: "Node.js", cat: "Backend", desc: "REST API with 15+ endpoints serving auth (OTP), matches, predictions, AI team generation, screenshot analysis, reports, and notifications." },
              { name: "MySQL", cat: "Database", desc: "Relational data store for users, matches, predictions, teams, analysis results, reports, and notifications." },
              { name: "NativeWind", cat: "UI", desc: "Tailwind CSS utility classes for React Native. Build-time generation via Babel plugin eliminates runtime CSS-in-JS overhead across 22+ components." },
              { name: "React Context", cat: "State", desc: "GlobalProviderReport provides match listings, reports, and notifications across 10 screens without Redux. Hydrated on login and refreshed on pull-to-refresh." },
              { name: "Animated API", cat: "Animations", desc: "Custom animated tab bar with spring physics (friction: 6, tension: 50) for icon scale/translateY and timing (400ms) for label fade. Floating indicator driven by animated translateX." },
              { name: "Tab View", cat: "Navigation", desc: "Swipeable tab navigation in match detail screen with three tabs (Predictions, AI Teams, Lineups). Nested scroll resolution via nestedScrollEnabled + scrollEnabled pattern." },
              { name: "Axios + Moment.js", cat: "Utilities", desc: "Axios for HTTP communication with api.victoryvision.live. Moment.js for date formatting, team generation time grouping, and match schedule display." },
            ].map((tech) => (
              <motion.div key={tech.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}
                className="rounded-xl border border-border bg-card p-4 hover:border-accent/20 transition-colors duration-300">
                <span className="text-xs font-bold text-accent">{tech.name}</span>
                <span className="block text-[10px] text-muted-foreground/60 mt-0.5">{tech.cat}</span>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Results</h2>
            <p className="mt-2 text-sm text-muted-foreground">Measurable impact from architectural decisions</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <Smartphone size={20} />, metric: "10", label: "App Screens", desc: "Organized into 2 navigation groups (auth, root tabs) with Expo Router file-based routing. Hidden Reports tab accessible programmatically." },
              { icon: <GitBranch size={20} />, metric: "22+", label: "Reusable Components", desc: "A complete design system spanning cards, tab views, accordions, gradient cards, badges, buttons, and text components." },
              { icon: <Database size={20} />, metric: "15+", label: "API Endpoints", desc: "Node.js REST API covering auth, matches, predictions, AI teams, screenshot analysis, reports, and notifications." },
              { icon: <Cpu size={20} />, metric: "AI Teams", label: "Safe + Risky Engine", desc: "Paired team generation with dynamic green/orange theming, role distribution, win rate projection, and temporal grouping by generation minute." },
              { icon: <Image size={20} />, metric: "Screenshot AI", label: "Fantasy Analysis", desc: "Multipart upload + AI processing pipeline. Users upload Dream11 team screenshots and get instant structured analysis in a 2-column grid." },
              { icon: <Layout size={20} />, metric: "Animated Tab Bar", label: "Custom Navigation", desc: "Spring-physics icon animations (friction: 6, tension: 50), floating indicator, label fade transitions. Zero third-party tab bar dependencies." },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">{item.icon}</div>
                <span className="text-xl font-bold text-foreground tracking-tight">{item.metric}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
                <p className="mt-2 text-xs text-muted-foreground/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section id="lessons" className="py-20 bg-gradient-to-b from-transparent via-[#111F54]/5 to-transparent">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">What I&apos;d Build Differently</h2>
            <p className="mt-2 text-sm text-muted-foreground">Honest reflections with today&apos;s context</p>
          </div>

          <div className="space-y-3">
            {[
              { title: "Centralize the API layer into a single Axios instance with interceptors", what: "Instead of importing Axios directly in every screen with duplicated error handling and token injection, I'd create a single Axios instance with request interceptors for auth headers and response interceptors for 401 handling and data normalization.", why: "Currently each screen handles try-catch, token injection, and error toasts independently. A centralized instance would eliminate ~10 lines of duplicated code per screen and ensure consistent error handling everywhere.", impact: "Would remove ~150 lines of duplicated HTTP handling across 15+ screens and guarantee consistent 401 redirect behavior." },
              { title: "Unify Safe/Risky team components into a single themed component", what: "Extract the common rendering logic from AiSafeTeam and AiRiskyTeam into a shared presentational component that accepts zone-driven theme props (colors, gradients, badges, button styles).", why: "The two components share identical structure (~100 lines each) with different theme constants. A unified component with zone prop would eliminate the duplication while keeping the theme separation clean.", impact: "Would reduce ~100 lines of duplicated component code and make it trivial to add new risk levels or themes." },
              { title: "Add periodic background polling for live match updates", what: "60-second background polling during active match hours to refresh lineup changes, toss results, and live prediction updates without requiring manual pull-to-refresh.", why: "Match data changes infrequently but unpredictably — lineups drop hours before game time, toss results arrive moments before play. Background polling would keep data fresh without WebSocket complexity.", impact: "Would eliminate manual refresh during match hours and improve prediction accuracy with latest data." },
            ].map((item, i) => {
              const [isOpen, setIsOpen] = useState(i === 0);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card overflow-hidden">
                  <button onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-hover">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      {[<GitBranch size={14} />, <Zap size={14} />, <Database size={14} />][i]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground leading-snug block">{item.title}</span>
                    </div>
                    <ChevronDown size={14} className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="border-t border-border px-4 py-4 space-y-3">
                          <div>
                            <span className="text-xs font-medium text-accent uppercase tracking-wider">What I&apos;d do</span>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.what}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Why</span>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.why}</p>
                          </div>
                          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Impact</span>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.impact}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-sm text-muted-foreground/60 mb-8">Want to see another complex production system?</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <Link href="/projects/landsquire" className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/[0.03]">
                <div className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="h-full w-full rounded-full bg-accent/5 blur-3xl" />
                </div>
                <div className="relative">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Home size={24} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">Land Squire</h3>
                  <p className="mt-1 text-sm font-medium text-accent">Real Estate Marketplace</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                    A full-featured real estate marketplace connecting property buyers, brokers, and bank agents with map-based discovery, bidding, CRM tools, and multi-language support.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-5 py-2 text-xs font-medium text-accent transition-all duration-300 group-hover:bg-accent/10 group-hover:gap-3">
                    View Project <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
