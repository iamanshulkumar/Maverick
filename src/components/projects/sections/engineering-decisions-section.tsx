"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GitBranch, Zap, AlertTriangle, CheckCircle } from "lucide-react";

const decisions = [
  {
    question: "Why BullMQ over inline execution?",
    icon: <GitBranch size={16} />,
    alternatives: ["Inline execution in Express route handlers", "RabbitMQ with AMQP protocol", "BullMQ with Redis backend"],
    tradeoff: "Inline execution was simpler but blocked API workers during long strategy evaluations (up to 30s). RabbitMQ added protocol complexity without benefit for a Node.js-only stack.",
    decision: "BullMQ provides production-grade queue semantics (retries, delays, priorities) using Redis — already in the stack for caching and pub/sub. Workers scale horizontally independently of the API layer.",
    impact: "API response times stabilized under 200ms. Zero job loss during 3 instance failures. 500+ concurrent strategy evaluations without API degradation.",
  },
  {
    question: "Why Redis as the infrastructure backbone?",
    icon: <Zap size={16} />,
    alternatives: ["PostgreSQL for job queues", "Kafka for pub/sub messaging", "Dedicated cache server (Memcached)"],
    tradeoff: "PostgreSQL lacks native pub/sub and queue primitives — would require application-layer polling. Kafka is over-engineered for a single-team platform. Memcached adds another infrastructure dependency.",
    decision: "Redis serves three distinct roles: BullMQ backend, pub/sub control channel, and AI response cache. A single Redis instance eliminates three separate infrastructure dependencies.",
    impact: "78% AI cache hit rate saves ~$40/day. Sub-millisecond pub/sub delivery for worker commands. One infrastructure piece to monitor instead of three.",
  },
  {
    question: "Why MetaAPI over direct MetaTrader connection?",
    icon: <AlertTriangle size={16} />,
    alternatives: ["Direct MetaTrader WebSocket connection", "Custom MetaTrader bridge using Python", "MetaAPI SDK for Node.js"],
    tradeoff: "Direct MetaTrader protocol is undocumented and version-specific. A custom Python bridge adds language context-switching and RPC overhead. MetaAPI is a paid dependency.",
    decision: "MetaAPI is the only mature Node.js SDK for MetaTrader. Handles authentication, order routing, and position sync. Cost ($0.10/connection/day) is negligible compared to building and maintaining a custom integration.",
    impact: "4000+ lines of robust broker integration. 99.5% reconnection success rate. Zero duplicate positions in production due to built-in idempotency support.",
  },
  {
    question: "Why MongoDB over PostgreSQL?",
    icon: <CheckCircle size={16} />,
    alternatives: ["PostgreSQL with JSONB columns", "DynamoDB for serverless scaling", "MongoDB for document flexibility"],
    tradeoff: "PostgreSQL with JSONB offers relational integrity but schema migrations for trading data (strategies with variable conditions, trades with instrument-specific fields) would be constant friction. DynamoDB limits query patterns.",
    decision: "MongoDB's document model accommodates schema evolution without migrations. 17 schemas across all platform domains — users, strategies, trades, backtests, broker connections — all benefit from flexible documents.",
    impact: "Zero schema migrations needed since launch. Trade writes at <10ms p99 latency. Document model matches the natural structure of trading data.",
  },
  {
    question: "Why Socket.IO over raw WebSocket?",
    icon: <Zap size={16} />,
    alternatives: ["Raw WebSocket with custom reconnection logic", "Server-Sent Events (SSE) for one-way updates", "Socket.IO with Redis adapter"],
    tradeoff: "Raw WebSocket requires custom implementation of reconnection, room management, and horizontal scaling. SSE only supports server-to-client communication.",
    decision: "Socket.IO provides automatic reconnection, room-based subscriptions, and Redis adapter for horizontal scaling — all features that would need careful manual implementation with raw WebSocket.",
    impact: "3K+ concurrent connections across 2 backend instances. <50ms event delivery. Automatic reconnection handles network interruptions transparently.",
  },
  {
    question: "Why Claude AI over fine-tuned financial LLM?",
    icon: <AlertTriangle size={16} />,
    alternatives: ["Fine-tuned Llama model on financial data", "GPT-4 with financial prompts", "Claude AI with structured prompts"],
    tradeoff: "Fine-tuned models require labeled financial data, GPU infrastructure, and ongoing retraining. GPT-4 has higher per-token cost with similar reasoning quality for this use case.",
    decision: "Claude AI offers best-in-class reasoning for structured financial analysis. Structured prompts ensure consistent output format. Redis caching reduces effective cost by 78%.",
    impact: "78% cache hit rate. Average 2.4s response time (cached: <5ms). Daily API cost under $40. Structured prompt output enables deterministic parsing for UI display.",
  },
];

export function EngineeringDecisionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="decisions" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Important Decisions</h2>
          <p className="mt-2 text-sm text-muted-foreground">Architecture choices, tradeoffs, and their real-world impact</p>
        </div>

        <div className="space-y-2">
          {decisions.map((d, i) => {
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
                    {d.icon}
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground">{d.question}</span>
                  <ChevronDown size={14} className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-4 py-4 space-y-4">
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Alternatives Considered</span>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {d.alternatives.map((a) => (
                              <span key={a} className="rounded-md border border-border/50 bg-background px-2 py-0.5 text-xs text-muted-foreground">{a}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 uppercase tracking-wider">
                            <AlertTriangle size={10} /> Tradeoff
                          </span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.tradeoff}</p>
                        </div>
                        <div>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-accent uppercase tracking-wider">
                            <GitBranch size={10} /> Decision
                          </span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.decision}</p>
                        </div>
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 uppercase tracking-wider">
                            <CheckCircle size={10} /> Impact
                          </span>
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
  );
}