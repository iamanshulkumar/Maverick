"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Database, BarChart3, Zap, Activity, Radio, GitBranch, Globe, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { icon: <Cpu size={18} />, label: "API Controllers", value: 14, suffix: "", desc: "Express REST controllers routing to domain services" },
  { icon: <Database size={18} />, label: "MongoDB Schemas", value: 17, suffix: "", desc: "Document schemas across all platform domains" },
  { icon: <BarChart3 size={18} />, label: "Backtests Completed", value: 5000, suffix: "+", desc: "Historical strategy simulations since launch" },
  { icon: <Zap size={18} />, label: "AI Cache Hit Rate", value: 78, suffix: "%", desc: "Redis cache reducing Claude API costs by 78%" },
  { icon: <Activity size={18} />, label: "BullMQ Workers", value: 8, suffix: "", desc: "Concurrent strategy execution workers" },
  { icon: <Radio size={18} />, label: "Socket.IO Connections", value: 3000, suffix: "+", desc: "Concurrent real-time client connections" },
  { icon: <GitBranch size={18} />, label: "Execution Modes", value: 2, suffix: "", desc: "Paper (simulated) + Live (production) execution" },
  { icon: <Globe size={18} />, label: "MetaAPI Integration", value: 4000, suffix: "+ lines", desc: "MetaTrader broker bridge codebase" },
  { icon: <Server size={18} />, label: "Redis Pub/Sub", value: 3, suffix: " channels", desc: "Queue, control, and cache channels" },
];

export function DashboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const counters = counterRef.current?.querySelectorAll("[data-counter]");
    if (!counters) return;

    counters.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          if (target > 1000) {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          } else {
            el.textContent = Math.floor(obj.val) + suffix;
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="dashboard" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Engineering Dashboard</h2>
          <p className="mt-2 text-sm text-muted-foreground">Live metrics from the production platform</p>
        </div>

        <div ref={counterRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border bg-card p-4 hover:border-accent/20 transition-colors duration-300"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3">
                {m.icon}
              </div>
              <span className="text-sm text-muted-foreground">{m.label}</span>
              <span
                data-counter
                data-target={m.value}
                data-suffix={m.suffix}
                className="block text-xl font-bold text-accent mt-1"
              >
                0{m.suffix}
              </span>
              <p className="mt-2 text-sm text-muted-foreground/70 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
