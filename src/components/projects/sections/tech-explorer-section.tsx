"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Zap, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReactIcon, NodeIcon, MongoIcon, RedisIcon, SocketIOIcon, BullMQIcon, MetaAPIIcon, ClaudeIcon, ExpressIcon, TwelveDataIcon, FirebaseIcon } from "@/components/shared/tech-icons";

interface TechExplorerSectionProps {
  onTechSelect?: (techName: string | null) => void;
}

const techIcons: Record<string, React.ReactNode> = {
  BullMQ: <BullMQIcon size={16} />,
  Redis: <RedisIcon size={16} />,
  MongoDB: <MongoIcon size={16} />,
  "Socket.IO": <SocketIOIcon size={16} />,
  MetaAPI: <MetaAPIIcon size={16} />,
  "Claude AI": <ClaudeIcon size={16} />,
  "React Native (Expo)": <ReactIcon size={16} />,
};

const technologies = [
  {
    name: "BullMQ",
    category: "Queue",
    purpose: "Redis-backed job queue for decoupling strategy execution from HTTP request lifecycle. Provides reliable delivery, retries, and concurrency control.",
    location: "Middleware layer between LiveStrategyEngine and BullMQ Workers",
    performance: "Zero job loss during instance failures. Handles 500+ concurrent strategy evaluations.",
    whyChosen: "BullMQ provides production-grade queue semantics (retries, delays, priorities) out of the box without building custom infrastructure.",
    tradeoffs: "Adds Redis as an infrastructure dependency. Job processing latency (~5ms) vs inline execution (~0.5ms) — acceptable tradeoff for reliability.",
    files: "workers/queue.ts, workers/strategyWorker.js",
    tags: ["Queue", "Async", "Reliability"],
  },
  {
    name: "Redis",
    category: "Infrastructure",
    purpose: "Multi-purpose: BullMQ queue backend, pub/sub control channel for worker commands, AI response cache (78% hit rate).",
    location: "Three roles: queue backend, control channel (pub/sub), cache layer",
    performance: "Sub-millisecond pub/sub delivery. Cache reduces Claude AI costs by 78% (~$40/day saved).",
    whyChosen: "Single infrastructure piece serving three distinct roles. Pub/sub enables zero-polling worker control.",
    tradeoffs: "In-memory — data loss on restart without persistence. Configured with AOF persistence for queues, no persistence for cache (acceptable).",
    files: "services/cache.js, workers/controlChannel.js, config/redis.js",
    tags: ["Cache", "Pub/Sub", "Queue"],
  },
  {
    name: "MongoDB",
    category: "Database",
    purpose: "Primary data store. 17 schemas across all platform domains — users, strategies, trades, backtests, broker connections.",
    location: "Persistence layer for all platform data. TradeLogger writes every executed trade as an immutable document.",
    performance: "Document model accommodates schema evolution without migrations. Trade writes at <10ms p99 latency.",
    whyChosen: "Schema flexibility critical for trading data — strategies have variable condition structures, trades vary by instrument type and broker.",
    tradeoffs: "No built-in ACID transactions across documents. Workaround: application-level idempotency keys and event sourcing pattern.",
    files: "models/*.js (17 schemas), services/tradeLogger.js",
    tags: ["Database", "Document Store", "Persistence"],
  },
  {
    name: "Socket.IO",
    category: "Real-time",
    purpose: "Bidirectional real-time communication between backend and mobile/web clients. Room-based subscriptions for positions, trades, market data.",
    location: "Transport layer between backend and clients. Redis adapter enables horizontal scaling.",
    performance: "<50ms event delivery to all connected clients. Supports 3K+ concurrent connections across 2 instances.",
    whyChosen: "Automatic reconnection, room management, and Redis adapter for horizontal scaling — features that would need manual implementation with raw WebSocket.",
    tradeoffs: "Heavier than raw WebSocket (HTTP long-polling fallback). ~2KB overhead per connection. Acceptable for trading applications where reliability matters.",
    files: "services/socketManager.js, middleware/socketAuth.js",
    tags: ["Real-time", "WebSocket", "Events"],
  },
  {
    name: "MetaAPI",
    category: "Integration",
    purpose: "Bridges the platform with MetaTrader broker servers. 4000+ lines handling connection lifecycle, authentication, position sync, and order execution.",
    location: "External integration layer. Called by OrderExecutor for trade placement and PaperStrategyRunner for historical data.",
    performance: "Exponential backoff reconnection (1s → 60s). 99.5% reconnection success rate. Average recovery under 8s.",
    whyChosen: "Only mature Node.js SDK for MetaTrader integration. Handles the complex MetaTrader protocol details.",
    tradeoffs: "Vendor lock-in — migrating to different broker infrastructure would require rewriting the integration layer. Connection-oriented design requires careful state management.",
    files: "services/metaapiService.js (4000+ lines), utils/connectionManager.js",
    tags: ["Integration", "Broker", "External"],
  },
  {
    name: "Claude AI",
    category: "AI",
    purpose: "Market sentiment analysis. Structured prompts inject market context (price action, volume, sector) and return sentiment scores with natural language reasoning.",
    location: "AI intelligence layer. Called on-demand with Redis caching (6-hour TTL, market-movement-based invalidation).",
    performance: "78% cache hit rate. Average response time 2.4s (cached: <5ms). Daily API cost <$40.",
    whyChosen: "Best-in-class reasoning for financial analysis. Structured prompt support enables consistent output format.",
    tradeoffs: "API cost at scale ($180/day without caching). Not real-time — minimum 2s response time. Cache invalidation complexity during volatile markets.",
    files: "services/aiService.js, services/aiCache.js",
    tags: ["AI", "NLP", "External API"],
  },
  {
    name: "React Native (Expo)",
    category: "Mobile",
    purpose: "Cross-platform mobile framework for iOS and Android. Expo Router navigation with context-driven state management across 6 feature modules.",
    location: "Client layer. Communicates with backend via REST + Socket.IO. Expo push notifications for trade alerts.",
    performance: "60fps rendering on mid-range devices. FlatList optimization with getItemLayout and windowSize tuning.",
    whyChosen: "Single codebase for iOS and Android. Expo managed workflow reduces native build complexity. Over-the-air updates via EAS Update.",
    tradeoffs: "Native module limitations for advanced use cases (custom chart rendering). Bridge overhead for heavy computation. Acceptable for this application's UI complexity.",
    files: "app/* (Expo Router), components/*, services/api.js",
    tags: ["Mobile", "Cross-platform", "UI"],
  },
];

export function TechExplorerSection({ onTechSelect }: TechExplorerSectionProps) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const tech = technologies.find((t) => t.name === activeTech);

  const handleSelect = (name: string | null) => {
    setActiveTech(name);
    if (name && (name === "BullMQ" || name === "Redis" || name === "MongoDB" || name === "MetaAPI" || name === "Node.js")) {
      onTechSelect?.(name);
    }
  };

  return (
    <section id="technology" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Technology Stack</h2>
          <p className="mt-2 text-sm text-muted-foreground">Click a technology to explore its role in the architecture</p>
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {technologies.map((t) => (
            <motion.button
              key={t.name}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(activeTech === t.name ? null : t.name)}
              className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                activeTech === t.name
                  ? "border-accent bg-accent/[0.04] shadow-[0_0_15px_rgba(99,102,241,0.08)]"
                  : "border-border bg-card hover:border-accent/30 hover:shadow-[0_0_12px_rgba(99,102,241,0.04)]"
              }`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg mb-3 ${
                activeTech === t.name ? "bg-accent text-white" : "bg-accent/10 text-accent"
              } transition-colors duration-200`}>
                {techIcons[t.name]}
              </div>
              <span className="block text-sm font-semibold text-foreground">{t.name}</span>
              <span className="block text-sm text-muted-foreground mt-0.5">{t.category}</span>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {tech && (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-xl border border-accent/20 bg-card overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border bg-surface-hover p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {techIcons[tech.name]}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{tech.name}</h3>
                    <div className="flex gap-1.5 mt-0.5">
                      {tech.tags.map((tag) => (
                        <Badge key={tag} variant="accent" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{tech.category}</span>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">Purpose</span>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tech.purpose}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">Location</span>
                    <p className="mt-1 text-sm text-muted-foreground">{tech.location}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">Why Chosen</span>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tech.whyChosen}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 uppercase tracking-wider">
                      <Zap size={12} /> Performance Impact
                    </span>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tech.performance}</p>
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-amber-400 uppercase tracking-wider">
                      <AlertTriangle size={12} /> Tradeoffs
                    </span>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tech.tradeoffs}</p>
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <GitBranch size={12} /> Key Files
                    </span>
                    <p className="mt-1 text-sm font-mono text-muted-foreground">{tech.files}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!tech && (
          <p className="mt-6 text-center text-sm text-muted-foreground">Select a technology above to explore its details</p>
        )}
      </div>
    </section>
  );
}
