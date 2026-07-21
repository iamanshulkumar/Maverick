"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Overview" },
  { id: "features", label: "Experience" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "performance", label: "Performance" },
  { id: "timeline", label: "Timeline" },
  { id: "challenges", label: "Challenges" },
  { id: "technology", label: "Stack" },
  { id: "admin", label: "Admin" },
  { id: "dashboard", label: "Dashboard" },
  { id: "outcomes", label: "Results" },
  { id: "lessons", label: "Reflections" },
  { id: "roadmap", label: "Next" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);

      let current = "hero";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="fixed right-4 top-1/2 z-50 -translate-y-1/2 hidden lg:block"
    >
      <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-2 shadow-lg">
        <div className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-left transition-all duration-200 group"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  activeSection === s.id ? "bg-accent w-3" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                }`}
              />
              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  activeSection === s.id ? "text-accent opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-60"
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}