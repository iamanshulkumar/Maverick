"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Calendar, Smartphone, ExternalLink, Github, Lock, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneMockup } from "../visual-components";
import type { Project } from "@/types";
import { ReactIcon, NodeIcon, MongoIcon, RedisIcon, SocketIOIcon, BullMQIcon, MetaAPIIcon, ClaudeIcon, ExpressIcon, TwelveDataIcon, FirebaseIcon } from "@/components/shared/tech-icons";

gsap.registerPlugin(ScrollTrigger);

const heroTechIcons: Record<string, React.ReactNode> = {
  "React Native (Expo)": <ReactIcon size={24} />,
  "Node.js": <NodeIcon size={24} />,
  Express: <ExpressIcon size={24} />,
  MongoDB: <MongoIcon size={24} />,
  "Socket.IO": <SocketIOIcon size={24} />,
  Redis: <RedisIcon size={24} />,
  MetaAPI: <MetaAPIIcon size={24} />,
  "Claude AI": <ClaudeIcon size={24} />,
  "Twelve Data API": <TwelveDataIcon size={24} />,
  BullMQ: <BullMQIcon size={24} />,
};

const projectMeta = {
  slug: "ai-analyzer",
  title: "AI Analyzer",
  tagline: "AI-powered algorithmic trading platform with live execution, strategy backtesting, copy trading, broker integration, and real-time market intelligence.",
  role: "Senior Full Stack Engineer",
  timeline: "2025–2026",
  platform: "iOS, Android",
  techStack: ["React Native (Expo)", "Node.js", "Express", "MongoDB", "Socket.IO", "Redis", "MetaAPI", "Claude AI", "Twelve Data API"],
  demo: undefined as string | undefined,
  github: undefined as string | undefined,
  isPrivate: true,
};

interface HeroSectionProps {
  project?: Project;
}

export function HeroSection({ project }: HeroSectionProps) {
  const p = project || projectMeta;
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const statChips = useMemo(() => [
    { label: "Controllers", value: 14, suffix: "", icon: <Zap size={24} /> },
    { label: "Schemas", value: 17, suffix: "", icon: <Zap size={24} /> },
    { label: "BullMQ", value: 1, suffix: "", icon: heroTechIcons["BullMQ"] || <Zap size={24} /> },
    { label: "MetaAPI", value: 4000, suffix: "+ lines", icon: heroTechIcons["MetaAPI"] || <Zap size={24} /> },
    { label: "Redis", value: 1, suffix: "", icon: heroTechIcons["Redis"] || <Zap size={24} /> },
    { label: "Socket.IO", value: 1, suffix: "", icon: heroTechIcons["Socket.IO"] || <Zap size={24} /> },
    { label: "Claude AI", value: 1, suffix: "", icon: heroTechIcons["Claude AI"] || <Zap size={24} /> },
    { label: "React Native", value: 1, suffix: "", icon: heroTechIcons["Node.js"] || <Zap size={24} /> },
  ], []);

  useGSAP(() => {
    const counters = counterRef.current?.querySelectorAll("[data-counter]");
    if (!counters) return;
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (target > 100) {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          } else {
            el.textContent = Math.floor(obj.val) + suffix;
          }
        },
      });
    });
  }, { scope: sectionRef });

  const floatingCards = [
    { label: "AI Sentiment", value: "Bullish 78%", color: "text-emerald-400", delay: 0, side: "right", top: "8%" },
    { label: "Portfolio", value: "$12,450", color: "text-accent", delay: 0.3, side: "left", top: "22%" },
    { label: "Strategy", value: "Momentum v2", color: "text-amber-400", delay: 0.6, side: "right", top: "52%" },
    { label: "Performance", value: "+14.2%", color: "text-emerald-400", delay: 0.9, side: "left", top: "68%" },
  ];

  return (
    <section ref={sectionRef} className="relative pt-20 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-1.5 text-md text-muted-foreground transition-colors hover:text-foreground">
          ← Back to projects
        </Link>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-3">
              <Badge variant="accent" className="text-xs">Featured Project</Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{p.title}</h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">{p.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5 text-md text-muted-foreground"><User size={14} /> <span className="text-foreground">{p.role}</span></span>
              <span className="flex items-center gap-1.5 text-md text-muted-foreground"><Calendar size={14} /> <span className="text-foreground">{p.timeline}</span></span>
              {p.platform && <span className="flex items-center gap-1.5 text-md text-muted-foreground"><Smartphone size={14} /> <span className="text-foreground">{p.platform}</span></span>}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.techStack.slice(0, 6).map((tech) => (
                <Badge key={tech} variant="accent" className="flex items-center gap-1.5">
                  {heroTechIcons[tech]} {tech}
                </Badge>
              ))}
              {p.techStack.length > 6 && <Badge variant="outline">+{p.techStack.length - 6}</Badge>}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer"><Button variant="accent" size="sm"><ExternalLink size={14} className="mr-1.5" /> Live Demo</Button></a>}
              {p.github && !p.isPrivate && <a href={p.github} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm"><Github size={14} className="mr-1.5" /> Source Code</Button></a>}
              {p.isPrivate && <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-md text-muted-foreground"><Lock size={14} /> Private repository</div>}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <PhoneMockup>
                <img
                  src="/images/projects/Ai%20analyser/Dashboard.png"
                  alt="AI Analyzer Dashboard"
                  className="h-full w-full object-cover"
                />
              </PhoneMockup>

              {floatingCards.map((card) => (
                <motion.div
                  key={card.label}
                  className={`absolute rounded-lg border border-border bg-card px-3 py-2 shadow-lg ${
                    card.side === "right" ? "-right-16" : "-left-16"
                  }`}
                  style={{ top: card.top }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + card.delay, duration: 0.3 }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3 + card.delay, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-md text-muted-foreground">{card.label}</span>
                    <span className={`block text-md font-bold ${card.color}`}>{card.value}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div ref={counterRef} className="mt-12 flex flex-wrap justify-center gap-2">
          {statChips.map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2"
            >
              <span className="text-accent">{chip.icon}</span>
              <span className="text-xs font-semibold text-foreground">{chip.label}</span>
              <span
                data-counter
                data-target={chip.value}
                data-suffix={chip.suffix}
                className="text-xs font-mono text-accent"
              >
                0{chip.suffix}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
