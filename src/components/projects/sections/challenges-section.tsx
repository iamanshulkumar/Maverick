"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  Shield,
  Clock,
  Radio,
  Database,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const challenges = [
  {
    id: "queue",
    icon: <GitBranch size={16} />,
    label: "Queue Reliability",
    problem:
      "Inline strategy execution in Express route handlers caused timeout issues during long evaluation windows. API workers blocked, response times unpredictable.",
    decision:
      "Decoupled execution into BullMQ queues — LiveStrategyEngine pushes jobs, workers consume asynchronously. Redis-backed persistence ensures no job loss on crash.",
    implementation:
      "BullMQ queue with 5 retries, exponential backoff, and priority lanes. Workers scale horizontally behind the queue, independent of API layer.",
    result:
      "API response times stabilized under 200ms. Zero job loss during 3 instance failures. Queue throughput handles 500+ concurrent strategy evaluations.",
    metrics: ["200ms API latency", "0 job loss", "500+ concurrent"],
    tags: ["Architecture", "Backend"],
  },
  {
    id: "broker",
    icon: <Radio size={16} />,
    label: "Broker Sync",
    problem:
      "MetaTrader broker connections drop on network interruption. Each reconnect requires re-authentication and position state reconciliation to prevent data inconsistency.",
    decision:
      "Built a 4000+ line MetaAPI integration with exponential backoff reconnection (1s → 2s → 4s → 8s → max 60s) and automatic position reconciliation on reconnect.",
    implementation:
      "Connection lifecycle manager tracks state (CONNECTED, RECONNECTING, DISCONNECTED). On reconnect, compares local cache vs broker state and replays unconfirmed events.",
    result:
      "99.5% reconnection success rate. Average recovery time under 8s. Zero duplicate positions from retried orders due to idempotency keys.",
    metrics: ["99.5% success", "<8s recovery", "0 duplicates"],
    tags: ["Integration", "Trading"],
  },
  {
    id: "risk",
    icon: <Shield size={16} />,
    label: "Risk Validation",
    problem:
      "Live trading requires pre-trade risk checks (max position size, daily loss limit, drawdown) before every order. Bypassing risk checks could cause catastrophic losses.",
    decision:
      "RiskManager as a mandatory middleware in the execution pipeline. Every trade signal passes through RiskManager before reaching OrderExecutor.",
    implementation:
      "In-memory state trackers for positions, daily P&L, and drawdown. Configurable limits per strategy with hard caps per user. Rejection events logged for audit.",
    result:
      "Zero risk limit breaches in production. RiskManager processes 3ms average validation time. Daily loss limits prevented 12 potential margin calls.",
    metrics: ["0 breaches", "3ms validation", "12 preventions"],
    tags: ["Architecture", "Trading"],
  },
  {
    id: "backtest",
    icon: <Clock size={16} />,
    label: "Backtest Performance",
    problem:
      "Historical backtesting against months of tick data was slow — single strategy evaluation taking 45+ seconds for 6 months of 1-minute data.",
    decision:
      "Pre-aggregated candle data with configurable granularity (1m, 5m, 15m, 1h). Parallel strategy evaluation across multiple ticker symbols.",
    implementation:
      "Historical data cached in MongoDB with time-based partitioning. Workers evaluate strategies in parallel using Node.js worker_threads. Results streamed via Socket.IO.",
    result:
      "Average backtest time reduced from 45s to 3.2s. 5K+ backtests completed in first month. Optimization pass suggests parameter adjustments automatically.",
    metrics: ["45s → 3.2s", "5K+ backtests", "Auto-optimization"],
    tags: ["Performance", "Backend"],
  },
  {
    id: "realtime",
    icon: <Zap size={16} />,
    label: "Real-time Updates",
    problem:
      "Trade events (positions, P&L, order status) need to reach mobile clients and admin dashboard simultaneously without polling overhead or duplicate delivery.",
    decision:
      "Socket.IO with Redis pub/sub adapter for horizontal scaling. Single Socket.IO connection per client with room-based subscription management.",
    implementation:
      "Backend publishes events to Redis channels. Socket.IO server subscribed to Redis broadcasts to connected clients in relevant rooms. Admin dashboard subscribes to admin channels.",
    result:
      "<50ms event delivery to all connected clients. Supports 3K+ concurrent connections across 2 backend instances. Zero duplicate message delivery.",
    metrics: ["<50ms delivery", "3K+ concurrent", "0 duplicates"],
    tags: ["Real-time", "Infrastructure"],
  },
  {
    id: "redis-pubsub",
    icon: <Database size={16} />,
    label: "Redis Communication",
    problem:
      "Strategy workers need to react to pause/resume/stop commands instantly without polling the database every few seconds (which would add latency and DB load).",
    decision:
      "Dedicated Redis pub/sub control channel. Workers subscribe to strategy-specific channels and react to commands within milliseconds of broadcast.",
    implementation:
      "LiveStrategyEngine publishes commands to Redis channel. BullMQ workers subscribe on startup. Channel name includes strategy ID for targeted control. No polling required.",
    result:
      "Sub-millisecond command delivery. Zero database overhead for control signals. Workers pause/resume within 2ms of broadcast.",
    metrics: ["<1ms delivery", "2ms response", "0 DB overhead"],
    tags: ["Architecture", "Infrastructure"],
  },
];

export function ChallengesSection() {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const challenge = challenges[activeChallenge];

  return (
    <section id="challenges" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground">Engineering Challenges</h2>
          <p className="mt-2 text-sm text-muted-foreground">Problems solved during development</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Navigation */}
          <div className="space-y-1 lg:col-span-2">
            {challenges.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveChallenge(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
                  activeChallenge === i
                    ? "border border-accent/30 bg-accent/10"
                    : "border border-transparent hover:bg-surface-hover"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    activeChallenge === i ? "bg-accent text-white" : "bg-card text-muted-foreground"
                  }`}
                >
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <span
                    className={`text-sm font-medium ${activeChallenge === i ? "text-accent" : "text-foreground"}`}
                  >
                    {c.label}
                  </span>
                  <div className="mt-0.5 flex gap-1">
                    {c.tags.map((t) => (
                      <span key={t} className="text-sm text-muted-foreground">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail card */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-border bg-surface-hover p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {challenge.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{challenge.label}</h3>
                    <div className="mt-0.5 flex gap-1.5">
                      {challenge.tags.map((t) => (
                        <Badge key={t} variant="accent" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  {/* Problem */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <AlertTriangle size={14} className="text-amber-400" />
                      <span className="text-sm font-medium uppercase tracking-wider text-amber-400">
                        Problem
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{challenge.problem}</p>
                  </div>

                  {/* Decision */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Cpu size={14} className="text-accent" />
                      <span className="text-sm font-medium uppercase tracking-wider text-accent">
                        Architecture Decision
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{challenge.decision}</p>
                  </div>

                  {/* Implementation */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <GitBranch size={14} className="text-accent-cyan" />
                      <span className="text-sm font-medium uppercase tracking-wider text-accent-cyan">
                        Implementation
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{challenge.implementation}</p>
                  </div>

                  {/* Result with metrics */}
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-400" />
                      <span className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                        Result
                      </span>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{challenge.result}</p>
                    <div className="flex flex-wrap gap-2">
                      {challenge.metrics.map((m) => (
                        <div
                          key={m}
                          className="rounded-md border border-emerald-500/20 bg-background px-2.5 py-1"
                        >
                          <span className="text-sm font-medium text-emerald-400">{m}</span>
                        </div>
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
