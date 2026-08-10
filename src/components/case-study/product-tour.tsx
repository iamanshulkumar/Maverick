"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { PhoneMockup } from "@/components/projects/visual-components";

gsap.registerPlugin(ScrollTrigger);

export interface TourFeature {
  id: string;
  number: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  screenshot: string | number;
  description: string;
}

interface ProductTourProps {
  features: TourFeature[];
  sectionId?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  renderPhone?: (feature: TourFeature) => React.ReactNode;
}

export function ProductTour({ features, sectionId = "experience", label = "Experience the Platform", title = "Product Experience", subtitle = "Scroll to walk through every feature", renderPhone }: ProductTourProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useGSAP(() => {
    if (!pinnedRef.current || !sectionRef.current) return;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 0px",
      end: "bottom 80px",
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const index = Math.min(Math.floor(self.progress * features.length), features.length - 1);
        setActiveFeature(index);
      },
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, { scope: sectionRef });

  const feature = features[activeFeature];

  return (
    <section ref={sectionRef} id={sectionId} className="relative min-h-screen">
      <div ref={pinnedRef} className="mx-auto max-w-6xl px-4 py-0">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-[11px] font-medium text-accent uppercase tracking-widest mb-4">
            <Eye size={12} /> {label}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-0.5 lg:col-span-2">
            {features.map((f, i) => (
              <button key={f.id} onClick={() => setActiveFeature(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-300 ${activeFeature === i ? "border border-accent/30 bg-accent/10" : "border border-transparent hover:bg-surface-hover"}`}>
                <span className={`shrink-0 font-mono text-xs transition-colors ${activeFeature === i ? "text-accent" : "text-muted-foreground/40"}`}>{f.number}</span>
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${activeFeature === i ? "bg-accent text-white" : "bg-card text-muted-foreground"}`}>{f.icon}</div>
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-medium ${activeFeature === i ? "text-accent" : "text-foreground"}`}>{f.label}</span>
                  {activeFeature === i && <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.4 }} className="mt-0.5 block h-0.5 rounded-full bg-accent" />}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div key={feature.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
                <div className="relative shrink-0">
                  {renderPhone ? renderPhone(feature) : <PhoneMockup><span className="text-muted-foreground text-xs">Preview</span></PhoneMockup>}
                </div>
                <div className="min-w-0 flex-1 space-y-4">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground/40">{feature.number}</span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{feature.title}</h3>
                    <p className="mt-0.5 text-xs text-accent font-medium">{feature.tagline}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
