"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, RefreshCw, ArrowRight, GitBranch, Zap } from "lucide-react";

const reflections = [
  {
    title: "Extract services into independent microservices",
    category: "Architecture",
    icon: <GitBranch size={14} />,
    whatIdDo: "TradeLogger, RiskManager, and OrderExecutor would each become standalone microservices with their own data stores and independent deployment pipelines.",
    why: "Today they share a codebase with defined interfaces but the same deployment unit. Extracting them would allow independent scaling (RiskManager needs 2x capacity during market opens), isolated failure domains, and team-parallel development.",
    impact: "Would reduce deployment risk by 60%, enable per-service auto-scaling, and allow the risk team to deploy independently of the trading team.",
  },
  {
    title: "Replace polling with event sourcing from day one",
    category: "Infrastructure",
    icon: <Zap size={14} />,
    whatIdDo: "Implement event sourcing for trade execution — every order, fill, and rejection is an immutable event. Current state is a projection of the event stream.",
    why: "The current architecture writes trade state directly to MongoDB. Event sourcing would give us complete audit trails, time-travel debugging, and automatic position reconciliation without custom logic.",
    impact: "Would eliminate the 4,000+ line reconciliation layer, provide free audit logging, and enable real-time position replay for debugging.",
  },
  {
    title: "Add dynamic worker auto-scaling earlier",
    category: "Infrastructure",
    icon: <ArrowRight size={14} />,
    whatIdDo: "BullMQ workers would auto-scale based on queue depth and time-of-day patterns. Pre-warm workers before market opens, scale down during low-volume periods.",
    why: "Workers are currently statically provisioned. During market opens, queue depth spikes 10x and static workers cause backlog. After hours, 8 workers sit idle.",
    impact: "Would eliminate market-open backlogs entirely, reduce infrastructure costs by ~40% during off-hours, and handle flash traffic without manual intervention.",
  },
  {
    title: "Build the admin panel as a separate app from the start",
    category: "Architecture",
    icon: <RefreshCw size={14} />,
    whatIdDo: "Admin panel would be a standalone Next.js app with its own API gateway, authentication, and deployment. Shared services via internal APIs only.",
    why: "Admin was initially embedded in the main API. Separating it required re-plumbing auth, request routing, and deployment config. Doing it from the start would have saved 2 weeks.",
    impact: "Would save 2 weeks of refactoring time, enable independent admin deployments without touching the trading API, and allow different scaling policies for admin vs. API.",
  },
];

export function LessonsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="lessons" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">What I&apos;d Build Differently Today</h2>
          <p className="mt-2 text-sm text-muted-foreground">Honest reflections on architectural decisions I&apos;d change with today&apos;s context</p>
        </div>

        <div className="space-y-2">
          {reflections.map((item, i) => {
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
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground leading-snug block">{item.title}</span>
                    <span className="text-xs text-muted-foreground mt-0.5 block">{item.category}</span>
                  </div>
                  <ChevronDown size={14} className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
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
                      <div className="border-t border-border px-4 py-4 space-y-3">
                        <div>
                          <span className="text-xs font-medium text-accent uppercase tracking-wider">What I&apos;d do</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.whatIdDo}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Why</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.why}</p>
                        </div>
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Impact if done from the start</span>
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
  );
}