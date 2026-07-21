"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown, Eye, ArrowRight, Home, Map, Search, Users, Building2, Banknote, Globe, BarChart3, Smartphone, GitBranch, Database, Zap, Shield, Activity, Cpu, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

interface LandSquirePageProps {
  project: Project;
}

const sections = [
  { id: "story", label: "Story" },
  { id: "experience", label: "Experience" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "timeline", label: "Timeline" },
  { id: "challenges", label: "Challenges" },
  { id: "stack", label: "Stack" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "Lessons" },
];

const features = [
  {
    id: "map", number: "01", icon: <Map size={14} />, label: "Map Discovery", title: "Map-Based Property Discovery",
    tagline: "Find properties where they actually are — on a map", problem: "List-based browsing hides geographic context. Users couldn't see where properties are relative to each other or understand neighborhood density at a glance.",
    solution: "Properties and projects render directly on an interactive Google Map as custom price tag markers. A custom useMapData hook (30+ state variables) manages viewport tracking, visibility culling, and filter controls. Viewport culling with a 50% buffer zone prevents rendering thousands of markers simultaneously. Project boundaries display as green polygon overlays with locally cached aerial plan images.",
    metrics: "30+ hook state vars | 50% culling buffer | Custom price markers",
  },
  {
    id: "roles", number: "02", icon: <Users size={14} />, label: "Role-Based", title: "Three Roles, One Codebase",
    tagline: "One app, three perspectives", problem: "Building separate apps for buyers, brokers, and bank agents would triple development and maintenance costs.",
    solution: "A single user_type field in the auth response determines post-login navigation, available features, and dashboard content. The signup form dynamically renders role-specific fields. Buyers see map-first discovery, brokers get a CRM dashboard, and bank agents receive loan enquiries. This eliminates the need for three separate applications while delivering tailored experiences.",
    metrics: "3 user types | Dynamic forms | Role-aware routing",
  },
  {
    id: "listing", number: "03", icon: <Home size={14} />, label: "Property Listing", title: "Multi-Step Property Listing",
    tagline: "Listing a property shouldn't take a week", problem: "Complex property listing forms overwhelm users with too many fields at once, causing high abandonment rates.",
    solution: "Guided 4-step (sell) and 3-step (rent) wizards with react-native-progress-steps. Each step validates progressively — users fix issues immediately rather than facing a wall of errors at submission. Google Places Autocomplete with session tokens for accurate address resolution. Media uploads support images, videos, PDFs, and master plans with MIME type validation.",
    metrics: "4-step sell | 3-step rent | Progressive validation",
  },
  {
    id: "bidding", number: "04", icon: <Banknote size={14} />, label: "Bidding", title: "Competitive Bidding System",
    tagline: "Buyers compete, sellers win", problem: "Fixed-price listings don't capture market demand. Sellers miss out on competitive offers while buyers have no way to express higher willingness to pay.",
    solution: "Properties support competitive bidding with intelligent validation — minimum bids are set at 50% of the asking price to prevent unrealistic lowball offers. Brokers toggle bidding on/off and set end dates. The system reuses the existing sendenquiry API endpoint with a bidamount field, keeping the architecture simple.",
    metrics: "50% minimum bid | Toggle control | End date config",
  },
  {
    id: "crm", number: "05", icon: <BarChart3 size={14} />, label: "CRM", title: "Full CRM for Brokers",
    tagline: "Every lead, every follow-up, in one place", problem: "Brokers managed leads across disconnected channels — phone calls, WhatsApp, walk-ins — with no centralized tracking or follow-up system.",
    solution: "A full lead management system with advanced filters (city, date range, property type, status), follow-up timeline with notes, and direct call/WhatsApp integration via deep linking. Status tracking (new, qualified, won, not responded, final) with audit trail creates complete sales pipeline visibility.",
    metrics: "5 lead statuses | Notes timeline | Call/WhatsApp actions",
  },
  {
    id: "i18n", number: "06", icon: <Globe size={14} />, label: "i18n", title: "Multi-Language Support",
    tagline: "Speak your language", problem: "English-only apps exclude the majority of Indian real estate buyers who prefer browsing in Hindi, especially in Tier 2 and Tier 3 cities.",
    solution: "Full English and Hindi localization with 130+ translation keys via i18next. Font selection is conditional on active language — Rubik for English, NotoSerifDevanagari for Hindi — with 12 bundled font files (6 weights x 2 languages). Language preference persists in AsyncStorage. Switch triggers immediate re-render of all text.",
    metrics: "130+ keys | 12 font files | Persisted preference",
  },
  {
    id: "projects", number: "07", icon: <Building2 size={14} />, label: "Projects", title: "Upcoming Projects Visualization",
    tagline: "See the future of development, mapped", problem: "Upcoming real estate projects lack visual context — buyers can't see project boundaries, proximity to existing properties, or neighborhood layout.",
    solution: "Development projects render as green polygon boundaries with semi-transparent aerial plan overlays on the map. Polygon coordinates are parsed from JSON arrays. Centroid calculation places the marker at the geometric center. Map area images are downloaded and cached locally with expo-file-system. Platform-specific bounds ordering (Android vs iOS) required for correct Overlay rendering.",
    metrics: "Polygon overlay | Cached images | Cross-platform bounds",
  },
];

const metricsData = [
  { icon: <Smartphone size={16} />, value: 25, suffix: "+", label: "Screens", sublabel: "Across auth & root groups", color: "text-accent" },
  { icon: <GitBranch size={16} />, value: 35, suffix: "+", label: "Components", sublabel: "Reusable design system", color: "text-emerald-400" },
  { icon: <Database size={16} />, value: 35, suffix: "+", label: "API Endpoints", sublabel: "Laravel REST API", color: "text-accent" },
  { icon: <Users size={16} />, value: 3, suffix: "", label: "User Roles", sublabel: "Buyer, broker, bank agent", color: "text-cyan-400" },
  { icon: <Globe size={16} />, value: 130, suffix: "+", label: "Translations", sublabel: "English + Hindi i18n", color: "text-emerald-400" },
  { icon: <Activity size={16} />, value: 54, suffix: "", label: "Custom Icons", sublabel: "PNG icon design system", color: "text-accent" },
];

const timeline = [
  { phase: "1", title: "Research & Planning", desc: "Competitive analysis of 10+ real estate apps, architecture design, Expo project scaffolding" },
  { phase: "2", title: "Authentication & Navigation", desc: "OTP auth flow, Expo Router navigation structure, user context, role-based routing" },
  { phase: "3", title: "Design System", desc: "Color palette, typography (12 fonts), 35+ reusable components, icon library" },
  { phase: "4", title: "Map Integration", desc: "Google Maps setup, custom price markers, useMapData hook, viewport culling, project overlays" },
  { phase: "5", title: "Property Features", desc: "Multi-step listing wizards, property detail screen, 15 sub-components, lightbox with pinch-zoom" },
  { phase: "6", title: "Bidding & CRM", desc: "Bidding system with validation, CRM portal with lead management, filters, notes timeline" },
  { phase: "7", title: "Multi-Language & i18n", desc: "i18next setup, 260+ translations (EN + HI), dual font loading, language switching" },
  { phase: "8", title: "Dashboard & Admin", desc: "Loan enquiry management, bank agent profiles, edit/delete property workflows" },
  { phase: "9", title: "Testing & Polish", desc: "Cross-platform testing, map performance optimization, Reanimated animations" },
  { phase: "10", title: "Launch", desc: "EAS Build configuration, app store submission, expo-updates setup, monitoring" },
];

const decisions = [
  {
    title: "Expo managed over bare React Native",
    icon: <Smartphone size={16} />,
    alternatives: "Bare React Native, Native Swift/Kotlin",
    tradeoff: "Expo limits access to some native modules, but all required functionality was available in SDK 54.",
    decision: "SDK 54 covers maps, fonts, file system, image picker, video, and notifications via Expo plugins. EAS Update enables OTA bug fixes without app store review.",
    impact: "Cross-platform from day one. Over-the-air updates. No eject needed despite complex map and media features.",
  },
  {
    title: "Custom useMapData hook over Redux",
    icon: <Cpu size={16} />,
    alternatives: "Redux Toolkit, Zustand, useReducer",
    tradeoff: "30+ state variables in one hook creates complexity. The hook does significant derivation (viewport culling, coordinate transforms).",
    decision: "Centralizing all map state in a custom hook keeps the screen component clean while providing all derivation logic in one testable unit. The hook returns derived values so the screen doesn't need to recompute.",
    impact: "Zero state management dependencies. Clean separation of map logic from UI. Easy to reason about despite complexity.",
  },
  {
    title: "Laravel PHP over Node.js",
    icon: <Database size={16} />,
    alternatives: "Node.js + Express, Python + Django",
    tradeoff: "PHP has higher server cost per request. Laravel's ORM is less performant than raw queries for complex joins.",
    decision: "Laravel provides built-in Sanctum token auth, Validator with field-level errors, and Cache facade — reducing dependency count by 5+ packages. Consistent patterns across 35+ endpoints.",
    impact: "35+ endpoints built with consistent auth, validation, and caching. Sanctum handles token management out of the box.",
  },
  {
    title: "i18next with dual fonts over simple strings",
    icon: <Globe size={16} />,
    alternatives: "Simple JSON key-value, single font, separate apps per language",
    tradeoff: "12 bundled font files (6 weights x 2 typefaces) increase app bundle size by ~3MB. Conditional fontFamily logic adds complexity.",
    decision: "i18next provides interpolation, pluralization, and language change callbacks. Font switching through conditional fontFamily based on i18n.language. Both fonts preloaded via expo-font.",
    impact: "Instant language switching. Correct script rendering for Devanagari. Hindi support doubles addressable market in North India.",
  },
];

const challenges = [
  {
    icon: <Map size={16} />, label: "Map Performance at Scale",
    problem: "Rendering hundreds of property markers simultaneously caused jank. Each custom price tag marker needed position tracking, tap response, and visual polish.",
    solution: "Three-layer optimization: viewport culling with 50% buffer zone renders only visible markers, tracksViewChanges disabled after 100ms on custom markers, React.memo on PriceMarker and MarkersRenderer.",
    result: "Smooth 60fps panning even with 500+ properties in viewport range.",
    metrics: ["60fps target", "50% buffer", "100ms optimization"],
  },
  {
    icon: <Shield size={16} />, label: "API Key Security",
    problem: "Hardcoded Google Maps API keys in mobile bundles are vulnerable to extraction and unauthorized use.",
    solution: "Server-side key delivery with 24-hour local caching. Three-level fallback: server key, app.json fallback, empty string. Key refresh on login. Silent fallback on fetch failure.",
    result: "Key rotation without app store updates. Zero unauthorized key usage incidents.",
    metrics: ["24h cache", "3-level fallback", "Silent recovery"],
  },
  {
    icon: <Building2 size={16} />, label: "Cross-Platform Map Overlays",
    problem: "Project polygon boundaries rendered differently on Android vs iOS due to platform-specific coordinate handling in the Overlay component.",
    solution: "Platform-specific bounds construction. Polygon coordinates parsed from JSON strings. Centroid calculation for marker placement. File system caching with MD5 checksum for plan images.",
    result: "Consistent overlay rendering across both platforms. Optimized image loading with local caching.",
    metrics: ["2 platforms", "Cached images", "Centroid calc"],
  },
  {
    icon: <Database size={16} />, label: "Inconsistent API Parsing",
    problem: "Gallery images, videos, amenities, and price history returned in inconsistent formats — arrays, objects, or JSON strings with no predictable pattern.",
    solution: "Each data field has its own robust parsing function with type detection, try-catch blocks, and defensive defaults. Handles arrays, objects, strings, and nulls per field type.",
    result: "Zero crashes from malformed API data across all 15 PropertyDetails sub-components.",
    metrics: ["15 components", "Zero parse crashes", "Defensive defaults"],
  },
];

export function LandSquirePage({ project }: LandSquirePageProps) {
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
              <Home size={12} /> Case Study
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{project.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{project.tagline}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Smartphone size={12} /> iOS + Android</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Users size={12} /> 3 User Roles</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Clock size={12} /> 6 Months</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><Map size={12} /> React Native + Laravel</span>
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
            Real estate in India is fragmented.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Buyers jump between listing sites, brokers manage leads in spreadsheets, and bank agents struggle to find loan customers. There was no single, unified mobile experience connecting all three parties with map-based discovery, real-time bidding, and CRM tools.
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
            <p className="mt-2 text-sm text-muted-foreground">Expo Router client + Laravel REST API + Google Maps</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="overflow-x-auto">
              <pre className="text-xs leading-relaxed text-muted-foreground font-mono">
                <code>{`Mobile App (React Native / Expo SDK 54)
  ├── Expo Router (25+ screens, 2 nav groups)
  │   ├── (auth)/ Sign In (OTP), Sign Up (Role-based)
  │   ├── (tabs)/ Home, Map, Add Listing, Assets, Settings
  │   └── stack/  Property Detail, Project, CRM, Bank
  │
  ├── State: UserContext (Auth) + useMapData (Map: 30+ vars)
  ├── Map: react-native-maps (Google) + custom price markers
  ├── i18n: i18next (EN + HI, 130+ keys, dual fonts)
  └── HTTP: Axios → HTTPS → landsquire.in/api/...

Laravel REST API
  ├── Sanctum Token Auth + OTP
  ├── Property Endpoints (Listings, Details, Filter, Search)
  ├── Map Endpoints (Filter Listings, API Key Management)
  ├── CRM Endpoints (Lead Management, Lead Details)
  ├── User Endpoints (Profile, Broker List, Bank Agent List)
  └── Analytics (Visit Tracking, Visitor Counting)

External
  ├── Google Maps (Rendering, Geocoding, Places Autocomplete)
  └── Firebase Cloud Messaging (Push Notifications)`}</code>
              </pre>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Land Squire follows a standard client-server architecture. Expo Router provides file-based navigation across 25+ screens organized into two navigation groups (auth and root). The map system uses react-native-maps (Google provider) with a custom useMapData hook managing 30+ state variables for viewport tracking, marker visibility, and filter controls. The Laravel API serves 35+ endpoints with Sanctum token authentication and server-side caching. Google Maps provides geographic rendering and place autocomplete. Firebase Cloud Messaging handles push notifications.
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

      {/* Build Timeline */}
      <section id="timeline" className="py-20 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Build Timeline</h2>
            <p className="mt-2 text-sm text-muted-foreground">10 phases across 6 months</p>
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
            <p className="mt-2 text-sm text-muted-foreground">The tools and frameworks powering Land Squire</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "React Native (Expo)", cat: "Mobile", desc: "Cross-platform iOS/Android/Web with Expo Router for file-based navigation and 35+ reusable components forming a complete design system." },
              { name: "Laravel PHP", cat: "Backend", desc: "REST API with Sanctum auth, Validator for form validation, and Cache facade for server-side response caching across 35+ endpoints." },
              { name: "Google Maps", cat: "Maps", desc: "Interactive map rendering with custom price markers, polygon project overlays, geocoding, and Places Autocomplete for address resolution." },
              { name: "NativeWind", cat: "UI", desc: "Tailwind CSS utility classes for React Native. Build-time generation via Babel plugin eliminates runtime CSS-in-JS overhead." },
              { name: "MySQL", cat: "Database", desc: "Relational data store for properties, users, enquiries, CRM leads, and loan applications with JSON columns for flexible amenity and media data." },
              { name: "i18next", cat: "i18n", desc: "Internationalization framework with 130+ keys per language. Dual font support: Rubik (English) and NotoSerifDevanagari (Hindi)." },
              { name: "Reanimated", cat: "Animations", desc: "Native-driven animations for tab bar spring effects, lightbox pinch-to-zoom, and smooth card transitions at 60fps." },
              { name: "React Context", cat: "State", desc: "UserContext provides auth state and map API keys to all screens. Custom useMapData hook manages 30+ map state variables." },
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

      {/* Metrics */}
      <section id="results" className="py-20" ref={metricsRef}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">By the Numbers</h2>
            <p className="mt-2 text-sm text-muted-foreground">Key metrics from the Land Squire platform</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {metricsData.map((m, i) => (
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

      {/* Results */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Results</h2>
            <p className="mt-2 text-sm text-muted-foreground">Measurable impact from architectural decisions</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <Map size={20} />, metric: "25+", label: "App Screens", desc: "Organized into 2 navigation groups (auth, root) with Expo Router file-based routing across tabs and stacked screens." },
              { icon: <GitBranch size={20} />, metric: "35+", label: "Reusable Components", desc: "A complete design system spanning 15 PropertyDetails sub-components, 4 map components, 5 form screens, and 16 general components." },
              { icon: <Database size={20} />, metric: "35+", label: "API Endpoints", desc: "Laravel REST API with consistent Sanctum auth, Validator field-level errors, and server-side caching across endpoints." },
              { icon: <Users size={20} />, metric: "3", label: "User Roles", desc: "Buyers, brokers, and bank agents from one codebase. Role-aware navigation and dynamic form rendering eliminate the need for separate apps." },
              { icon: <Globe size={20} />, metric: "130+", label: "i18n Translations", desc: "Full English and Hindi localization with 12 bundled font files (6 weights x 2 typefaces) for correct script rendering." },
              { icon: <Clock size={20} />, metric: "6 mo.", label: "Time to Ship", desc: "From initial research to app store launch across 10 development phases spanning research, design, build, test, and deploy." },
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
              { title: "Split useMapData into smaller, focused hooks", what: "Instead of one hook managing 30+ state variables, I'd extract smaller hooks: useMapFilter (filter state + API calls), useMapRegion (viewport + bounds computation), useMapMarkers (marker visibility + rendering).", why: "The current hook has grown beyond what a single unit should manage. Derivation logic for viewport culling, centroid calculation, and filter computation is mixed with state management. Smaller hooks would be independently testable and easier to reason about.", impact: "Would reduce the hook from 533 lines to 3 hooks of ~180 lines each. Each would have a single responsibility and clear test boundaries." },
              { title: "Add offline-first architecture from the start", what: "Local SQLite cache for recently viewed properties, cached search results, and pending enquiries that sync when connectivity returns.", why: "Real estate browsing often happens on the go with unreliable connectivity. Currently the app requires connectivity for every API call. SQLite via expo-sqlite would provide async, structured offline storage for property data and search results.", impact: "Would improve perceived load time by 60% for repeat views and enable full offline browsing of cached data. Pending enquiries would queue locally and sync in the background." },
              { title: "Abstract the JSON parsing into an Axios interceptor", what: "Instead of each component parsing inconsistent API responses with try-catch blocks, build an Axios response interceptor that normalizes all responses before they reach any component.", why: "The safe-parse utility is effectively copied across multiple components. A single interceptor would handle all inconsistent data (gallery, videos, amenities, price history) in one place with consistent fallback values.", impact: "Would eliminate ~200 lines of duplicated parsing logic across 15+ components and guarantee consistent null handling everywhere." },
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
            <Link href="/projects/ai-analyzer" className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/[0.03]">
                <div className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="h-full w-full rounded-full bg-accent/5 blur-3xl" />
                </div>
                <div className="relative">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">AI Analyzer</h3>
                  <p className="mt-1 text-sm font-medium text-accent">Algorithmic Trading Platform</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                    AI-powered algorithmic trading platform with live execution, strategy backtesting, copy trading, broker integration, and real-time market intelligence.
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