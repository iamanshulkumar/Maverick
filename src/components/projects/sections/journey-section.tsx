"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const stages = [
  { id: "problem", label: "Problem", section: "hero" },
  { id: "architecture", label: "Architecture", section: "architecture" },
  { id: "features", label: "Features", section: "features" },
  { id: "execution", label: "Execution", section: "architecture" },
  { id: "results", label: "Results", section: "outcomes" },
  { id: "lessons", label: "Lessons", section: "lessons" },
  { id: "future", label: "Future", section: "roadmap" },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useGSAP(() => {
    const sections = stages.map((s) => document.getElementById(s.section)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    sections.forEach((section, i) => {
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: ({ isActive }) => {
          if (isActive) setActiveStage(i);
        },
      });
    });

    if (trackRef.current) {
      gsap.fromTo(
        trackRef.current.querySelectorAll(".journey-dot"),
        { scale: 1, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { scope: sectionRef });

  const handleClick = (index: number) => {
    const target = document.getElementById(stages[index].section);
    if (target) {
      gsap.to(window, { duration: 0.6, scrollTo: { y: target, offsetY: 80 }, ease: "power2.out" });
    }
  };

  return (
    <section ref={sectionRef} className="py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Project Journey</h2>
          <p className="mt-2 text-sm text-muted-foreground">The engineering story from problem to production</p>
        </div>

        <div ref={trackRef} className="relative mx-auto max-w-3xl">
          <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 transition-all duration-500" style={{ background: `linear-gradient(to right, rgb(99 102 241) ${((activeStage + 1) / stages.length) * 100}%, rgb(39 39 42) ${((activeStage + 1) / stages.length) * 100}%)` }} />

          <div className="relative grid justify-items-center" style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
            {stages.map((stage, i) => (
              <button
                key={stage.id}
                onClick={() => handleClick(i)}
                className="flex flex-col items-center gap-2 group"
              >
                <motion.div
                  animate={{
                    scale: activeStage === i ? 1.3 : 1,
                    backgroundColor: activeStage === i ? "rgb(var(--accent) / 0.2)" : "transparent",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`journey-dot relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                    activeStage >= i ? "border-accent bg-accent/10" : "border-border bg-card"
                  }`}
                >
                  <span className={`text-xs font-bold ${activeStage >= i ? "text-accent" : "text-muted-foreground"}`}>
                    {i + 1}
                  </span>
                </motion.div>
                <span className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                  activeStage === i ? "text-accent" : "text-muted-foreground"
                }`}>
                  {stage.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
