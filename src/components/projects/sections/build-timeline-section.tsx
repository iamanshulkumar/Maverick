"use client";

import { motion } from "framer-motion";

const timeline = [
  { week: "1", title: "Architecture & Data Models", desc: "System design, 17 MongoDB schemas, Redis pub/sub channels, BullMQ queue topology" },
  { week: "2", title: "Trading Engine Core", desc: "LiveStrategyEngine, BullMQ workers, paper trading mode, TradeLogger service" },
  { week: "3", title: "Backtesting System", desc: "Historical tick replay, strategy evaluation pipeline, pre-aggregated candle data" },
  { week: "4", title: "Broker Integration", desc: "MetaAPI bridge, connection lifecycle manager, position sync, order execution" },
  { week: "5", title: "AI Intelligence Layer", desc: "Claude structured prompts, market sentiment scoring, Redis caching layer" },
  { week: "6", title: "Admin & Operator Tools", desc: "Web dashboard, user management, strategy publishing, trade audit log" },
  { week: "7", title: "Optimization & Hardening", desc: "Socket.IO horizontal scaling, risk validation hardening, performance profiling" },
];

export function BuildTimelineSection() {
  return (
    <section id="timeline" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Build Timeline</h2>
          <p className="mt-2 text-sm text-muted-foreground">7 weeks from architecture to production</p>
        </div>

        <div className="relative">
          <div className="absolute left-[18px] top-0 h-full w-px bg-border md:left-1/2" />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.week}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 order-2 md:order-none ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <span className="text-xs font-bold text-accent">Week {item.week}</span>
                      <h3 className="mt-1 text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  <div className="order-1 md:order-none relative z-10 flex shrink-0 items-center justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent/30 bg-card">
                      <span className="text-xs font-bold text-accent">{item.week}</span>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}