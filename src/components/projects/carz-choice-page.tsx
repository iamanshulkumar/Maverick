"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown, Eye, ArrowRight, Car, Search, GitBranch, Smartphone, BarChart3, Users, Clock, Zap, Shield, Activity, Database, Cpu, MessageCircle, Home, Banknote, Globe } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

interface CarzChoicePageProps {
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
    id: "browse", number: "01", icon: <Search size={14} />, label: "Smart Browsing", title: "Multi-Attribute Car Discovery",
    tagline: "Find any used car across 6 filter dimensions", problem: "Car buyers in India browse across multiple platforms — one for listings, another for prices, a third for comparisons. No single app combines filtering, browsing, and city-based discovery.",
    solution: "A home screen combining banner carousels, brand grids (5-column), city-based browsing (11 Indian cities), and an infinite-scroll results grid (6 items per batch). Multi-attribute filters (brand, budget, fuel, transmission, color) via bottom sheet with searchable FlatLists. Location-aware personalization via GPS detection persisted to AsyncStorage.",
    metrics: "6 filter dimensions | 11 cities | 6 items/batch",
  },
  {
    id: "detail", number: "02", icon: <Car size={14} />, label: "Car Details", title: "Everything About a Used Car",
    tagline: "Gallery, specs, features, and dealer info in one scroll", problem: "Car detail pages typically show specs in one place, photos in another, and dealer info requires a separate navigation step — breaking the browsing flow.",
    solution: "A comprehensive detail screen with Reanimated-powered image carousel (auto-play, gesture snapping), 12 attribute display (reg year, insurance, fuel, seats, KMs, RTO, ownership, engine, transmission, make year, color, last updated), FeaturesAccordion and SpecsAccordion as tabbed bottom sheets, EMI calculator via RBSheet, and native share sheet integration.",
    metrics: "12 attributes | Reanimated carousel | 2 accordion types",
  },
  {
    id: "chat", number: "03", icon: <MessageCircle size={14} />, label: "Real-Time Chat", title: "Stream Chat Integration",
    tagline: "Buyers and dealers connect instantly", problem: "Enquiry forms create asynchronous communication — dealers respond hours later if at all. WhatsApp mixing personal and business conversations is unprofessional.",
    solution: "Stream Chat with server-generated tokens via POST /api/generate-chat-token. Deterministic channel creation (chat-{seller}-{buyer}-{car}) prevents duplicates. Tapping Chat Now creates a backend lead + opens a chat room in one flow. First message auto-sent with buyer contact details. All/Unread tabs, Today/Older grouping, profile initials fallback.",
    metrics: "Deterministic channels | Server tokens | Auto-first message",
  },
  {
    id: "sell", number: "04", icon: <Home size={14} />, label: "Sell Wizard", title: "3-Step Vehicle Listing",
    tagline: "List your car in under 5 minutes", problem: "Listing a used car requires filling long forms with 20+ fields — most sellers abandon before completing.",
    solution: "A guided 3-step wizard using react-native-progress-steps. Step 1: Brand → Model → Variant cascading + City → State → Pincode + Color. Step 2: Price, Insurance, KMs, Fuel, Year, Registration, Ownership, Transmission. Step 3: Multi-image upload with preview and delete. Per-step progressive validation catches errors early. State preserved across steps.",
    metrics: "3 steps | 20+ fields | Progressive validation",
  },
  {
    id: "dealer", number: "05", icon: <Users size={14} />, label: "Dealer Platform", title: "Dealer Registration & Management",
    tagline: "From registration to lead management", problem: "Dealers need a professional presence on the platform — business verification, brand portfolio display, and a way to receive and manage buyer enquiries.",
    solution: "Dealer registration with business name, WhatsApp validation, multi-brand selection (searchable MultiSelect with logos), city/state/pincode, office photo upload, and business document upload (PDF/images via DocumentPicker). Dealer profile displays business info, brand logos, office photos gallery, and car inventory. Buyers view dealer profiles from car detail pages.",
    metrics: "Multi-brand select | Document upload | Office photos",
  },
  {
    id: "finance", number: "06", icon: <Banknote size={14} />, label: "Financing", title: "Loans, Insurance & EMI Calculator",
    tagline: "From browsing to financing in one flow", problem: "Car financing requires separate visits to banks. Buyers research on one app, apply for loans on another, and calculate EMI on a third — causing 40%+ drop-off.",
    solution: "Car loan applications to 6 partner banks (Axis, HDB, ICICI, IDFC, TVS Credit, Yes Bank) with logos. Insurance enquiry with DateTimePicker for registration date. EMI calculator with debounced sliders (12-84 months, 1-15% interest). All forms use Formik + Yup for structured validation with the same cascading dropdown pattern (Brand → Model → Variant).",
    metrics: "6 partner banks | Formik + Yup | 3 EMI sliders",
  },
];

const metrics = [
  { icon: <Smartphone size={16} />, value: 18, suffix: "", label: "Screens", sublabel: "Across 2 nav groups", color: "text-accent" },
  { icon: <GitBranch size={16} />, value: 21, suffix: "", label: "Components", sublabel: "Reusable design system", color: "text-emerald-400" },
  { icon: <Database size={16} />, value: 30, suffix: "+", label: "API Endpoints", sublabel: "Laravel REST API", color: "text-accent" },
  { icon: <Users size={16} />, value: 2, suffix: "", label: "User Types", sublabel: "Buyers and dealers", color: "text-cyan-400" },
  { icon: <MessageCircle size={16} />, value: 1, suffix: "", label: "Chat Service", sublabel: "Stream Chat integrated", color: "text-emerald-400" },
  { icon: <Globe size={16} />, value: 11, suffix: "", label: "Cities", sublabel: "Indian cities supported", color: "text-accent" },
];

const timeline = [
  { phase: "1", title: "Discovery & Research", desc: "Competitor analysis, user interviews with buyers and dealers, feasibility study" },
  { phase: "2", title: "Architecture & Design", desc: "Navigation tree, component library, design system, API contract design" },
  { phase: "3", title: "Core Build", desc: "Auth (email/password + Google OAuth), Home screen, Car Details, Brand/City browsing" },
  { phase: "4", title: "Engagement Features", desc: "Stream Chat integration, Sell wizard, My Vehicles dashboard" },
  { phase: "5", title: "Service Features", desc: "Car loan (6 banks), Insurance, Dealer registration, EMI calculator" },
  { phase: "6", title: "Quality & Launch", desc: "Cross-device testing, edge case handling, performance optimization, EAS Build" },
];

const decisions = [
  {
    title: "Stream Chat over custom WebSocket",
    icon: <MessageCircle size={16} />,
    alternatives: "Custom Socket.IO, Firebase Realtime Database",
    tradeoff: "Third-party dependency with ongoing API costs vs 6+ weeks of custom chat development for feature parity.",
    decision: "Stream Chat provides real-time messaging, read receipts, push notifications, offline support, and message history out of the box. Server-generated tokens ensure security. Deterministic channel IDs prevent duplicate channels. The stream-chat-expo package provides React Native compatibility.",
    impact: "6+ weeks saved vs custom build. Production-grade chat with zero ongoing maintenance.",
  },
  {
    title: "Email/Password + Google OAuth over phone-only OTP",
    icon: <Smartphone size={16} />,
    alternatives: "Phone-only OTP, Magic link email",
    tradeoff: "Email/password is less common in Indian mobile apps where phone numbers are the primary identifier. SMS OTP has 5-30 second delivery delays.",
    decision: "Email/password as primary for sub-second authentication. Google OAuth via expo-auth-session as a convenience option. Phone OTP available as fallback during signup.",
    impact: "Sub-second auth at first impression. Familiar login for users who prefer Google. Phone OTP fallback covers users without email.",
  },
  {
    title: "Formik + Yup over raw useState forms",
    icon: <Database size={16} />,
    alternatives: "react-hook-form, raw useState",
    tradeoff: "Formik re-renders on every field change, which can impact performance on forms with 20+ fields across 3 steps.",
    decision: "Formik for 6 major forms (sell wizard, edit vehicle, loan, insurance, dealer reg, signup) with Yup validation schemas. Raw useState for 2 simple forms (edit profile, support). Per-step rendering in the sell wizard isolates re-renders to the active step.",
    impact: "Consistent form handling across 6 forms. Schema-based validation catches errors before submission. No performance issues due to step isolation.",
  },
  {
    title: "Reanimated Carousel over FlatList galleries",
    icon: <Zap size={16} />,
    alternatives: "FlatList paging, react-native-snap-carousel",
    tradeoff: "Additional dependency with specific version requirements. Manual FlatList is zero-dependency but lacks auto-play and smooth gestures.",
    decision: "react-native-reanimated-carousel provides auto-play (3s interval), gesture-driven snapping with Reanimated animations, loop support, and Expo SDK 54 compatibility. Reanimated integration ensures 60fps during gallery interaction.",
    impact: "60fps image galleries with auto-play. Smooth gesture snapping. Full Expo SDK compatibility.",
  },
];

const challenges = [
  {
    icon: <GitBranch size={16} />, label: "Cascading Dependent Dropdowns",
    problem: "Brand → Model → Variant and City → State → Pincode each require 3 sequential API calls. Users can change any level at any time, requiring downstream state cleanup.",
    solution: "Guarded useEffect chains: mount fetches brands + cities → brand select triggers model fetch → model select triggers variant fetch. Loading states per dependency level. State cleanup on selection change clears downstream values and resets loading indicators.",
    result: "Clean cascading across 4+ forms. Zero stale data from race conditions.",
    metrics: ["4+ form screens", "3 dependency levels", "Guarded effects"],
  },
  {
    icon: <MessageCircle size={16} />, label: "Real-Time Chat + Lead Generation",
    problem: "Tapping Chat Now must create a backend lead and a Stream Chat channel atomically. If either fails, the user ends up in an inconsistent state.",
    solution: "Single API call (POST /api/bookvehiclenow) creates the backend lead. Client-side createOrGetChannel creates a deterministic Stream channel (chat-{seller}-{buyer}-{car}). First message auto-sent with buyer contact details. Retry button if channel creation fails.",
    result: "Atomic lead + channel creation. Zero orphaned channels. Reliable first-contact flow.",
    metrics: ["Atomic creation", "Auto-first message", "Retry support"],
  },
  {
    icon: <Database size={16} />, label: "Image Management (Upload/Delete)",
    problem: "Editing vehicles mixes local uploads (file:// URIs) with existing server images (https:// URLs). Deleting requires distinguishing between the two.",
    solution: "URI prefix check determines delete behavior: file:// URIs removed from local array only; https:// URIs trigger DELETE API call before removal. Gallery tracks string array of all URIs. JSON-safe parsing with fallback for API response strings.",
    result: "Reliable image editing. Zero accidental server deletions of new uploads.",
    metrics: ["URI prefix check", "DELETE API call", "JSON-safe parsing"],
  },
  {
    icon: <Users size={16} />, label: "Multi-Role UX Across 18 Screens",
    problem: "Buyers and Dealers see different dashboards, CTAs, and permissions. Building separate flows would double the codebase.",
    solution: "Single usertype field drives conditional rendering everywhere: Signup shows UserTypeToggle, Home shows Become A Dealer only for users, Car Detail shows Edit Vehicle + View Chat for owners, Chat shows different channel sets per role.",
    result: "Tailored experiences from one codebase. Zero duplication across roles.",
    metrics: ["18 screens", "1 usertype field", "Conditional rendering"],
  },
];

export function CarzChoicePage({ project }: CarzChoicePageProps) {
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
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-cyan-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-6">
              <Car size={12} /> Case Study
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{project.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{project.tagline}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Smartphone size={12} /> iOS + Android</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Users size={12} /> Buyers + Dealers</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Clock size={12} /> 6 Months</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><MessageCircle size={12} /> Stream Chat</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section id="story" className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8">
            The Problem
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-2xl leading-relaxed text-foreground/80 sm:text-3xl sm:leading-relaxed md:text-4xl md:leading-relaxed font-light">
            Buying a used car in India means visiting five different platforms.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Listings on one site, prices on another, comparisons on a third, loans at a bank, and dealers reached by phone. No single mobile experience combines discovery, specifications, real-time dealer communication, financing, and selling into one seamless flow.
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
            We built the missing layer.
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
      <section id="architecture" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">System Architecture</h2>
            <p className="mt-2 text-sm text-muted-foreground">Expo Router client + Laravel REST API + Stream Chat</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="overflow-x-auto">
              <pre className="text-xs leading-relaxed text-muted-foreground font-mono">
                <code>{`Mobile App (React Native / Expo SDK 54)
  ├── Expo Router (18 screens, 2 nav groups)
  │   ├── (auth)/ Sign In (Email/Password), Sign Up (Buyer/Dealer)
  │   ├── (tabs)/ Home, Chat, Dashboard, My Vehicles, Sell
  │   └── stack/  Vehicle Detail, Dealer Profile, Chat Rooms
  │
  ├── State: LocationContext (City) + ChatContext (Stream)
  ├── Forms: 6 major forms via Formik + Yup validation
  └── HTTP: Axios → HTTPS → carzchoice.com/api/...

Laravel REST API
  ├── Sanctum Token Auth (Email/Password + Google OAuth)
  ├── Vehicle Catalog (Brands, Models, Variants, Listings)
  ├── Filter Engine (Multi-attribute search)
  ├── Lead Generation (Book vehicle, Create enquiry)
  ├── Financial Services (Loan, Insurance)
  ├── Dealer Platform (Registration, Profile)
  └── Chat Token Generation (Server-generated Stream tokens)

External
  ├── Stream Chat (Real-time messaging, deterministic channels)
  ├── Google OAuth (Social login via expo-auth-session)
  └── Firebase Cloud Messaging (Push notifications)`}</code>
              </pre>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Carz Choice uses Expo Router for file-based navigation across 18 screens organized into auth and root tab groups. Two context providers manage global state: LocationContext (GPS-detected city persisted to AsyncStorage) and ChatContext (Stream Chat client and channel state). The Laravel backend serves 30+ REST API endpoints with Sanctum token authentication. Stream Chat powers real-time dealer-buyer messaging with server-generated tokens and deterministic channel IDs. Google OAuth via expo-auth-session provides social login as an alternative to email/password.
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
            <p className="mt-2 text-sm text-muted-foreground">Key metrics from the Carz Choice platform</p>
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
      <section id="timeline" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Build Timeline</h2>
            <p className="mt-2 text-sm text-muted-foreground">6 phases across 6 months</p>
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
      <section id="stack" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Technology Stack</h2>
            <p className="mt-2 text-sm text-muted-foreground">The tools and frameworks powering Carz Choice</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "React Native (Expo)", cat: "Mobile", desc: "Cross-platform iOS/Android with Expo Router for file-based navigation and 21 reusable components forming a complete design system." },
              { name: "Laravel PHP", cat: "Backend", desc: "REST API with Sanctum auth, Validator for form validation with field-level error messages, and 30+ endpoints serving vehicle, user, and lead data." },
              { name: "Stream Chat", cat: "Real-Time", desc: "Managed chat service for real-time dealer-buyer messaging with server-generated tokens, deterministic channel IDs, read receipts, and offline support." },
              { name: "MySQL", cat: "Database", desc: "Relational data store for vehicles, users, dealers, leads, loan enquiries, and insurance requests with JSON columns for flexible attributes." },
              { name: "NativeWind", cat: "UI", desc: "Tailwind CSS utility classes for React Native. Build-time generation via Babel plugin eliminates runtime CSS-in-JS overhead across 21 components." },
              { name: "Formik + Yup", cat: "Forms", desc: "Schema-based form management across 6 major forms with field-level validation, error state tracking, and consistent submission handling." },
              { name: "Reanimated", cat: "Animations", desc: "Native-driven animations for image carousels with auto-play, gesture snapping, and 60fps transitions during gallery interaction." },
              { name: "React Context", cat: "State", desc: "LocationContext (current city) and ChatContext (Stream client) provide global state without Redux. AsyncStorage persists auth tokens and city preference." },
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
              { icon: <Smartphone size={20} />, metric: "18", label: "App Screens", desc: "Organized into 2 navigation groups (auth, root tabs) with Expo Router file-based routing across tabs and stacked screens." },
              { icon: <GitBranch size={20} />, metric: "21", label: "Reusable Components", desc: "A complete design system spanning 6 card variants, 2 accordion types, 2 gallery components, 5+ forms, and map/modal utilities." },
              { icon: <Database size={20} />, metric: "30+", label: "API Endpoints", desc: "Laravel REST API with Sanctum auth, Validator field-level errors, and consistent patterns across vehicle, user, lead, and finance domains." },
              { icon: <MessageCircle size={20} />, metric: "Stream Chat", label: "Real-Time Messaging", desc: "Server-generated tokens, deterministic channel deduplication, auto-first message with contact details, and All/Unread tab filtering." },
              { icon: <Users size={20} />, metric: "2", label: "User Types", desc: "Buyers and dealers from one codebase. Conditional rendering via usertype field drives tailored experiences across all 18 screens." },
              { icon: <BarChart3 size={20} />, metric: "6", label: "Partner Banks", desc: "Integrated loan application flow for Axis, HDB, ICICI, IDFC, TVS Credit, and Yes Bank with cascading pickers and Formik validation." },
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
      <section id="lessons" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">What I&apos;d Build Differently</h2>
            <p className="mt-2 text-sm text-muted-foreground">Honest reflections with today&apos;s context</p>
          </div>

          <div className="space-y-3">
            {[
              { title: "Centralize the API layer into a single Axios instance with interceptors", what: "Instead of importing Axios directly in every screen with duplicated error handling and token injection, I'd create a single Axios instance with request interceptors for auth headers and response interceptors for 401 handling and data normalization.", why: "Currently each screen handles try-catch, token injection, and error toasts independently. A centralized instance would eliminate ~15 lines of duplicated code per screen and ensure consistent error handling everywhere.", impact: "Would remove ~300 lines of duplicated HTTP handling across 18 screens and guarantee consistent 401 redirect behavior." },
              { title: "Add offline-first support with SQLite caching", what: "A local SQLite cache for recently viewed cars and cached search results, with background sync when connectivity returns. The current app fetches fresh data on every screen mount.", why: "Car buyers often browse on the go with unreliable connectivity. AsyncStorage is synchronous and blocks the JS thread. SQLite via expo-sqlite would provide async, structured offline storage for vehicle listings and search results.", impact: "Would improve perceived load time by 50% for repeat views and enable full offline browsing of cached vehicle data." },
              { title: "Abstract the cascading picker pattern into a reusable hook", what: "The Brand → Model → Variant cascading pattern appears in 4+ forms (sell, edit, loan, insurance). I'd extract it into a useCascadingPicker hook that manages the fetch chain, state resets, and loading indicators.", why: "Currently each form duplicates the useEffect chain, loading states, and error handling for the same pattern. A hook would make new forms a single declaration: useCascadingPicker(brandApi, modelApi, variantApi).", impact: "Would reduce form code by ~40 lines per form and eliminate the risk of missing state cleanup in new forms." },
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