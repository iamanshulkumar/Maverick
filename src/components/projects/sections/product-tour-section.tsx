"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Activity, TrendingUp, Users, LineChart, GitBranch, Search, Fingerprint, Eye, Zap } from "lucide-react";
import { PhoneMockup } from "../visual-components";

const img = (name: string) => `/images/projects/Ai%20analyser/${name.replace(/ /g, "%20").replace(/&/g, "%26")}`;

gsap.registerPlugin(ScrollTrigger);

interface FeatureEngineering {
  problem: string;
  solution: string;
  metrics: string;
}

const engineeringInsights: Record<string, FeatureEngineering> = {
  dashboard: {
    problem: "Polling-based state sync caused 200K+ DB reads/minute during market hours with stale data between polls.",
    solution: "Socket.IO pushes position updates in real-time. Redis pub/sub broadcasts to all connected clients under 50ms.",
    metrics: "<50ms event delivery | 95% DB read reduction | 3K+ concurrent connections",
  },
  "algo-trading": {
    problem: "Inline execution in Express routes blocked API workers during long strategy evaluations (up to 30s).",
    solution: "BullMQ decouples evaluation from the request lifecycle. Workers consume jobs asynchronously with retry and priority.",
    metrics: "200ms API latency | 500+ concurrent evaluations | Zero job loss on failure",
  },
  "chart-analysis": {
    problem: "Twelve Data API rate limits and latency made real-time chart updates unreliable during high-volume periods.",
    solution: "WebSocket feed with local caching. Claude AI analysis cached in Redis with 6-hour TTL and 78% hit rate.",
    metrics: "78% AI cache hit rate | <5ms cached responses | 2.4s avg AI analysis",
  },
  "copy-trading": {
    problem: "Strategy performance metrics required computing across thousands of trades without blocking the API.",
    solution: "MongoDB aggregation pipelines compute metrics on-demand. Results cached in Redis with 30s TTL for dashboard views.",
    metrics: "Real-time performance metrics | 1,247 active copiers | 15% weekly growth",
  },
  backtesting: {
    problem: "Single strategy backtest against 6 months of 1-minute data took 45+ seconds.",
    solution: "Pre-aggregated candle data with parallel worker evaluation. Worker threads process ticker symbols concurrently.",
    metrics: "45s → 3.2s average | 5K+ backtests in first month | 93% faster validation",
  },
  broker: {
    problem: "Network interruptions dropped broker connections, requiring manual re-authentication and risking inconsistent state.",
    solution: "Exponential backoff reconnection (1s → 60s) with automatic position reconciliation on reconnect.",
    metrics: "99.5% reconnection rate | <8s average recovery | 4,000+ line integration",
  },
  discovery: {
    problem: "Instrument search across multiple asset classes required separate API calls to different data providers.",
    solution: "Unified search layer with Twelve Data API. Results cached in Redis with sector-based partitioning.",
    metrics: "Multi-asset search | Real-time price via Twelve Data | AI analysis per instrument",
  },
};

const features = [
  {
    id: "dashboard", label: "Dashboard", icon: <BarChart3 size={14} />, number: "01",
    title: "Live Trading Dashboard", tagline: "Real-time portfolio overview",
    description: "Open positions, P&L tracking, and AI-powered market summaries across all connected brokers — updated in real-time.",
    engineering: engineeringInsights.dashboard,
    screenshot: "Dashboard.png",
  },
  {
    id: "algo-trading", label: "Algo Trading", icon: <Activity size={14} />, number: "02",
    title: "Algorithmic Strategy Engine", tagline: "Deploy strategies from your phone",
    description: "JSON-based strategy configuration with configurable entry/exit conditions, risk parameters, and queue-based execution.",
    engineering: engineeringInsights["algo-trading"],
    screenshot: "Algo trading stats & List.png",
  },
  {
    id: "chart-analysis", label: "Chart Analysis", icon: <TrendingUp size={14} />, number: "03",
    title: "AI-Powered Chart Analysis", tagline: "Patterns detected by Claude AI",
    description: "Multi-instrument charts with AI pattern recognition, confidence scoring, and natural language explanations.",
    engineering: engineeringInsights["chart-analysis"],
    screenshot: "chart Trading pairs.png",
  },
  {
    id: "copy-trading", label: "Copy Strategy", icon: <Users size={14} />, number: "04",
    title: "Copy Trading Marketplace", tagline: "Follow top performers",
    description: "Discover strategies with verified track records. Copy with one tap. Customize position sizing independently.",
    engineering: engineeringInsights["copy-trading"],
    screenshot: "Public strategies & filter.png",
  },
  {
    id: "backtesting", label: "Backtesting", icon: <LineChart size={14} />, number: "05",
    title: "Historical Strategy Backtesting", tagline: "Validate before you trade",
    description: "Simulate against historical data with comprehensive reports. AI-suggested optimizations reduce iteration cycles.",
    engineering: engineeringInsights.backtesting,
    screenshot: "user backtesting.png",
  },
  {
    id: "broker", label: "Broker Connection", icon: <GitBranch size={14} />, number: "06",
    title: "MetaTrader Broker Integration", tagline: "Seamless broker sync",
    description: "Automatic position sync, exponential backoff reconnection, and idempotent trade execution for zero duplicates.",
    engineering: engineeringInsights.broker,
    screenshot: "Broker connection.png",
  },
  {
    id: "discovery", label: "Discovery", icon: <Search size={14} />, number: "07",
    title: "Smart Instrument Discovery", tagline: "Find any market",
    description: "Browse multi-asset instruments with real-time data, AI-powered analysis per symbol, and personalized watchlists.",
    engineering: engineeringInsights.discovery,
    screenshot: "Instrument Discovery.png",
  },
];

export function ProductTourSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const [showTap, setShowTap] = useState(false);

  useGSAP(() => {
    if (!pinnedRef.current) return;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80px",
      end: "bottom 80px",
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(Math.floor(progress * features.length), features.length - 1);
        setActiveFeature(index);
      },
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, { scope: sectionRef });

  useEffect(() => {
    const t = setTimeout(() => setShowTap(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const feature = features[activeFeature];

  return (
    <section ref={sectionRef} id="features" className="relative min-h-screen">
      <div ref={pinnedRef} className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-4">
            <Eye size={12} />
            Experience the Platform
          </div>
          <h2 className="text-2xl font-bold text-foreground">Product Experience</h2>
          <p className="mt-2 text-sm text-muted-foreground">Scroll to walk through every feature</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: Feature nav */}
          <div className="space-y-0.5 lg:col-span-2">
            {features.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(i)}
                className={`feature-card flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-300 ${
                  activeFeature === i
                    ? "border border-accent/30 bg-accent/10"
                    : "border border-transparent hover:bg-surface-hover"
                }`}
              >
                <span className={`shrink-0 font-mono text-xs transition-colors duration-300 ${
                  activeFeature === i ? "text-accent" : "text-muted-foreground/40"
                }`}>{f.number}</span>
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${
                  activeFeature === i ? "bg-accent text-white" : "bg-card text-muted-foreground"
                }`}>{f.icon}</div>
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-medium ${activeFeature === i ? "text-accent" : "text-foreground"}`}>
                    {f.label}
                  </span>
                  {activeFeature === i && (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                      className="mt-0.5 block h-0.5 rounded-full bg-accent"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Phone + detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-6 lg:flex-row lg:items-start"
              >
                {/* Phone */}
                <div className="relative shrink-0">
                  <PhoneMockup>
                    <img src={img(feature.screenshot)} alt={feature.label} className="h-full w-full object-cover" />
                  </PhoneMockup>
                  {showTap && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="pointer-events-none absolute -bottom-3 -right-3 z-10"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-card shadow-lg">
                        <Fingerprint size={12} className="text-accent" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Detail */}
                <div className="min-w-0 flex-1 space-y-4">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground/40">{feature.number}</span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{feature.title}</h3>
                    <p className="mt-0.5 text-xs text-accent font-medium">{feature.tagline}</p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                  <div className="space-y-3 rounded-xl border border-border/50 bg-card/50 p-4">
                    <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap size={10} /> Engineering
                    </p>
                    <div>
                      <p className="text-[10px] text-amber-400/80 uppercase tracking-wider font-medium">Problem</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{feature.engineering.problem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-accent uppercase tracking-wider font-medium">Solution</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{feature.engineering.solution}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {feature.engineering.metrics.split(" | ").map((m) => (
                        <span key={m} className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[10px] text-emerald-400 font-medium">
                          {m}
                        </span>
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
  );
}