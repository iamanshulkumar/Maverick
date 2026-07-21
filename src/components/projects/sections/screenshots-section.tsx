"use client";

import { useEffect, useState, useRef } from "react";
import { Check, ChevronRight, Eye } from "lucide-react";

const img = (name: string) => {
  const base = "/images/projects/Ai analyser";
  const encoded = name.replace(/ /g, "%20").replace(/&/g, "%26");
  return `${base}/${encoded}`;
};

interface StatCard {
  label: string;
  value: string;
  insight: string;
}

interface Slide {
  id: string;
  action: string;
  title: string;
  sentence: string;
  benefits: string[];
  image: string;
  cards: StatCard[];
}

const slides: Slide[] = [
  {
    id: "open", action: "Open App", title: "AI Trading Dashboard",
    sentence: "Your entire trading operation, summarized in a single real-time dashboard.",
    benefits: ["Live portfolio across all brokers", "Real-time P&L with streaming updates", "AI-powered market summaries"],
    image: "Dashboard.png",
    cards: [{ label: "Portfolio", value: "$124.5K", insight: "Aggregated across 3 connected brokers" }, { label: "Win Rate", value: "67%", insight: "Across all active strategies" }],
  },
  {
    id: "sentiment", action: "Market Sentiment", title: "AI Market Intelligence",
    sentence: "Claude AI continuously evaluates market indicators and transforms complex signals into actionable summaries.",
    benefits: ["Real-time sentiment scoring", "Confidence-rated analysis", "Human-readable explanations"],
    image: "Market Sentiments.png",
    cards: [{ label: "Sentiment", value: "Bullish 78%", insight: "Claude AI analysis of 12 market indicators" }, { label: "Cache Hit", value: "78%", insight: "Redis cache with 6-hour TTL" }],
  },
  {
    id: "algo", action: "Run Algorithm", title: "Algorithmic Strategy Engine",
    sentence: "Deploy production trading strategies with configurable entry conditions, risk parameters, and queue-based execution.",
    benefits: ["JSON-based strategy configuration", "BullMQ queue for reliable execution", "8 concurrent worker instances"],
    image: "Algo trading stats & List.png",
    cards: [{ label: "Strategies", value: "12", insight: "Running across 8 concurrent BullMQ workers" }, { label: "Queue Depth", value: "0", insight: "Jobs processed within 23ms average" }],
  },
  {
    id: "chart", action: "Analyze Chart", title: "AI-Powered Chart Analysis",
    sentence: "Multi-instrument charts with AI pattern recognition, confidence scoring, and natural language explanations.",
    benefits: ["OHLC charts with gesture navigation", "AI pattern detection overlays", "Multi-timeframe analysis"],
    image: "Chart Analysis style.png",
    cards: [{ label: "Pattern", value: "Bull Flag (87%)", insight: "AI pattern with confidence threshold" }, { label: "Analysis", value: "2.4s avg", insight: "Redis cached responses in <5ms" }],
  },
  {
    id: "copy", action: "Copy Strategy", title: "Copy Trading Marketplace",
    sentence: "Discover and copy successful strategies with verified track records and customizable risk parameters.",
    benefits: ["Public strategy discovery with filters", "One-tap copy to personal account", "Independent position sizing"],
    image: "Public strategies & filter.png",
    cards: [{ label: "Top Perf.", value: "+34.2%", insight: "Verified track record with full trade history" }, { label: "Copiers", value: "1,247", insight: "Growing 15% week-over-week" }],
  },
  {
    id: "backtest", action: "Backtest Strategy", title: "Historical Strategy Backtesting",
    sentence: "Simulate strategies against historical data with comprehensive reports and AI-powered optimization suggestions.",
    benefits: ["Historical tick replay simulation", "Performance metric computation", "93% faster validation"],
    image: "user backtesting.png",
    cards: [{ label: "Backtests", value: "5,000+", insight: "In first month after launch" }, { label: "Avg Time", value: "3.2s", insight: "Down from 45s with parallel workers" }],
  },
  {
    id: "broker", action: "Connect Broker", title: "MetaTrader Broker Integration",
    sentence: "Seamless MetaTrader account linking with automatic position sync and reliable trade execution.",
    benefits: ["Auto position sync on reconnect", "Exponential backoff reconnection", "Idempotent trade execution"],
    image: "Broker connection.png",
    cards: [{ label: "Reconn. Rate", value: "99.5%", insight: "Exponential backoff with position reconciliation" }, { label: "Recovery", value: "<8s", insight: "Auto sync restores positions without duplicates" }],
  },
  {
    id: "trade", action: "Execute Trade", title: "Order Placement Engine",
    sentence: "Place market and limit orders with built-in risk validation and idempotency guarantees.",
    benefits: ["Market and limit order types", "Pre-trade risk validation in 3ms", "Idempotency key protection"],
    image: "Buy_Sell Screen.png",
    cards: [{ label: "Risk Check", value: "3ms", insight: "Position size, daily loss, drawdown validation" }, { label: "Type", value: "Market", insight: "Also supports limit orders with GTC/GTD" }],
  },
  {
    id: "monitor", action: "Monitor Position", title: "Real-Time Position Monitoring",
    sentence: "Live tracking of all open positions with streaming P&L updates and instant position management.",
    benefits: ["Real-time P&L streaming", "One-tap position close action", "Live execution status updates"],
    image: "Live trades.png",
    cards: [{ label: "Positions", value: "7 active", insight: "Streaming P&L via Socket.IO room subscription" }, { label: "P&L", value: "+$342", insight: "Updated in real-time with each price tick" }],
  },
  {
    id: "analytics", action: "View Analytics", title: "Performance Analytics",
    sentence: "Deep performance insights with equity curves, drawdown analysis, and instrument-level P&L breakdowns.",
    benefits: ["Equity curve with drawdown overlay", "Instrument-level P&L breakdown", "Historical performance comparison"],
    image: "Performance report.png",
    cards: [{ label: "Return", value: "+14.2%", insight: "Across all strategies since migration to live trading" }, { label: "Sharpe", value: "1.87", insight: "Risk-adjusted return from trade history" }],
  },
  {
    id: "done", action: "Done", title: "Complete Trading Platform",
    sentence: "An integrated ecosystem connecting AI analysis, algorithmic execution, copy trading, and broker connectivity.",
    benefits: ["End-to-end trading workflow", "AI-augmented decision making", "Enterprise-grade reliability"],
    image: "Result overview.png",
    cards: [{ label: "Uptime", value: "99.9%", insight: "Three-tier architecture ensures isolation" }, { label: "Stack", value: "11 technologies", insight: "React Native, Node.js, MongoDB, Redis + more" }],
  },
];

export function ScreenshotsSection() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section id="gallery" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto mb-12 max-w-6xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-4">
          <Eye size={12} />
          Product Tour
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          See It In Action
        </h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
          Every screen, every feature — scroll through the complete AI Analyzer experience
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent md:w-48" />

        <div className="overflow-hidden">
          <div
            className="marquee-track flex"
            style={{
              animationPlayState: isHovered || reducedMotion ? "paused" : "running",
            }}
          >
            {[...slides, ...slides].map((slide, i) => (
              <div
                key={`${slide.id}-${i}`}
                className="marquee-slide group relative mx-3 w-[calc(100vw-4rem)] shrink-0 sm:w-[640px] md:w-[720px] lg:w-[780px] xl:w-[820px]"
              >
                <div className="flex overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/90 to-card/50 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-500 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/[0.03]">
                  <div className="hidden w-[200px] shrink-0 items-center justify-center bg-gradient-to-br from-accent/[0.03] via-transparent to-accent/[0.03] p-6 sm:flex md:w-[220px] lg:w-[240px]">
                    <div className="w-[130px] md:w-[140px] lg:w-[150px]">
                      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl border border-border/30 bg-card shadow-xl ring-1 ring-white/[0.03]">
                        <img
                          src={img(slide.image)}
                          alt={slide.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center p-5 md:p-6 lg:p-7">
                    <span className="inline-flex w-fit items-center rounded-full border border-accent/15 bg-accent/[0.04] px-2.5 py-0.5 text-[9px] font-medium text-accent uppercase tracking-widest">
                      {slide.action}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-foreground sm:text-lg">{slide.title}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{slide.sentence}</p>

                    <div className="mt-3 space-y-1.5">
                      {slide.benefits.map((b) => (
                        <div key={b} className="flex items-start gap-2 text-xs text-muted-foreground/80">
                          <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                            <Check size={7} className="text-accent" />
                          </span>
                          {b}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex gap-2">
                      {slide.cards.map((c) => (
                        <div key={c.label} className="flex-1 rounded-lg border border-border/30 bg-background/50 p-2.5 transition-all duration-300 hover:border-accent/20 hover:bg-accent/[0.02]">
                          <p className="text-[8px] font-medium text-muted-foreground/60 uppercase tracking-wider">{c.label}</p>
                          <span className={`mt-0.5 block text-sm font-bold tracking-tight ${c.value.startsWith("+") || c.value.startsWith("<") ? "text-emerald-400" : "text-foreground"}`}>
                            {c.value}
                          </span>
                          <p className="mt-0.5 text-[8px] leading-tight text-muted-foreground/40">{c.insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-10 text-center">
        <a
          href="#features"
          className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-accent transition-colors"
        >
          Explore every feature in detail
          <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <style>{`
        .marquee-track {
          width: max-content;
          animation: marquee 44s linear infinite;
        }
        .marquee-slide {
          height: 100%;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}