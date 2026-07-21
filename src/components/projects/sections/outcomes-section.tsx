"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Radio, Database, CheckCircle, GitBranch, TrendingUp, Clock, Users, BarChart3, Smartphone, Activity } from "lucide-react";

const engineeringOutcomes = [
  { icon: <Zap size={16} />, metric: "Reduced Execution Latency", value: "667ms round trip", desc: "BullMQ queue decoupling stabilized API response times under 200ms" },
  { icon: <Shield size={16} />, metric: "Queue Reliability", value: "Zero job loss", desc: "Redis-backed persistence ensures no strategy execution loss during failures" },
  { icon: <Radio size={16} />, metric: "Broker Synchronization", value: "99.5% success", desc: "Exponential backoff reconnection with automatic position reconciliation" },
  { icon: <Database size={16} />, metric: "Redis Cache Optimization", value: "78% hit rate", desc: "AI response caching reduces Claude API costs by 78%, saving ~$40/day" },
  { icon: <CheckCircle size={16} />, metric: "Stable Live Execution", value: "Zero breaches", desc: "RiskManager validates every trade — zero risk limit breaches in production" },
  { icon: <GitBranch size={16} />, metric: "Modular Architecture", value: "3 deployable tiers", desc: "Mobile, API, and admin dashboard deploy independently without coordination" },
];

const businessOutcomes = [
  { icon: <TrendingUp size={16} />, metric: "Live Trading Capability", value: "500+ strategies", desc: "Users deploy algorithmic strategies directly from mobile to production" },
  { icon: <BarChart3 size={16} />, metric: "AI Decision Making", value: "78% cache hit", desc: "Claude-powered analysis delivers market sentiment in under 3 seconds" },
  { icon: <Clock size={16} />, metric: "Faster Strategy Deployment", value: "45s → 3.2s", desc: "Backtesting optimization reduced strategy validation time by 93%" },
  { icon: <Activity size={16} />, metric: "Reduced Manual Monitoring", value: "Real-time alerts", desc: "Socket.IO push notifications replace manual position tracking" },
  { icon: <Smartphone size={16} />, metric: "Better User Experience", value: "3K+ users", desc: "Unified mobile platform replaces fragmented trading tools" },
  { icon: <Users size={16} />, metric: "Copy Trading Ecosystem", value: "Strategy marketplace", desc: "Users discover, copy, and deploy strategies from top performers" },
];

export function OutcomesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="outcomes" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Engineering Outcomes</h2>
          <p className="mt-2 text-sm text-muted-foreground">Measurable impact from architectural decisions</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Zap size={16} />
              </div>
              <h3 className="text-base font-semibold">Engineering</h3>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {engineeringOutcomes.map((item) => (
                <motion.div
                  key={item.metric}
                  variants={itemVariants}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-foreground">{item.metric}</span>
                      <span className="text-xs font-mono text-accent">{item.value}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
 
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                <TrendingUp size={16} />
              </div>
              <h3 className="text-base font-semibold">Business</h3>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {businessOutcomes.map((item) => (
                <motion.div
                  key={item.metric}
                  variants={itemVariants}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-cyan/10 text-accent-cyan">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-foreground">{item.metric}</span>
                      <span className="text-xs font-mono text-accent-cyan">{item.value}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
