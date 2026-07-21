"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, CheckCircle, TrendingUp, Users, Clock, Zap, Shield, Cpu, Database, Activity, Code2, Smartphone, LineChart, BookOpen, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PhoneMockup({ gradient = "from-accent/20 via-accent-cyan/20 to-accent/10", children }: { gradient?: string; children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[280px]">
      <div className="relative rounded-[2.5rem] border-4 border-border bg-card p-3 shadow-2xl">
        <div className="absolute left-1/2 top-0 h-5 w-28 -translate-x-1/2 rounded-b-xl bg-card" />
        <div className={`aspect-[9/19] w-full rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          {children || (
            <div className="p-6 text-center">
              <Smartphone size={32} className="mx-auto text-foreground/20 mb-2" />
              <p className="text-[10px] text-foreground/30">App Screenshot</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function OverviewCard({ icon, label, value, description, delay = 0 }: { icon: React.ReactNode; label: string; value: string; description: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        {icon}
      </div>
      <span className="block text-2xl font-bold text-foreground">{value}</span>
      <span className="mt-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <p className="mt-2 text-[11px] text-muted-foreground/70 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function FeatureCard({ icon, title, features, delay = 0 }: { icon: React.ReactNode; title: string; features: string[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
        {icon}
      </div>
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <div className="flex flex-wrap gap-1.5">
        {features.map((f) => (
          <Badge key={f} variant="accent" className="text-[10px]">{f}</Badge>
        ))}
      </div>
    </motion.div>
  );
}

export function ChallengeTimeline({ challenges }: { challenges: { challenge: string; explanation: string }[] }) {
  return (
    <div className="relative space-y-0">
      <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-accent via-accent-cyan to-transparent" />
      {challenges.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="relative flex gap-6 pb-10 last:pb-0"
        >
          <div className="relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-accent/30 bg-card shadow-[0_0_10px_rgba(99,102,241,0.15)]">
            <span className="text-xs font-bold text-accent">{i + 1}</span>
          </div>
          <div className="min-w-0 pt-1.5">
            <h4 className="text-sm font-semibold text-foreground mb-2">{item.challenge}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.explanation}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TechExplorer({ techStack, highlightProject }: { techStack: string[]; highlightProject?: string }) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const techDescriptions: Record<string, { category: string; description: string }> = {
    "React Native (Expo)": { category: "Mobile", description: "Cross-platform mobile framework for iOS and Android with Expo Router navigation." },
    "Node.js": { category: "Backend", description: "JavaScript runtime powering 14+ Express API controllers and the live trading engine." },
    "Express": { category: "Backend", description: "HTTP framework for REST API routing and middleware." },
    MongoDB: { category: "Database", description: "Document database with 17 schemas for flexible trading and strategy data models." },
    "Socket.IO": { category: "Real-time", description: "Bidirectional event-based communication for live trade and position updates." },
    Redis: { category: "Infrastructure", description: "In-memory data store for BullMQ queues, AI response caching, and pub/sub control channel." },
    MetaAPI: { category: "Integration", description: "MetaTrader broker bridge — 4000+ lines handling connection lifecycle and order execution." },
    "Claude AI": { category: "AI", description: "Large language model for market sentiment analysis with structured prompt injection." },
    "Twelve Data API": { category: "Data", description: "External market data provider for real-time and historical price feeds." },
    React: { category: "Frontend", description: "Admin dashboard built with Vite and Material UI for strategy and platform management." },
    Firebase: { category: "Infrastructure", description: "Push notification delivery and authentication infrastructure." },
  };

  const categories = [...new Set(techStack.map((t) => techDescriptions[t]?.category || "Other").filter(Boolean))];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => {
          const desc = techDescriptions[tech] || { category: "Other", description: "" };
          return (
            <button
              key={tech}
              onClick={() => setActiveTech(activeTech === tech ? null : tech)}
              className={`rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                activeTech === tech
                  ? "border-accent bg-accent/10 text-accent shadow-[0_0_10px_rgba(99,102,241,0.15)]"
                  : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-accent"
              }`}
            >
              <span className="block text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">{desc.category}</span>
              {tech}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {activeTech && techDescriptions[activeTech] && (
          <motion.div
            key={activeTech}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-accent/20 bg-accent/[0.03] p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-medium text-accent uppercase tracking-wider">{techDescriptions[activeTech].category}</span>
              <span className="text-xs text-foreground font-medium">{activeTech}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{techDescriptions[activeTech].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OutcomeMetrics({ outcomes }: { outcomes: { metric: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {outcomes.map((item, i) => (
        <motion.div
          key={item.metric}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="rounded-xl border border-border bg-card p-4 text-center hover:border-accent/30 transition-colors"
        >
          <span className="block text-xl font-bold text-accent">{item.value}</span>
          <span className="mt-1 block text-[10px] text-muted-foreground leading-tight">{item.metric}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function LessonsAccordion({ lessons }: { lessons: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const icons = [LightbulbIcon, GitBranchIcon, CpuIcon, DatabaseIcon, ActivityIcon];

  return (
    <div className="space-y-2">
      {lessons.map((lesson, i) => {
        const Icon = icons[i % icons.length];
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-hover"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground leading-snug">{lesson}</span>
              <ChevronDown
                size={14}
                className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-4 py-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lesson}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function LightbulbIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>; }
function GitBranchIcon() { return <GitBranch size={14} />; }
function CpuIcon() { return <Cpu size={14} />; }
function DatabaseIcon() { return <Database size={14} />; }
function ActivityIcon() { return <Activity size={14} />; }

const iconsByTitle: Record<string, React.ReactNode> = {
  "AI Market Intelligence": <BrainIcon />,
  "Live Algorithmic Trading": <Activity size={16} />,
  "Strategy Backtesting": <LineChart size={16} />,
  "Copy Trading": <Users size={16} />,
  "Chart Analysis": <TrendingUp size={16} />,
  "Portfolio Management": <BookOpen size={16} />,
  "Broker Integration": <GitBranch size={16} />,
};

function BrainIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 0-4 4v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a4 4 0 0 0-4-4Z"/><path d="M12 6v14"/><path d="M8 14a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z"/><path d="M16 14a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z"/></svg>; }

export function getFeatureIcon(title: string): React.ReactNode {
  return iconsByTitle[title] || <Code2 size={16} />;
}

export function ScreenshotGallery({ screenshots }: { screenshots: string[] }) {
  const gradients = [
    "from-accent/20 via-accent-cyan/20 to-accent/10",
    "from-accent-cyan/20 via-accent/20 to-accent-cyan/10",
    "from-violet-500/20 via-accent/20 to-violet-500/10",
    "from-emerald-500/20 via-accent-cyan/20 to-emerald-500/10",
    "from-amber-500/20 via-accent/20 to-amber-500/10",
    "from-rose-500/20 via-accent-cyan/20 to-rose-500/10",
  ];

  if (screenshots.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {gradients.slice(0, 6).map((g, i) => (
          <div
            key={i}
            className={`aspect-[9/16] rounded-xl bg-gradient-to-br ${g} flex items-center justify-center border border-border`}
          >
            <Smartphone size={24} className="text-foreground/20" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {screenshots.map((src, i) => (
        <div
          key={i}
          className="aspect-[9/16] rounded-xl bg-card border border-border overflow-hidden"
        >
          <img src={src} alt={`Screenshot ${i + 1}`} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}
