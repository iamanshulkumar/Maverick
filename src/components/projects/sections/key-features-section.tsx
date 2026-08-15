"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  highlights: string[];
  metric?: { value: string; label: string };
}

interface KeyFeaturesSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export function KeyFeaturesSection({ title, subtitle, features }: KeyFeaturesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 md:mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
            Capabilities
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="min-w-[340px] max-w-[380px] flex-1 snap-start rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/20"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <span className="text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                {feature.highlights.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {feature.highlights.map((h, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
                {feature.metric && (
                  <div className="mt-4 flex items-baseline gap-2 border-t border-border pt-4">
                    <span className="text-xl font-bold text-accent">{feature.metric.value}</span>
                    <span className="text-xs text-muted-foreground">{feature.metric.label}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent transition-opacity",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )} />
          <div className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent transition-opacity",
            canScrollRight ? "opacity-100" : "opacity-0"
          )} />
        </div>
      </div>
    </section>
  );
}
